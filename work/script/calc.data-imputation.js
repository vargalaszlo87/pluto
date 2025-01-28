const imputation = {

    regression: (data, missingValue = 0) => {
        // Automatikusan generáljuk a dataX vektort a data hosszához
        const dataX = Array.from({ length: data.length }, (_, i) => i + 1);

        // A hiányzó értékek cseréje `null`-ra
        const normalizedData = data.map(y => y === Number(missingValue) ? null : y);

        console.log(normalizedData);

        // Csak a nem hiányzó értékeket használjuk a modellhez
        const validPairs = dataX
            .map((x, i) => ({ x, y: normalizedData[i] }))
            .filter(pair => pair.y !== null);

        // Ha nincs elég adat a regresszióhoz, térj vissza az eredeti tömbbel
        if (validPairs.length < 2) {
            console.warn("Nincs elég adat a regresszióhoz.");
            return data; // Eredeti adatok visszaadása
        }

        // Lineáris regresszió paraméterei: slope (m) és intercept (b)
        const n = validPairs.length;
        const sumX = validPairs.reduce((sum, pair) => sum + pair.x, 0);
        const sumY = validPairs.reduce((sum, pair) => sum + pair.y, 0);
        const sumXY = validPairs.reduce((sum, pair) => sum + pair.x * pair.y, 0);
        const sumX2 = validPairs.reduce((sum, pair) => sum + pair.x ** 2, 0);

        const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX ** 2);
        const intercept = (sumY - slope * sumX) / n;

        // Hiányzó értékek pótlása a regressziós modell segítségével
        return normalizedData.map((y, i) => {
            return y === null ? slope * dataX[i] + intercept : y;
        });
    },

    knn: (data, missingValue, k = 3) => {
        // Automatikusan generáljuk a dataX vektort a data hosszához
        const dataX = Array.from({ length: data.length }, (_, i) => i + 1);

        // A hiányzó értékek cseréje `null`-ra
        const normalizedData = data.map(y => y === Number(missingValue) ? null : y);

        // Hiányzó értékek pótlása kNN segítségével
        return normalizedData.map((y, i) => {
            if (y !== null) {
                return y; // Ha az érték nem hiányzik, hagyjuk változatlanul
            }

            // Találjuk meg a legközelebbi szomszédokat
            const neighbors = dataX
                .map((x, j) => ({
                    distance: Math.abs(x - dataX[i]),
                    value: normalizedData[j],
                }))
                .filter(neighbor => neighbor.value !== null) // Csak nem hiányzó értékek
                .sort((a, b) => a.distance - b.distance) // Rendezzük távolság szerint
                .slice(0, k); // Vegyük a k legközelebbi szomszédot

            // Ha nincs elég szomszéd, figyelmeztessünk
            if (neighbors.length === 0) {
                console.warn(`Nincs elég szomszéd a ${i}. indexű elemhez.`);
                return missingValue; // Hiányzó értékkel térünk vissza
            }

            // Átlagoljuk a szomszédok értékeit
            const imputedValue = neighbors.reduce((sum, neighbor) => sum + neighbor.value, 0) / neighbors.length;
            return imputedValue;
        })
    },

    timeseries: (data, missingValue, method = 'linear') => {
        // Az adatokat "null"-á alakítjuk, hogy egységesen kezeljük a hiányzó értékeket
        const normalizedData = data.map(y => y === Number(missingValue) ? null : y);

        // A különböző interpolációs módszerek implementálása
        const interpolate = (data, method) => {
            switch (method) {
                case 'linear':
                    return linearInterpolation(data);
                case 'mean':
                    return meanInterpolation(data);
                case 'spline':
                    return splineInterpolation(data);
                default:
                    throw new Error(`Ismeretlen interpolációs módszer: ${method}`);
            }
        };

        // Lineáris interpoláció
        const linearInterpolation = (data) => {
            const result = [...data];
            for (let i = 0; i < result.length; i++) {
                if (result[i] === null) {
                    const prevIndex = result.slice(0, i).lastIndexOf(null) + 1 || 0;
                    const nextIndex = result.slice(i + 1).findIndex(x => x !== null) + i + 1;

                    if (prevIndex === i || nextIndex >= result.length || nextIndex === -1) {
                        continue;
                    }

                    const prevValue = result[prevIndex];
                    const nextValue = result[nextIndex];
                    const distance = nextIndex - prevIndex;

                    result[i] = prevValue + ((nextValue - prevValue) / distance) * (i - prevIndex);
                }
            }
            return result;
        };

        // Átlagolásos interpoláció
        const meanInterpolation = (data) => {
            const result = [...data];
            for (let i = 0; i < result.length; i++) {
                if (result[i] === null) {
                    const prevValue = result.slice(0, i).reverse().find(x => x !== null);
                    const nextValue = result.slice(i + 1).find(x => x !== null);

                    if (prevValue !== undefined && nextValue !== undefined) {
                        result[i] = (prevValue + nextValue) / 2;
                    } else if (prevValue !== undefined) {
                        result[i] = prevValue;
                    } else if (nextValue !== undefined) {
                        result[i] = nextValue;
                    }
                }
            }
            return result;
        };

        // Spline interpoláció
        const splineInterpolation = (data) => {
            const x = [];
            const y = [];
            const result = [...data];

            // Kiválogatjuk a meglévő adatpontokat
            data.forEach((value, index) => {
                if (value !== null) {
                    x.push(index); // Időbélyegek
                    y.push(value); // Meglévő értékek
                }
            });

            // Ha kevesebb, mint 2 adatpont van, nincs értelme spline-t csinálni
            if (x.length < 2) {
                console.warn("Nincs elég adat a spline interpolációhoz.");
                return result;
            }

            // Spline koefficiensek számítása
            const coeffs = cubicSplineCoefficients(x, y);

            // Hiányzó értékek interpolálása
            for (let i = 0; i < result.length; i++) {
                if (result[i] === null) {
                    result[i] = cubicSplineEvaluate(i, x, coeffs);
                }
            }

            return result;
        };

        // Spline koefficiensek számítása
        const cubicSplineCoefficients = (x, y) => {
            const n = x.length - 1;
            const a = [...y];
            const b = Array(n).fill(0);
            const d = Array(n).fill(0);
            const h = Array(n).fill(0);

            // Lépcsők számítása
            for (let i = 0; i < n; i++) {
                h[i] = x[i + 1] - x[i];
            }

            // Tridiagonális mátrix megoldása
            const alpha = Array(n).fill(0);
            for (let i = 1; i < n; i++) {
                alpha[i] =
                    (3 / h[i]) * (a[i + 1] - a[i]) -
                    (3 / h[i - 1]) * (a[i] - a[i - 1]);
            }

            const c = Array(n + 1).fill(0);
            const l = Array(n + 1).fill(0);
            const mu = Array(n + 1).fill(0);
            const z = Array(n + 1).fill(0);

            l[0] = 1;
            mu[0] = 0;
            z[0] = 0;

            for (let i = 1; i < n; i++) {
                l[i] = 2 * (x[i + 1] - x[i - 1]) - h[i - 1] * mu[i - 1];
                mu[i] = h[i] / l[i];
                z[i] = (alpha[i] - h[i - 1] * z[i - 1]) / l[i];
            }

            l[n] = 1;
            z[n] = 0;
            c[n] = 0;

            for (let j = n - 1; j >= 0; j--) {
                c[j] = z[j] - mu[j] * c[j + 1];
                b[j] = (a[j + 1] - a[j]) / h[j] - h[j] * (c[j + 1] + 2 * c[j]) / 3;
                d[j] = (c[j + 1] - c[j]) / (3 * h[j]);
            }

            return { a, b, c, d, x };
        };

        // Spline értékelése
        const cubicSplineEvaluate = (xi, x, { a, b, c, d }) => {
            let i = x.length - 2;
            while (i >= 0 && xi < x[i]) {
                i--;
            }
            i = Math.max(0, i);
            const dx = xi - x[i];
            return a[i] + b[i] * dx + c[i] * dx ** 2 + d[i] * dx ** 3;
        };

        // Választott módszer futtatása
        return interpolate(normalizedData, method);
    }

};
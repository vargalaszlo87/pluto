const featureE = {

    polynomal: (vector, degree) => {
        const createCombinations = (arr, depth) => {
            if (depth === 1) return arr.map((val) => [val]);
            let combinations = [];
            arr.forEach((val, idx) => {
                createCombinations(arr.slice(idx), depth - 1).forEach((comb) => {
                    combinations.push([val, ...comb]);
                });
            });
            return combinations;
        };

        let features = [...vector];
        for (let d = 2; d <= degree; d++) {
            const combinations = createCombinations(vector, d);
            combinations.forEach((comb) => {
                features.push(comb.reduce((prod, num) => prod * num, 1)); // Szorzás a kombináció minden elemére
            });
        }
        return features;
    },

    interaction: (vector) => {
        const interactions = [];
        for (let i = 0; i < vector.length; i++) {
            for (let j = i + 1; j < vector.length; j++) {
                interactions.push(vector[i] * vector[j]); // Két elem szorzata
            }
        }
        return [...vector, ...interactions];
    },

    statistical: (vector) => {
        const sum = vector.reduce((acc, val) => acc + val, 0);
        const mean = sum / vector.length; // Átlag
        const min = Math.min(...vector); // Minimum
        const max = Math.max(...vector); // Maximum
        const variance = vector.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / vector.length; // Variancia
        const stdDev = Math.sqrt(variance); // Szórás

        return [...vector, mean, min, max, stdDev];
    }

}
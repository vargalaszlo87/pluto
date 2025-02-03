// obj
const correlation = {
    R: 0,
    output: [],
    strength: ["Elhanyagolható", "Gyenge", "Közepes", "Erős", "Függvényszerű"],
    valueToStrength: [0.1, 0.4, 0.7, 0.9, 1.0],
    getStrength: (value) => {
        for (let i = 0; i < correlation.valueToStrength.length; i++) {
            if (value <= correlation.valueToStrength[i]) {
                return correlation.strength[i];
            }
        }
        return "Ismeretlen érték";
    },
    getStrengthColor: (value) => {
        if (value < 0.1)
            return '#ff0000';
        else if (value < 0.4)
            return '#ff9900';
        else if (value < 0.7)
            return '#ffcc00';
        else if (value < 0.9)
            return '#99cc00';
        else
            return '#4caf50';
    },

    calcMAVG: (array, windowSize) => {
        const start = Math.max(0, array.length - windowSize);
        const window = array.slice(start);
        const sum = window.reduce((acc, val) => acc + val, 0);
        return sum / window.length;
    },
    extendMAVG: (arr1, arr2, windowSize = 3) => {
        // which is the shorter
        const shorter = arr1.length < arr2.length ? arr1 : arr2;
        const longer = arr1.length >= arr2.length ? arr1 : arr2;

        // diff
        const diff = longer.length - shorter.length;
        if (diff === 0)
            return [arr1, arr2];

         // extend if they are not equal
         for (let i = 0; i < diff; i++) {
            const movingAverage = correlation.calcMAVG(shorter, windowSize);
            shorter.push(movingAverage);
        }
    
    // Visszatérés a helyes sorrenddel
    /*return arr1.length < arr2.length
        ? [shorter, longer] // Ha az arr1 volt a rövidebb
        : [longer, shorter]; // Ha az arr2 volt a rövidebb
*/
        return [arr1, arr2];
    },
    extendLin: (arr, size) => {
        const minValue = Math.min(...arr);
        const maxValue = Math.max(...arr);

        out = [];
        let i = 0;

        if (minValue < maxValue) {
            for (i = 0; i < size; i++) {
                arr.push(i * (maxValue / size))
            }
        }
        else {
            for (i = size - 1; i >= 0; i++) {
                arr.push(i * (maxValue / size))
            }            
        }
    },
    pearson: (dataX, dataY) => {
        correlation.output.length = 0;

        let meanX = descriptive.mean(dataX);
        let meanY = descriptive.mean(dataY);

        // ellenorizni, hogy egyenlo-e
        if (meanX.length != meanY.length)
            return;
        // DEV: ha nem, akkor potolni

        // DEV: ellenorizni, hogy milyen eloszlasu
        // DEV: transzformalni ha kell

        // calculation
        let Sxy = 0;
        let SSx = 0;
        let SSy = 0;
        for (let i = 0; i < dataX.length; i++) {
            Sxy += (dataX[i] - meanX) * (dataY[i] - meanY);
            SSx += Math.pow((dataX[i] - meanX), 2)
            SSy += Math.pow((dataY[i] - meanY), 2);
        }
        correlation.R = Sxy / Math.sqrt(SSx * SSy);

        // load template
        return correlation.R;

    },
    template: (R) => {
        // header
        correlation.output.push('<h4 id="play-descriptive-statistic">Összefüggések az adatsorok között</h4>');
        correlation.output.push('<div class="container-fluid">');
        correlation.output.push('<div class="row">');

        // add canvas to DOM
        correlation.output.push('<div class="col-mg-9 col-lg-9" id="correlation-chart">');
        correlation.output.push('<canvas id="collerationLineChart" style="width: 100%; height: 500px;"></canvas>');
        correlation.output.push('</div>');

        correlation.output.push('<div class="col-mg-3 col-lg-3">');
        correlation.output.push('<canvas id="correlationProgressBar" style="margin-top: 1.75vw;"></canvas>');
        correlation.output.push('<h6 class="resultTitle">Az adatsorok kapcsolatának erőssége</h6>')
        correlation.output.push('<h3 class="resultText" style="color: ' + correlation.getStrengthColor(Math.abs(R)) + '">' + correlation.getStrength(Math.abs(R)) + '</h3>');
        correlation.output.push('<p class="resultValue">Korrelációs együtthetó: <b>' + Math.abs(correlation.R.toFixed(2)) + '</b></p>');
        correlation.output.push('</div>');

        // refresh DOM
        document.getElementById("floatbox-content").innerHTML = correlation.output.join("");

        // Ellenőrizzük, hogy valóban létezik-e a canvas
        const canvas = document.getElementById('collerationLineChart');
        if (!canvas) {
            console.error('A canvas elem nem található!');
            return;
        }
        correlation.output.push('</div></div>');

        return correlation.output.join("");
    },
    chartJS: (dataY1, dataY2, datasetNames) => {

        // chart
        const ctx = document.getElementById('collerationLineChart').getContext('2d');
        // X tengely indexek automatikus generálása
        const dataX = dataY1.map((_, index) => index); // Indexek 0-tól a dataY1 hosszáig
        const lineChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: dataX, // X tengely indexek
                datasets: [{
                        //label: 'Adatsor 1',
                        label: datasetNames[0],
                        data: dataY1, // Első Y adatsor
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 2,
                        fill: false
                    },
                    {
                        //label: 'Adatsor 2',
                        label: datasetNames[1],
                        data: dataY2, // Második Y adatsor
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 2,
                        fill: false
                    }
                ]
            },
            options: {
                title: { // Cím hozzáadása
                    display: true,
                    text: 'A adatsorok vizualizációja',
                    fontSize: 18,
                    fontColor: '#333'
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Index'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Y tengely értékek'
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'A két adatsor megjelnítve', // A cím szövege
                        font: {
                            size: 18 // A cím betűmérete
                        }
                    },
                    legend: {
                        display: true,
                        labels: {
                            color: 'black' // A legendában lévő szöveg színe
                        }
                    }
                }
            }
        });

        // progress bar
        const ctx2 = document.getElementById('correlationProgressBar').getContext('2d');

        // A megjelenítendő érték 0 és 1 között
        const value = Math.abs(correlation.R).toFixed(1);

        // Szín kiválasztása az érték alapján
        let backgroundColor;
        if (value < 0.1) {
            backgroundColor = '#ff0000';
        } else if (value < 0.4) {
            backgroundColor = '#ff9900';
        } else if (value < 0.7) {
            backgroundColor = '#ffcc00';
        } else if (value < 0.9) {
            backgroundColor = '#99cc00';
        } else {
            backgroundColor = '#4caf50';
        }

        const progressBar = new Chart(ctx2, {
            type: 'horizontalBar', // Régebbi verziókban használd ezt a típusnevet
            data: {
                labels: [''],
                datasets: [{
                    label: 'Erősség',
                    data: [value * 100], // Százalékos megjelenítés
                    backgroundColor: backgroundColor,
                    borderColor: backgroundColor,
                    borderWidth: 1
                }]
            },
            options: {
                title: { // Cím hozzáadása
                    display: true,
                    text: 'Kapcsolat erősségének vizualizálása',
                    fontSize: 18,
                    fontColor: '#333'
                },
                scales: {
                    xAxes: [{
                        ticks: {
                            beginAtZero: true,
                            max: 100, // Skála 0-100%-ig
                            callback: function(value) {
                                return value + '%'; // Százalékos kijelzés az x tengelyen
                            }
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Erősség (0-1)'
                        }
                    }],
                    yAxes: [{
                        display: true
                    }]
                },
                legend: {
                    display: false // Csak az érték megjelenítésére van szükség
                }
            }
        });


    }

}


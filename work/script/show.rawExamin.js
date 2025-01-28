// button
const buttonRawExamin = document.getElementById("raw-examin");

const examin = {
    output: [],
    labels: [],
    data: [],
    chartInstance: null, // A meglévő diagram tárolására
    chartInstanceCtx: null,
    chartInstanceOptions: null,
    currentChartType: 'line', // Alapértelmezett diagram típus

    show(event, dataID) {
        this.output.length = 0;
        this.labels.length = 0;
        this.data.length = 0;

        // Keresés az array indexében
        const tempIndex = pluto.inputData.ID.indexOf(dataID);

        // Fejléc
        this.output.push('<h4 id="play-descriptive-statistic">A <u>kijelölt</u> adatsorok megjeleítése</h4>');
        this.output.push('<div class="container-fluid">');
        this.output.push('<div class="row">');

        // Canvas hozzáadása a DOM-hoz
        this.output.push('<div class="col-mg-12 col-lg-12" id="play-chart">');
        this.output.push('<canvas id="showExaminChart" style="width: 100%; height: 500px;"></canvas>');
        this.output.push('</div>');

        // DOM frissítése
        document.getElementById("floatbox-content").innerHTML = this.output.join("");

        // Ellenőrizzük, hogy valóban létezik-e a canvas
        const canvas = document.getElementById('showExaminChart');
        if (!canvas) {
            console.error('A canvas elem nem található!');
            return;
        }

        // Adatok a diagramhoz
        pluto.inputData.all[tempIndex].forEach((item, index) => {
            this.labels.push(index);
        });

        this.output.push('</div></div>');

        return this.output.join("");
    },

    chartJS(multiDataY, datasetNames) {
        const borderColors = ['#922b21', '#76448a', '#1f618d', '#148f77', '#1e8449', '#b7950b', '#af601a', '#717d7e', '#283747', '#000000'];

        const datasets = multiDataY.map((dataset, index) => ({
            label: datasetNames[index],
            data: dataset,
            borderColor: borderColors[index],
            fill: false,
            yAxisID: `y-axis-${index + 1}`,
        }));

        this.chartInstanceCtx = document.getElementById('showExaminChart').getContext('2d');

        // Meglévő diagram törlése, ha van
        if (this.chartInstance) {
            this.chartInstance.destroy();
        }

        // Új diagram létrehozása a kiválasztott típus alapján
        this.chartInstanceOptions = {
            type: this.currentChartType,
            data: {
                labels: this.labels,
                datasets: datasets
            },
            options: {
                legend: {
                    display: true
                },
                hover: {
                    mode: null // Így nem történik hover kiemelés
                },
                responsive: true,
                scales: {
                    yAxes: multiDataY.map((_, index) => {
                        const color = datasets[index].borderColor;
                        return {
                            id: `y-axis-${index + 1}`,
                            type: 'linear',
                            position: index % 2 === 0 ? 'left' : 'right',
                            scaleLabel: {
                                display: true,
                                labelString: datasetNames[index] + ' tengely',
                                fontColor: color,
                            },
                            ticks: {
                                beginAtZero: true,
                                fontColor: color,
                            },
                            gridLines: {
                                display: index === 0,
                            },
                        };
                    }),
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'X tengely',
                        }
                    }]
                }
            }
        };

        this.chartInstance = new Chart(this.chartInstanceCtx, this.chartInstanceOptions);
    },

};

// events
// Esemény a "raw-examin" gombra
buttonRawExamin.addEventListener('click', (event) => {

    let dataID = [];
    let multiYDatas = [];
    let datasetNames = [];

    // selected rectangles
    selectedRectangles.forEach((rect, index) => {
        dataID[index] = rect.getAttribute("data-id");
        multiYDatas.push(pluto.inputData.all[pluto.inputData.ID.indexOf(dataID[index])]);
        datasetNames.push(pluto.inputData.name[pluto.inputData.ID.indexOf(dataID[index])]);

        if (dataID.length > 5) {
            alert('A demó verzió 5 kijelölt adatsorral képes dolgozni.');
            return;
        }
    });

    // Adatok betöltése a lebegő ablakhoz
    const data = examin.show(event, dataID[0]);

    // Lebegő ablak megnyitása
    floatBox.open(event, data, sizer.width - 100);

    // Diagram hozzáadása
    examin.chartJS(multiYDatas, datasetNames);

});
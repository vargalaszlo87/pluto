// slider
function updateSliderColor(slider) {
    const value = slider.value;
    const min = slider.min;
    const max = slider.max;
    const percentage = ((value - min) / (max - min)) * 100;

    // Szín számítása (zöld → piros)
    const red = Math.round((value / max) * 255);
    const green = Math.round(255 - (value / max) * 255);
    const color = `rgb(${red},${green},0)`;

    // Háttérszín beállítása
    slider.style.accentColor = color; // Modern böngészők
    slider.style.background = `linear-gradient(to right, ${color} ${percentage}%, #ddd ${percentage}%)`; // Alternatíva
}

// button
const buttonOptimumItem = document.getElementById("optimum-item");

const optimum = {
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
        //const tempIndex = pluto.inputData.ID.indexOf(dataID);

        // Fejléc
        this.output.push('<h4 id="show-optimum-item" style="margin-bottom: 2vw;">Az <u>optimális</u> elem kiválasztása</h4>');
        this.output.push('<div class="container-fluid" style="height: 90%">');
        this.output.push('<div class="row">');
        this.output.push('<h5 style="width: 100%; color: #336699">A kezdeti súlyok beállítása</h5>');
        this.output.push('<table id="optimum-default-weight">');

        for (let i = 0; i < dataID.length; i++) {
            const name = pluto.inputData.name[pluto.inputData.ID.indexOf(dataID[i])]
            this.output.push('<tr><td style="padding-right: 2.0vw">A(z) <b>' + name + '</b> nevű paraméter</td><td><span style="font-weight: bold; font-size: 0.9vw; text-transform: uppercase; color: green">Kevésbé fontos</span></td><td><input class="slider" name="data_pluto_id_' + pluto.inputData.ID.indexOf(dataID[i]) + '" type="range" min="0" max="1" step = 0.05 value="0.5" style="width: 30vw" /></td><td><span style="font-weight: bold; font-size: 0.9vw; text-transform: uppercase; color: red">Inkább fontos</span></td></tr>');
        }

        this.output.push('</table>');

        // DOM frissítése
        document.getElementById("floatbox-content").innerHTML = this.output.join("");

        // Adatok a diagramhoz
        // pluto.inputData.all[tempIndex].forEach((item, index) => {
        //     this.labels.push(index);
        // });

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
buttonOptimumItem.addEventListener('click', (event) => {

    let dataID = [];
    let multiYDatas = [];
    let datasetNames = [];

    // selected rectangles
    selectedRectangles.forEach((rect, index) => {
        dataID[index] = rect.getAttribute("data-id");
        multiYDatas.push(pluto.inputData.all[pluto.inputData.ID.indexOf(dataID[index])]);
        datasetNames.push(pluto.inputData.name[pluto.inputData.ID.indexOf(dataID[index])]);

    });

    //if (dataID.length > 10 || dataID.length < 2) {
    if (false) {
        alert('Ebben a verzióban legalább 2 és legfeljebb 10 adatsorral képes dolgozni.');
    } else {
        // Adatok betöltése a lebegő ablakhoz
        const data = optimum.show(event, dataID);

        // slider
        document.getElementById("floatbox-content").addEventListener("input", function(event) {
            if (event.target.classList.contains("slider")) {
                updateSliderColor(event.target);
            }
        });

        // Lebegő ablak megnyitása
        floatBox.open(event, data, sizer.width - 100);

        // Diagram hozzáadása
        //optimum.chartJS(multiYDatas, datasetNames);
    }

});
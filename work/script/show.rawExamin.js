// button
const buttonRawExamin = document.getElementById("raw-examin");

const examin = {
    output: [],
    labels: [],
    data: [],
    show(event, dataID) {
        this.output.length = 0;
        this.labels.length = 0;
        this.data.length = 0;

        // search the index of array
        tempIndex = pluto.inputData.ID.indexOf(dataID);

        // header
        this.output.push('<h4 id="play-descriptive-statistic"><u>' + (tempIndex + 1) + ". adatsor</u> grafikonja és leíró statisztikája</h4>");
        this.output.push('<div class="container-fluid">');
        this.output.push('<div class="row">');

        // add canvas to DOM
        this.output.push('<div class="col-mg-9 col-lg-9" id="play-chart">');
        this.output.push('<canvas id="showExaminChart" style="width: 100%; height: 500px;"></canvas>');
        this.output.push('</div>');

        // refresh DOM
        document.getElementById("floatbox-content").innerHTML = this.output.join("");

        // Ellenőrizzük, hogy valóban létezik-e a canvas
        const canvas = document.getElementById('showExaminChart');
        if (!canvas) {
            console.error('A canvas elem nem található!');
            return;
        }

        // data for chart
        // DEV: ellenőrizni!
        pluto.inputData.all[tempIndex].forEach((item, index) => {
            this.labels.push(index);
            //this.data.push(item);
        });

        // end divs
        this.output.push('</div></div>');

        return this.output.join("");
    },
    chartJS(multiDataY) {

        const borderColors = ['#922b21', '#76448a', '#1f618d', '#148f77', '#1e8449', '#b7950b','#af601a','#717d7e', '#283747', '#000000'];

        const datasets = multiDataY.map((dataset, index) => ({
            label: `Adatsor ${index + 1}`,
            data: dataset,
            //borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`,
            borderColor: borderColors[index],
            fill: false,
            yAxisID: `y-axis-${index + 1}`,
        }));

        const ctx = document.getElementById('showExaminChart').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.labels, // X ax
                datasets: datasets
            },
            options: {
                legend: {
                    display: true
                },
                responsive: false,
                scales: {
                    yAxes: multiDataY.map((_, index) => {
                        const color = datasets[index].borderColor;
                        return {
                            id: `y-axis-${index + 1}`,
                            type: 'linear',
                            position: index % 2 === 0 ? 'left' : 'right',
                            scaleLabel: {
                                display: true,
                                labelString: `Adatsor ${index + 1} tengely`,
                                fontColor: color, // Tengely címke színe
                            },
                            ticks: {
                                beginAtZero: true,
                                fontColor: color, // Címkék színe a tengely mentén
                            },
                            gridLines: {
                                display: index === 0, // Csak az első tengelyhez rácsvonal
                            },
                        };
                    }),
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'X tengely',
                        }
                    }],
                    x: {
                        beginAtZero: true
                    },
                    y: {
                        beginAtZero: true
                    },

                },

            }
        });
    }
}



// event
buttonRawExamin.addEventListener('click', (event) => {
    let dataID = [];
    let multiDataY = [];
    selectedRectangles.forEach((rect, index) => {
        dataID[index] = rect.getAttribute("data-id");
        multiDataY.push(pluto.inputData.all[pluto.inputData.ID.indexOf(dataID[index])]);

        if (dataID.length > 5) {
            alert('A demó verzió 5 kijelölt adatsorral képes dolgozni.');
            return;
        }

    });

    console.log(multiDataY[0][0]);

    // data for floatbox
    const data = examin.show(event, dataID[0]);

    // open floatbox
    floatBox.open(event, data, sizer.width - 100);

    // add JS
    examin.chartJS(multiDataY);



})
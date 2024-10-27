const descriptiveStatistic = {
    output: [],
    labels: [],
    data: [],
    play: (event, dataID) => {
        descriptiveStatistic.output.length = 0;
        descriptiveStatistic.labels.length = 0;
        descriptiveStatistic.data.length = 0;

        // search the index of array
        tempIndex = pluto.inputData.ID.indexOf(dataID);

        // header
        descriptiveStatistic.output.push('<h4 id="play-descriptive-statistic"><u>' + (tempIndex + 1) + ". adatsor</u> grafikonja és leíró statisztikája</h4>");
        descriptiveStatistic.output.push('<div class="container-fluid">');
        descriptiveStatistic.output.push('<div class="row">');

        // add canvas to DOM
        descriptiveStatistic.output.push('<div class="col-mg-9 col-lg-9" id="play-chart">');
        descriptiveStatistic.output.push('<canvas id="playdescriptiveStatistic" style="width: 100%; height: 500px;"></canvas>');
        descriptiveStatistic.output.push('</div>');

        // refresh DOM
        document.getElementById("floatbox-content").innerHTML = descriptiveStatistic.output.join("");

        // Ellenőrizzük, hogy valóban létezik-e a canvas
        const canvas = document.getElementById('playdescriptiveStatistic');
        if (!canvas) {
            console.error('A canvas elem nem található!');
            return;
        }

        // data for chart
        // DEV: ellenőrizni!
        pluto.inputData.all[tempIndex].forEach((item, index) => {
            descriptiveStatistic.labels.push(index);
            descriptiveStatistic.data.push(item);
        });
    
        // statistical datas
        descriptiveStatistic.output.push('<div class="col-mg-3 col-lg-3" id="play-table">');
        descriptiveStatistic.output.push('<table class="descriptive-statistic">');

        // make a copy from inputData
        const temp = pluto.inputData.all[tempIndex];

        // descriptpive-statistics
        mean = descriptive.mean(temp);
        median = descriptive.median(temp);
        mode = descriptive.mode(temp);
        variance = descriptive.variance(temp);
        standardDeviation = descriptive.standardDeviation(temp);
        standardError = descriptive.standardError(temp);

        sum = descriptive.sum(temp);
        count = descriptive.count(temp);
        min = descriptive.min(temp);
        max = descriptive.max(temp);
        range = descriptive.range(temp);

        descriptiveStatistic.output.push('<tr><td>Átlag: </td><td>' + mean.toFixed(2) + '</td></tr>');
        descriptiveStatistic.output.push('<tr><td>Módusz: </td><td>' + mode + '</td></tr>');
        descriptiveStatistic.output.push('<tr><td>Medián: </td><td>' + median.toFixed(2) + '</td></tr>');
        descriptiveStatistic.output.push('<tr><td>Szórás: </td><td>' + standardDeviation.toFixed(2) + '</td></tr>');
        descriptiveStatistic.output.push('<tr><td>Standard hiba: </td><td>' + standardError.toFixed(2) + '</td></tr>');
        descriptiveStatistic.output.push('<tr><td>Variancia: </td><td>' + variance.toFixed(2) + '</td></tr>');

        descriptiveStatistic.output.push('<tr><td class="space" colspan="2"></td></tr>');

        descriptiveStatistic.output.push('<tr><td>Összeg: </td><td>' + sum.toFixed(2) + '</td></tr>');
        descriptiveStatistic.output.push('<tr><td>Mennyiség: </td><td>' + count + ' db</td></tr>');
        descriptiveStatistic.output.push('<tr><td>Minimum: </td><td>' + min.toFixed(2) + '</td></tr>');
        descriptiveStatistic.output.push('<tr><td>Maximum: </td><td>' + max.toFixed(2) + '</td></tr>');
        descriptiveStatistic.output.push('<tr><td>Terjedelem: </td><td>' + range.toFixed(2) + '</td></tr>');

        // end table
        descriptiveStatistic.output.push('</table>');
        
        // print button
        descriptiveStatistic.output.push('<button class="printButton" onclick="window.print();"><i class="fa fa-print fa-1x"></i>Nyomtatás</button>');

        // end divs
        descriptiveStatistic.output.push('</div></div></div>');

        return descriptiveStatistic.output.join("");
    },
    playJS: () => {

        const ctx = document.getElementById('playdescriptiveStatistic').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: descriptiveStatistic.labels, // X ax
                datasets: [{
                    label: '',
                    data: descriptiveStatistic.data, // Y ax
                    fill: false,
                    borderColor: '#424',
                    tension: 0.1,
                    borderWidth: 1
                }]
            },
            options: {
                legend: {
                    display: false
                },
                responsive: false,
                scales: {
                    x: {
                        beginAtZero: true
                    },
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}
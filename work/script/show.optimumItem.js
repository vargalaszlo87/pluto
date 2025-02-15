// global variables

let dataID = [];
let multiYDatas = [];
let datasetNames = [];

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
        this.output.push('<h4 id="show-optimum-item" style="margin-bottom: 2vw; text-transform: uppercase;">Az <u>optimális</u> elem kiválasztása</h4>');
        this.output.push('<div class="container-fluid" style="height: 90%">');
        this.output.push('<div class="row">');
        this.output.push('<h5 style="width: 100%; color: #8a21c5">A kezdeti súlyok beállítása</h5>');
        this.output.push('<table id="optimum-default-weight">');

        for (let i = 0; i < dataID.length; i++) {
            const name = pluto.inputData.name[pluto.inputData.ID.indexOf(dataID[i])]
            this.output.push('<tr><td style="padding-right: 2.0vw">A(z) <b>' + name + '</b> nevű paraméter</td><td><span style="font-weight: bold; font-size: 0.9vw; text-transform: uppercase; color: #229954">Kevésbé fontos</span></td><td><input class="slider" name="data_pluto_id_' + pluto.inputData.ID.indexOf(dataID[i]) + '" type="range" min="0" max="1" step = 0.05 value="0.5" style="width: 30vw" /></td><td><span style="font-weight: bold; font-size: 0.9vw; text-transform: uppercase; color: #a93226 ">Inkább fontos</span></td></tr>');
        }

        this.output.push('</table>');

        // Eredmény kiíratás helye
        this.output.push('<div id="optimum-result" style="margin-top: 2vw; font-size: 1.2vw; font-weight: bold; color: blue;">');

        this.output.push('</div>');

        // Kattintós button
        this.output.push('<button id="calculate-optimum">Számítás indítása</button>');

        setTimeout(() => {
            document.getElementById("calculate-optimum").addEventListener("click", () => {

                // reset inputDatas
                geneticAlgorithmConfig.inputDatas.length = 0;

                // setup for geneticAlgorithm()    
                const setup = {
                    generations: 500,
                    populationSize: geneticAlgorithmConfig.inputDatas.length,
                    customWeights: null,
                    eliteRate: 0.1,
                    mutationRate: 0.05, 
                    earlyStopThreshold: 0.01,
                    earlyStopPatiente: 10,
                };

                // calc
                // const result = geneticAlgorithm(setup);

                let result = "";
                
                
                // push itmes of congis

                geneticAlgorithmConfig.categories.length = 0;
                geneticAlgorithmConfig.categories.push("id");

                geneticAlgorithmConfig.categoriesNames.length = 0;

                dataID.forEach((item, index) =>{
                    geneticAlgorithmConfig.categories.push(item);
                    geneticAlgorithmConfig.categoriesNames.push(pluto.inputData.name[pluto.inputData.ID.indexOf(item)]);
                });

                // push inputDatas
                geneticAlgorithmConfig.inputDatas.length = 0;

                const lengthOfDataset = pluto.inputData.all[pluto.inputData.ID.indexOf(dataID[0])].length;
                for (let i = 0 ; i < lengthOfDataset ; i++) {
                    let newData = {};

                    geneticAlgorithmConfig.categories.forEach((field, index) => {
                        if (field === "id") {
                            newData[field] = i; // Az id legyen növekvő
                        } else {
                            newData[field] = Math.random(); // Minden más mező véletlenszám
                        }
                    });
                    geneticAlgorithmConfig.inputDatas.push(newData);   
                }


                

              /*  dataID.forEach((item, index) => {
                    result += item + " ";

                    result += lengthOfDataset
                });
*/

                console.log(geneticAlgorithmConfig.categoriesNames);


                document.getElementById("optimum-result").innerText = result;
            });
        }, 100);

        // DOM frissítése
       //document.getElementById("floatbox-content").innerHTML = this.output.join("");

        // Adatok a diagramhoz
        // pluto.inputData.all[tempIndex].forEach((item, index) => {
        //     this.labels.push(index);
        // });

        this.output.push('</div></div>');

        return this.output.join("");
    }

};

// events
// Esemény a "raw-examin" gombra
buttonOptimumItem.addEventListener('click', (event) => {

    dataID.length = 0;
    multiYDatas.length = 0;
    datasetNames.length = 0;

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
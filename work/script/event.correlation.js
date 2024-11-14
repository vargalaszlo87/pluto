// event

const button = document.getElementById("intelligent-correlation");

button.addEventListener('click', (event) => {
    let dataID = [];
    let isNotDefaultData = false;
    selectedRectangles.forEach((rect, index) => {
        dataID[index] = rect.getAttribute("data-id");

        // check is not default data
        if (pluto.inputData.type[pluto.inputData.ID.indexOf(dataID[index])] == "const") {
            isNotDefaultData = true;
        }

    });
    if (isNotDefaultData) {
        alert("Konstans számokkal nem végezhető korreláció analízis.");
        return;
    }

    // check min 2 data packages
    if (dataID.length < 2) {
        alert('Legalább 2 adatsor kiválasztása szükséges a korreláció analízishez.');
        return;       
    }

    // 2D correlation
    if (dataID.length == 2) {
        // search datas
        xIndex = pluto.inputData.ID.indexOf(dataID[0]);
        yIndex = pluto.inputData.ID.indexOf(dataID[1]);

        // calc
        const R = correlation.pearson(pluto.inputData.all[xIndex], pluto.inputData.all[yIndex]);

        // data for floatbox
        const data = correlation.template(R);

        // open floatbox
        floatBox.open(event, data, sizer.width - 100);

        // add JS
        correlation.chartJS(pluto.inputData.all[xIndex], pluto.inputData.all[yIndex]);
    }
    // correlation-n
    else {
        alert('Coming soon...');
    }







});
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

        // two arrays
        arr1 = pluto.inputData.all[xIndex];
        arr2 = pluto.inputData.all[yIndex];

        console.log(pluto.inputData.type[xIndex]);
        console.log(pluto.inputData.type[yIndex]);

        // extend
        if (arr1.length != arr2.length) {
            if (pluto.inputData.type[xIndex] == "function" && arr1.length < arr2.lenght) {
                correlation.extendLin(arr1, Math.max(arr1.length, arr2.length));
            }
            else if (pluto.inputData.type[yIndex] == "function" && arr2.length < arr1.lenght) {
                correlation.extendLin(arr2, Math.max(arr1.length, arr2.length));
            }
            else {
                correlation.extendMAVG(arr1, arr2);
            }
        }


        // calc
        const R = correlation.pearson(arr1, arr2);

        // data for floatbox
        const data = correlation.template(R);

        // open floatbox
        floatBox.open(event, data, sizer.width - 100);

        // add JS
        correlation.chartJS(arr1, arr2);
    }
    // correlation-n
    else {
        alert('Coming soon...');
    }







});
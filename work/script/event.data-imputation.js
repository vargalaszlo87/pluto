const dataImputationButtons = document.getElementsByName("data-imputation");

dataImputationButtons.forEach(button => {
    button.addEventListener('click', (event) => {

        // type of amputation
        const clickedButtonId = event.currentTarget.id;

        // value of missing-value
        inputMissingValue = document.querySelector('input[name="data-imputation-missing-value"]').value;

        /*  if (clickedButtonId == "scale")
            selectedRadioFilter = document.querySelector('input[name="data-pre-processing-scale"]:checked').value;

        if (clickedButtonId == "normalize")
            selectedRadioFilter = document.querySelector('input[name="data-pre-processing-normalize"]:checked').value;

        if (clickedButtonId == "transformation")
            selectedRadioFilter = document.querySelector('input[name="data-pre-processing-transformation"]:checked').value;
*/

        // rectangle ID
        let dataID = [];

        // Actual IDs
        selectedRectangles.forEach((rect, index) => {
            dataID[index] = rect.getAttribute("data-id");
        });

        // at least two values
        if (dataID.length != 1) {
            console.log('Egyszerre 1 adatelemmel');
            return;
        }

        // actual Type
        const dataTypeIndex = pluto.inputData.ID.indexOf(dataID[0]);
        const dataType = pluto.inputData.type[dataTypeIndex];

        // actual data
        const data = pluto.inputData.all[dataTypeIndex];

        // calc process
        let outputArray = [];

        if (clickedButtonId == "regression")
            outputArray = imputation.regression(data, inputMissingValue);

        if (clickedButtonId == "knn")
            outputArray = imputation.knn(data, inputMissingValue, 3);

        if (clickedButtonId == "timeseries")
            outputArray = imputation.timeseries(data, inputMissingValue);

        // new vector
        pluto.inputData.all.push(outputArray);
        pluto.calculation.counter++;

        // ID
        let tempID = generateID();
        pluto.inputData.ID.push(tempID);
        pluto.inputData.name.push("Imputáció - " + pluto.calculation.counter);

        // type
        pluto.inputData.type.push('imputation');

        // event
        pluto.event.lastMathToolButtonId = clickedButtonId;

        // create rectangle
        createRectangle(tempID, 50, 50, 'imputation', [...dataID, tempID]);
        pluto.inputData.counter++;

        // add lines
        addConnection(dataID, tempID); // Tömböt adunk át a szülőkhöz és a gyermek azonosítóját

    })
});
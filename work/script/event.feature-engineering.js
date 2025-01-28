const featureEngineeringButtons = document.getElementsByName("feature-engineering");

featureEngineeringButtons.forEach(button => {
    button.addEventListener('click', (event) => {

        // type of amputation
        const clickedButtonId = event.currentTarget.id;

        // value of missing-value
        //inputMissingValue = document.querySelector('input[name="data-imputation-missing-value"]').value;

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

        if (clickedButtonId == "polynomal")
            outputArray = featureE.polynomal(data, 2);

        if (clickedButtonId == "interaction")
            outputArray = featureE.interaction(data);

        if (clickedButtonId == "statistical")
            outputArray = featureE.statistical(data);

        // new vector
        pluto.inputData.all.push(outputArray);
        pluto.calculation.counter++;

        // ID
        let tempID = generateID();
        pluto.inputData.ID.push(tempID);
        pluto.inputData.name.push("Jellemző - " + pluto.calculation.counter);

        // type
        pluto.inputData.type.push('feature');

        // event
        pluto.event.lastMathToolButtonId = clickedButtonId;

        // create rectangle
        createRectangle(tempID, 50, 50, 'feature', [...dataID, tempID]);
        pluto.inputData.counter++;

        // add lines
        addConnection(dataID, tempID); // Tömböt adunk át a szülőkhöz és a gyermek azonosítóját

    })
});
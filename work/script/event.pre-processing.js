const preProcessingButtons = document.getElementsByName("pre-processing");

preProcessingButtons.forEach(button => {
    button.addEventListener('click', (event) => {

        //const typeOfArithmetic = ["math-plus", "math-minus", "math-times", "math-divide"];

        // type of pre-processing
        const clickedButtonId = event.currentTarget.id;

        // type of sub-pre-processing
        const selectedRadio = document.querySelector('input[name="data-pre-processing-filter"]:checked');

        // rectangle ID
        let dataID = [];
       
        // Actual IDs
        selectedRectangles.forEach((rect, index) => {
            dataID[index] = rect.getAttribute("data-id");
        });

        // at least two values
  /*      if (dataID.length == 1) {
            console.log('Egyszerre 1 adatelemmel');
            return;
        }
*/

        // actual Type
        const dataTypeIndex = pluto.inputData.ID.indexOf(dataID[0]);
        const dataType = pluto.inputData.type[dataTypeIndex];

        // push
        // dataType.push(pluto.inputData.type[pluto.inputData.ID.indexOf(dataID[index])]);

        // calc process

        filter.filterDataByZScore(data, 2);


        // new vector
        pluto.inputData.all.push(outputArray);
        pluto.calculation.counter++;

        // ID
        let tempID = generateID();
        pluto.inputData.ID.push(tempID);
        pluto.inputData.name.push("Kalkuláció - " + pluto.calculation.counter);

        // type
        pluto.inputData.type.push('calculated');

        // event
        pluto.event.lastMathToolButtonId = clickedButtonId;

        // create rectangle
        createRectangle(tempID, 50, 50, 'calculated', [...dataID, tempID]);
        pluto.inputData.counter++;

        // add lines
        addConnection(dataID, tempID); // Tömböt adunk át a szülőkhöz és a gyermek azonosítóját



    })
});
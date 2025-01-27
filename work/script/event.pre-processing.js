const preProcessingButtons = document.getElementsByName("pre-processing");

preProcessingButtons.forEach(button => {
    button.addEventListener('click', (event) => {

        //const typeOfArithmetic = ["math-plus", "math-minus", "math-times", "math-divide"];

        // type of pre-processing
        const clickedButtonId = event.currentTarget.id;

        // type of sub-pre-processing
        let selectedRadioFilter;

            if (clickedButtonId == "filter")
                selectedRadioFilter = document.querySelector('input[name="data-pre-processing-filter"]:checked').value;

            if (clickedButtonId == "scale")
                selectedRadioFilter = document.querySelector('input[name="data-pre-processing-scale"]:checked').value;

            if (clickedButtonId == "normalize")
                selectedRadioFilter = document.querySelector('input[name="data-pre-processing-normalize"]:checked').value; 
            
            if (clickedButtonId == "transformation")
                selectedRadioFilter = document.querySelector('input[name="data-pre-processing-transformation"]:checked').value;             

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

        // push
        //dataType.push(pluto.inputData.type[dataTypeIndex]);

        // calc process
        let outputArray = [];

            // filter
            if (selectedRadioFilter == "z-score") {
                outputArray = filter.filterDataByZScore(data, 2);
            }
            else if (selectedRadioFilter == "iqr") {
                outputArray = filter.filterDataByIQR(data);
            }
            else if (selectedRadioFilter == "move-avg") {
                outputArray = filter.movingAverage(data, 3);
            }

            // scale
            else if (selectedRadioFilter == "standardize") {
                outputArray = scale.standardizeData(data);
            }
            else if (selectedRadioFilter == "min-max-0-1") {
                outputArray = scale.minMaxScaling(data, 0, 1); 
            }
            else if (selectedRadioFilter == "min-max-1-1") {
                outputArray = scale.minMaxScaling(data, -1, 1); 
            }      
            
            // normalize
            else if (selectedRadioFilter == "l2") {
                outputArray = normalize.normalizeL2(data);
            }         
            else if (selectedRadioFilter == "l1") {
                outputArray = normalize.normalizeL1(data);
            }   
            
            // transform
            else if (selectedRadioFilter == "log") {
                outputArray = transformation.log(data);
            }         
            else if (selectedRadioFilter == "sqrt") {
                outputArray = transformation.sqrt(data);
            }   
            else if (selectedRadioFilter == "reciprocal") {
                outputArray = transformation.reciprocal(data);
            }         
            else if (selectedRadioFilter == "power") {
                outputArray = transformation.power(data);
            }   
            
            // dev
            else {
                // dev
            }
            

        // new vector
        pluto.inputData.all.push(outputArray);
        pluto.calculation.counter++;

        // ID
        let tempID = generateID();
        pluto.inputData.ID.push(tempID);
        pluto.inputData.name.push("Előfeldolgozás - " + pluto.calculation.counter);

        // type
        pluto.inputData.type.push('preprocessing');

        // event
        pluto.event.lastMathToolButtonId = clickedButtonId;

        // create rectangle
        createRectangle(tempID, 50, 50, 'preprocessing', [...dataID, tempID]);
        pluto.inputData.counter++;

        // add lines
        addConnection(dataID, tempID); // Tömböt adunk át a szülőkhöz és a gyermek azonosítóját



    })
});
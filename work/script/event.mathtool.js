// event

// constant
const constButton = document.getElementById("math-const");
constButton.addEventListener('click', (event) => {
    // get the value
    const constValue = document.getElementById("math-const-input");
    let value = Number(constValue.value);

    if (isNaN(value))
        return;

    // not null
    if (value == 0) {
        alert('A konstans értéke nem lehet nulla.');
        return;
    }

    // new vector
    pluto.inputData.all.push([value]);
    pluto.inputData.constant = value;

    // ID
    let tempID = generateID();
    pluto.inputData.ID.push(tempID);
    pluto.inputData.name.push(pluto.inputData.constant);

    // type
    pluto.inputData.type.push('const');

    // create rectangle
    createRectangle(tempID, 50, 50, 'const');
    pluto.inputData.counter++;

});

// maht-functions
const functionButtons = document.getElementsByName("function");
const createLinearArray = (n, ascending = true) => {
    if (n <= 0)
        return;

    const array = [];
    const step = 1 / (n - 1);

    for (let i = 0; i < n; i++) {
        const value = ascending ? i * step : 1 - i * step;
        array.push(value);
    }
    return array;
}

// math-lin-up math-lin-down
functionButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        // type of math-arithmetic
        const clickedButtonId = event.currentTarget.id;

        // new vector
        value = createLinearArray(32, (clickedButtonId == "math-lin-up") ? true : false);
        pluto.inputData.all.push(value);

        console.log(clickedButtonId);

        // ID
        let tempID = generateID();
        pluto.inputData.ID.push(tempID);
        pluto.inputData.name.push("Lineáris " + ((clickedButtonId == "math-lin-up") ? "növekvő" : "csökkenő"));

        // type
        pluto.inputData.type.push('function');

        // create rectangle
        createRectangle(tempID, 50, 50, 'function');
        pluto.inputData.counter++;

    });
});


// arithmetic
const arithmeticButtons = document.getElementsByName("arithmetic");
const isConstAndDefaultOrCalculated = (arr) =>
    arr.includes("const") && (arr.includes("default") || arr.includes("calculated") || arr.includes("function")) && arr.length === 2;

const isDefaultOrCalculated = (arr) =>
    (arr.includes("default") || arr.includes("calculated") || arr.includes("function")) && arr.length === 2 && !arr.includes("const");

const expandArray = (value, size) =>
    Array(size).fill(value);

const typeOfArithmetic = ["math-plus", "math-minus", "math-times", "math-divide"];

const plusArrays = (arr1, arr2) =>
    arr1.map((num, index) => num + arr2[index]);

const minusArrays = (arr1, arr2) =>
    arr1.map((num, index) => num - arr2[index]);

const timesArrays = (arr1, arr2) =>
    arr1.map((num, index) => num * arr2[index]);

const divideArrays = (arr1, arr2) =>
    arr1.map((num, index) => {
        if (arr2[index] === 0) throw new Error("Osztás nullával!");
        return num / arr2[index];
    });

const arithmeticProcess = (type, arg1, arg2) => {
    let out = [];
    switch (type) {
        // plus
        case 0:
            out = plusArrays(arg1, arg2);
            break;
            // minus
        case 1:
            out = minusArrays(arg1, arg2);
            break;
            // times
        case 2:
            out = timesArrays(arg1, arg2);
            break;
            // divide
        case 3:
            out = divideArrays(arg1, arg2);
            break;
            // plus
        default:
            out = plusArrays(arg1, arg2);
            break;
    }
    return out;
};

arithmeticButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        // type of math-arithmetic
        const clickedButtonId = event.currentTarget.id;

        let dataID = [];
        let dataType = [];
        let arithmeticArguments = [];
        let outputArray = [];

        selectedRectangles.forEach((rect, index) => {
            // actual ID
            dataID[index] = rect.getAttribute("data-id");

            // actual type for 
            dataType.push(pluto.inputData.type[pluto.inputData.ID.indexOf(dataID[index])]);

        });

        //  only two values
        if (dataID.length != 2) {
            //alert('Egyszerre két elemet kell kijelölni.');
            console.log('Egyszerre két elemet kell kijelölni.');
            return;
        }

        // max one constant
        let count = 0;
        for (const word of dataType) {
            if (word === "const") count++;
            if (count > 1) {
                console.log("Csak egy konstans elem lehet a kijelöltek között.");
                return;
            }
        }

        // constant and dataset
        if (isConstAndDefaultOrCalculated(dataType)) {
            // serach IDs
            const innerConstantID = dataType.indexOf("const");
            const constantID = dataID[innerConstantID];
            const constant = pluto.inputData.all[pluto.inputData.ID.indexOf(constantID)];

            const innerDatasetID = dataType.findIndex(item => item === "default" || item === "calculated" || item === "function");
            const datasetID = dataID[innerDatasetID];
            const dataset = pluto.inputData.all[pluto.inputData.ID.indexOf(datasetID)];
            const datasetSize = dataset.length;

            // expand the constant
            expandConstant = expandArray(constant[0], datasetSize);
            expandArray(expandConstant, datasetSize);

            // two arguments
            arithmeticArguments[0] = dataset;
            arithmeticArguments[1] = expandConstant;

        }

        // dataset or calculated
        if (isDefaultOrCalculated(dataType)) {
            console.log('Adatcsomag vagy kauklált.');

            // serach IDs
            const tempArg1 = pluto.inputData.all[pluto.inputData.ID.indexOf(dataID[0])];
            const tempArg2 = pluto.inputData.all[pluto.inputData.ID.indexOf(dataID[1])];

            if (tempArg1.length != tempArg2.length) {
                arithmeticArguments[0] = tempArg1 < tempArg2 ? tempArg1 : tempArg2;
                arithmeticArguments[1] = tempArg1 > tempArg2 ? tempArg1 : tempArg2;
            } else {
                arithmeticArguments[0] = tempArg1;
                arithmeticArguments[1] = tempArg2;
            }
        }

        // maht process
        const typeOfArithmeticIndex = typeOfArithmetic.indexOf(clickedButtonId);
        outputArray = arithmeticProcess(typeOfArithmeticIndex, arithmeticArguments[0], arithmeticArguments[1]);

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
        pluto.event.lastMathToolButtonId = typeOfArithmetic[typeOfArithmeticIndex];

        // create rectangle
        createRectangle(tempID, 50, 50, 'calculated', [dataID[0], dataID[1], tempID]);
        pluto.inputData.counter++;

        // add lines
        addConnection(dataID[0], dataID[1], tempID);


    });
});
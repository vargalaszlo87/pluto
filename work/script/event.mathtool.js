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

        // get the value
        const vectorSize = document.getElementById("math-function-input");
        let value = Number(vectorSize.value);

        value = createLinearArray((value < 2 || isNaN(value)) ? 2 : value, (clickedButtonId == "math-lin-up") ? true : false);
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
    arr.includes("const") && (arr.includes("default") || arr.includes("calculated") || arr.includes("function"));

const isDefaultOrCalculated = (arr) =>
    (arr.includes("default") || arr.includes("calculated") || arr.includes("function")) && !arr.includes("const");

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

const arithmeticProcess = (type, ...arrays) => {
    if (arrays.length < 2) {
        throw new Error("Legalább két tömb szükséges a művelethez!");
    }

    // bővítsük a kijelölés legnagyobb tömbjéhez
    const maxLength = Math.max(...arrays.map(arr => arr.length));
    arrays = arrays.map(arr =>
        arr.length === 1 ? expandArray(arr[0], maxLength) : arr
    );

    // minden arrayt szűkítsünk az egynél nagyobb Math.min tömb méretéhez.
    const minLength = Math.min(...arrays.map(arr => arr.length));
    arrays = arrays.map(arr => arr.slice(0, minLength));

    return arrays.reduce((accumulator, currentArray) => {
        switch (type) {
            case 0: // plus
                return plusArrays(accumulator, currentArray);
            case 1: // minus
                return minusArrays(accumulator, currentArray);
            case 2: // times
                return timesArrays(accumulator, currentArray);
            case 3: // divide
                return divideArrays(accumulator, currentArray);
            default:
                throw new Error("Érvénytelen aritmetikai típus!");
        }
    });
};

/*
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

        // at least two values
        if (dataID.length < 2) {
            console.log('Egyszerre legalább két elemet kell kijelölni.');
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

        // add all valid arguments
        dataID.forEach(id => {
            const data = pluto.inputData.all[pluto.inputData.ID.indexOf(id)];
            arithmeticArguments.push(data);
        });

        // math process
        const typeOfArithmeticIndex = typeOfArithmetic.indexOf(clickedButtonId);
        outputArray = arithmeticProcess(typeOfArithmeticIndex, ...arithmeticArguments);

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
        createRectangle(tempID, 50, 50, 'calculated', [...dataID, tempID]);
        pluto.inputData.counter++;

        // add lines
        dataID.forEach(id => addConnection(id, tempID));
    });
});
*/

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

        // at least two values
        if (dataID.length < 2) {
            console.log('Egyszerre legalább két elemet kell kijelölni.');
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

        // add all valid arguments
        dataID.forEach(id => {
            const data = pluto.inputData.all[pluto.inputData.ID.indexOf(id)];
            arithmeticArguments.push(data);
        });

        // math process
        const typeOfArithmeticIndex = typeOfArithmetic.indexOf(clickedButtonId);
        outputArray = arithmeticProcess(typeOfArithmeticIndex, ...arithmeticArguments);

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
        createRectangle(tempID, 50, 50, 'calculated', [...dataID, tempID]);
        pluto.inputData.counter++;

        // add lines
        addConnection(dataID, tempID); // Tömböt adunk át a szülőkhöz és a gyermek azonosítóját
    });
});
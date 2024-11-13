// event

const constButton = document.getElementById("math-const");

constButton.addEventListener('click', (event) => {
    // get the value
    const constValue = document.getElementById("math-const-input");
    let value = Number(constValue.value);

    if (isNaN(value))
        return;

    // new vector
    pluto.inputData.all.push([value]);
    pluto.inputData.constant = value;

    // ID
    let tempID = generateID();
    pluto.inputData.ID.push(tempID);

    // create rectangle
    createRectangle(tempID, 50, 50, 'const');
    pluto.inputData.counter++;


});
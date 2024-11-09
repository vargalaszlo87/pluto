// event

const button = document.getElementById("intelligent-correlation");

button.addEventListener('click', (event) => {
    let dataID = [];
    selectedRectangles.forEach((rect, index) => {
        dataID[index] = rect.getAttribute("data-id");
    });
    if (dataID.length != 2) {
        alert('A demó verzió két kijelölt adatsorral képes dolgozni.');
        return;
    }

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

    console.log("AZ R erteke: " + R);
    /*
            const data = play.descriptive(event, dataID);
            console.log(data);
            floatBox.open(event, data, sizer.width - 100);
            play.descriptiveJS();
    */


});
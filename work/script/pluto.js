/*
 * PLUTO v.0.1 
 *
 */

const pluto = {
    design: {
        unSelectedRectangleBorder: '6px dashed #fff', // #bb8fce
        selectedRectangleBorder: '6px solid #8a21c5',
        selectedWorkspace: '#fdeeeb',
        unSelectedWorkspace: '#fff'
    },
    inputData: {
        constant: 0,
        counter: 0,
        maxSize: 10 * 1024, // max 10kb,
        // vectors
        all: [],
        ID: [],
        type: [],
        name: [],
    },
    calculation: {
        counter: 0
    },
    network: {
        connections: []
    },
    event: {
        lastMathToolButtonId: null,
    }
};

const workSpace = document.getElementById('workSpace');
const workSpaceRect = workSpace.getBoundingClientRect(); // A workSpace mérete és pozíciója

let offsetX = 20; // Kezdő eltolás X irányba
let offsetY = 20; // Kezdő eltolás Y irányba
let isDragging = false;
let draggedElement = null;
let startX, startY;

let selectedRectangles = []; // Kijelölt téglalapok listája
let isButton = false; // workSpace deaktiváló gomb állapota

/* ------------------ auxiliary functions for the pluto system */

// clear selection
function clearSelection() {
    selectedRectangles.forEach(rect => {
        rect.style.borderBottom = pluto.design.unSelectedRectangleBorder; // Alapértelmezett border visszaállítása
    });
    selectedRectangles = [];
}


// extended paste (ctrl + v) function
function paste(event) {

    const pastedData = (event.clipboardData || window.clipboardData).getData('text');
    if (pastedData.length > pluto.inputData.maxSize) {
        alert('10kb-os limit túllépve');
        return;
    }

    // row by row
    let rows = pastedData.trim().split(/\n+/);
    let matrix = rows.map(row => row.split(/[\t; ]+/).map(value => isNaN(value) ? value : Number(value)));

    // Check if first row is text (column names)
    let hasHeader = matrix[0].every(value => typeof value === 'string');

    // If it's a matrix (all rows have the same length)
    let isMatrix = matrix.length > 1 && matrix.every(row => row.length === matrix[0].length);

    // If matrix but not equal length
    if (!isMatrix && matrix.length > 1) {
        alert('Több oszlop bemásolása esetén, ugyanakkora méretű adatsorok szükségesek.');
        return false;
    }

    if (isMatrix) {
        // If first row is text, extract it as column names
        let columnNames = hasHeader ? matrix[0] : null;
        let dataRows = hasHeader ? matrix.slice(1) : matrix; // Remove header row if exists

        // Convert data rows into column-wise structure
        let columnVectors = Array.from({ length: dataRows[0].length }, () => []);
        dataRows.forEach(row => {
            row.forEach((value, colIndex) => {
                columnVectors[colIndex].push(value);
            });
        });

        // Process columns
        columnVectors.forEach((vector, colIndex) => {
            let tempID = generateID();
            pluto.inputData.all.push(vector);
            pluto.inputData.ID.push(tempID);

            // Assign column name if available, otherwise default
            if (columnNames) {
                pluto.inputData.name.push(columnNames[colIndex]);
            } else {
                //pluto.inputData.name.push("Adatsor - " + tempID);
                pluto.inputData.name.push(vector[0]);
            }

            // Type
            pluto.inputData.type.push('default');

            // Create rectangle
            createRectangle(tempID, 50, 50);
            pluto.inputData.counter++;
        });

    } else {
        // Normal vector (single-column paste)
        let temp = pastedData.trim().split(/[\t\n; ]+/);
        let vector = temp.map(Number);
        pluto.inputData.all.push(vector);

        // ID
        let tempID = generateID();
        pluto.inputData.ID.push(tempID);
        pluto.inputData.name.push("Adatsor - " + tempID);

        // Type
        pluto.inputData.type.push('default');

        // Create rectangle
        createRectangle(tempID, 50, 50);
        pluto.inputData.counter++;
    }
}

// generate id for rectangle
function generateID() {
    let randomPart = Math.random().toString(36).substring(2, 6);
    let utcPart = Date.now().toString(36).substring(6);
    return (randomPart + utcPart).substring(0, 8);
}

// remove element from array
function removeElementFromArray(array, index) {
    if (index !== -1) {
        array.splice(index, 1);
        return true;
    } else
        return false;
}

// find parents
function findParentsByChildId(dataArray, target) {
    if (dataArray.includes(target)) {
        return dataArray.filter(item => item !== target);
    }
    return null;
}

/* ------------------event handler for the pluto system */

// drag function
document.addEventListener('mousemove', (event) => {
    if (isDragging && draggedElement) {
        let newLeft = event.clientX - startX;
        let newTop = event.clientY - startY;

        // Ellenőrizd, hogy a téglalap ne kerüljön ki a workSpaceból
        if (newLeft < 0) newLeft = 0;
        if (newTop < 0) newTop = 0;
        if (newLeft + draggedElement.offsetWidth > workSpace.offsetWidth) {
            newLeft = workSpace.offsetWidth - draggedElement.offsetWidth;
        }
        if (newTop + draggedElement.offsetHeight > workSpace.offsetHeight) {
            newTop = workSpace.offsetHeight - draggedElement.offsetHeight;
        }

        draggedElement.style.left = `${newLeft}px`;
        draggedElement.style.top = `${newTop}px`;

        // vonalak frissítése
        updateAllLines();

    }
});

// end of drag stops event
document.addEventListener('mouseup', () => {
    isDragging = false;
    draggedElement = null;
});

// workSpace üres területére kattintás kezelése
workSpace.addEventListener('click', (event) => {
    if (event.target === workSpace) {
        clearSelection(); // Csak akkor törlünk kijelölést, ha a workSpace-re kattintottak közvetlenül
    }
});

// Vágólap tartalom kezelése
workSpace.addEventListener('paste', paste);

// Focus kezelés
workSpace.addEventListener("focusin", (event) => {
    workSpace.addEventListener("paste", paste, false);
    workSpace.style.background = pluto.design.selectedWorkspace;

    // workSpace inaktiváló „X” gomb hozzáadása
    if (!isButton) {
        const deactivateButton = document.createElement('button');
        deactivateButton.setAttribute("id", "deactivateButton");
        deactivateButton.innerHTML = '<i class="fa fa-times fa-2x"></i>';
        deactivateButton.style.width = sizer.workSpaceCanvasDeactivateButtonSize + "px";
        deactivateButton.style.height = sizer.workSpaceCanvasDeactivateButtonSize + "px";

        // position
        deactivateButton.style.left = document.getElementById(sizer.workSpaceDivId).offsetWidth - sizer.workSpaceCanvasDeactivateButtonSize - sizer.workSpaceCanvasPadding + -10 + 'px';
        deactivateButton.style.top = sizer.navHeight + sizer.workSpaceCanvasPadding + 10 + "px";
        document.body.appendChild(deactivateButton);

        // Inaktiválás eseménykezelője
        deactivateButton.addEventListener('click', () => {
            deactivateButton.remove(); // Gomb eltávolítása
            workSpace.removeEventListener('paste', paste); // Paste funkció eltávolítása
            workSpace.style.backgroundColor = pluto.design.unSelectedWorkspace; // workSpace háttér visszaállítása
            workSpace.style.backgroundImage = 'radial-gradient(#dbdbdb 1px, transparent 1px)';
            workSpace.style.backgroundSize = '5px 5px';
            isButton = false;
        });
        isButton = true;
    }
});

// global right click
document.addEventListener("contextmenu", (event) => {
    // enabled
    if (event.target.classList.contains("contextmenu"))
        return;
    // others are disabled
    event.preventDefault();
});

/* ------------------main nav-event in pluto */

// new

function resetFullWorkspace() {
    // delete rectangles and lines
    document.querySelectorAll('.rectangle').forEach(rect => rect.remove());
    document.querySelectorAll('.line').forEach(line => line.remove());

    // erase all data
    pluto.inputData.all = [];
    pluto.inputData.ID = [];
    pluto.inputData.type = [];
    pluto.inputData.name = [];
    pluto.inputData.counter = 0;

    pluto.calculation.counter = 0;
    pluto.network.connections = [];

    selectedRectangles = [];

    offsetX = 20;
    offsetY = 20;

}

document.getElementById("newSheet").addEventListener('click', function() {
    if (confirm('Biztsan egy új üres WorkSpace-t nyitsz meg?')) {
        resetFullWorkspace();
    } else
        return false;
});

// save
document.getElementById("saveWorkSpace").addEventListener('click', function() {

    const rectangles = Array.from(document.querySelectorAll('.rectangle')).map(rect => ({
        id: rect.getAttribute('data-id'),
        x: rect.offsetLeft,
        y: rect.offsetTop,
        type: rect.getAttribute('data-type') || 'default',
        content: rect.innerHTML
    }));

    const lines = Array.from(document.querySelectorAll('.line')).map(line => ({
        id: line.getAttribute('data-id'),
        from: line.getAttribute('data-from'),
        to: line.getAttribute('data-to'),
        type: line.getAttribute('data-type') || 'default'
    }));

    const data = {
        rectangles: rectangles,
        lines: lines,
        inputData: JSON.parse(JSON.stringify(pluto.inputData)), // Mély másolat
        calculation: JSON.parse(JSON.stringify(pluto.calculation)),
        network: JSON.parse(JSON.stringify(pluto.network)),
        event: JSON.parse(JSON.stringify(pluto.event))
    };

    const jsonData = JSON.stringify(data, null, 4); // Szépített JSON

    // Blob létrehozása és letöltés indítása
    const blob = new Blob([jsonData], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'pluto-workspace-' + new Date().toJSON().slice(0, 10) + '.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

// sort
function sortWorkSpace() {
    const rectangles = Array.from(document.querySelectorAll('.rectangle'));

    if (rectangles.length === 0) {
        console.log("Nincs mit rendezni.");
        return;
    }

    // new positions
    offsetX = 50;
    offsetY = 30;
    const spacingX = 225;
    const spacingY = 160;
    const cols = Math.ceil(Math.sqrt(rectangles.length));

    let row = 0,
        col = 0;

    rectangles.forEach(rect => {
        const newX = offsetX + col * spacingX;
        const newY = offsetY + row * spacingY;

        // new rectangles positions
        rect.style.left = `${newX}px`;
        rect.style.top = `${newY}px`;

        // next col
        col++;
        if (col >= cols) {
            col = 0;
            row++;
        }
    });

    // new lines positions
    updateAllLines();
    console.log("Téglalapok rácsszerűen elrendezve.");
}


/*
function clipboardItem() {

    if (selectedRectangles.length < 1) return;

    selectedRectangles.forEach(rect => {
        rectID = rect.getAttribute('data-id');
        dataID = pluto.inputData.ID.indexOf(rectID);

        //pluto.inputData.all

        console.log(dataID);

    });

}
*/

// export clipboard
function clipboardItem22() {
    if (selectedRectangles.length < 1) return;

    let columnData = [];

    selectedRectangles.forEach(rect => {
        let rectID = rect.getAttribute('data-id');
        let dataID = pluto.inputData.ID.indexOf(rectID);
        let dataName = pluto.inputData.name[dataID];

        if (dataID !== -1) {
            let rowData = [dataName, ...pluto.inputData.all[dataID]]; // ID + összes adat
            columnData.push(rowData); // Hozzáadjuk az oszloplistához
        }
    });

    // Megnézzük, hány sorunk van
    let maxRows = columnData.reduce((max, row) => Math.max(max, row.length), 0);

    // Függőleges formázás (soronként egy adat)
    let transposedData = [];
    for (let i = 0; i < maxRows; i++) {
        let row = columnData.map(col => col[i] || ""); // Ha nincs adat, üres string legyen
        transposedData.push(row.join(";"));
    }

    let csvText = transposedData.join("\n"); // Sorokat összefűzzük

    // Másolás a vágólapra
    navigator.clipboard.writeText(csvText)
        .then(() => console.log("Sikeresen másolva a vágólapra!"))
        .catch(err => console.error("Hiba történt a másolás során:", err));
}


function clipboardItem() {
    if (selectedRectangles.length < 1) return;

    let columnData = [];

    selectedRectangles.forEach(rect => {
        let rectID = rect.getAttribute('data-id');
        let dataID = pluto.inputData.ID.indexOf(rectID);
        let dataName = pluto.inputData.name[dataID];

        if (dataID !== -1) {
            let rowData = [dataName, ...pluto.inputData.all[dataID]]; // ID + összes adat
            columnData.push(rowData); // Hozzáadjuk az oszloplistához
        }
    });

    let csvText = "";

    if (columnData.length === 1) {
        // Ha csak egy rectangle van, akkor egy sorba írjuk ki
        csvText = columnData[0].join(";");
    } else {
        // Megnézzük, hány sorunk van
        let maxRows = columnData.reduce((max, row) => Math.max(max, row.length), 0);

        // Függőleges formázás (soronként egy adat)
        let transposedData = [];
        for (let i = 0; i < maxRows; i++) {
            let row = columnData.map(col => col[i] || ""); // Ha nincs adat, üres string legyen
            transposedData.push(row.join(";"));
        }

        csvText = transposedData.join("\n"); // Sorokat összefűzzük
    }

    // Másolás a vágólapra
    navigator.clipboard.writeText(csvText)
        .then(() => console.log("Sikeresen másolva a vágólapra!"))
        .catch(err => console.error("Hiba történt a másolás során:", err));
}



// export CSV
function CSVItem() {
    if (selectedRectangles.length < 1) return;

    let columnData = [];

    selectedRectangles.forEach(rect => {
        let rectID = rect.getAttribute('data-id');
        let dataID = pluto.inputData.ID.indexOf(rectID);
        let dataName = pluto.inputData.name[dataID];

        if (dataID !== -1) {
            let rowData = [dataName, ...pluto.inputData.all[dataID]]; // ID + összes adat
            columnData.push(rowData); // Hozzáadjuk az oszloplistához
        }
    });

    // Megnézzük, hány sorunk van
    let maxRows = columnData.reduce((max, row) => Math.max(max, row.length), 0);

    // Függőleges formázás (soronként egy adat)
    let transposedData = [];
    for (let i = 0; i < maxRows; i++) {
        let row = columnData.map(col => col[i] || ""); // Ha nincs adat, üres string legyen
        transposedData.push(row.join(";"));
    }

    let csvText = transposedData.join("\n"); // Sorokat összefűzzük

    // CSV fájl mentése
    let blob = new Blob([csvText], { type: "text/csv" });
    let a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "export.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

}
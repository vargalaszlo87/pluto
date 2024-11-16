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
    }
};

// DEV for lines
let connections = [];

function getRectangleById(rectId) {
    return document.querySelector(`[data-id="${rectId}"]`);
}

function addConnection(parent1Id, parent2Id, childId) {
    const parent1 = getRectangleById(parent1Id);
    const parent2 = getRectangleById(parent2Id);
    const child = getRectangleById(childId);

    if (!parent1 || !parent2 || !child) {
        console.error("One or more rectangles not found for given IDs.");
        return;
    }

    const line1 = createLine(parent1, child);
    const line2 = createLine(parent2, child);

    connections.push({ parent1Id, parent2Id, childId, lines: [line1, line2] });
}

function updateAllLines() {
    connections.forEach(({ parent1Id, parent2Id, childId, lines }) => {
        const parent1 = getRectangleById(parent1Id);
        const parent2 = getRectangleById(parent2Id);
        const child = getRectangleById(childId);

        if (!parent1 || !parent2 || !child) {
            console.error("One or more rectangles not found for given IDs.");
            return;
        }

        updateLine(lines[0], parent1, child);
        updateLine(lines[1], parent2, child);
    });
}

/* ---------------- */

const workSpace = document.getElementById('workSpace');
const workSpaceRect = workSpace.getBoundingClientRect(); // A workSpace mérete és pozíciója

let offsetX = 20; // Kezdő eltolás X irányba
let offsetY = 20; // Kezdő eltolás Y irányba
let isDragging = false;
let draggedElement = null;
let startX, startY;

let selectedRectangles = []; // Kijelölt téglalapok listája
let isButton = false; // workSpace deaktiváló gomb állapota

// Kijelölés törlése
function clearSelection() {
    selectedRectangles.forEach(rect => {
        rect.style.borderBottom = pluto.design.unSelectedRectangleBorder; // Alapértelmezett border visszaállítása
    });
    selectedRectangles = [];
}

// Téglalap létrehozása a kattintás helyén
function createRectangle(generatedID, x, y, type = 'default') {
    const rectangle = document.createElement('div');
    rectangle.classList.add('rectangle');
    rectangle.style.left = `${x + offsetX}px`; // X irányú eltolás
    rectangle.style.top = `${y + offsetY}px`; // Y irányú eltolás
    //rectangle.textContent = (inputDataCounter + 1) + ". pack";

    if (type == 'default') {
        rectangle.innerHTML = '<h5>' + (pluto.inputData.counter + 1) + '. adatsor</h5>' + '<img src="img/icon-numerical.png" draggable="false"  style="width: 4vw; margin: 0 auto; display: block; margin-bottom: 0.25rem; cursor: pointer;" />  <h6>numerikus</h6>';
    }
    if (type == 'const') {
        let fontSize = 4 * (1 - (0.08 * pluto.inputData.constant.toString().length));
        rectangle.innerHTML = '<h5>Konstans</h5>' + '  <span id="constNumberInRectangle" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: ' + fontSize + 'vw">' + pluto.inputData.constant + '</span>';
    }
    if (type == 'calculated') {
        let fontSize = 4 * (1 - (0.08 * pluto.inputData.constant.toString().length));
        rectangle.innerHTML = '<h5>Kalkulált</h5>' + '  <img src="img/icon-calculated.png" draggable="false"  style="width: 4vw; margin: 0 auto; display: block; margin-bottom: 0.25rem; cursor: pointer;" />';
    }

    rectangle.setAttribute('tabindex', '0'); // Fókuszálhatóvá tesszük
    rectangle.setAttribute('data-id', generatedID);

    workSpace.appendChild(rectangle);

    // Törlés gomb létrehozása
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '<i class="fa fa-times fa-1x" style="color: #fff; font-size: 1.25rem"></i>';
    closeButton.setAttribute('data-id', generatedID);
    closeButton.setAttribute('class', 'closeButton');
    rectangle.appendChild(closeButton);

    // Törlés gomb kezelése
    closeButton.addEventListener('click', (event) => {
        event.stopPropagation(); // Megakadályozza, hogy a kattintás a téglalapra is átmenjen

        // delete from vector
        tempID = rectangle.getAttribute("data-id");
        tempIndex = pluto.inputData.ID.indexOf(tempID);
        removeElementFromArray(pluto.inputData.ID, tempIndex);
        removeElementFromArray(pluto.inputData.all, tempIndex);
        removeElementFromArray(pluto.inputData.type, tempIndex);

        // delete from workspace
        rectangle.remove();
        pluto.inputData.counter--;
        selectedRectangles = selectedRectangles.filter(rect => rect !== rectangle); // Törlés a kijelölt listából
    });

    if (type == 'default' || type == 'calculated') {
        // Raw adat gomb létrehozása
        const rawButton = document.createElement('button');
        rawButton.innerHTML = '<i class="fa fa-search fa-1x" style="color: #fff; font-size: 1.25rem"></i>';
        rawButton.setAttribute('data-id', generatedID);
        rawButton.setAttribute('id', 'rawTeszt');
        rawButton.setAttribute('class', 'rawButton');
        rawButton.classList.add('open-floatbox');
        rectangle.appendChild(rawButton);

        rawButton.addEventListener('click', (event) => {
            event.stopPropagation();
            const dataID = event.currentTarget.getAttribute('data-id') || 'N/A';
            const data = show.rawData(event, dataID);
            floatBox.open(event, data);
        });

        // Play gomb létrehozása
        const playButton = document.createElement('button');
        playButton.innerHTML = '<i class="fa fa-play fa-1x" style="color: #fff; font-size: 1.25rem; padding-top: 4px;"></i>';
        playButton.setAttribute('play-data-id', generatedID);
        playButton.setAttribute('id', 'playTeszt')
        playButton.setAttribute('class', 'playButton');
        playButton.classList.add('open-floatbox');
        rectangle.appendChild(playButton);

        playButton.addEventListener('click', (event) => {
            event.stopPropagation();
            const dataID = event.currentTarget.getAttribute('play-data-id') || 'N/A';
            const data = play.descriptive(event, dataID);
            console.log(data);
            floatBox.open(event, data, sizer.width - 100);
            play.descriptiveJS();
        });
    }

    // Téglalap kijelölése
    rectangle.addEventListener('click', (event) => {
        event.stopPropagation(); // Megakadályozzuk, hogy a workSpacera átmenjen a kattintás
        if (event.ctrlKey) {
            // Ctrl lenyomása esetén többszörös kijelölés
            if (selectedRectangles.includes(rectangle)) {
                rectangle.style.borderBottom = pluto.design.unSelectedRectangleBorder; // Visszaállítjuk az alapértelmezett border-t
                selectedRectangles = selectedRectangles.filter(rect => rect !== rectangle);
            } else {
                rectangle.style.borderBottom = pluto.design.selectedRectangleBorder; // Kijelöléskor vastagabb és kék border
                selectedRectangles.push(rectangle);
            }
        } else {
            // Ctrl nélkül csak egy téglalap kijelölése
            clearSelection(); // Előző kijelölések törlése
            rectangle.style.borderBottom = pluto.design.selectedRectangleBorder; // Kijelöléskor vastagabb és kék border
            selectedRectangles.push(rectangle);
        }
        rectangle.style.backgroundColor = "#fff";
        console.log("rectangle click");
    });

    // Drag and drop események
    rectangle.addEventListener('mousedown', (event) => {
        if (event.target.tagName === 'BUTTON' || event.target.closest('button')) {
            return; // Ha gombot kattintottak, ne indítsd el a drag műveletet
        }
        isDragging = true;
        draggedElement = rectangle;
        startX = event.clientX - rectangle.offsetLeft;
        startY = event.clientY - rectangle.offsetTop;
        rectangle.focus();
        document.getElementById(sizer.workSpaceCanvasId).style.background = pluto.design.selectedWorkspace;
        rectangle.background = "#fff";
        event.preventDefault();
    });

    // Növeljük az eltolást a következő téglalaphoz
    offsetX += 75;
    offsetY += 75;

    // Ha az eltolás túl nagy lesz, visszaállítjuk
    if (offsetX > workSpaceRect.width - 50) offsetX = 20;
    if (offsetY > workSpaceRect.height - 50) offsetY = 20;
}

// Drag funkció
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

// Drag végén leállítjuk a drag eseményt
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


function generateID() {
    let randomPart = Math.random().toString(36).substring(2, 6);
    let utcPart = Date.now().toString(36).substring(6);
    return (randomPart + utcPart).substring(0, 8);
}

function removeElementFromArray(array, index) {
    if (index !== -1) {
        array.splice(index, 1);
        return true;
    } else
        return false;
}

// Paste funkció
function paste(event) {
    const pastedData = (event.clipboardData || window.clipboardData).getData('text');
    if (pastedData.length > pluto.inputData.maxSize) {
        alert('10kb-os limit túllépve');
        return;
    }

    // new vector
    let temp = pastedData.trim().split(/[\t\n; ]+/);
    let vector = temp.map(Number);
    pluto.inputData.all.push(vector);

    // ID
    let tempID = generateID();
    pluto.inputData.ID.push(tempID);

    // type
    pluto.inputData.type.push('default');

    // create rectangle
    createRectangle(tempID, 50, 50);
    pluto.inputData.counter++;

}

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
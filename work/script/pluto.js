/*
 * PLUTO v.0.1 
 *
 */

const pluto = {
    design: {
        unSelectedRectangleBorder: '2px dashed #bb8fce',
        selectedRectangleBorder: '2px solid #8a21c5'
    }
};

const workSpace = document.getElementById('workSpace');
const workSpaceRect = workSpace.getBoundingClientRect(); // A workSpace mérete és pozíciója

let offsetX = 20; // Kezdő eltolás X irányba
let offsetY = 20; // Kezdő eltolás Y irányba
let isDragging = false;
let draggedElement = null;
let startX, startY;

// datas
const inputData = {
    counter: 0,
    maxSize: 10 * 1024, // max 10kb,
    // vectors
    all: [],
    ID: [],
};


let selectedRectangles = []; // Kijelölt téglalapok listája
let isButton = false; // workSpace deaktiváló gomb állapota

// Kijelölés törlése
function clearSelection() {
    selectedRectangles.forEach(rect => {
        rect.style.border = pluto.design.unSelectedRectangleBorder; // Alapértelmezett border visszaállítása
    });
    selectedRectangles = [];
}

// Téglalap létrehozása a kattintás helyén
function createRectangle(generatedID, x, y) {
    const rectangle = document.createElement('div');
    rectangle.classList.add('rectangle');
    rectangle.style.left = `${x + offsetX}px`; // X irányú eltolás
    rectangle.style.top = `${y + offsetY}px`; // Y irányú eltolás
    //rectangle.textContent = (inputDataCounter + 1) + ". pack";
    rectangle.innerHTML = '<h5>' + (inputData.counter + 1) + '. adatsor</h5>' + '<i class="fa fa-bar-chart fa-3x" style="margin: 0.75rem 1.6rem 0.1rem 1.6rem;"></i>  <h6>numerikus</h6>';
    rectangle.setAttribute('tabindex', '0'); // Fókuszálhatóvá tesszük
    rectangle.setAttribute('data-id', generatedID);

    workSpace.appendChild(rectangle);

    // Törlés gomb létrehozása
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '<i class="fa fa-trash-o fa-1x" style="color: #fff; font-size: 1.25rem"></i>';
    closeButton.setAttribute('data-id', generatedID);
    closeButton.setAttribute('class', 'closeButton');
    rectangle.appendChild(closeButton);

    // Törlés gomb kezelése
    closeButton.addEventListener('click', (event) => {
        event.stopPropagation(); // Megakadályozza, hogy a kattintás a téglalapra is átmenjen

        // delete from vector
        tempID = rectangle.getAttribute("data-id");
        tempIndex = inputData.ID.indexOf(tempID);
        removeElementFromArray(inputData.ID, tempIndex);
        removeElementFromArray(inputData.all, tempIndex);

        // delete from workspace
        rectangle.remove();
        inputData.counter--;
        selectedRectangles = selectedRectangles.filter(rect => rect !== rectangle); // Törlés a kijelölt listából
    });

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
        show.rawData(event, "teszt");
        const data = '<i>teszt...</i>';
        floatBox.open(event, data);
    });

    // Play gomb létrehozása
    const playButton = document.createElement('button');
    playButton.innerHTML = '<i class="fa fa-play fa-1x" style="color: #fff; font-size: 1.25rem; padding-top: 4px;"></i>';
    playButton.setAttribute('data-id', generatedID);
    playButton.setAttribute('id', 'playTeszt')
    playButton.setAttribute('class', 'playButton');
    rectangle.appendChild(playButton);

    playButton.addEventListener('click', (event) => {
        event.stopPropagation();
        console.log("play click");
    });

    // Téglalap kijelölése
    rectangle.addEventListener('click', (event) => {
        event.stopPropagation(); // Megakadályozzuk, hogy a workSpacera átmenjen a kattintás
        if (event.ctrlKey) {
            // Ctrl lenyomása esetén többszörös kijelölés
            if (selectedRectangles.includes(rectangle)) {
                rectangle.style.border = pluto.design.unSelectedRectangleBorder; // Visszaállítjuk az alapértelmezett border-t
                selectedRectangles = selectedRectangles.filter(rect => rect !== rectangle);
            } else {
                rectangle.style.border = pluto.design.selectedRectangleBorder; // Kijelöléskor vastagabb és kék border
                selectedRectangles.push(rectangle);
            }
        } else {
            // Ctrl nélkül csak egy téglalap kijelölése
            clearSelection(); // Előző kijelölések törlése
            rectangle.style.border = pluto.design.selectedRectangleBorder; // Kijelöléskor vastagabb és kék border
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
        document.getElementById(sizer.workSpaceCanvasId).style.background = "#ffdcd5";
        rectangle.background = "#fff";
    });

    // Növeljük az eltolást a következő téglalaphoz
    offsetX += 30;
    offsetY += 30;

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
    if (pastedData.length > inputData.maxSize) {
        alert('10kb-os limit túllépve');
        return;
    }

    // new vector
    let temp = pastedData.trim().split(/[\t\n; ]+/);
    let vector = temp.map(Number);
    inputData.all.push(vector);

    // ID
    let tempID = generateID();
    inputData.ID.push(tempID);

    // create rectangle
    createRectangle(tempID, 50, 50);
    inputData.counter++;

}

// Vágólap tartalom kezelése
workSpace.addEventListener('paste', paste);

// Focus kezelés
workSpace.addEventListener("focusin", (event) => {
    workSpace.addEventListener("paste", paste, false);
    workSpace.style.background = "#ffdcd5";

    // workSpace inaktiváló „X” gomb hozzáadása
    if (!isButton) {
        const deactivateButton = document.createElement('button');
        deactivateButton.setAttribute("id", "deactivateButton");
        deactivateButton.textContent = 'X';
        deactivateButton.style.width = sizer.workSpaceCanvasDeactivateButtonSize + "px";
        deactivateButton.style.height = sizer.workSpaceCanvasDeactivateButtonSize + "px";

        // position
        deactivateButton.style.left = document.getElementById(sizer.workSpaceDivId).offsetWidth - sizer.workSpaceCanvasDeactivateButtonSize - sizer.workSpaceCanvasPadding + 'px';
        deactivateButton.style.top = sizer.navHeight + sizer.workSpaceCanvasPadding + "px";

        document.body.appendChild(deactivateButton);

        // Inaktiválás eseménykezelője
        deactivateButton.addEventListener('click', () => {
            deactivateButton.remove(); // Gomb eltávolítása
            workSpace.removeEventListener('paste', paste); // Paste funkció eltávolítása
            workSpace.style.background = "white"; // workSpace háttér visszaállítása
            isButton = false;
        });

        isButton = true;
    }
});
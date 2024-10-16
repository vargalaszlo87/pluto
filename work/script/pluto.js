/*
 * PLUTO v.0.1 
 *
 */

const pluto = {
    design: {
        unSelectedRectangleBorder: '1px solid #333',
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
let inputDataCounter = 0;
let maxClipboardSize = 10 * 1024; // max 10kb
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
function createRectangle(text, x, y) {
    const rectangle = document.createElement('div');
    rectangle.classList.add('rectangle');
    rectangle.style.left = `${x + offsetX}px`; // X irányú eltolás
    rectangle.style.top = `${y + offsetY}px`; // Y irányú eltolás
    //rectangle.textContent = (inputDataCounter + 1) + ". pack";
    rectangle.innerHTML = '<i class="fa fa-list fa-3x" style="margin: 1.6rem;"></i>';
    rectangle.setAttribute('tabindex', '0'); // Fókuszálhatóvá tesszük

    workSpace.appendChild(rectangle);

    // Létrehozunk egy „X” gombot a törléshez
    const closeButton = document.createElement('button');
    //closeButton.textContent = 'X';
    closeButton.innerHTML = '<i class="fa fa-trash-o fa-1x" style="color: #fff; font-size: 1.25rem"></i>';
    closeButton.style.width = '35px';
    closeButton.style.height = '35px';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '0';
    closeButton.style.right = '-40px';
    closeButton.style.background = '#c0392b';
    closeButton.style.color = 'white';
    closeButton.style.border = 'none';
    closeButton.style.cursor = 'pointer';

    rectangle.appendChild(closeButton);

    // Törlés gomb kezelése
    closeButton.addEventListener('click', (event) => {
        event.stopPropagation(); // Megakadályozza, hogy a kattintás a téglalapra is átmenjen
        rectangle.remove();
        inputDataCounter--;
        selectedRectangles = selectedRectangles.filter(rect => rect !== rectangle); // Törlés a kijelölt listából
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
		rectangle.style.backgroundColor = "white";
    });

    // Drag and drop események
    rectangle.addEventListener('mousedown', (event) => {
        isDragging = true;
        draggedElement = rectangle;
        startX = event.clientX - rectangle.offsetLeft;
        startY = event.clientY - rectangle.offsetTop;
        rectangle.focus();
        document.getElementById(sizer.workSpaceCanvasId).style.background = "#ffdcd5";
        event.target.style.background = "#ffffff";
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
    clearSelection(); // Kijelölések törlése, ha az üres területre kattintanak
});

// Paste funkció
function paste(event) {
    const pastedData = (event.clipboardData || window.clipboardData).getData('text');
    if (pastedData.length > maxClipboardSize) {
        alert('10kb-os limit túllépve');
        return;
    }
    createRectangle(pastedData, 50, 50);
    inputDataCounter++;
}

// Vágólap tartalom kezelése
workSpace.addEventListener('paste', paste);

// Focus kezelés
workSpace.addEventListener("focusin", (event) => {
    workSpace.addEventListener("paste", paste, false);
    event.target.style.background = "#ffdcd5";

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
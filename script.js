/*
 * PLUTO v.0.1 
 *
*/

const canvas = document.getElementById('canvas');
const canvasRect = canvas.getBoundingClientRect(); // A canvas mérete és pozíciója

let offsetX = 20; // Kezdő eltolás X irányba
let offsetY = 20; // Kezdő eltolás Y irányba
let isDragging = false;
let draggedElement = null;
let startX, startY;
let inputDataCounter = 0;
let maxClipboardSize = 10 * 1024;	// max 10kb
let selectedRectangles = []; // Kijelölt téglalapok listája
let isButton = false; // Canvas deaktiváló gomb állapota

// Kijelölés törlése
function clearSelection() {
    selectedRectangles.forEach(rect => {
        rect.style.border = '2px solid black'; // Alapértelmezett border visszaállítása
    });
    selectedRectangles = [];
}

// Téglalap létrehozása a kattintás helyén
function createRectangle(text, x, y) {
    const rectangle = document.createElement('div');
    rectangle.classList.add('rectangle');
    rectangle.style.width = '75px';
    rectangle.style.height = '75px';
    rectangle.style.left = `${x + offsetX}px`; // X irányú eltolás
    rectangle.style.top = `${y + offsetY}px`;  // Y irányú eltolás
    rectangle.textContent = (inputDataCounter + 1) + ". pack";
    rectangle.style.border = '2px solid black'; // Alapértelmezett border
    rectangle.style.backgroundColor = '#ffffff';
    rectangle.setAttribute('tabindex', '0'); // Fókuszálhatóvá tesszük

    canvas.appendChild(rectangle);
		
    // Létrehozunk egy „X” gombot a törléshez
    const closeButton = document.createElement('button');
    closeButton.textContent = 'X';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '0';
    closeButton.style.right = '0';
    closeButton.style.background = 'red';
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
        event.stopPropagation(); // Megakadályozzuk, hogy a canvasra átmenjen a kattintás
        if (event.ctrlKey) {
            // Ctrl lenyomása esetén többszörös kijelölés
            if (selectedRectangles.includes(rectangle)) {
                rectangle.style.border = '2px solid black'; // Visszaállítjuk az alapértelmezett border-t
                selectedRectangles = selectedRectangles.filter(rect => rect !== rectangle);
            } else {
                rectangle.style.border = '4px solid blue'; // Kijelöléskor vastagabb és kék border
                selectedRectangles.push(rectangle);
            }
        } else {
            // Ctrl nélkül csak egy téglalap kijelölése
            clearSelection(); // Előző kijelölések törlése
            rectangle.style.border = '4px solid blue'; // Kijelöléskor vastagabb és kék border
            selectedRectangles.push(rectangle);
        }
    });

    // Drag and drop események
    rectangle.addEventListener('mousedown', (event) => {
        isDragging = true;
        draggedElement = rectangle;
        startX = event.clientX - rectangle.offsetLeft;
        startY = event.clientY - rectangle.offsetTop;
        rectangle.focus();
    });

    // Növeljük az eltolást a következő téglalaphoz
    offsetX += 30;
    offsetY += 30;

    // Ha az eltolás túl nagy lesz, visszaállítjuk
    if (offsetX > canvasRect.width - 50) offsetX = 20;
    if (offsetY > canvasRect.height - 50) offsetY = 20;
}

// Drag funkció
document.addEventListener('mousemove', (event) => {
    if (isDragging && draggedElement) {
        let newLeft = event.clientX - startX;
        let newTop = event.clientY - startY;

        // Ellenőrizd, hogy a téglalap ne kerüljön ki a canvasból
        if (newLeft < 0) newLeft = 0;
        if (newTop < 0) newTop = 0;
        if (newLeft + draggedElement.offsetWidth > canvas.offsetWidth) {
            newLeft = canvas.offsetWidth - draggedElement.offsetWidth;
        }
        if (newTop + draggedElement.offsetHeight > canvas.offsetHeight) {
            newTop = canvas.offsetHeight - draggedElement.offsetHeight;
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

// Canvas üres területére kattintás kezelése
canvas.addEventListener('click', (event) => {
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
canvas.addEventListener('paste', paste);

// Focus kezelés
canvas.addEventListener("focusin", (event) => {
    canvas.addEventListener("paste", paste, false);
    event.target.style.background = "pink";

    // Canvas inaktiváló „X” gomb hozzáadása
    if (!isButton) {
        const deactivateButton = document.createElement('button');
        deactivateButton.textContent = 'X';
        deactivateButton.style.position = 'absolute';
        deactivateButton.style.top = '10px';
        deactivateButton.style.right = '10px';
        document.body.appendChild(deactivateButton);

        // Inaktiválás eseménykezelője
        deactivateButton.addEventListener('click', () => {
            deactivateButton.remove(); // Gomb eltávolítása
            canvas.removeEventListener('paste', paste); // Paste funkció eltávolítása
            canvas.style.background = "white"; // Canvas háttér visszaállítása
            isButton = false;
        });

        isButton = true;
    }
});

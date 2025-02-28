/*
 * PLUTO v.0.1 
 * add / delete rectangle
 */


// Téglalap létrehozása a kattintás helyén


function createRectangle(generatedID, x, y, type = 'default', connection) {
    const rectangle = document.createElement('div');
    rectangle.classList.add('rectangle');
    rectangle.style.left = `${x + offsetX}px`; // X irányú eltolás
    rectangle.style.top = `${y + offsetY}px`; // Y irányú eltolás

    // four type of rectangle
    if (type == 'default') {
        // search ID
        const tempIndex = pluto.inputData.ID.indexOf(generatedID);
        rectangle.innerHTML =
            '<h5 class="title">' + pluto.inputData.name[tempIndex] + '</h5>' +
            '<img src="img/icon-numerical.png" draggable="false"  />' +
            '<h6>numerikus</h6>';
    }

    if (type == 'const') {
        let fontSize = 4 * (1 - (0.08 * pluto.inputData.constant.toString().length));
        rectangle.innerHTML =
            '<h5 class="title">Konstans</h5>' +
            '<span class="constNumber" style="font-size: ' + fontSize + 'vw">' + pluto.inputData.constant + '</span>';
    }

    if (type == 'calculated') {
        // search the parents
        const parents = findParentsByChildId(connection, generatedID);
        parent1Name = pluto.inputData.name[pluto.inputData.ID.indexOf(parents[0])];
        parent2Name = pluto.inputData.name[pluto.inputData.ID.indexOf(parents[1])];

        // make the icons
        let iconTagType = pluto.event.lastMathToolButtonId.replace("math-", "");
        iconTagType = (iconTagType != "divide") ? iconTagType : "minus rotate45";

        rectangle.innerHTML =
            '<h5 class="title">Kalkuláció - ' + pluto.calculation.counter + '</h5>' +
            '<h5 class="data">' + (parents.length > 2 ? parents.length + " adatsorral" : parent1Name) + '</h5>' +
            '<i class="fa fa-4x fa-' + iconTagType + '"></i>' +
            '<h5 class="data">' + (parents.length > 2 ? "" : parent2Name) + '</h5>';
    }

    if (type == 'preprocessing') {
        // search the parent
        const parent = findParentsByChildId(connection, generatedID);
        parent1Name = pluto.inputData.name[pluto.inputData.ID.indexOf(parent[0])];

        rectangle.innerHTML =
            '<h5 class="title">' + pluto.event.lastMathToolButtonId + '</h5>' +
            '<h5 class="data">' + (parent.length > 2 ? parent.length + " adatsorral" : parent1Name) + '</h5>' +
            '<img src="img/icon-process-color.png" draggable="false"  />';
    }

    if (type == 'imputation') {
        // search the parent
        const parent = findParentsByChildId(connection, generatedID);
        parent1Name = pluto.inputData.name[pluto.inputData.ID.indexOf(parent[0])];

        rectangle.innerHTML =
            '<h5 class="title">' + pluto.event.lastMathToolButtonId + '</h5>' +
            '<h5 class="data">' + (parent.length > 2 ? parent.length + " adatsorral" : parent1Name) + '</h5>' +
            '<img src="img/icon-data-imputation-color.png" draggable="false"  />';
    }

    if (type == 'feature') {
        // search the parent
        const parent = findParentsByChildId(connection, generatedID);
        parent1Name = pluto.inputData.name[pluto.inputData.ID.indexOf(parent[0])];

        rectangle.innerHTML =
            '<h5 class="title">' + pluto.event.lastMathToolButtonId + '</h5>' +
            '<h5 class="data">' + (parent.length > 2 ? parent.length + " adatsorral" : parent1Name) + '</h5>' +
            '<img src="img/icon-feature-engineering-color.png" draggable="false"  />';
    }

    if (type == 'function') {
        // search ID
        const tempIndex = pluto.inputData.ID.indexOf(generatedID);
        rectangle.innerHTML =
            '<h5 class="title">Függvény</h5>' +
            '<img src="img/icon-function.png" draggable="false" />' +
            '<h6>' + pluto.inputData.name[tempIndex] + '</h6>';
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

        // hide context-menu if it exists
        contextMenu = document.getElementById("context-menu");
        if (contextMenu.style.display != "none") {
            contextMenu.style.display = "none";
        }

        event.stopPropagation(); // Megakadályozza, hogy a kattintás a téglalapra is átmenjen

        // delete from vector
        tempID = rectangle.getAttribute("data-id");
        tempIndex = pluto.inputData.ID.indexOf(tempID);
        removeElementFromArray(pluto.inputData.ID, tempIndex);
        removeElementFromArray(pluto.inputData.all, tempIndex);
        removeElementFromArray(pluto.inputData.type, tempIndex);
        removeElementFromArray(pluto.inputData.name, tempIndex);

        // delete from workspace
        rectangle.remove();
        pluto.inputData.counter--;
        selectedRectangles = selectedRectangles.filter(rect => rect !== rectangle); // Törlés a kijelölt listából

        // delete line
        deleteContactLines(tempID);

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
        playButton.innerHTML = '<i class="fa fa-play fa-1x" style="color: #fff; font-size: 1.25rem;"></i>';
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

// csoportos kijelölés

let isSelecting = false;
let selectionBox;
selectedRectangles = [];

document.addEventListener("mousedown", (event) => {
    if (event.button !== 0) return; // Csak bal egérgombnál működjön

    // Ha nem a workspace-re kattintottunk, ne induljon el a kijelölés
    if (!workSpace.contains(event.target)) return;

    // Ha egy téglalapra kattintottunk, ne kezdjük el a kijelölést
    if (event.target.classList.contains("rectangle") || event.target.closest(".rectangle")) {
        return;
    }

    // Ellenőrizzük, hogy nem egy gombra kattintottunk-e
    if (event.target.closest("button")) return;

    // Kijelölő négyzet létrehozása, ha még nincs
    if (!selectionBox) {
        selectionBox = document.createElement("div");
        selectionBox.id = "selectionBox";
        document.body.appendChild(selectionBox);
    }

    isSelecting = true;
    startX = event.clientX;
    startY = event.clientY;

    selectionBox.style.left = `${startX}px`;
    selectionBox.style.top = `${startY}px`;
    selectionBox.style.width = "0px";
    selectionBox.style.height = "0px";
    selectionBox.style.display = "block";
});


document.addEventListener("mousemove", (event) => {
    if (!isSelecting) return;

    let elem = document.querySelector("#workSpace");
    let rect = elem.getBoundingClientRect();

    let minX = rect.x;
    let maxX = rect.width;
    let minY = rect.y;
    let maxY = rect.height;

    let currentX = event.clientX < minX ? minX + 5 : (event.clientX > maxX) ? maxX : event.clientX;
    let currentY = event.clientY < minY ? minY + 5 : (event.clientY > maxY) ? maxY : event.clientY;

    //    let currentY = event.clientY;

    let width = Math.abs(currentX - startX);
    let height = Math.abs(currentY - startY);
    let left = Math.min(startX, currentX);
    let top = Math.min(startY, currentY);

    selectionBox.style.left = `${left}px`;
    selectionBox.style.top = `${top}px`;
    selectionBox.style.width = `${width}px`;
    selectionBox.style.height = `${height}px`;

    selectRectangles(left, top, width, height);
});



document.addEventListener("mouseup", () => {
    if (!isSelecting) return;

    isSelecting = false;
    selectionBox.style.display = "none"; // Elrejtjük a kijelölő négyzetet
});

function selectRectangles(left, top, width, height) {
    const selectionRect = { left, top, right: left + width, bottom: top + height };

    selectedRectangles = [];
    document.querySelectorAll(".rectangle").forEach(rect => {
        const rectBox = rect.getBoundingClientRect();

        if (
            rectBox.right > selectionRect.left &&
            rectBox.left < selectionRect.right &&
            rectBox.bottom > selectionRect.top &&
            rectBox.top < selectionRect.bottom
        ) {
            rect.style.borderBottom = pluto.design.selectedRectangleBorder; // Kijelölés vizuálisan
            selectedRectangles.push(rect);
        } else {
            rect.style.borderBottom = pluto.design.unSelectedRectangleBorder; // Alapértelmezett border
        }
    });

    console.log("Kijelölt téglalapok száma:", selectedRectangles.length);
}
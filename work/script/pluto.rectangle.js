/*
 * PLUTO v.0.1 
 * add / delete rectangle
 */


// Téglalap létrehozása a kattintás helyén


function createRectangle(generatedID, x, y, type = 'default') {
    const rectangle = document.createElement('div');
    rectangle.classList.add('rectangle');
    rectangle.style.left = `${x + offsetX}px`; // X irányú eltolás
    rectangle.style.top = `${y + offsetY}px`; // Y irányú eltolás
    //rectangle.textContent = (inputDataCounter + 1) + ". pack";

    if (type == 'default') {
        const tempIndex = pluto.inputData.ID.indexOf(generatedID);
        rectangle.innerHTML = '<h5>' + pluto.inputData.name[tempIndex] + '</h5>' + '<img src="img/icon-numerical.png" draggable="false"  style="width: 4vw; margin: 0 auto; display: block; margin-bottom: 0.25rem; cursor: pointer;" />  <h6>numerikus</h6>';
    }
    if (type == 'const') {
        let fontSize = 4 * (1 - (0.08 * pluto.inputData.constant.toString().length));
        rectangle.innerHTML = '<h5>Konstans</h5>' + '  <span id="constNumberInRectangle" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: ' + fontSize + 'vw">' + pluto.inputData.constant + '</span>';
    }
    if (type == 'calculated') {
        // search the parents
        const parents = findParentsByChildId(pluto.network.connections, generatedID);
        parent1Name = pluto.inputData.name[parents.parent1Id];
        parent2Name = pluto.inputData.name[parents.parent2Id];

        console.log(parent1Name, parent2Name);

        let fontSize = 4 * (1 - (0.08 * pluto.inputData.constant.toString().length));
        rectangle.innerHTML = '<h5>Kalkulált</h5>' + '  <img src="img/icon-calculated.png" draggable="false"  style="width: 4vw; margin: 0 auto; display: block; margin-bottom: 0.25rem; cursor: pointer;" />';
    }
    if (type == 'function') {
        let fontSize = 4 * (1 - (0.08 * pluto.inputData.constant.toString().length));
        rectangle.innerHTML = '<h5>Függvény</h5>' + '  <img src="img/icon-function.png" draggable="false"  style="width: 4vw; margin: 0 auto; display: block; margin-bottom: 0.25rem; cursor: pointer;" />';
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
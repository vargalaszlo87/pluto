function getRectangleById(rectId) {
    return document.querySelector(`[data-id="${rectId}"]`);
}

function createLine(parent, child) {
    // Új div elem létrehozása a vonal számára
    const line = document.createElement('div');
    line.classList.add('line');
    workSpace.appendChild(line);

    // Inicializáljuk a vonal pozícióját és szögét
    updateLine(line, parent, child);

    return line;
}

function updateLine(line, parent, child) {
    const parentRect = parent.getBoundingClientRect();
    const childRect = child.getBoundingClientRect();
    const workSpaceRect = workSpace.getBoundingClientRect();

    // Kiindulási és célpont koordináták kiszámítása
    const startX = parentRect.left + parentRect.width / 2 - workSpaceRect.left;
    const startY = parentRect.top + parentRect.height / 2 - workSpaceRect.top;
    const endX = childRect.left + childRect.width / 2 - workSpaceRect.left;
    const endY = childRect.top + childRect.height / 2 - workSpaceRect.top;

    // Távolság és szög számítása
    const deltaX = endX - startX;
    const deltaY = endY - startY;
    const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const angle = Math.atan2(deltaY, deltaX);

    // Vonal pozíciójának és stílusának frissítése
    line.style.width = `${length}px`;
    line.style.left = `${startX}px`;
    line.style.top = `${startY}px`;
    line.style.transform = `rotate(${angle}rad)`;
}

function addConnection(parentIds, childId) {
    const child = getRectangleById(childId);
    if (!child) {
        console.error("Child rectangle not found for given ID:", childId);
        return;
    }

    const lines = [];

    parentIds.forEach(parentId => {
        const parent = getRectangleById(parentId);
        if (!parent) {
            console.error("Parent rectangle not found for given ID:", parentId);
            return;
        }

        const line = createLine(parent, child);
        lines.push(line);
    });

    // Kapcsolat hozzáadása a hálózathoz
    pluto.network.connections.push({ parentIds, childId, lines });
}

function updateAllLines() {
    pluto.network.connections.forEach(({ parentIds, childId, lines }) => {
        const child = getRectangleById(childId);
        if (!child) {
            console.error("Child rectangle not found for given ID:", childId);
            return;
        }

        parentIds.forEach((parentId, index) => {
            const parent = getRectangleById(parentId);
            if (!parent) {
                console.error("Parent rectangle not found for given ID:", parentId);
                return;
            }

            updateLine(lines[index], parent, child);
        });
    });
}

function deleteContactLines(rectId) {
    // Kapcsolatok szűrése
    pluto.network.connections = pluto.network.connections.filter(connection => {
        // Ha a kapcsolatban szerepel az adott ID, töröljük a vonalakat
        if (connection.parentIds.includes(rectId) || connection.childId === rectId) {
            connection.lines.forEach(line => line.remove());
            return false; // Kapcsolat eltávolítása
        }
        return true; // Megtartjuk a kapcsolatot
    });
}
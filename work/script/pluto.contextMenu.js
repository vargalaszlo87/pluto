document.addEventListener("DOMContentLoaded", () => {
    const rectangleContainer = document.getElementById("workSpace");
    const contextMenu = document.getElementById("context-menu");
    const renameInput = document.getElementById("rename-input");
    const renameButton = document.getElementById("rename-btn");

    let currentRectangle = null;
    let currentRectangleID = null;

    // Eseménydelegáció a rectangle-containerre
    rectangleContainer.addEventListener("contextmenu", (event) => {
        const rectangle = event.target.closest(".rectangle"); // Legközelebbi rectangle megtalálása
        // if the rectangle doesn't exists, than exit
        if (!rectangle)
            return;

        const tempID = rectangle.getAttribute("data-id");
        const tempIndex = pluto.inputData.ID.indexOf(tempID);
        const tempType = pluto.inputData.type[tempIndex];

        // if not in a network
        // DEV ------------------------------------------------------------------------------------------
        const checkInNetwork = findParentsByChildId(pluto.network.connections, tempID);
        console.log(pluto.network.connections);
        if (checkInNetwork)
            return;
        // DEV ------------------------------------------------------------------------------------------

        if (rectangle && tempType == "default") {
            event.preventDefault(); // Alapértelmezett jobb klikk menü tiltása
            currentRectangle = rectangle;

            // Megjelenítjük a context menüt a kurzor pozícióján
            contextMenu.style.top = `${event.clientY}px`;
            contextMenu.style.left = `${event.clientX}px`;
            contextMenu.style.display = "block";

            // Az aktuális név betöltése az input mezőbe
            currentRectangleID = currentRectangle.getAttribute("data-id");
            const tempIndex = pluto.inputData.ID.indexOf(currentRectangleID);
            renameInput.value = pluto.inputData.name[tempIndex];

            //const title = currentRectangle.querySelector(".rect-title") ? currentRectangle.querySelector(".rect-title").textContent : "";
            //renameInput.value = title;
        }
    });

    // Módosítás gomb esemény
    renameButton.addEventListener("click", () => {
        currentRectangleID = currentRectangle.getAttribute("data-id");
        const newName = renameInput.value.trim();

        if (newName.length < 1) {
            alert('Nem lehet rövidebb mint 1 karakter.');
            return;
        }

        // save new name
        const tempIndex = pluto.inputData.ID.indexOf(currentRectangleID);
        pluto.inputData.name[tempIndex] = newName;
        renameInput.value = newName;

        // refresh rectange name
        const tagName = currentRectangle.querySelector('h5');
        tagName.textContent = newName;

        // Bezárjuk a context menüt
        contextMenu.style.display = "none";
        currentRectangle = null;

        // destroy all
        currentRectangleID = null;
        currentRectangle = null;
    });

    // Ha a felhasználó máshova kattint, a menü eltűnik
    document.addEventListener("click", (event) => {
        if (!contextMenu.contains(event.target)) {
            contextMenu.style.display = "none";
            currentRectangle = null;
        }
    });


});
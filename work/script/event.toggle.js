    // Az összes toggle-menu osztályú link eseménykezelése
    document.querySelectorAll(".toggle-menu").forEach(function(toggleLink) {
        toggleLink.addEventListener("click", function(event) {

            event.preventDefault(); // Megakadályozza a link alapértelmezett működését
            const menuId = this.dataset.menuId; // Azonosító kinyerése

            const menu = document.getElementById(menuId); // A megfelelő menü kiválasztása
            if (menu.style.display === "none" || menu.style.display === "") {
                menu.style.display = "block"; // Menü megjelenítése
            } else {
                menu.style.display = "none"; // Menü elrejtése
            }
        });
    });
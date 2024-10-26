// button
const button = document.getElementById("intelligent-correlation");

// obj
const collreation = {



}

// event
button.addEventListener('click', (event) => {
    selectedRectangles.forEach(rect => {
        let temp = rect.getAttribute("data-id");
        console.log(temp);
    })
})

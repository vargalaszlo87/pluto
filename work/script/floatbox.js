// obj
const floatBox = {
    main: document.getElementById('floatbox'),
    content: document.getElementById('floatbox-content'),
    overlay: document.getElementById('overlay'),
    close: document.getElementById('close-floatbox'),
    open: (event, data, size = 800) => {
        const button = event.target.closest('.open-floatbox');
        if (button) {
            //const dataId = event.currentTarget.getAttribute('data-id') || 'N/A';
            //floatBox.content.textContent = `Data ID: ${dataId}`;
            floatBox.content.innerHTML = data;
            floatBox.main.style.display = 'block';
            floatBox.overlay.style.display = 'block';
            floatBox.main.style.width = size + 'px';
            console.log(sizer.width);
        } 
        
    }
}

// events
floatBox.close.addEventListener('click', () => {
    floatBox.main.style.display = 'none';
    floatBox.overlay.style.display = 'none';
});

floatBox.overlay.addEventListener('click', () => {
    floatBox.main.style.display = 'none';
    floatBox.overlay.style.display = 'none';
});
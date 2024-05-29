let dragged;
let newX = 0, newY = 0, startX = 0, startY = 0;

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    dragged = event.target;
}

function drop(event) {
    event.preventDefault();
    if (dragged.className.includes('tool')) {
        createContainer(event.clientX, event.clientY);
    }
}

function createContainer(x, y) {
    const canvas = document.getElementById('canvas');
    const container = document.createElement('div');
    container.className = 'container';
    container.style.left = `${x - 75}px`; // Ajuste para centrar el contenedor en el punto de soltar
    container.style.top = `${y - 50}px`;  // Ajuste para centrar el contenedor en el punto de soltar
    container.draggable = false; // Desactivar el comportamiento de arrastrar por defecto

    const input = document.createElement('input');
    input.type = 'text';
    input.value = 'Clase';
    container.appendChild(input);

    container.addEventListener('dblclick', () => {
        input.focus();
    });

    container.addEventListener('mousedown', mouseDown);

    canvas.appendChild(container);
}

function mouseDown(e) {
    startX = e.clientX;
    startY = e.clientY;

    dragged = e.target.closest('.container'); // Obtener el contenedor que está siendo arrastrado

    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
}

function mouseMove(e) {
    newX = startX - e.clientX;
    newY = startY - e.clientY;

    startX = e.clientX;
    startY = e.clientY;

    if (dragged) {
        dragged.style.top = (dragged.offsetTop - newY) + 'px';
        dragged.style.left = (dragged.offsetLeft - newX) + 'px';
    }
}

function mouseUp(e) {
    document.removeEventListener('mousemove', mouseMove);
    document.removeEventListener('mouseup', mouseUp);
}

document.addEventListener("dragover", function(event) {
    event.preventDefault();
});

document.addEventListener("drop", function(event) {
    event.preventDefault();
    if (event.target.id === "canvas") {
        dragged.style.left = `${event.clientX - 75}px`;
        dragged.style.top = `${event.clientY - 50}px`;
    }
});

const initCanvas = (id) => {
    return new fabric.Canvas(id, {
        width: 500, 
        height: 500,
    });
}

const setBackground = (url, canvas) => {
    fabric.Image.fromURL(url, (img) => {
    canvas.backgroundImage = img
    canvas.renderAll()
}) 

}

const togglePan= () => {
    if(currentMode === modes.pan) {
        currentMode = ""
    } else {
        currentMode = modes.pan
    }

}

const canvas = initCanvas("canvas");
let mousePressed = false;

let currentMode;

const modes = {
    pan:"pan"
}


setBackground('https://i.pinimg.com/564x/aa/85/fe/aa85fedb590860fdeff1731fbb52ddb0.jpg', canvas);

// mouse:over
canvas.on('mouse:move', (event) => {
    // console.log(event)
    if (mousePressed && currentMode === modes.pan) {
        canvas.setCursor('grab')
        canvas.renderAll()
        const mEvent = event.e;
        const delta = new fabric.Point(mEvent.movementX,mEvent.movementY)
        canvas.relativePan(delta)
    } 
}) 

// mouse:down
canvas.on("mouse:down", (event) => {
    mousePressed = true;
    if (currentMode === modes.pan) {
        canvas.setCursor('grab')
        canvas.renderAll()
    }
    
})

// mouse:up
canvas.on("mouse:up", (event) => {
    mousePressed = false
    canvas.setCursor('default')
    canvas.renderAll()
})


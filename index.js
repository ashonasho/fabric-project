
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

const toggleMode= (mode) => {

    if(mode === modes.pan) {
        if(currentMode === modes.pan) {
            currentMode = ""
        } else {
            currentMode = modes.pan
            canvas.isDrawingMode = false
            canvas.renderAll()
        }
    } else if (mode === modes.drawing) {
        if(currentMode === modes.drawing) {
            currentMode = ""
            canvas.isDrawingMode = true
            canvas.renderAll()

        } else { 
            currentMode = modes.drawing
            canvas.freeDrawingBrush.color =
            color
            canvas.isDrawingMode = true
            canvas.renderAll()
        }    
    }
    console.log(mode)

}

const setPanEvents = (canvas) => {
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


}

const setColorListener = () => {
    const picker = document.getElementById
    ("colorPicker")
    picker.addEventListener("change", (event)=> {
    console.log(event.target.value)
    color = event.target.value
    canvas.freeDrawingBrush.color = color
    canvas.renderAll()

    })

}

const clearCanvas = (canvas) => {
    canvas.getObjects().forEach((o) => {
       if(o !== canvas.backgroundImage) {
        canvas.remove(o)
       }  
    })

}

const createRect = (canvas) => {
    console.log("rect")
    const canvCenter = canvas.getCenter()
    const rect = new fabric.Rect({
        width: 100,
        height:100,
        fill: "pink",
        left: canvCenter.left,
        top: canvCenter.top,
        originX: "center",
        originY: "center"
    })
    canvas.add(rect)
    canvas.renderAll()
}

const createCirc = (canvas) => {
    console.log("circ")
    const canvCenter =canvas.getCenter()
    const circle = new fabric.Circle({
        
    })

}

const canvas = initCanvas("canvas");
let mousePressed = true;
let color ="1000000"
let currentMode;

const modes = {
    pan:"pan"
}


setBackground('https://i.pinimg.com/564x/aa/85/fe/aa85fedb590860fdeff1731fbb52ddb0.jpg', canvas);

setPanEvents(canvas)

setColorListener()
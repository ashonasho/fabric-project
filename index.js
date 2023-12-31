


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



const saveCurrentState = () => {
    currentStateIndex++;
    savedStates = savedStates.slice(0, currentStateIndex);
    savedStates.push(JSON.stringify(canvas.toJSON()));
}



// Modify existing functions to save state
const clearCanvas = (canvas) => {
    saveCurrentState();
    canvas.getObjects().forEach((o) => {
        if (o !== canvas.backgroundImage) {
            canvas.remove(o);
        }
    });
}
const restoreCanvas = () => {
    if (currentStateIndex <= 0) {
        console.log("No more states to restore.");
        return;
    }

    // currentStateIndex--;
    canvas.loadFromJSON(savedStates[currentStateIndex], () => {
        canvas.renderAll();
        console.log("Canvas restored to a previous state.");
    });
}

// Add this in the functions where you modify the canvas, like createRect, createCirc, etc.


// On load, save the initial state


const createRect = (canvas) => {
    console.log("rect")
    const canvCenter = canvas.getCenter()
    const rect = new fabric.Rect({
        width: 100,
        height:100,
        fill: "pink",
        left: canvCenter.left,
        top: -50,
        originX: "center",
        originY: "center",
        cornerColor: "white",
        objectCaching: false
    })
    canvas.add(rect)
    canvas.renderAll();
    rect.animate("top", canvCenter.top,{
        onChange:canvas.renderAll.bind(canvas)
    });
    rect.on("selected", () => {
       rect.set("fill", "white") 
       canvas.renderAll()
    })
    rect.on("deselected", () => {
        rect.set("fill","green")
        canvas.renderAll()
    })
    

}


const createCirc = (canvas) => {
    console.log("circ")
    const canvCenter = canvas.getCenter()
    const circle = new fabric.Circle({
        radius: 50,
        fill: "orange",
        left: canvCenter.left,
        top: - 50,
        originX: "center",
        originY: "center",
        cornerColor: "white",
        objectCaching: false
    })
    canvas.add(circle)
    canvas.renderAll()
     circle.animate("top", canvas.height - 50, {
        onChange:canvas.renderAll.bind(canvas),
        onComplete: () => {
            circle.animate("top", canvCenter.top - 50, {
                onChange:canvas.renderAll.bind(canvas),
                easing: fabric.util.ease.easeOutBounce,
                duration: 2500
            })
        }
    });
    circle.on("selected", () => {
        circle.set("fill", "white")
        canvas.requestRenderAll()
     })
    circle.on("deselected", () => {
         circle.set("fill", "orange")
         canvas.requestRenderAll()
     })
     
}

const groupObjects = (canvas, group, shouldGroup) => {
    if(shouldGroup){
        const objects = canvas.getObjects()
        group.val = new fabric.Group(objects, {cornerColor: "white"})
        clearCanvas(canvas)
        canvas.add(group.val)
        canvas.requestRenderAll()
    } else {
        group.val.destroy()
        const oldGroup = group.val.getObjects()
        canvas.remove(group.val)
        canvas.add(...oldGroup)
        group.val = null
        canvas.requestRenderAll()
    }
}

const imgAdded = (e) => {
    console.log(e)
    const inputElem = document.getElementById("myImg")
    const file = inputElem.files[0];
    reader.readAsDataURL(file)
}

const canvas = initCanvas("canvas");
let mousePressed = true;
let color ="1000000"
let group = {};
let savedStates = [];
let currentStateIndex = -1;
let currentMode;

const modes = {
    pan:"pan"
}



setBackground('https://i.pinimg.com/564x/aa/85/fe/aa85fedb590860fdeff1731fbb52ddb0.jpg', canvas);


setPanEvents(canvas)



setColorListener()
window.onload = () => {
    saveCurrentState();
};

const reader = new FileReader()

const inputFile = document.getElementById("myImg")
inputFile.addEventListener("change", imgAdded)

reader.addEventListener("load", () => {
    fabric.Image.fromURL(reader.result, img => {
        canvas.add(img)
        canvas.requestRenderAll()
    })
})

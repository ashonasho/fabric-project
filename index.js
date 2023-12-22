

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

const canvas = initCanvas("canvas");

setBackground('https://i.pinimg.com/564x/aa/85/fe/aa85fedb590860fdeff1731fbb52ddb0.jpg', canvas);

// mouse:over
canvas.on('mouse:over', (e) => {
    console.log(e)

})
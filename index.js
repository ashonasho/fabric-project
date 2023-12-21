

console.log("I am in index.js")
const canvas = new fabric.Canvas("canvas",{
    width: 500,
    height: 500
});
canvas.renderAll();

fabric.Image.fromURL("https://i.pinimg.com/564x/aa/85/fe/aa85fedb590860fdeff1731fbb52ddb0.jpg",(img) => {
    canvas.backgroundImage = img
    canvas.renderAll()
}) 

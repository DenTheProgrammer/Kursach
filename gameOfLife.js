//game info object
let GameInfo={
   gameIsRunning:false,
   fieldSize:{
      x:7,
      y:7
   },
    cellSize:"20px",
    aliveCellsCount:0,

};


const field= document.querySelector(".field");
//field creation
function renderField(x,y) {

   for(let i=0;i<y;i++){
       let rowOfCells=document.createElement("div");
       rowOfCells.className="field__row";
       for (let j=0;j<x;j++){
           let cell=document.createElement("div");
           cell.className="field__cell";
           cell.id=`x${j}y${i}`;//id with cords
            rowOfCells.appendChild(cell);
       }
       field.appendChild(rowOfCells);
   }

}

//

field.addEventListener("click",(e)=>{
    let target = e.target;
    if(target.classList.contains("field__cell")){
        target.classList.toggle("field__cell_alive");
    }
});


function nextStep(){
    let aliveCells=document.querySelectorAll(".field__cell_alive");//returns NodeList
    // console.log(aliveCells);
    for(let i=0;i<aliveCells.length;i++){
        // console.log(aliveCells[i].getAttribute("id"));
        getSiblings(aliveCells[i]);
    }
}


function getSiblings(cell){
    const cellCordX=parseInt(cell.getAttribute("id")[1]),
        cellCordY=parseInt(cell.getAttribute("id")[3]);
    let cellSiblings=[document.getElementById(`x${cellCordX}y${cellCordY-1}`),
        document.getElementById(`x${cellCordX+1}y${cellCordY-1}`),
        document.getElementById(`x${cellCordX+1}y${cellCordY}`),
        document.getElementById(`x${cellCordX+1}y${cellCordY+1}`),
        document.getElementById(`x${cellCordX}y${cellCordY+1}`),
        document.getElementById(`x${cellCordX-1}y${cellCordY+1}`),
        document.getElementById(`x${cellCordX-1}y${cellCordY}`),
        document.getElementById(`x${cellCordX-1}y${cellCordY-1}`)];
        //TODO do not run filter for all elements
        cellSiblings=cellSiblings.filter((elem)=>elem!==null);

    return cellSiblings;
}
renderField(GameInfo.fieldSize.x,GameInfo.fieldSize.y);


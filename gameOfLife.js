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
           cell.setAttribute("data-cordX",j+"");
           cell.setAttribute("data-cordY",i+"");
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
    console.log(aliveCells);
    for(let i=0;i<aliveCells.length;i++){
        console.log(aliveCells[i].getAttribute("data-cordX"));
    }
}
renderField(GameInfo.fieldSize.x,GameInfo.fieldSize.y);
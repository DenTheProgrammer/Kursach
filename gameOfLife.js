//game info object
let GameInfo={
   gameIsRunning:false,
   fieldSize:{
      x:50,
      y:50
   },
    cellSize:20,
    aliveCellsCount:0,

};


const field= document.querySelector(".field");
//field creation
function renderField() {
   for(let i=0;i<GameInfo.fieldSize.y;i++){
       let rowOfCells=document.createElement("div");
       rowOfCells.className="field__row";
       for (let j=0;j<GameInfo.fieldSize.x;j++){
           let cell=document.createElement("div");
           cell.className="field__cell";
           cell.id=`x${j}y${i}`;//id with cords
           cell.style.width=cell.style.height=GameInfo.cellSize+"px";
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


function nextGeneration(){
    let interestingCells=getInterestingCells();
    function getCellById(id){
        return document.getElementById(`x${+(id.match(/(?<=x)\d+/gi))}y${+(id.match(/(?<=y)\d+/gi))}`)
    }

    let nexGen={};
    for(let cellId in interestingCells){
        let currentCell=getCellById(cellId);
        let aliveSiblingCount=getAliveSiblings(currentCell).length;
        if(aliveSiblingCount===3){
            nexGen[cellId]="alive";
        }else if(aliveSiblingCount<2||aliveSiblingCount>3){
            nexGen[cellId]="dead";
        }
        else if(interestingCells[cellId]==="alive"&&aliveSiblingCount===2){
            nexGen[cellId]="alive";
        }

    }
    console.log(nexGen);
    for(let cellId in nexGen){

        if(nexGen[cellId]==="alive"){
            getCellById(cellId).classList.add("field__cell_alive");
        }else if(nexGen[cellId]==="dead"){
            getCellById(cellId).classList.remove("field__cell_alive");
        }
    }
    // return nexGen;
}


function getSiblings(cell){
    const cellCordX=+(cell.getAttribute("id").match(/(?<=x)\d+/gi)),
        cellCordY=+(cell.getAttribute("id").match(/(?<=y)\d+/gi));
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

function getAliveSiblings(cell){
    let siblings=getSiblings(cell),
        aliveSiblings=[];

    for (let i = 0; i < siblings.length; i++){
        if(siblings[i].classList.contains("field__cell_alive")){
            aliveSiblings.push(siblings[i])
        }
    }
    return aliveSiblings;
}

function getInterestingCells(){
    let aliveCells=[...document.querySelectorAll(".field__cell_alive")],//returns NodeList
        aliveCellsSiblings=[];
    for(let i=0;i<aliveCells.length;i++){
        aliveCellsSiblings.push(...getSiblings(aliveCells[i]));
    }

    let interestingCells= aliveCells.concat(aliveCellsSiblings);
    let resultObj={};
    for(let i=0;i<interestingCells.length;i++){

        if(interestingCells[i].classList.contains("field__cell_alive")){
            resultObj[interestingCells[i].getAttribute("id")]="alive";
        }else{
            resultObj[interestingCells[i].getAttribute("id")]="dead";
        }
    }

    return resultObj;
}



renderField();

function autoGenerate(interval) {
    return setInterval(() => {
        nextGeneration()
    }, interval);//for stopping
}

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
    let interestingCells=getInterestingCells();
    for(let i=0;i<interestingCells.length;i++){
        let aliveSiblingCount=getAliveSiblings(interestingCells[i]).length;
        if(aliveSiblingCount===3){
            interestingCells[i].classList.add("field__cell_alive");
        }else if(aliveSiblingCount<2||aliveSiblingCount>3){
            interestingCells[i].classList.remove("field__cell_alive");
        }
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
    for(let i=0;i<interestingCells;i++){
        if(interestingCells[i].classlist.contains("field__cell_alive")){
            resultObj[interestingCells]="alive";
        }else{
            resultObj[interestingCells]="dead";
        }
    }

    return resultObj;
}



renderField(GameInfo.fieldSize.x,GameInfo.fieldSize.y);


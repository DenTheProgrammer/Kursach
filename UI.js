const startBtn=document.querySelector(".interface__start-btn"),
    applySizeBtn=document.querySelector(".interface__apply-size"),
    intervalInput=document.querySelector(".interface__interval"),
    sizeXInput=document.querySelector(".interface__field-size-X"),
    sizeYInput=document.querySelector(".interface__field-size-Y");
let timer; //for Start/Stop


startBtn.addEventListener("click",()=>{
    let label=startBtn.innerText;

    if(label==="Start"){
        timer=autoGenerate(intervalInput.value);
        label="Stop";
    }else if(label==="Stop"){
        clearInterval(timer);
        label="Start";
    }
    startBtn.innerText=label;

});

applySizeBtn.addEventListener("click",()=>{
    GameInfo.fieldSize.x=sizeXInput.value;
    GameInfo.fieldSize.y=sizeYInput.value;
    field.innerHTML="";
    renderField();
});
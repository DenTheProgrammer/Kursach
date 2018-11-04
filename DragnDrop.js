const uiPanel=document.querySelector(".interface");


uiPanel.addEventListener("mousedown",(e)=>{
    let coords = getCoords(uiPanel);
    let shiftX = e.pageX - coords.left;
    const shiftY = e.pageY - coords.top;

    uiPanel.style.position = 'absolute';
    document.body.appendChild(uiPanel);
    moveAt(e);

    uiPanel.style.zIndex = "1000"; // над другими элементами

    function moveAt(e) {
        uiPanel.style.left = e.pageX - shiftX + 'px';
        uiPanel.style.top = e.pageY - shiftY + 'px';
    }

    document.onmousemove = function(e) {
        moveAt(e);
    };

    uiPanel.onmouseup = function() {
        document.onmousemove = null;
        uiPanel.onmouseup = null;
    };

});

uiPanel.ondragstart = function() {
    return false;
};

function getCoords(elem) {   // кроме IE8-
    let box = elem.getBoundingClientRect();
    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };
}
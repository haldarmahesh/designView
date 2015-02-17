var element = null;

function escapeKey(e) {
    if (!document.getElementsByClassName("rectangle")[0])
        console.log("yes")
    else {
        if (e.keyCode == 27) {
            element = null
            canvas.style.cursor = "default";
            document.getElementsByClassName("rectangle")[0].remove()
        }
    }

}

function createHotspot(rect) {
    divNew = document.createElement('div')
    divNew.className = 'hotspot'
    divNew.style.position = "absolute"
    divNew.style.left = rect.style.left
    divNew.style.top = rect.style.top
    console.log(rect.style.top + " this")

    divNew.style.width = rect.style.width
    divNew.style.height = rect.style.height
    canvas.appendChild(divNew)
}

function checkHover(rect) {
    console.log(rect.style.top + " top")
    console.log(rect.style.left + " left")
    console.log(rect.style.width + " width")
    console.log(rect.style.height + " height")

}
window.onload = function() {
        initDraw(document.getElementById('canvas'));

        function initDraw(canvas) {
            function setMousePosition(e) {
                var ev = e || window.event; //Moz || IE
                if (ev.pageX) { //Moz
                    mouse.x = ev.pageX + window.pageXOffset;
                    mouse.y = ev.pageY + window.pageYOffset;
                } else if (ev.clientX) { //IE
                    mouse.x = ev.clientX + document.body.scrollLeft;
                    mouse.y = ev.clientY + document.body.scrollTop;
                }
            };

            var mouse = {
                x: 0,
                y: 0,
                startX: 0,
                startY: 0
            };
            var divNew = null;
            canvas.onmousemove = function(e) {
                setMousePosition();
                if (element !== null) {
                    element.style.width = Math.abs(mouse.x - mouse.startX) + 'px';
                    element.style.height = Math.abs(mouse.y - mouse.startY) + 'px';
                    element.style.left = (mouse.x - mouse.startX < 0) ? mouse.x + 'px' : mouse.startX + 'px';
                    element.style.top = (mouse.y - mouse.startY < 0) ? mouse.y + 'px' : mouse.startY + 'px';
                }
            }

            canvas.onclick = function(e) {
                if (element !== null) {
                    // alert(element)
                    rect = document.getElementsByClassName("rectangle")[0]
                    left = rect.style.left

                    width = rect.style.width
                    height = rect.style.height

                    checkHover(document.getElementsByClassName("rectangle")[0])

                    createHotspot(rect)
                    canvas.removeChild(rect)
                    element = null;
                    canvas.style.cursor = "default";
                    console.log("finsihed.");

                } else {
                    console.log("begun.");
                    mouse.startX = mouse.x;
                    mouse.startY = mouse.y;

                    element = document.createElement('div');
                    element.className = 'rectangle'
                    element.style.left = mouse.x + 'px';
                    element.style.top = mouse.y + 'px';
                    canvas.appendChild(element)
                    canvas.style.cursor = "crosshair";
                    element.setAttribute("onkeydown", "escapeKey()")
                }
            }


        }
    } //]]>

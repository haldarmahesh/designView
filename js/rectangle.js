var element = null;

function wrongHotspot(hotspotLength) {
    // console.log(hotspotLength)
    alert("This is overlapping and is not allowed")
    document.getElementsByClassName("hotspot")[hotspotLength - 1].remove()

}

function escapeKey(e) {
    if (document.getElementsByClassName("rectangle")[0])
    // console.log("yes")
    {
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
        // console.log(rect.style.top + " this")

    divNew.style.width = rect.style.width
    divNew.style.height = rect.style.height
    canvas.appendChild(divNew)
}

function checkHover(rect) {


    var hotspot = document.getElementsByClassName("hotspot")
    if (hotspot.length > 1) {
        var currentElement = hotspot[hotspot.length - 1]
        currentTop = parseInt(currentElement.style.top)
        currentLeft = parseInt(currentElement.style.left)
        currentWidth = parseInt(currentElement.style.width)
        currentHeight = parseInt(currentElement.style.height)

        // console.log(currentElement)
        for (var i = 0; i < hotspot.length - 1; i++) {
            thisTop = parseInt(hotspot[i].style.top)
            thisLeft = parseInt(hotspot[i].style.left)
            thisWidth = parseInt(hotspot[i].style.width)
            thisHeight = parseInt(hotspot[i].style.height)

            if ((currentTop + currentHeight > thisTop) && (currentTop < thisTop + thisHeight) && (currentLeft > thisLeft) && (currentLeft < thisLeft + thisWidth))
            //          726            > 350          &&          376           <   520   &&      254     >  526      && (492         < 1016)
            
            //          506            > 388       &&          124               <   964   &&      492     >  678      && (492         < 1016)

            //          548             > 100       &&          548               <   310                   &&      544     >  130      && (544         < 810)
            {
                wrongHotspot(hotspot.length)
            } else if ((currentTop + currentHeight > thisTop) && (currentTop < thisTop + thisHeight) && (currentLeft + currentWidth > thisLeft) && (currentLeft + currentWidth < thisLeft + thisWidth)) {
            //          506            > 388       &&          124               <   964             &&                    1136     >  526      && (1136         < 942)
              
                wrongHotspot(hotspot.length)
            }
            else if ((currentTop > thisTop) && (currentTop < thisTop + thisHeight) && (currentLeft + currentWidth > thisLeft) && (currentLeft + currentWidth < thisLeft + thisWidth))
             {
            //          506            > 388       &&          124               <   964             &&                    1136     >  526      && (1136         < 942)
              
                wrongHotspot(hotspot.length)
            } 
            else {
                console.log("This is right")
            }
            // else if()
        };
    }

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

                    createHotspot(rect)
                    canvas.removeChild(rect)
                    element = null;
                    canvas.style.cursor = "default";
                    // console.log("finsihed.");
                    checkHover()



                } else {
                    // console.log("begun.");
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

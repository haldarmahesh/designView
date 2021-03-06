function hovering()
    {
        if(document.getElementById('rectangle1'))
        {
            rect = document.getElementById('rectangle1');
            rect.style.border = "transparent";
            alert("hotspots cant overlap")
        }

        
    }

    function nothovering()
    {
        if(document.getElementById('rectangle1'))
        {
            rect = document.getElementById('rectangle1');
            rect.style.border = "1px solid #ff0000"
        }
    }

    function resize(hotspot1)
    {
        hotspot1.style.resize = "both";
    }

    function createHotspot(rect) {
        divNew = document.createElement('div')
        divNew.className = 'hotspot'
        divNew.setAttribute('onmouseover','hovering()')
        divNew.setAttribute('onmouseout', 'nothovering()')
        divNew.setAttribute('onclick', 'resize(this)')
        divNew.style.position = "absolute"
        divNew.style.left = rect.style.left
        divNew.style.top = rect.style.top
        console.log(rect.style.top + " this")
        divNew.style.width = rect.style.width
        divNew.style.height = rect.style.height
        divNew.style.boxShadow = " 0px 0px 10px black"
        divNew.style.border = "2px solid rgba(0, 0, 0, 0.5)"
        canvas.appendChild(divNew)
    }

    function checkHover(mouse)
    {
        console.log(mouse.x)
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
                var element = null;
                var divNew = null;
                canvas.onmousemove = function(e) {
                    setMousePosition();
                    if (element !== null) {
                        checkHover(mouse)
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
                        console.log("finsihed.");
                    } else {
                        console.log("begun.");
                        mouse.startX = mouse.x;
                        mouse.startY = mouse.y;
                        
                        element = document.createElement('div');
                        element.className = 'rectangle'
                        element.setAttribute('id','rectangle1')
                        element.style.left = mouse.x + 'px';
                        element.style.top = mouse.y + 'px';
                        canvas.appendChild(element)
                        canvas.style.cursor = "crosshair";
                    }
                }
            }
        } 
  function setupTools(canvas) {
        initDraw(document.getElementById(canvas));

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
                
                    //left = rect.style.left

                    // width = rect.style.width
                    // height = rect.style.height

                    addHotspot(canvas)
                    canvas.removeChild(rect)
                    element = null;
                    canvas.style.cursor = "default";
                    checkOverlap()



                } else {
                    // console.log("begun.");
                    mouse.startX = mouse.x;
                    mouse.startY = mouse.y;

                    element = document.createElement('div');
                    element.className = 'rectangle'
                    element.setAttribute('id', 'rect')
                    element.style.left = mouse.x + 'px';
                    element.style.top = mouse.y + 'px';
                    canvas.appendChild(element)
                    canvas.style.cursor = "crosshair";
                    element.setAttribute("onkeydown", "escapeKey()")
                }
            }


        }
    } 
 function addHotspot(canvas)
 {
 	divNew = document.createElement('div');
 	divNew.className = "hotspot";
 	divNew.setAttribute('id', 'hotspot'+ hotspotcounter);
 	object = createHotspot()

 	divNew.style.top = object.top;
 	divNew.style.left = object.left;
 	divNew.style.width = object.width;
 	divNew.style.height = object.height;
 	img  = document.createElement('img');
 	img.setAttribute('src', 'images/close.png')
 	img.setAttribute('onclick', "delete("+'hotspot'+hotspotcounter+")")
 	divNew.appendChild(img)


 	canvas.appendChild(divNew);
 	if(checkOverlap())
 		{
 			alert("This is overlapping, not allowed");
 			hotspot = document.getElementsByClassName("hotspot")
 			document.getElementsByClassName("hotspot")[hotspot.length- 1].remove()
 		}
 }

 function deleteHotspot(hotspot)
 {
 	document.remove(hotspot);
 }

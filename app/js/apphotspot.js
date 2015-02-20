var imgcount = 0;
app.hotspot = function() {

    var createHotspot = function() {
        rect = app.dom.getNodeById('rect');
        var hotSpotData = {
            top: parseInt(rect.style.top),
            left: parseInt(rect.style.left),
            width: parseInt(rect.style.width),
            height: parseInt(rect.style.height)
        }
        return hotSpotData;
    };

    var checkOverlap = function(canvas) {
        console.log(canvas.id);
        var hotspot = app.dom.getAllhotspots(canvas);
        var currentElement = hotspot[hotspot.length - 1]
        currentTop = parseInt(currentElement.style.top)
        currentLeft = parseInt(currentElement.style.left)
        currentWidth = parseInt(currentElement.style.width)
        currentHeight = parseInt(currentElement.style.height)
        if (hotspot.length > 1) {

            //console.log('calling checkOverlap')

            for (var i = 0; i < hotspot.length - 1; i++) {
                thisTop = parseInt(hotspot[i].style.top)
                thisLeft = parseInt(hotspot[i].style.left)
                thisWidth = parseInt(hotspot[i].style.width)
                thisHeight = parseInt(hotspot[i].style.height)

                if ((currentTop + currentHeight > thisTop) && (currentTop < thisTop + thisHeight) && (currentLeft > thisLeft) && (currentLeft < thisLeft + thisWidth)) {
                    //console.log('overlapping')
                    return true

                } else if ((currentTop + currentHeight > thisTop) && (currentTop < thisTop + thisHeight) && (currentLeft + currentWidth > thisLeft) && (currentLeft + currentWidth < thisLeft + thisWidth)) {
                    //console.log('overlapping')
                    return true

                } else if ((currentTop > thisTop) && (currentTop < thisTop + thisHeight) && (currentLeft < thisLeft) && (currentLeft + currentWidth > thisLeft + thisWidth)) {
                    //console.log('overlapping')
                    return true

                } else if ((currentTop + currentHeight > thisTop) && (currentTop + currentHeight < thisTop + thisHeight) && (currentLeft < thisLeft) && (currentLeft + currentWidth > thisLeft + thisWidth)) {
                    //console.log('overlapping')
                    return true

                } else if ((currentTop < thisTop) && (currentTop + currentHeight > thisTop + thisHeight) && (currentLeft < thisLeft) && (currentLeft + currentWidth > thisLeft + thisWidth)) {
                   // console.log('overlapping')
                    return true

                } else {
                    //console.log('not overlapping')
                    app.dom.showDropDown(currentTop + 'px', currentLeft + 'px');
                    return false;

                }
            }

        } else {
            //console.log('not overlapping')
            app.dom.showDropDown(currentTop + 'px', currentLeft + 'px');
            return false;
        }

    };


    var dragStart = function(event) {
        event.dataTransfer.setData('text', event.target.id);
    };

    var escapeKey = function(e) {
        if (app.dom.getNodesByClass('rectangle')[0])
        // console.log('yes')
        {
            if (e.keyCode == 27) {
                element = null
                canvas.style.cursor = 'default';
                app.dom.getNodesByClass('rectangle')[0].remove()
            }
        }
    };


    var setTagOnHotspot = function(selected_index) {
        app.dom.hideDropDown();
        alert('selected_index ' + selected_index);
    }

    var createList = function()
    {
        var parent = document.getElementById('dropdown');
        var length = document.getElementById('list').childNodes.length;
        var li_element = document.createElement('li');
        li_element.setAttribute('id','img'+(imgcount+1));
        li_element.setAttribute('onclick', 'app.hotspot.setTagOnHotspot(imgcount)');
        li_element.innerHTML = "image"+(imgcount+1);
        parent.appendChild(li_element);
        imgcount++;
    }

    return {


        setTagOnHotspot: setTagOnHotspot,
        createHotspot: createHotspot,
        checkOverlap: checkOverlap,
        dragStart: dragStart,
        escapeKey: escapeKey,
        createList: createList

  };


}();

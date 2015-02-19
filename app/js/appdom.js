app.dom = function() {

  var addhotspotdom = function(canvas, object) {
    divNew = document.createElement('div');
    divNew.className = "hotspot";
    divNew.setAttribute('id', 'hotspot' + hotspotcounter);
    divNew.setAttribute('draggable', 'true');
    divNew.setAttribute('ondragstart', 'dragStart(this)');
    divNew.style.top = object.top + "px";
    divNew.style.left = object.left + "px";
    divNew.style.width = object.width + "px";
    divNew.style.height = object.height + "px";
    img = document.createElement('img');
    img.setAttribute('src', 'images/close.png')
    img.setAttribute('onclick', "app.dom.deletehotspotdom(" + "'hotspot" + hotspotcounter + "')")
    hotspotcounter++;
    divNew.appendChild(img)


    canvas.appendChild(divNew);

    if (app.hotspot.checkOverlap()) {
      alert("This is overlapping, not allowed");
      hotspot = document.getElementsByClassName("hotspot")
      hotspot[hotspot.length - 1].remove()
    }
  };

  var deletehotspotdom = function(hotspot) {
    element = null
    document.getElementById(hotspot).remove();
    document.getElementById("rect").remove();
  };

  var deleterectangledom = function(canvas, objectID) {
    re = document.getElementById(objectID)
    canvas.removeChild(re);
  };


  var getNodeById = function(objectID) {
    return document.getElementById(objectID);
  };

  var getNodesByClass = function(objectClass)
  {
    return document.getElementsByClassName(objectClass);
  }

  var setRectangle = function(width, height, left, top) {
    var rect = document.getElementById('rect');
    rect.style.width = width;
    rect.style.height = height;
    rect.style.left = left;
    rect.style.top = top;
  };

  var createRectangle = function(canvas, x, y) {
    element = document.createElement('div');
    element.className = 'rectangle'
    element.setAttribute('id', 'rect')
    element.style.left = x + 'px';
    element.style.top = y + 'px';
    canvas.appendChild(element)
   

  };
  return {
    getNodeById: getNodeById,
    addhotspotdom: addhotspotdom,
    setRectangle: setRectangle,
    createRectangle: createRectangle,
    deleterectangledom: deleterectangledom,
    deletehotspotdom: deletehotspotdom,
    getNodesByClass : getNodesByClass
  }

}();
var flag = 0;
var dropZone = document.getElementById('drop_zone');
dropZone.addEventListener('dragover', imageFile.handleDragOver, false);
dropZone.addEventListener('drop', imageFile.handleFileSelect, false);

function addImage(object) {
  if (checkDuplicateImage(object.img_name + "div")) {
    if (confirm("You are about to replace the image, are you sure?? ")) {
      console.log("i will replace the image here");
      deletePic(object.img_name);
    } else {
      return false;
    }
  }

  //Creating previews
  var listTag = document.getElementById('list');

  var defaultButton = document.createElement('input');
  defaultButton.setAttribute('class', "thumbnails");
  defaultButton.setAttribute('type', 'radio');
  defaultButton.setAttribute('name', 'default');
  defaultButton.setAttribute('value', object.img_name);
  var cross = document.createElement('img');
  cross.setAttribute('src', 'images/close.png');
  cross.setAttribute('class', 'cross');
  cross.setAttribute('onclick', "deletePic('" + object.img_name + "')");
  var imgContainer = document.createElement('div');
  imgContainer.setAttribute('class', 'screen-container');
  var image = document.createElement('img');
  image.setAttribute('src', object.url);
  image.setAttribute('title', object.img_name);
  image.setAttribute('id', object.img_name);
  image.setAttribute('class', 'screen');
  image.setAttribute('onclick', "viewImage(this)");
  imgContainer.appendChild(image);
  var titleDiv = document.createElement('span');
  titleDiv.setAttribute('class', 'name');
  var titleText = document.createTextNode(object.img_name);
  titleDiv.appendChild(titleText);

  var div = document.createElement('div');
  div.setAttribute('id', object.img_name + "div");
  div.setAttribute('title', object.img_name);

  div.appendChild(defaultButton);
  div.appendChild(cross);
  div.appendChild(imgContainer);
  div.appendChild(titleDiv);

  listTag.appendChild(div);

  //Creating the actual Image preview
  var preview = document.getElementById('preview');
  var canvas = document.createElement('div');
  canvas.setAttribute('class', 'canvas notuploaded');
  canvas.setAttribute('id', object.img_name + "c");
  canvas.style.width = image.naturalWidth + "px";
  canvas.style.height = image.naturalHeight + "px";
  canvas.style.display = 'none';
  var x = document.getElementById(object.img_name).src;
  canvas.style.backgroundImage = "url('" + x + "')";
  preview.appendChild(canvas);
  app.hotspot.createList(object.img_name);
}

function viewImage(obj) {
  var images = document.getElementsByClassName("thumbnails");

  if (flag == 0) {
    images[0].checked = true;
    flag++;
  }

  var x = document.getElementsByClassName("canvas");
  var i;
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }

  var preview = document.getElementById('preview');
  preview.style.visibility = 'visible';

  var canvas = document.getElementById(obj.title + "c");
  canvas.style.display = 'block';
  x = document.getElementById(obj.title).src;
  canvas.style.backgroundImage = "url('" + x + "')";

  currentCanvas = obj.title + "c";

  var saveButton = document.getElementById('save');
  saveButton.setAttribute('onclick', "imageFile.saveImage()");

  app.rectangle.setupTools(obj.title + "c");
}

function deletePic(obj) {
  document.getElementById(obj + "div").remove();
  document.getElementById(obj + "c").remove();
  document.getElementById(obj + "list").remove()
}

function checkDuplicateImage(divName) {
  var allImages = document.getElementById("list").childNodes
  var flagCheck = 0;
  if (allImages.length > 0) {
    for (var i = allImages.length - 1; i >= 0; i--) {
      if (allImages[i].id == divName) {
        flagCheck = 1;
      }
    }
  }
  if (flagCheck == 1) {
    return true;
  } else {
    return false;
  }
}
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
   var listTag = document.getElementById('list');
   var preview = document.getElementById('preview');
   var image = document.createElement('img');
   var div = document.createElement('div');
   var canvas = document.createElement('div');

   var titleDiv = document.createElement('div');
   var titleText = document.createTextNode(object.img_name);
   titleDiv.appendChild(titleText);
   titleDiv.setAttribute('id', 'link');
   var cross = document.createElement('img');
   var defaultButton = document.createElement('input');
   defaultButton.setAttribute('class', "thumbnails");
   defaultButton.setAttribute('type', 'radio');
   defaultButton.setAttribute('name', 'default');
   defaultButton.setAttribute('value', object.img_name + "default");

   cross.setAttribute('src', 'images/close.png');
   cross.setAttribute('id', 'cross');
   image.setAttribute('src', object.url);
   image.setAttribute('title', object.img_name);
   image.setAttribute('id', object.img_name);
   image.setAttribute('onclick', "viewImage(this)");
   div.setAttribute('id', object.img_name + "div");
    div.setAttribute('title', object.img_name);
   cross.setAttribute('onclick', "deletePic('" + object.img_name + "')");
   canvas.setAttribute('id', object.img_name + "c");

   canvas.setAttribute('class', 'canvas notuploaded');
   canvas.style.width = image.naturalWidth + "px";
   canvas.style.height = image.naturalHeight + "px"

   div.appendChild(defaultButton);
   div.appendChild(cross);
   div.appendChild(image);
   div.appendChild(titleDiv);

   listTag.appendChild(div);
   preview.appendChild(canvas);

   app.hotspot.createList(object.img_name);
 }


 function viewImage(obj) {
   var images = document.getElementsByClassName("thumbnails");
   console.log("In function");
   if (flag == 0) {
     console.log("In if");
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
   currentCanvas = obj.title + "c";
   canvas.style.display = 'block';
   x = document.getElementById(obj.title).src;
   canvas.style.backgroundImage = "url('" + x + "')";
   var saveButton = document.getElementById('save');
   // saveButton.setAttribute('onclick', "saveFile.generateURL('"+x+"' , '"+obj.title+"')") ;
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
     };
   }
   if (flagCheck == 1) {
     return true;
   } else {
     return false;
   }
 }

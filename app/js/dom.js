var dropZone = document.getElementById('drop_zone');
dropZone.addEventListener('dragover', imageFile.handleDragOver, false);
dropZone.addEventListener('drop', imageFile.handleFileSelect, false);
function addImage(object)
{
  var listTag = document.getElementById('list');
  var preview = document.getElementById('preview');
  var image = document.createElement('img');
  var div = document.createElement('div'); 
  var canvas = document.createElement('div');

  var cross = document.createElement('img');
  cross.setAttribute('src', 'images/close.png');
  cross.setAttribute('id', 'cross');
  image.setAttribute('src', object.url);
  image.setAttribute('title', object.img_name);
  image.setAttribute('id', object.img_name);
  image.setAttribute('onclick', "viewImage(this)");
  div.setAttribute('id', object.img_name+"div");
  cross.setAttribute('onclick', "deletePic('"+object.img_name+"')");
  canvas.setAttribute('id', object.img_name+"c"); 
  canvas.setAttribute('class', 'canvas');
  div.appendChild(cross);
  div.appendChild(image);
  listTag.appendChild(div);
  preview.appendChild(canvas);       
}

function viewImage(obj)
{

  var x = document.getElementsByClassName("canvas");
  var i;
  for (i = 0; i < x.length; i++) 
  {
      x[i].style.display = "none";
  }
  var preview = document.getElementById('preview');
  preview.style.visibility='visible';
  var canvas = document.getElementById(obj.title+"c");
  canvas.style.display='block';
  x = document.getElementById(obj.title).src;
  canvas.style.backgroundImage="url('"+x+"')";
  var saveButton = document.getElementById('save');
  // saveButton.setAttribute('onclick', "saveFile.generateURL('"+x+"' , '"+obj.title+"')") ;
  saveButton.setAttribute('onclick', "saveFile.generateURL()") ;

  app.rectangle.setupTools(obj.title+"c");

}

function deletePic(obj)
{
  document.getElementById(obj+"div").remove();
  document.getElementById(obj+"c").remove();
}




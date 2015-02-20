var imageFile = function(){

  

  var handleFileSelect = function(evt){

 var files = evt.target.files; // FileList object
  evt.stopPropagation();
  evt.preventDefault();
  var output = {
    url:'', img_name:''
  };
  var files = evt.dataTransfer.files;
    // Loop through the FileList and render image files as thumbnails.
    if(files.length > 0)
    {
    //  do
    //  {
    //    var x = document.getElementsByTagName("img");
    //    var j;
    //    var counter = 0;
        // for (j = 0; j < x.length; j++) 
        // {
        //  console.log((x[j].title) + " and " + escape(files.name));
        //  if(x[j].title == escape(files.name))
        //  {
      //      alert("You have already added this image");
      //      console.log("heloooooooooooooooo"+(x[j].title));
      //      break;
        //  }
        // }

      

         
        for (var i = 0, f; f = files[i]; i++) 
        {
            if (!f.type.match('image.*')) 
               {
                   continue;
               }
         
          var reader = new FileReader();
        

        reader.onload = (function(files) 
        {

          return function(e) 
          {
            output.url = e.target.result;
            output.img_name = escape(files.name);
            addImage(output);
          };
        })(f);

        
        reader.readAsDataURL(f);
      }
       
  };
}

var handleDragOver = function(evt) {
  evt.stopPropagation();
  evt.preventDefault();
  evt.dataTransfer.dropEffect = 'copy';
}
var saveImage =function(){
 var x = document.getElementsByClassName("canvas");
 var i;
 for (i = 0; i < x.length; i++) 
 {
  if(x[i].classList.contains("notuploaded")){
   x[i].classList.remove("notuploaded");
   x[i].classList.add("uploaded");
   var src = x[i].style.backgroundImage;
   var name = x[i].id;
   name = name.substring(0, name.length - 1);
   saveFile.generateURL(src , name);
 }
 else
  console.log("all files are already saved");
}

}


return {
   handleFileSelect : handleFileSelect,
   handleDragOver : handleDragOver,
   saveImage : saveImage,
   
 }

}();






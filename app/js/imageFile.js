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

 return {
    handleFileSelect : handleFileSelect,
    handleDragOver : handleDragOver,
    
  }


}();






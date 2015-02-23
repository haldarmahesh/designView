var saveFile = function(){

  var generateURL =function(src , title){

   filepicker.setKey("AJyjszryUSGGEsDo5ntvqz");
   console.log("src "+src ); 
   var input = src.split(',')[1];
   var fname = title;
   var ftype = title.split('.')[1];
   var mtype = 'image/'+ftype;
   
   
   // console.log("File inp"+input);

   filepicker.store(
     input,
     {base64decode: true,
      mimetype: mtype,
      filename:  title},
     function(Blob){
       console.log("Store successful:" + JSON.stringify(Blob));
       console.log(Blob.url);
       var canvas = document.getElementById(fname +'c');
       var setURL = document.createElement('p');
       setURL.setAttribute('id', 'url');
       var text = document.createTextNode("abcd");
       setURL.appendChild(text);
       canvas.appendChild(setURL);
       
     },
     function(FPError) {
       console.log(FPError.toString());
     },
     function(progress) {
       console.log("Loading: "+progress+"%");
     }
     );
   enablePreview();
 }

  var generateJSON = function(){
    var list = document.getElementById('list');
    var imageList = list.childNodes;
    var length = imageList.length;
    for(var k =0; k<defaultImage.length; k++)
    {
      if(defaultImage.checked)
      {
        var defaultImageValue = defaultImage[i].value;
        break;
      }
    }
    for (var i = 0;i<length; i++)
    {
      var canvas = document.getElementById(imageList[i].title +'c');
      var allHotspots = canvas.childNodes;
      var url = allHotspots[length-1].innerHTML;
      for (var j=0;j<allHotspots.length-1;j++)
      {
        var top = allHotspots[i].style.top;
        var left = allHotspots[i].style.left;
        var width = allHotspots.style.width;
        var height = allHotspots.style.height;
        var id = allHotspots[i].id;
        var link = allHotspots[i].childNodes[1].innerHTML;
      }
    }
  }

  var enablePreview = function(){
    var preview = document.getElementById('previewButton');
    preview.style.display = 'block';
}

  return {
    generateURL : generateURL,
    generateJSON : generateJSON,
    enablePreview : enablePreview
    
    
  }



}();



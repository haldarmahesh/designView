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

        return Blob.url;
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
    for (var i = 0;i<length; i++)
    {
      var allHotspots = imageList[i].childNodes;
      for (var j=0;j<allHotspots;j++)
      {
        top = allHotspots[i].style.top;
        left = allHotspots[i].style.left;
        width = allHotspots.style.width;
        height = allHotspots.style.height;
        id = allHotspots[i].id;
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



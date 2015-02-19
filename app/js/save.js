var saveFile = function(){

  var generateURL =function(src , title){

    filepicker.setKey("AJyjszryUSGGEsDo5ntvqz");
    console.log("src "+src ); 
    var input = src.split(',')[1];
    var fname = title;
    var ftype = title.split('.')[1];
    var mtype = 'image/'+ftype;
    
    
    console.log("File inp"+input);

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
  }

  return {
    generateURL : generateURL,
    
    
  }



}();



var imageFile = function () {

  var handleFileSelect = function (evt) {

    var files = evt.target.files; // FileList object
    evt.stopPropagation();
    evt.preventDefault();
    var output = {
      url: '',
      img_name: ''
    };
    var files = evt.dataTransfer.files;
    // Loop through the FileList and render image files as thumbnails.
    if (files.length > 0) {
      for (var i = 0, f; f = files[i]; i++) {
        if (!f.type.match('image.*')) {
          continue;
        }

        var reader = new FileReader();
        reader.onload = (function (files) {

          return function (e) {
            output.url = e.target.result;
            output.img_name = escape(files.name.split('.')[0]);
            console.log(output.img_name);
            app.previewdom.addImage(output);
          };
        })(f);


        reader.readAsDataURL(f);
      }
    }
  };

  var handleDragOver = function (evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy';

  };

  var saveImage = function () {
    app.dom.uploadingStatus();
    var x = document.getElementsByClassName("canvas");
    var i;

    saveFile.noOfUrl = x.length;
    for (i = 0; i < x.length; i++) {
      if (x[i].classList.contains("notuploaded")) {

        var src = x[i].style.backgroundImage;
        var name = x[i].id;
        name = name.substring(0, name.length - 1);
        saveFile.generateURL(src, name);
        x[i].classList.remove("notuploaded");
        x[i].classList.add("uploaded");
      } else {
        saveFile.doneUrl++;
        console.log(" file  already saved");
        if (saveFile.doneUrl == saveFile.noOfUrl) {
          saveFile.doneUrl = 0;
          JSONModule.generateJSON();
          app.mongodb.insert(JSONModule.getJSON());
          console.log("JSON CREATED and PUSHED");
          var prebutton = document.getElementsByClassName('prebutton');
         prebutton[0].style.display = 'inline-block';
         console.log("set");
        }
      }
    }
    var previewButton = document.getElementById('previewButton');
    previewButton.href = "http://sohamkamani.github.io/web_display_app/dist/index.html"+"?pr="+app.dom.projectName;
    previewButton.setAttribute('target','_blank');
  };

  return {
    handleFileSelect: handleFileSelect,
    handleDragOver: handleDragOver,
    saveImage: saveImage
  };

}();
  

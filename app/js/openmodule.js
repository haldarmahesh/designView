app.open = function() {



    //jsonstring is stringified json
    var parseJson = function(jsonstring) {

        var JsonObject = JSON.parse(jsonstring);
        var imagesArray = _.map(JsonObject.images, function(img) {
            return img;
        });


        var i = 0;
        for (i = 0; i < imagesArray.length; ++i) {

            var imagedata = {
                filepickerurl: '',
                img_name: '',
                id: '',
                height: '',
                width: '',
                hotspots: []
            };

            imagedata.filepickerurl = imagesArray[i].filepickerurl;
            imagedata.img_name = imagesArray[i].filename;
            imagedata.id = imagesArray[i].id;
            imagedata.height = imagesArray[i].dimensions.height;
            imagedata.width = imagesArray[i].dimensions.width;

            if (i == 0) {
                currentCanvas = imagedata.img_name + 'c';
            }


            //All Imagedata loaded 
            //console.log(imagedata);
            var output = {
                url: '',
                img_name: ''
            };
            output.url = imagedata.filepickerurl;
            output.img_name = imagedata.id;
            app.previewdom.addImage(output);



            //Fix for notuploaded issue
            var allCanvases = document.getElementsByClassName('canvas');
            for (k = 0; k < allCanvases.length; k++) {
                allCanvases[k].classList.remove("notuploaded");
                allCanvases[k].classList.add("uploaded");

            }


            var hotspotArray = _.map(imagesArray[i].hotspots, function(hps) {
                return hps;
            });


            var j = 0;
            for (j = 0; j < hotspotArray.length; ++j) {

                var hotspotdata = {
                    id: '',
                    top: '',
                    left: '',
                    width: '',
                    height: '',
                    link: ''
                };

                hotspotdata.id = hotspotArray[j].id;
                hotspotdata.top = hotspotArray[j].t * imagedata.height / 100.0;
                hotspotdata.left = hotspotArray[j].l * imagedata.width / 100.0;
                hotspotdata.width = hotspotArray[j].w * imagedata.width / 100.0;
                hotspotdata.height = hotspotArray[j].h * imagedata.height / 100.0;
                hotspotdata.link = hotspotArray[j].link;

                imagedata.hotspots.push(hotspotdata);
                //To setup all hotspots now

                var hotSpotInsertData = {
                    top: hotspotdata.top,
                    left: hotspotdata.left,
                    width: hotspotdata.width,
                    height: hotspotdata.height
                };
                var canvas = document.getElementById(output.img_name + 'c');
                app.dom.hotspotcounter = hotspotdata.id;
                var hotspotid = app.dom.addhotspotdom(canvas, hotSpotInsertData);
                var hotspotcurrent = document.getElementById(hotspotid);

                var linkp = document.createElement('p');
                var linktext = document.createTextNode(hotspotdata.link);
                linkp.appendChild(linktext);
                hotspotcurrent.appendChild(linkp);

            }




        }

        
        var defaultImage = JsonObject.default;
        var thumbnails = document.getElementsByClassName('thumbnails');
        var m = 0;
        for (m = 0; m < thumbnails.length; ++m) {
            if (thumbnails[m].type == 'radio' && thumbnails[m].value == defaultImage) {
                thumbnails[m].checked = true;
                console.log("checked");
            }
        }



    }
    return {
        parseJson: parseJson
    }

}();

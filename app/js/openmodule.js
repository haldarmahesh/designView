app.open = function() {




    var parseJson = function() {

        var JsonObject = JSON.parse('{"images":{"sample1":{"filename":"sample1","id":"sample1","filepickerurl":"https://www.filepicker.io/api/file/FrHohRRrOlLjjDKAr3Yw","dimensions":{"height":552,"width":1024},"hotspots":{"hotspot0":{"id":"hotspot0","t":30.434782608695652,"l":68.1640625,"w":29.39453125,"h":65.76086956521739,"link":"sample3"},"hotspot1":{"id":"hotspot1","t":0.7246376811594203,"l":27.734375,"w":9.66796875,"h":8.876811594202898,"link":"sample3"},"hotspot2":{"id":"hotspot2","t":1.0869565217391304,"l":38.18359375,"w":8.49609375,"h":8.514492753623188,"link":"sample2"}}},"sample2":{"filename":"sample2","id":"sample2","filepickerurl":"https://www.filepicker.io/api/file/wpv8ZyGTjexaZ4bPdS6h","dimensions":{"height":552,"width":1024},"hotspots":{"hotspot3":{"id":"hotspot3","t":11.77536231884058,"l":57.421875,"w":27.83203125,"h":5.978260869565218,"link":"sample3"},"hotspot4":{"id":"hotspot4","t":32.06521739130435,"l":4.1015625,"w":31.34765625,"h":27.355072463768117,"link":"sample1"}}},"sample3":{"filename":"sample3","id":"sample3","filepickerurl":"https://www.filepicker.io/api/file/xdG0gw4fQsSF1xttX8MZ","dimensions":{"height":552,"width":1024},"hotspots":{"hotspot5":{"id":"hotspot5","t":43.29710144927536,"l":60.546875,"w":30.078125,"h":40.76086956521739,"link":"sample2"},"hotspot6":{"id":"hotspot6","t":15.76086956521739,"l":3.80859375,"w":38.8671875,"h":63.94927536231884,"link":"sample1"}}}},"default":"sample1"}');
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

        //default left
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

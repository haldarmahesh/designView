

var _writeHotspot = function(hotspotArray, id, t, l, w, h, link) {
    var hotspotdata = {
        "id": id,
        "t": t,
        "l": l,
        "w": w,
        "h": h,
        "link": link
    };
    hotspotArray[id] = hotspotdata
}
var _writeDimensions = function(height, width) {
    var dimensions = {
        "height": height,
        "width": width
    };
    return dimensions;
}
var _writeImage = function(imageArray, filename, id, filepickerurl, dimensions, hotspotArray) {

    var allHotspots = {};
    allHotspots = hotspotArray;
    var imagefile = {
        "filename": filename,
        "id": imgid,
        "filepickerurl": filepickerurl,
        "dimensions": dimensions,
        "hotspots": allHotspots
    };
    imageArray[id] = imagefile;
}

var generateJSON = function() {

        var JSONObj = new Object();
        var imageArray = {};

        var list = document.getElementById('list');
        var imageList = list.childNodes;
        var length = imageList.length;
        for (var i = 0; i < length; i++) {
            var canvas = document.getElementById(imageList[i].title + 'c');
            var allHotspots = canvas.childNodes;
            var url = allHotspots[length - 1].innerHTML;
            
            var dimension = _writeDimensions(height, width);
            var hotspotlist = {};

            for (var j = 0; j < allHotspots.length - 1; j++) {
                var top = allHotspots[i].style.top;
                var left = allHotspots[i].style.left;
                var width = allHotspots.style.width;
                var height = allHotspots.style.height;
                var id = allHotspots[i].id;
                var link = allHotspots[i].childNodes[1].innerHTML;

                _writeHotspot(hotspotlist, id, top, left, width, height,link);
            }

            _writeImage(imageArray,filename,imgid,filepickerurl,dimension,hotspotlist);
        }

        JSONObj["images"] = imageArray;
        JSONObj["default"] = "img1";


    }
    //Hotspot data1
// var hpid = "hp1";
// var t = 10;
// var l = 20;
// var w = 40;
// var h = 50;
// var link = "img2";
// //Hotspot data2
// var hpid2 = "hp2";
// var t2 = 20;
// var l2 = 40;
// var w2 = 50;
// var h2 = 60;
// var link2 = "img1";

//image data
var filename = "img1";
var imgid = "img1";
var filepickerurl = "../dummy_data/img1.png";
//dimension data
var height = 1514;
var width = 1514;


// var hotspotlist = {};
// writeHotspot(hotspotlist, hpid, t, l, w, h);
// writeHotspot(hotspotlist, hpid2, t2, l2, w2, h2);
//writeImage(imageArray, filename, imgid, filepickerurl, dimension, hotspotArray)

var defaultimg = JSONObj["default"];
alert(JSONObj["images"][imgid]["hotspots"]["hp2"].h);

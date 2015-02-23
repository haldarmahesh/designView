

var JSONObj = new Object();
var imageArray = {};

var writeHotspot = function(hotspotArray,id,t,l,w,h,link)
{

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


var writeDimensions = function(height,width){
  var dimensions = {
    "height": height,
    "width" : width
  }; 
  return dimensions; 
}



var writeImage = function(imageArray,filename,id,filepickerurl,dimensions,hotspotArray){
  
  var allHotspots = {};
  allHotspots = hotspotArray;

  var imagefile={
  "filename":filename,
  "id":imgid,
  "filepickerurl":filepickerurl,
  "dimensions":dimensions,
  "hotspots":allHotspots
};

imageArray[id] = imagefile;

}


//Hotspot data1
var hpid="hp1";
var t=10;
var l=20;
var w=40;
var h=50;
var link="img2";
//Hotspot data2
var hpid2="hp2";
var t2=20;
var l2=40;
var w2=50;
var h2=60;
var link2="img1";


//image data
var filename = "img1";
var imgid = "img1";
var filepickerurl = "../dummy_data/img1.png";
//dimension data
var height =1514;
var width = 1514;




var hotspotlist = {};
writeHotspot(hotspotlist,hpid,t,l,w,h);
writeHotspot(hotspotlist,hpid2,t2,l2,w2,h2);



var dimension= writeDimensions(height,width);
writeImage(imageArray,filename,imgid,filepickerurl,dimension,hotspotArray)



JSONObj["images"] = imageArray;
JSONObj["default"] = "img1";


var defaultimg = JSONObj["default"];
alert(JSONObj["images"][imgid]["hotspots"]["hp2"].h);


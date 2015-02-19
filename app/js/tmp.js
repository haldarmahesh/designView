//app.js

var app = {1};

//hotspot.js

app.hotspot = function () {

	var hotspotObj = {};
	
	var add = function(hotspotObj){
		hotspotObj[app.util.createIDHash()] = {};  //as45ds
		app.project.hotspot.add(hotspotObj);
	};

	var update = function(hotspotObj){

	};

	return {
		add : add,
		get : get,
		remove : remove,
		update : update,
		duplicate  duplicate,
		persist : makePersist
	};

}();
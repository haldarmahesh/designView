app.mongodb = (function() {
  'use strict';

  function promise(requestType, url, data) {
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open(requestType, url, true);
      if (requestType === 'get' || requestType === 'POST' || requestType =='PUT') {
        xhr.responseType = 'json';
        xhr.setRequestHeader('content-type', 'application/json');
      }

      xhr.onload = function() {

        var status = xhr.status;
        if (status === 200) {
          resolve(xhr.response);
        } else {
          reject(status);
        }
      };
      if (requestType === 'get') {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  }

  function getDatabase() {
    return 'hotspots';
  }

  function getCollection() {
    return 'hotspot_details';
  }

  function getApiKey() {
    return 'V5I7Vu0FFEfKWmcURoXs4LbGRW_INYAf';
  }


  function makeNewInsertFetchJson(data) {
    var database = getDatabase();
    var collections = getCollection();
    var key = getApiKey();
    var url = 'https://api.mongolab.com/api/1/databases/' + database + '/collections/' + collections + '?apiKey=' + key;
    return url;
  }

  function makeInsertFetchJson(data) {
    var database = getDatabase();
    var collections = getCollection();
    var key = getApiKey();
    var url = 'https://api.mongolab.com/api/1/databases/' + database + '/collections/' + collections +'/'+'?q={"name":"'+data.name+'"}'+ '&apiKey=' + key;
    return url;
  }

  function makeFetchAllJson() {
    var database = getDatabase();
    var collections = getCollection();
    var key = getApiKey();
    var url = 'https://api.mongolab.com/api/1/databases/' + database + '/collections/' + collections +'/'+ '?apiKey=' + key;
    return url;
  }

  var insert = function(data) {

      var url = makeInsertFetchJson(data);
      promise("PUT", url, JSON.stringify(data)).then(function(response) {
      console.log('Successful !!');
      app.dom.uploadStatus();
    }, function(status) {
      console.log('Unsuccessful!! Error status: ' + status);
    });


  };

  var insertNew = function(data) {

      var url = makeNewInsertFetchJson(data);
      promise("POST", url, JSON.stringify(data)).then(function(response) {
      console.log('Successful !!');
      app.dom.newProjectStatus();
    }, function(status) {
      console.log('Unsuccessful!! Error status: ' + status);
    });


  };

  var fetch = function(data) {
    var url = makeInsertFetchJson(data);
    promise('get', url, null).then(function(response) {
      console.log('Successfully fetched !!');
      app.dom.checkJsonObject(response,data);
    }, function(status) {
      console.log('Unsuccessful!! Error status: ' + status);
    });

  };

  var fetchAll = function()
  {
    var url = makeFetchAllJson();
    promise('get', url, null).then(function(response) {
      console.log('Successfully fetched !!');
       app.dom.listOfProjects(response);
    }, function(status) {
      console.log('Unsuccessful!! Error status: ' + status);
    });

  }

  var fetchJsonObject = function(data) {
    var url = makeInsertFetchJson(data);
    promise('get', url, null).then(function(response) {
      console.log('Successfully fetched !!');
      app.dom.getJSON(response);
    }, function(status) {
      console.log('Unsuccessful!! Error status: ' + status);
    });

  };

  return {
    insert: insert,
    fetch: fetch,
    insertNew: insertNew,
    fetchAll: fetchAll,
    fetchJsonObject: fetchJsonObject
  };
})();

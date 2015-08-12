angular.module('starter.services', ['ngResource'])
.factory('Camera', ['$q', function($q) {

  return {
    getPicture: function(options) {
      var q = $q.defer();
      navigator.camera.getPicture(function(result) {
        // Do any magic you need
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);
      return q.promise;
    }
  };
}])
.factory('GPS', ['$q', function($q) {
  return {
    getGeo: function(options) {
      options = options || { timeout: 30000, enableHighAccuracy: true };
      var q = $q.defer();
      navigator.geolocation.getCurrentPosition(function(position) {
        q.resolve(position);
      }, function(err) {
        q.reject(err);
      }, options);
      return q.promise;
    }
  }
}])
.factory('Photo', ['$q', '$resource', function($q, $resource) {
  return {
    post: $resource('http://10.0.3.2:8000/photo/'), // this is where localhost is bounded to in my vm
    get: $resource('http://10.0.3.2:8000/photo/:id', {id:'@id'})
  }
}])

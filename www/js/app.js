angular.module('starter', ['ionic', 'starter.services'])

.config(function($compileProvider){
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.controller('MainCtrl', ['$scope', 'Camera', 'GPS', 'Photo', '$http', '$resource', function($scope, Camera, GPS, Photo, $http, $resource) { // just injecting everything

  $scope.getPhoto = function() {
    Camera.getPicture()
    .then(function(imageURI) {
      $scope.lastPhoto = imageURI;
      var post = new Photo.post({user_id: 10, physical_id: 10});
      post.$save();
    }, function(err) {
      console.error(err);
    }, {
      quality: 75,
      targetWidth: 320,
      targetHeight: 320,
      saveToPhotoAlbum: false
    });
  };
  $scope.getGPS = function() {
    console.log('getting gps');
    GPS.getGeo()
    .then(function(position) {
      // console.log(position);
      $scope.geo = position;
    }, function(err) {
      console.log(err);
    });
  };
}])

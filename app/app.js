/**
 * AngularJS Tutorial 1
 * @author Nick Kaye <nick.c.kaye@gmail.com>
 */

/**
 * Main AngularJS Web Application
 */
var app = angular.module('baca-tut', ['ngAnimate','ngRoute', 'youtube-embed', 'firebase']);


/**
 * Configure the Routes
 */
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    // Home
    .when("/", {
      templateUrl: "app/partials/home.html", 
      controller: "PageCtrl",
       title:"Home"
    })
    // Pages
    .when("/about", {
      templateUrl: "app/partials/about.html", 
      controller: "PageCtrl",
      title:"About",
      url: '/about'
    })
    .when("/faq", {templateUrl: "app/partials/faq.html", controller: "PageCtrl"})
    .when("/pricing", {templateUrl: "app/partials/pricing.html", controller: "PageCtrl"})
    .when("/services", {templateUrl: "app/partials/services.html", controller: "PageCtrl"})
    .when("/contact", {templateUrl: "app/partials/contact.html", controller: "PageCtrl"})
    // Blog
    .when("/tutorial", {
      templateUrl: "app/partials/tutorial.html",
      controller: "PageCtrl",
      title:"Tutorial",
      url: '/tutorial'

     })
    .when("/tutorial/tut_html", {
      templateUrl: "app/partials/tut_html.html", 
      controller: "TutorialCtrl",
      title:"Tutorial HTML",
      url: '/tutorial/tut_html',

    })

    .when("/tutorial/:detailtut",{
      templateUrl : "app/partials/blog_item.html",
      controller : 'ParamCtrl',
      title:"Tutorial HTML",

   
    })
    // else 404
    //.otherwise("/404", {templateUrl: "app/partials/404.html", controller: "PageCtrl"});

     .otherwise({
    redirectTo : "/"
  })

}]);



 
app.run(['$rootScope', function($rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}]);

app.controller('HeaderCtrl', function ($scope, $location) { 
    $scope.isActive = function (viewLocation) { 
      return viewLocation === $location.path();
    };


  });
/**
 * Controls the Blog
 */
app.controller('TutorialCtrl', function () {
  console.log("Tutorial Controller reporting for duty.");
});

app.controller('TuthtmlCtrl', function($scope) {
     $scope.tuthtml = ['slidedown'];
});


app.controller('PageCtrl', function () {
  console.log("Page Controller reporting for duty.");

  // Activates the Carousel
  $('.carousel').carousel({
    interval: 5000
  });

  // Activates Tooltips for Social Links
  $('.tooltip-social').tooltip({
    selector: "a[data-toggle=tooltip]"
  })
});

app.controller('DepanCtrl', function($scope, $http, $interval){
      // fungsi untuk menampilkan data
  $scope.tampilData = function(){
    $http.get('http://192.168.100.5/zam/api/dataprofile').success(function(data){
          $scope.dataDepan = data;
    });
  };
});






/* Semua Data Controller */

app.controller('SemuadataCtrl', function($scope, $http, $interval, $routeParams){
      // fungsi untuk menampilkan data
  $scope.semuaTut = function(){
    $http.get('http://localhost/zam/api/datatut').success(function(data){
          $scope.dataTut = data;
    });
  };




});


app.controller('ParamCtrl',['$scope','$routeParams', '$http', '$interval', function($scope,$routeParams, $http, $interval){
   
   $scope.tutDetail = function(){
   $http.get('http://localhost/zam/api/ambilSatu/?id='+ $routeParams.detailtut).success(function(data) {
      $scope.tutorDetail = data;
      $scope.theBestVideo1 =  data.youtube;
    });
   
   };

   

}]);




//Data HTML5

app.controller('HtmlCtrl', function($scope, $http, $interval){
      // fungsi untuk menampilkan data
  $scope.tutHtml = function(){
    $http.get('http://localhost/zam/api/tuthtml').success(function(data){
          $scope.dataHtml = data;
    });
  };
});

//Side Data

app.controller('SidedataCtrl', function($scope, $http, $interval){
      // fungsi untuk menampilkan data
  $scope.tutSide = function(){
    $http.get('http://localhost/zam/api/sidedata').success(function(data){
          $scope.dataSide = data;
    });
  };
});

app.run(['$anchorScroll', function($anchorScroll) {
  $anchorScroll.yOffset = 50;   // always scroll by 50 extra pixels
}]);



app.controller("ReloadCtrl", function($scope, $http){

    $scope.reload = function () {
        $http.get('http://localhost/baca-tut/').
            success(function (data) {
                $scope.todos = data.todos;
            });
    };
    $scope.reload();
    $interval($scope.reload, 5000);
});

app.controller("SampleCtrl", function($scope, $http, $firebase) {
  var ref = new Firebase("https://kodejaiab.firebaseio.com");
  // download the data into a local object
  // create a synchronized array
  // click on `index.html` above to see it used in the DOM!
  $scope.users = $firebase(ref.child('tbldepan')).$asArray();
  //$scope.dataKu = $firebaseArray(ref);


});





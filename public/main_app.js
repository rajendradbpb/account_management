var app = angular.module("acc_app", ['ui.router', 'ui.bootstrap', 'ngResource', 'ngStorage', 'ngAnimate','datePicker','ngTable','angular-js-xlsx','WebService']);
app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/login');
  $stateProvider
  .state('login', {
      templateUrl: 'views/login.html',
      url: '/login',
	    controller:'LoginCtrl',
      resolve: {
        loggedout: checkLoggedin
      }
  })
  .state('dashboard', {
    templateUrl: 'views/dashboard.html',
    url: '/dashboard',
    //resolve: {
      //loggedout: checkLoggedout
    //}
  })
 .state('client-list', {
    templateUrl: 'views/client/client_list.html',
    url: '/client-list',
	controller:'ClientController',
    //resolve: {
      //loggedout: checkLoggedout
    //}
  })
  .state('user-profile',{
	  templateUrl:'views/user/user_profile.html',
	  url:'/user-profile',
	  controller:'ProfileController',
	  resolve:{
		  loggedout:checkLoggedout
	  }
  })
  .state('client-details',{
	  templateUrl:'views/client/client_details.html',
	  url:'/client-details',
	  //controller:'TrailController',
	  //resolve:{
		  //loggedout:checkLoggedout
	  //}

  })
  .state('client-update',{
	  templateUrl:'views/client/client_update.html',
	  url:'/client-update',
	  controller:'ClientController',
	  //resolve:{
		  //loggedout:checkLoggedout
	  //}

  })
  .state('new-client', {
    templateUrl: 'views/client/new_client.html',
    url: '/new-client',
	controller:'ClientController',
    //resolve: {
      //loggedout: checkLoggedout
    //}
  })
  .state('user-list',{
	  templateUrl:'views/user/userlist.html',
	  url:'/user-list',
	  controller:'User_Controller'
	  //resolve:{
		  //loggedout:checkLoggedout
	  //}

  } )
  .state('new-user',{
	  templateUrl:'views/user/new_user.html',
	  url:'/new-user',
	  //resolve:{
		  //loggedout:checkLoggedout
	  //}
  })
  .state('user-update',{
	  templateUrl:'views/user/user_update.html',
	  url:'/user-update',
	  //resolve:{
		  //loggedout:checkLoggedout
	  //}
  })

  .state('trail-balance',{
	  templateUrl:'views/trail.html',
	  url:'/trail-balance',
	  controller:'TrailController',
	  //resolve:{
		  //loggedout:checkLoggedout
	  //}

  })
  .state('forgot-password',{
	  templateUrl:'views/resetpassword.html',
	  url:'/forgot-password',
	  //resolve:{
		  //loggedout:checkLoggedout
	  //}

  })

  .state('ca-firm',{
	  templateUrl:'views/ca_firm_details.html',
	  url:'/ca-firm',
	  //controller:'FirmController',
	  //resolve:{
		  //loggedout:checkLoggedout
	  //}
  })
  .state('ca-update',{
	  templateUrl:'views/ca_update.html',
	  url:'/ca-update',
	  controller:'FirmController',
	  //resolve:{
		  //loggedout:checkLoggedout
	  //}
    
  })
  .state('role',{
    templateUrl:'views/role_management.html',
    url:'/role-management',
    controller:'role_controller',
    //resolve:{
      //loggedout:checkLoggedout
    //}
  })

  function checkLoggedout($q, $timeout, $rootScope, $state, $localStorage) {
    var deferred = $q.defer();
    //accessToken = localStorage.getItem('accessToken')
    $timeout(function(){
      if($localStorage.user){
        deferred.resolve();
      }
      else{
        deferred.resolve();
        $state.go('login');
      }
    },100)
  }
  function checkLoggedin($q, $timeout, $rootScope, $state, $localStorage) {
    var deferred = $q.defer();
    // accessToken = localStorage.getItem('accessToken')
    $timeout(function(){
      if($localStorage.user){
        deferred.resolve();
        $state.go('dashboard');
      }
      else{
        deferred.resolve();
      }
    },100)
  }
});
app.constant('CONFIG', {
  'HTTP_HOST': 'server/api.php'
})
app.run(function($http,$rootScope,$localStorage,$timeout,EnvService,Constants){
  $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    $rootScope.stateName = toState.name;
  })
  EnvService.setSettings(Constants);
});
app.factory('Util', ['$rootScope',  '$timeout' , function( $rootScope, $timeout){
    var Util = {};
    $rootScope.alerts =[];
    Util.alertMessage = function(msgType, message){
        var alert = { type:msgType , msg: message };
        $rootScope.alerts.push( alert );
        $timeout(function(){
            $rootScope.alerts.splice($rootScope.alerts.indexOf(alert), 1);
        }, 5000);
    };
    return Util;
}]);

app.directive('fileModel', ['$parse', function ($parse) {
    return {
       restrict: 'A',
       link: function(scope, element, attrs) {
          var model = $parse(attrs.fileModel);
          var modelSetter = model.assign;

          element.bind('change', function(){
             scope.$apply(function(){
                modelSetter(scope, element[0].files[0]);
             });
          });
       }
    };
 }]);
 app.filter('getShortName', function () {
     return function (value) {
       if(value){
         var temp = angular.copy(value);
         temp = temp.split(" ");
         temp = temp[0].charAt(0)+temp[temp.length-1].charAt(0);
         return temp.toUpperCase();
       }
     };
 });

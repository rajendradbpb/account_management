/*! account_management - v0.0.0 - Wed Aug 09 2017 02:55:58 */
var app = angular.module("acc_app", ['ui.router', 'ui.bootstrap', 'ngResource', 'ngStorage', 'ngAnimate','datePicker','ngTable']);
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
    url: '/dash',
    controller:'LoginCtrl',
    resolve: {
      loggedout: checkLoggedout
    }
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
	  //controller:'TrailController',
	  //resolve:{
		  //loggedout:checkLoggedout
	  //}

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
	  controller:'Main_Controller'

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
  .state('user-details',{
	  templateUrl:'views/user/user_details.html',
	  url:'/user-details',
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

  function checkLoggedout($q, $timeout, $rootScope, $state, $localStorage) {
    var deferred = $q.defer();
    accessToken = $rootScope.is_loggedin ;//localStorage.getItem('accessToken')
    $timeout(function(){
      if(accessToken){
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
    accessToken = $rootScope.is_loggedin ;//localStorage.getItem('accessToken')
    $timeout(function(){
      if(accessToken){
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
app.run(function($http,$rootScope,$localStorage,$timeout){
  $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    $rootScope.stateName = toState.name;
  })
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
;app.directive('fileModel', ['$parse', function ($parse) {
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
app.directive('updateHeight',function () {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            $ta = element;
            var window_height = $(window).height();
            $ta.css({
              'min-height':window_height - 100+'px'
            })
        }
    };
});
;app.controller('ClientController',function($scope,$rootScope,Util,$uibModal,$stateParams,NgTableParams){
	
	$scope.emp = {};	
	$scope.emp.add=[
	{
		       'name':'',
		'designation':'',
		         'id':'',
			   'pan' :'',
	    	
	}
	];	
	$scope.removeEmp=function($index){
		$scope.emp.add.splice($index,1);
		
	}
	$scope.updateEmployee = function(){
		var obj = {name:'' ,designation:'', id:'', pan:'' };
		$scope.emp.add.push(obj);
	}
	$scope.client_update = {};	
	$scope.client_update.director=[
	{'name':'',
		'designation':'',
		         'id':'',
			   'pan' :'',
	    	
	    	
	}
	];	
	$scope.removeDirector=function($index){
		$scope.client_update.director.splice($index,1);
		
	}
	$scope.updateDirector = function(){
		var obj = {name:'' ,designation:'', id:'', pan:''  };
		$scope.client_update.director.push(obj);
	}
	
	$scope.client_list=[
	{
		"firm_name":"BBM & co",
		"firm_type":"Chartard Accountants",
		"date_inc" :"20-7-2017",
             "gst" :"5744877",
		"is_active":true
	},
	{
		"firm_name":"Go Apps Solutions",
		"firm_type":"Software",
		"date_inc" :"20-7-2017",
             "gst" :"5744627",
		"is_active":true
	},
	{
		"firm_name":"Fincrony",
		"firm_type":"Chartard Accountants",
		"date_inc" :"20-7-2017",
             "gst" :"5744877",
		"is_active":false
			
		
	},
	{
		"firm_name":"Google ",
		"firm_type":"Search Engine",
		"date_inc" :"20-7-2017",
             "gst" :"5747677",
		"is_active":true
			
		
	},
	{
		"firm_name":"Snapdeal",
		"firm_type":"Ecommerce",
		"date_inc" :"20-7-2017",
             "gst" :"574656797",
		"is_active":false
	}],
	$scope.clientData = new NgTableParams();
	$scope.clientData.settings({dataset:$scope.client_list})
	
	
	
});app.controller('FirmController',function($scope,$rootScope,Util,$uibModal,$stateParams){
	
	$scope.partner = {};	
	$scope.partner.list=[
	{
		       'name':'',
		'designation':'',
		         'no':'',
			  
	    	
	}
	];	
	$scope.removePart=function($index){
		$scope.partner.list.splice($index,1);
		
	}
	$scope.updatePart = function(){
		var obj = {name:'' ,designation:'', no:'' };
		$scope.partner.list.push(obj);
	}
	
});app.controller('LoginCtrl',function($rootScope,$scope,LoginService,$state,$window){
	$scope.user = {};
	$scope.userLogin = function(){

		 LoginService.jsonLogin($scope.user).then(function(response){
			 $rootScope.is_loggedin = true;
		 	console.log(response);
		 	$state.go('dashboard');
		 },function(error){
		 	var alertPopup = $window.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
		 })

	}
	
})
;app.controller("Main_Controller",function($scope,$rootScope,$state,$localStorage,NgTableParams){
  /*******************************************************/
  /*************This is use for check user login**********/
  /*******************************************************/
  $scope.user_list = [
	  {"name":"Santosh Majhi","mobile":"9438753143","email":"santosh@gmail.com","user_role":"Enterer","is_active":true},
	  {"name":"Santosh Shann","mobile":"978640778","email":"santoshmajhi@gmail.com","user_role":"Verifier","is_active":false},
	   {"name":"Subhra Kanta Patra","mobile":"9438753143","email":"subhra@gmail.com","user_role":"Enterer","is_active":true},
	  {"name":"Amaresh Nayak","mobile":"9456453786","email":"Amareshnaik@gmail.com","user_role":"Verifier","is_active":false}
  ];
  $scope.userData = new NgTableParams();
  $scope.userData.settings({
	dataset: $scope.user_list
  })

  $scope.signOut = function(){
		 $rootScope.is_loggedin = false;
		 $state.go('login');
	 }
});
;app.controller('TrailController',function($scope,$rootScope,Util,$uibModal,$stateParams){
	$scope.trail = {};	
	$scope.trail.list=[
	{
		'particulars':'',
		'transaction':'',
		     'amount':'',
			 'group' :'',
	    	'pGroup':'',
	}
	]
	$scope.addList=function(){
		var obj = {particulars:'' ,transaction:'', amount:'', group:'',pGroup:'' };
		$scope.trail.list.push(obj);
	}
	
	$scope.removeList=function($index){
		$scope.trail.list.splice($index,1);
		
	}
});app.service('LoginService',function($q,$http){
	return{
		loginUser: function(user){
			var deffered = $q.defer();
			var promise = deffered.promise;
			if(user.username == 'user' && user.password == 'secret'){
				deffered.resolve('welcome' + name + '!!');
			}else{
				deffered.reject('wrong credentials...');
			}
			return promise;
		},
		jsonLogin : function(user){
			var deffered = $q.defer();
			$http.get('local.json').then(function successCallback(response) {
				console.log(response);
				angular.forEach(response.data.user,function(item){
					console.log(item);
					if(item.username == user.username && item.password == user.password){
						deffered.resolve(item);
					}
				})
	        }, function errorCallback(errorResponse) {
	            deffered.reject(errorResponse);
	        });
	        return deffered.promise;
		}
	}
})

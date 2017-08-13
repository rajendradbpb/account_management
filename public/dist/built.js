/*! account_management - v0.0.0 - Sun Aug 13 2017 17:12:22 */
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
  .state('test',{
    templateUrl:'views/role_management.html',
    url:'/test',
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
;app.constant("Constants", {
        "debug":true,
        "storagePrefix": "goAppAccount$",
        "getTokenKey" : function() {return this.storagePrefix + "token";},
        "getLoggedIn" : function() {return this.storagePrefix + "loggedin";},
        "alertTime"   : 3000,
        "getUsername" : function() {return this.storagePrefix + "username";},
        "getPassword" : function() {return this.storagePrefix + "password";},
        "getIsRemember" : function() {return this.storagePrefix + "isRemember";},
        "hashKey" : "goAppAccount",
        "envData" : {
          "env":"dev",
          "dev" : {
            "basePath" :"http://localhost:3000",
            "appPath"  :"http://localhost:3000",
          },
          "prod" : {
            "basePath" :"http://localhost:3000",
            "appPath"  :"http://localhost:3000",
          }
        },
})
;angular.module('WebService', [])
    .factory('API', function($http, $resource, EnvService) {
        return {
          getRole: {
            "url": "/role",
            "method": "GET",
            // "isArray" : true
          },
          postRole: {
            url: "/role",
            method: "POST",
            "headers": {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
          },
          deleteRole: {
            url: "/role/:_id",
            method: "DELETE",
            "headers": {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
          },
          userLogin : {
            url : "/user/login",
            method : "POST"
          }
        }
    })
    .factory('ApiGenerator', function($http, $resource, API, EnvService) {
        return {
          getApi: function(api) {
            var obj = {};
            obj = angular.copy(API[api]);
            // console.log("obj  ",obj,api);
            obj.url = EnvService.getBasePath() + obj.url; // prefix the base path
            return obj;
          }
        }
    })
    .factory('ApiCall', function($http, $resource, API, EnvService,ApiGenerator) {
      return $resource('/',null, {
        getRole: ApiGenerator.getApi('getRole'),
        postRole: ApiGenerator.getApi('postRole'),
        deleteRole: ApiGenerator.getApi('deleteRole'),
        userLogin : ApiGenerator.getApi('userLogin')
      });
    })
    .factory('EnvService',function($http,$localStorage){
      var envData = env = {};
      var settings =  {};

      return{
        setSettings : function(setting) {
          settings = setting;
          // setting env
          this.setEnvData(setting.envData);
        },
        getSettings : function(param) {
          if(param){
            return settings[param];
          }
          return null; // default
        },
        setEnvData: function (data) {
          envData = data[data.env];
        },
        getEnvData: function () {
          return envData;
        },
        getBasePath: function (env) {
          return this.getEnvData()['basePath']
        }

      }
    })


;
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
;app.controller('ClientController',function($scope,$rootScope,Util,$uibModal,$stateParams,NgTableParams,ClientService){
	
	/*FOR DIRECTOR INCREMENT STARTS HERE*/
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
					

/*FOR DIRECTOR INCREMENT ENDS HERE*/


/*FOR SHARE HOLDERS INCREMENT startS HERE*/
				$scope.shares = {};
				$scope.shares.list=[
				{
					       'name':'',
					'designation':'',
					         'id':'',
						   'pan' :'',
				    	
				}
			];	
				$scope.removeShare=function($index){
					$scope.shares.list.splice($index,1);
					
					
				}
				$scope.newShare = function(){
					var obj = {name:'' ,designation:'', id:'', pan:'' };
					$scope.shares.list.push(obj);
				}
	

	/*FOR SHARE HOLDERS INCREMENT ends HERE*/
	
	/*FOR SHARE Capital INCREMENT startS HERE*/
				$scope.capital = {};
				$scope.capital.list=[
				{
					       'amount':'',
						   	 'year':'',
					   
				    	
				}
			];	
				$scope.removeCapital=function($index){
					$scope.capital.list.splice($index,1);
					
					
				}
				$scope.newCapital = function(){
					var obj = {name:'' ,designation:'', id:'', pan:'' };
					$scope.capital.list.push(obj);
				}
	

	/*FOR SHARE Capital INCREMENT ends HERE*/
	
	/*Clientlist table view code starts here*/
				$scope.clientList={};
			    $scope.getClientList = function(){
			    		ClientService.clientList().then(function(response){
			    			console.log(response);
			    			$scope.clientList=response.data.client;
			    			$scope.clientData = new NgTableParams();
			    			$scope.clientData.settings({
			    				dataset : $scope.clientList
			    			})
			    		},function(error){
			    			 $rootScope.showPreloader = false;
			    		})
			    }
    /*Clientlist table view code ends here*/
	
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
	
});app.controller('LoginCtrl',function($scope,$rootScope,LoginService,$state,$window,$localStorage, ApiCall){
	$scope.user = {};
	$scope.userLogin = function(){
		ApiCall.userLogin($scope.user, function(response){
			console.log(response)
		 	$localStorage.user = response;
		 	$scope.$emit("Login_success");
		  	$state.go('dashboard');
		},function(error){
		 	$window.alert('wrong he');
		})
	}
});app.controller("Main_Controller",function($scope,$rootScope,$state,$localStorage,NgTableParams){
  /*******************************************************/
  /*************This is use for check user login**********/
  /*******************************************************/

  $rootScope.$on('Login_success',function(){
    $scope.getUserDetails();
  })
  $scope.getUserDetails = function(){
    if($localStorage.user){
      $scope.is_loggedin = true;
      $rootScope.profile = $localStorage.user;
    }
    else{
      $scope.is_loggedin = false;
    }
  }
  $scope.signOut = function(){
    delete $localStorage.user;
    $scope.is_loggedin = false;
    $state.go('login');
  }
});
/*---------------------------------------------------------------------------------------------------------------------------------*/
                        /*-------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------*/
 /*******************************************************/
  /******Profile controller starts here*****/
  /*******************************************************/
app.controller("ProfileController",function($scope,$rootScope,$state,$localStorage,NgTableParams){
  /*******************************************************/
  /******This is use for change tabs in profile page*****/
  /*******************************************************/
  $scope.active_tab = 'details';
  $scope.tabChange = function(tab){
    $scope.active_tab = tab;
  }
});
 /*******************************************************/
  /******Profile controller ends here******/
  /*******************************************************/
/*----------------------------------------------------------------------------------------------------------------------------------*/
                        /*-------------------------------------------------------------------------------*/
;app.controller("role_controller", function($scope, $rootScope, $state, $localStorage, ApiCall, NgTableParams, RoleService) {
  $scope.roles = {};
  $scope.crudRole = function(method, data) {
    switch (method) {
      case 'get':
        ApiCall.getRole(function(res) {
          $scope.roles = res.data;
          $scope.role = new NgTableParams;
          $scope.role.settings({
            dataset: $scope.roles
          })
        }, function(error) {
          console.log(err);
        })
        break;
      case 'delete':
        ApiCall.deleteRole({
          _id: data._id
        }, function(res) {
          $scope.crudRole('get');
        }, function(error) {
          console.log(err);
        })
        break;
      default:

    }

  }

});
;app.controller('TrailController',function($scope,$http,$rootScope,Util,$uibModal,$stateParams){
	$scope.trail = {};	
	$scope.selectedFiles = null;
	 $scope.msg = "";  
	$scope.read= function(workbook){
		console.log(workbook);
	} 
});app.controller("User_Controller",function($scope,$rootScope,$state,$localStorage,NgTableParams,UserService){
  /*******************************************************/
  /*************This is use for check user login**********/
  /******************************************************

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
  $rootScope.$on('Login_success',function(){
    $scope.getUserDetails();
  })
*/
$scope.userlist = {};
$scope.getUserList = function(){
  UserService.userList().then(function(response){
    console.log(response);
    console.log(response.status);
  
          $scope.userlist = response.data.user;
          console.log( $scope.userlist);
          $scope.userData = new NgTableParams();
          $scope.userData.settings({
              dataset: $scope.userlist
          })
        
      },function(error){
        $rootScope.showPreloader = false;
      })
  }




});app.service('LoginService',function($q,$http){
	return{
		
		jsonLogin : function(user){
			var deffered = $q.defer();
			$http.get('local.json').then(function successCallback(response) {
				console.log(response);
				angular.forEach(response.data.user,function(item){
					console.log(response);
					if(item.user_name == user.username && item.password == user.password){
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
app.service('UserService',function($q,$http){
	return{
				userList : function(){
					var response = $http.get('local.json');
					console.log(response);
					return response;}
			}
})
app.service('ClientService',function($q,$http){
	return{
				clientList : function(){
					var response=$http.get('local.json');
					console.log(response);
					return response;

				}
	}
})
app.service('RoleService',function($q,$http){
	return{
			role : function(){
				var response = $http.get('local.json');
				console.log(response);
				return response
			}

			}
})

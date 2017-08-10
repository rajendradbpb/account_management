app.controller('LoginCtrl',function($scope,$rootScope,LoginService,$state,$window,$localStorage){
	$scope.user = {};
	$scope.userLogin = function(){
		 LoginService.jsonLogin($scope.user).then(function(response){
		 	$localStorage.user = response;
		 	$scope.$emit("Login_success");
		  	$state.go('dashboard');
		},function(error){
		 	$window.alert('wrong he');
		})
	}
})
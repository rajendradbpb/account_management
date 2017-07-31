app.controller('LoginCtrl',function($scope,LoginService,$state,$window){
	$scope.user = {};
	$scope.userLogin = function(){
		 LoginService.loginUser($scope.user).then(function(response){
		 	$state.go('dashboard');
		 },function(error){
		 	var alertPopup = $window.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
		 })
		
	}
})
app.controller('LoginCtrl',function($rootScope,$scope,LoginService,$state,$window){
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

app.controller('LoginCtrl',function($scope,$rootScope,LoginService,$state,$window,$localStorage, ApiCall){
	$scope.user = {};
	$scope.userLogin = function(){
		$rootScope.showPreloader = true;
		ApiCall.userLogin($scope.user, function(response){
			$rootScope.showPreloader = false;
		 	$localStorage.user = {
		 		"token": response.data.token
		 	};
		 	$scope.$emit("Login_success");
		  	$state.go('dashboard');
		},function(error){
			$rootScope.showPreloader = false;
		})
	}
})
app.controller('FirmController',function($scope,$rootScope,Util,$uibModal,$stateParams,ApiCall,$state,UserModel){
	
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
	$scope.getRoleList = function(){
     ApiCall.getRole(function(response){
      $scope.roleList = response.data;
     },function(error){

     })
  }
  $scope.caFirm = {};
  $scope.caFirmRegister = function(){
  	ApiCall.postUser($scope.caFirm, function(response){
  		
  	},function(error){

  	})
  }
  $scope.updateCaFirm = function(){
  	$scope.caFirm.admin = UserModel.getUser()._id;
  	ApiCall.postCaFirm($scope.caFirm, function(response){
  		console.log(response);
  		$state.go('ca-firm')
  	},function(error){

  	})
  }
  $scope.data = {};
  $scope.getCaFirmDetails = function(){
  	$scope.data = UserModel.getUser();
  	console.log($scope.data);
  
  }

	
})
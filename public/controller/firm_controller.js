app.controller('FirmController',function($scope,$rootScope,Util,$uibModal,$stateParams,ApiCall,$state,UserModel){
	
	$scope.caFirm = {};	
	$scope.caFirm.Partners = [
  	{
  		'name':'',
  		'designation':'',
  		'membership':'',
  	}
	];	
	$scope.removePart = function($index){
		$scope.caFirm.Partners.splice($index,1);
		
	}
	$scope.updatePart = function(){
		var obj = {name:'' ,designation:'', membership:'' };
		$scope.caFirm.Partners.push(obj);
	}
	$scope.getRoleList = function(){
     ApiCall.getRole(function(response){
      $scope.roleList = response.data;
     },function(error){

     })
  }
  $scope.caFirmRegister = function(){
  	ApiCall.postUser($scope.caFirm, function(response){
  		
  	},function(error){

  	})
  }
  $scope.updateCaFirm = function(){
  	$scope.caFirm.admin = UserModel.getUser()._id;
    console.log(JSON.stringify($scope.caFirm));
  	ApiCall.postCaFirm($scope.caFirm, function(response){
  		console.log(response);
  		$state.go('ca-firm')
  	},function(error){

  	})
  }
  $scope.data = {};
  $scope.getCaFirmDetails = function(){
  	$scope.data = UserModel.getUser();
    	var obj = {
      "_id":"599823699345e92a141e2cba"
    }
    ApiCall.getCaFirm( function(response){
      console.log(response);

    },function(error){

    })

	}
})
app.controller('FirmController',function($scope,$rootScope,Util,$uibModal,$stateParams,ApiCall){
	
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

	
})
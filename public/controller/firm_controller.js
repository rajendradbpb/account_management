app.controller('FirmController',function($scope,$rootScope,Util,$uibModal,$stateParams){
	
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
	
})
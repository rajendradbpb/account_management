app.controller('TrailController',function($scope,$rootScope,Util,$uibModal,$stateParams){
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
})
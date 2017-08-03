app.controller('ClientController',function($scope,$rootScope,Util,$uibModal,$stateParams,NgTableParams){
	
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
	$scope.client_update = {};	
	$scope.client_update.director=[
	{'name':'',
		'designation':'',
		         'id':'',
			   'pan' :'',
	    	
	    	
	}
	];	
	$scope.removeDirector=function($index){
		$scope.client_update.director.splice($index,1);
		
	}
	$scope.updateDirector = function(){
		var obj = {name:'' ,designation:'', id:'', pan:''  };
		$scope.client_update.director.push(obj);
	}
	
	$scope.client_list=[
	{
		"firm_name":"BBM & co",
		"firm_type":"Chartard Accountants",
		"date_inc" :"20-7-2017",
             "gst" :"5744877",
		"is_active":true
	},
	{
		"firm_name":"Go Apps Solutions",
		"firm_type":"Software",
		"date_inc" :"20-7-2017",
             "gst" :"5744627",
		"is_active":true
	},
	{
		"firm_name":"Fincrony",
		"firm_type":"Chartard Accountants",
		"date_inc" :"20-7-2017",
             "gst" :"5744877",
		"is_active":false
			
		
	},
	{
		"firm_name":"Google ",
		"firm_type":"Search Engine",
		"date_inc" :"20-7-2017",
             "gst" :"5747677",
		"is_active":true
			
		
	},
	{
		"firm_name":"Snapdeal",
		"firm_type":"Ecommerce",
		"date_inc" :"20-7-2017",
             "gst" :"574656797",
		"is_active":false
	}],
	$scope.clientData = new NgTableParams();
	$scope.clientData.settings({dataset:$scope.client_list})
	
	
	
})
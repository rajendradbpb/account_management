app.service('LoginService',function($q,$http){
	return{
		loginUser: function(user){
			var deffered = $q.defer();
			var promise = deffered.promise;
			if(user.username == 'user' && user.password == 'secret'){
				deffered.resolve('welcome' + name + '!!');
			}else{
				deffered.reject('wrong credentials...');
			}
			return promise;
		},
		jsonLogin : function(user){
			var deffered = $q.defer();
			$http.get('local.json').then(function successCallback(response) {
				console.log(response);
				angular.forEach(response.data.user,function(item){
					console.log(item);
					if(item.username == user.username && item.password == user.password){
						deffered.resolve(item);
					}
				})
	        }, function errorCallback(errorResponse) {
	            deffered.reject(errorResponse);
	        });
	        return deffered.promise;
		}
	}
})

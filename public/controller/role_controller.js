app.controller("role_controller", function($scope, $rootScope, $state, $localStorage,ApiCall, NgTableParams, RoleService) {
  $scope.roles = {};
  $scope.getRoleList = function() {
    // RoleService.role().then(function(response) {
    //   console.log(response);
    //   $scope.roles = response.data.role;
    //   $scope.role = new NgTableParams;
    //   $scope.role.settings({
    //     dataset: $scope.roles
    //   })
    // }, function(error) {
    //   $rootScope.showPreloader = false;
    // })
    ApiCall.getRole(function(res) {
      $scope.roles = res.data;
      $scope.role = new NgTableParams;
        $scope.role.settings({
          dataset: $scope.roles
        })
    },function(error){
      console.log(err);
    })
  }

});

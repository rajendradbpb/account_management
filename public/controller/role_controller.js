app.controller("role_controller", function($scope, $rootScope, $state, $localStorage, ApiCall, NgTableParams, RoleService) {
  $scope.roles = {};
  $scope.crudRole = function(method, data) {
    switch (method) {
      case 'get':
        ApiCall.getRole(function(res) {
          $scope.roles = res.data;
          $scope.role = new NgTableParams;
          $scope.role.settings({
            dataset: $scope.roles
          })
        }, function(error) {
          console.log(err);
        })
        break;
      case 'delete':
        ApiCall.deleteRole({
          _id: data._id
        }, function(res) {
          $scope.crudRole('get');
        }, function(error) {
          console.log(err);
        })
        break;
      default:

    }

  }

});

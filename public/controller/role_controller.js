app.controller("role_controller", function($scope, $rootScope, $state, $localStorage, ApiCall, NgTableParams, RoleService,$uibModal,Util) {
  $scope.roles = {};
  $scope.crudRole = function(method, data) {
    switch (method) {
      case 'get':
        ApiCall.getRole(function(res) {
          $scope.roleList = res.data;
          $scope.role = new NgTableParams;
          $scope.role.settings({
            dataset: $scope.roleList
          })
        }, function(error) {
          console.log(err);
        })
        break;
      case 'delete':
        $scope.deleteId = data._id;
        $scope.modalInstance = $uibModal.open({
         animation: true,
         templateUrl: 'views/modals/role-delete-modal.html',
         controller: 'RoleModalCtrl',
         size: 'md',
         resolve: {
           deleteRole: function () {
             return $scope.deleteRole;
           }
         }
        })
        break;
      case 'create' :
        $rootScope.showPreloader = true;
        ApiCall.postRole($scope.roles, function(response){
          if(response.statusCode == 200){
            $rootScope.showPreloader = false;
            Util.alertMessage('success',response.message);
            $state.go('role-list');
          }
        },function(error){
          $rootScope.showPreloader = false;
        })
        break;
      case 'update' :
         $scope.updateId = data._id;
         $scope.modalInstance = $uibModal.open({
          animation : true,
          templateUrl: 'views/modals/role-update-modal.html',
          controller: 'RoleUpdateModalCtrl',
          size: 'md',
          resolve:{
            updateRole : function(){
              return $scope.updateRole;
            },
            role : function(){
              return data;
            }
          }
         })
         break;

         
      default:

    }
    $scope.deleteRole = function(){
      ApiCall.deleteRole({
        _id: $scope.deleteId
      }, function(res) {
        $scope.crudRole('get');
      }, function(error) {
        console.log(err);
      })
    }
    $scope.updateRole = function(role){
      ApiCall.updateRole(role,function(res) {
        $scope.crudRole('get');
      }, function(error) {
        console.log(err);
      }
      )
    }

  }

});
app.controller('RoleModalCtrl', function ($scope, $uibModalInstance,deleteRole) {
    $scope.ok = function () {
        deleteRole();
        $uibModalInstance.close();
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
   
});
app.controller('RoleUpdateModalCtrl', function ($scope, $uibModalInstance,updateRole,role) {
  $scope.role = role;
    $scope.update = function () {
        updateRole($scope.role);
        $uibModalInstance.close();
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
   
});

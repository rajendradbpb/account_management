app.controller("User_Controller",function($scope,$rootScope,$state,$localStorage,NgTableParams,ApiCall,Util,$uibModal){
  /*******************************************************/
  /*************This is use for check user login**********/
  /******************************************************/

 

  $scope.userlist = {};
  $scope.getUserList = function(){
    ApiCall.getUser(function(response){
      $scope.userlist = response.data;
      $scope.userData = new NgTableParams();
      $scope.userData.settings({
          dataset: $scope.userlist
      })
    },function(error){

    })
  }
  /*****************************************************************/
  /*This is used for getting the rolelist for user role dropdown****/
  /*****************************************************************/

  
  $scope.getRoleList = function(){
     ApiCall.getRole(function(response){
      $scope.roleList = response.data;
     },function(error){

     })
  }

  /*************************************************************************************************************************/

   /*******************************************************/
  /*************This is used for creating a new user****/
  /******************************************************/
   $scope.user = {};
  $scope.createUser = function(){
    //$rootScope.showPreloader = true;
    ApiCall.postUser($scope.user, function(response){
      if(response.statusCode == 200){
        Util.alertMessage('success', response.message);
        $state.go('user-list');
      }
    },function(error){
        console.log(error);
         $rootScope.showPreloader = false;
    })
  }
  /*************************************************************************************************************************/

   /*******************************************************/
  /*************This is used for deleting a  user****/
  /******************************************************/
  $scope.deleteUser = function(data){
    console.log(data);
   $scope.deleteUserId = data._id;
   $scope.modalInstance = $uibModal.open({
      animation : true,
      templateUrl : 'views/modals/user-delete-modal.html',
      controller : 'daleteUserModalCtrl',
      size: 'md',
      resolve:{
            userDelete : function(){
               return $scope.userDelete;
            }
      }

   })
  }
  $scope.userDelete = function(){
      ApiCall.deleteUser({
        _id: $scope.deleteUserId
      }, function(res) {
        Util.alertMessage('success', res.message);
        $scope.getUserList();
      }, function(error) {
        console.log(err);
      })
    }
    /*************************************************************************************************************************/
  

   /*******************************************************/
  /*************This is used for updating a  user****/
  /******************************************************/ 
  $scope.updateUser = function(data){
    $scope.updateUserId = data._id;
    $scope.modalInstance = $uibModal.open({
      animation : true,
      templateUrl : 'views/modals/user-update-modal.html',
      controller : 'updateUserModalCtrl',
      size : 'md',
      resolve:{
        userUpdate : function(){
          return $scope.userUpdate;
        },
        users : function(){
          return data;
        }
      }
    })
  }
  $scope.userUpdate = function(users){
    ApiCall.updateUser(users,function(response){
              console.log(123454);
              $scope.getUserList();
           },function(error){
              console.log(error);
         }
       )
     }
});



app.controller('daleteUserModalCtrl',function($scope, $uibModalInstance,userDelete){
  $scope.ok = function () {
        userDelete();
        $uibModalInstance.close();
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
app.controller('updateUserModalCtrl',function($scope, ApiCall,$uibModalInstance,userUpdate,users){
  $scope.getRolesList = function(){
     ApiCall.getRole(function(response){
      $scope.roleList = response.data;
     },function(error){

     })
  }

  $scope.users = users;
  $scope.update = function () {
        userUpdate($scope.users);
        $uibModalInstance.close();
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };


});
app.controller("User_Controller",function($scope,$rootScope,$state,$localStorage,NgTableParams,UserService){
  /*******************************************************/
  /*************This is use for check user login**********/
  /******************************************************

  $scope.user_list = [
    {"name":"Santosh Majhi","mobile":"9438753143","email":"santosh@gmail.com","user_role":"Enterer","is_active":true},
    {"name":"Santosh Shann","mobile":"978640778","email":"santoshmajhi@gmail.com","user_role":"Verifier","is_active":false},
     {"name":"Subhra Kanta Patra","mobile":"9438753143","email":"subhra@gmail.com","user_role":"Enterer","is_active":true},
    {"name":"Amaresh Nayak","mobile":"9456453786","email":"Amareshnaik@gmail.com","user_role":"Verifier","is_active":false}
  ];
  $scope.userData = new NgTableParams();
  $scope.userData.settings({
  dataset: $scope.user_list
  })
  $rootScope.$on('Login_success',function(){
    $scope.getUserDetails();
  })
*/
$scope.userlist = {};
$scope.getUserList = function(){
  UserService.userList().then(function(response){
    console.log(response);
    console.log(response.status);
  
          $scope.userlist = response.data.user;
          console.log( $scope.userlist);
          $scope.userData = new NgTableParams();
          $scope.userData.settings({
              dataset: $scope.userlist
          })
        
      },function(error){
        $rootScope.showPreloader = false;
      })
  }




})
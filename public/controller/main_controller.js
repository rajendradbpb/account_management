app.controller("Main_Controller",function($scope,$rootScope,$state,$localStorage,NgTableParams,UserModel){
  /*******************************************************/
  /*************This is use for check user login**********/
  /*******************************************************/

  $rootScope.$on('Login_success',function(){
    $scope.getUserDetails();
  })
  $scope.getUserDetails = function(){
    if(UserModel.getUser()){
      $rootScope.is_loggedin = true;
      $rootScope.profile = UserModel.getUser();
    }
    else{
      $rootScope.is_loggedin = false;
    }
  }
  $scope.signOut = function(){
    delete $localStorage.token;
    $scope.is_loggedin = false;
    $state.go('login');
  }
});
/*---------------------------------------------------------------------------------------------------------------------------------*/
                        /*-------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------*/
 /*******************************************************/
  /******Profile controller starts here*****/
  /*******************************************************/
app.controller("ProfileController",function($scope,$rootScope,$state,$localStorage,NgTableParams){
  /*******************************************************/
  /******This is use for change tabs in profile page*****/
  /*******************************************************/
  $scope.active_tab = 'details';
  $scope.tabChange = function(tab){
    $scope.active_tab = tab;
  }
});
 /*******************************************************/
  /******Profile controller ends here******/
  /*******************************************************/
/*----------------------------------------------------------------------------------------------------------------------------------*/
                        /*-------------------------------------------------------------------------------*/

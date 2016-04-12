angular.module('adminUserCtrl',['adminUserService'])

    .controller('admin_UserController', function(User){
        var userCtrl = this;
        userCtrl.processing = true;

        //To retrieve all the product lists
        User.all()
            .success(function(data){
                userCtrl.processing = false;
                userCtrl.users = data;
            });
    });
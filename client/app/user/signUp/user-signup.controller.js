angular.module('userSignUpCtrl', ['userSignUpService'])

.controller('userCreateController', function(userSignUp) {
    
    var newUser = this;
    newUser.type = 'create';

    newUser.saveUser = function() {
        //to show user, it is processing
        newUser.processing = true;
        newUser.message = '';
        
        //Send to service.js to store data
        userSignUp.create(newUser.signUpData)
            .success(function(data) {
                
                newUser.processing = false; //stop the process when done
                newUser.signUpData = {};    //clear the form
                newUser.message = data.message;  
        });            
    };  
})


var myApp = angular.module('myApp',[]);

myApp.controller('GreetingController', function($scope,$timeout,appLoginStorageService) {
    $scope.greeting = 'Hola!';

    appLoginStorageService.getAppLoginInfo(function(data){
        $scope.data = data;
        $scope.$apply();
        $scope.typer = typeof data;
        logInfoInPageConsole($scope.data);
    });

    $scope.test = function() {
        $scope.greeting = 'hoina Hola!';
    };


    //$scope.data = appLoginStorageService.appLoginInfo

    $scope.loginAndPunchin=function(){
        //$window.location.href = 'https://drm.deerwalk.com/login/auth';

        chrome.tabs.create({ url: 'https://drm.deerwalk.com/login/auth' });
        chrome.tabs.executeScript({
            file: 'js/drm.js'
        });

    };

    $scope.addLoginInfo=function(){
        //alert($scope.logininfo);
        appLoginStorageService.add(angular.copy($scope.logininfo));
    };

    $scope.remove = function(ritem){
        //this.aaa.splice(this.aaa.indexOf(ritem), 1);
        appLoginStorageService.remove(ritem);
    }

    $scope.toggleLoginInfoForm=function(){
        $scope.addState = !$scope.addState;
    }

    $scope.login=function(loginInfo){
        chrome.tabs.create({ url: loginInfo.url });

        chrome.tabs.executeScript({
            code: 'document.getElementById("'+loginInfo.userkey+'").value="'+loginInfo.username+'";'
        });
        chrome.tabs.executeScript({
            code: 'document.getElementById("'+loginInfo.passkey+'").value="'+loginInfo.password+'";'
        });
        chrome.tabs.executeScript({
            code: 'document.forms[0].submit();'
        });

    }

});

myApp.service('appLoginStorageService', function ($q) {
    var _this = this;
   // this.data = ["a","b","c","d","e"];
    this.testFunction = function(){
        alert("hello");
    }
    this.appLoginInfo = [];

    this.sync = function() {
        chrome.storage.sync.set({appLoginInfo: this.appLoginInfo}, function() {
            console.log('Data is stored in Chrome storage');
        });
    }

    this.add = function(data){
        //this.sync();
        this.appLoginInfo.push(data);
        this.sync();
    }

    this.remove = function(todo) {
        this.appLoginInfo.splice(this.appLoginInfo.indexOf(todo), 1);
        this.sync();
    }

    this.getAppLoginInfo = function(callback){
        chrome.storage.sync.get('appLoginInfo', function(keys) {
            //alert(keys.appLoginInfo);
            if (keys.appLoginInfo != null) {
                _this.appLoginInfo = keys.appLoginInfo;
                callback(_this.appLoginInfo);
            }
        });
    }


});

function hello() {
    //alert("test test");
    chrome.tabs.executeScript({
        file: 'js/alert.js'
    });
}

function logInfoInPageConsole(value) {
    var passval = "";
    if (typeof value === "object") {
        passval = JSON.stringify(value);
    }else {
        passval = value
    }


    chrome.tabs.executeScript({
        code: "console.log('"+passval+"');"
    });

}

document.getElementById('clickme').addEventListener('click', hello);

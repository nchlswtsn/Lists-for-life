'use strict';

var app = angular.module('noteApp', []);

app.controller('MainCtrl', function($scope) {
  $scope.items = localStorage.items ? JSON.parse(localStorage.items): [];
  $scope.backupItems = localStorage.backupItems ? JSON.parse(localStorage.backupItems): [];
  $scope.addItem = function() {
    if ($scope.newItem !== undefined) {
      chrome.browserAction.setBadgeText ( { text: JSON.stringify($scope.items.length + 1) } );
      $scope.items.push($scope.newItem)
      localStorage.items = JSON.stringify($scope.items)
      $scope.newItem = '';
      $scope.itemCount = $scope.items.length;
    }
  }
  $scope.deleteItem = function(item) {
    chrome.browserAction.setBadgeText ( { text: JSON.stringify($scope.items.length - 1) } );
    var index = $scope.items.indexOf(item);
    $scope.items.splice(index, 1)
    localStorage.items = JSON.stringify($scope.items)
    $scope.itemCount = $scope.items.length;
    $()
  }
  $scope.strike = function(item) {
    console.log('strike');
    angular.element('this').toggleClass('strike');
  }
  $scope.deleteAll = function() {
    $scope.items = [];
    localStorage.items = JSON.stringify($scope.items);
    chrome.browserAction.setBadgeText ( { text: JSON.stringify($scope.items.length) } );
  }
  $scope.hoverTrash = function() {
    $scope.mouseOver = !$scope.mouseOver;
  }
  $scope.mouseOver = false;
  $scope.itemCount = $scope.items.length;
  chrome.browserAction.setBadgeText ( { text: JSON.stringify($scope.items.length) } );
})

'use strict';

var app = angular.module('noteApp', []);

app.controller('MainCtrl', function($scope) {
  $scope.items = localStorage.items ? JSON.parse(localStorage.items): [];
  $scope.backupItems = localStorage.backupItems ? JSON.parse(localStorage.backupItems): [];

  $scope.addItem = function() {
    if ($scope.newItem !== undefined) {
      if ($scope.items.length === 0 && $scope.backupItems.length !== 0) {
        $scope.needUndo = false;
      }
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
    angular.element('.item').addClass('zoomOutDown');
    setTimeout(deleteList, 1000);
    function deleteList() {
      localStorage.backupItems = JSON.stringify($scope.items);
      $scope.items = [];
      localStorage.items = JSON.stringify($scope.items);
      chrome.browserAction.setBadgeText ( { text: JSON.stringify($scope.items.length) } );
      $scope.needUndo = true;
      $scope.mouseOver = !$scope.mouseOver;
    }
  }
  $scope.hoverTrash = function() {
    $scope.mouseOver = !$scope.mouseOver;
  }
  $scope.restoreList = function() {
    localStorage.items = localStorage.backupItems;
    $scope.items = localStorage.backupItems ? JSON.parse(localStorage.backupItems): [];
    $scope.needUndo = false;
    $scope.mouseOver = !$scope.mouseOver;    
  }
  $scope.needUndo = false;
  $scope.mouseOver = false;
  $scope.itemCount = $scope.items.length;
  chrome.browserAction.setBadgeText ( { text: JSON.stringify($scope.items.length) } );
})

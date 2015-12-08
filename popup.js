'use strict';

var app = angular.module('noteApp', []);

app.controller('MainCtrl', function($scope) {
  // MIXPANEL ANALYTICS
  (function(e, b) {
    if (!b.__SV) {
      var a, f, i, g;
      window.mixpanel = b;
      b._i = [];
      b.init = function(a, e, d) {
        function f(b, h) {
          var a = h.split(".");
          2 == a.length && (b = b[a[0]], h = a[1]);
          b[h] = function() {
            b.push([h].concat(Array.prototype.slice.call(arguments, 0)))
          }
        }
        var c = b;
        "undefined" !== typeof d ? c = b[d] = [] : d = "mixpanel";
        c.people = c.people || [];
        c.toString = function(b) {
          var a = "mixpanel";
          "mixpanel" !== d && (a += "." + d);
          b || (a += " (stub)");
          return a
        };
        c.people.toString = function() {
          return c.toString(1) + ".people (stub)"
        };
        i = "disable time_event track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config people.set people.set_once people.increment people.append people.union people.track_charge people.clear_charges people.delete_user".split(" ");
        for (g = 0; g < i.length; g++) f(c, i[g]);
        b._i.push([a, e, d])
      };
      b.__SV = 1.2;
      a = e.createElement("script");
      a.type = "text/javascript";
      a.async = !0;
      a.src = "mixpanel-2-latest.min.js";
      f = e.getElementsByTagName("script")[0];
      f.parentNode.insertBefore(a, f)
    }
  })(document, window.mixpanel || []);
  mixpanel.init("bf030da9bb30afaf373f7b11d7eac8fa");
  // END OF MIXPANEL ANALYTICS

  $scope.items = localStorage.items ? JSON.parse(localStorage.items): [];
  $scope.backupItems = localStorage.backupItems ? JSON.parse(localStorage.backupItems): [];
  $scope.addItem = function() {
    mixpanel.track("User added an Item");
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

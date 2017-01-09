angular.module('tabClear').controller('tabsController', function($scope) {

  chrome.tabs.query({ currentWindow: true }, function(tabs) {
    $scope.tabs = tabs;
  });

  //attach listeners
  chrome.tabs.onMoved.addListener(function(tab, moveInfo) {
    debugger
    var swappedTab = $scope.tabs[moveInfo.toIndex],
      tabToMove = $scope.tabs[moveInfo.fromIndex];

    console.log('before', _.map($scope.tabs, function(tab) { return tab.id }))
    $scope.tabs[moveInfo.toIndex] = tabToMove;
    $scope.tabs[moveInfo.fromIndex] = swappedTab;
    console.log('after', _.map($scope.tabs, function(tab) { return tab.id }))
  });

  chrome.tabs.getCurrent(function(tab) {
    $scope.currentTab = tab.id;
  });

  $scope.removeFiltered = function removedFiltered(searchText) {
    var filteredTabs = _.map(this.filteredTabs, function(tab) { return tab.id });

    //exclude current tab from this list
    _.remove(filteredTabs, function(element) {
      return element == $scope.currentTabId
    });

    chrome.tabs.remove(filteredTabs)
    $scope.$emit('tabRemoved', filteredTabs);
    $scope.searchText = '';
  };

  $scope.$on('tabRemoved', function(event, tabIds) {
    console.log('removng tabIds', tabIds);
    console.log('before', _.map($scope.tabs, function(tab) { return tab.id }))
    _.remove($scope.tabs, function(tab) { return _.includes(tabIds, tab.id) });
    console.log('after', _.map($scope.tabs, function(tab) { return tab.id }))
  });
});

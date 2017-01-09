angular.module('tabClear').directive('tab', function() {
  return {
    restrict: 'E',
    templateUrl: 'src/templates/tab.html',
    scope: {
      tab: '='
    },
    link: function(scope, element) {
      scope.closeTab = function closeTab() {
        chrome.tabs.remove(this.tab.id)
        scope.$emit('tabRemoved', [this.tab.id]);
      };
    }
  }
});

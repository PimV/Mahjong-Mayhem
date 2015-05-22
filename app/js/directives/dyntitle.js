module.exports = function(['$rootScope', '$timeout',
  function($rootScope, $timeout) {
    return {
      link: function() {

        var listener = function(event, toState) {
          console.log("in listener");
          $timeout(function() {
            $rootScope.title = (toState.title) ? toState.title : 'Default title';
          });
        };

        $rootScope.$on('$stateChangeSuccess', listener);
      }
    };
  }
  ]);
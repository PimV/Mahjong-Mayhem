(function(){

  angular
       .module('games')
       .controller('GameController', [
          'gameService', '$mdSidenav', '$mdBottomSheet', '$log', '$q',
          UserController
       ]);

  /**
   * Main Controller for the Angular Material Starter App
   * @param $scope
   * @param $mdSidenav
   * @param avatarsService
   * @constructor
   */
  function UserController( gameService, $mdSidenav, $mdBottomSheet, $log, $q) {
    var self = this;

    self.selected     = null;
    self.games        = [ ];
    self.selectUser   = selectGame;
    self.toggleList   = toggleGamesList;
    //self.share        = share;

    // Load all registered games

    gameService
          .loadAllGames()
          .then( function( games ) {
            self.games    = [].concat(games);
            self.selected = games[0];
          });

    // *********************************
    // Internal methods
    // *********************************

    /**
     * First hide the bottomsheet IF visible, then
     * hide or Show the 'left' sideNav area
     */
    function toggleGamesList() {
      var pending = $mdBottomSheet.hide() || $q.when(true);

      pending.then(function(){
        $mdSidenav('left').toggle();
      });
    }

    /**
     * Select the current game
     * @param menuId
     */
    function selectGame ( game ) {
      self.selected = angular.isNumber(game) ? $scope.games[game] : game;
      self.toggleList();
    }

    /**
     * Show the bottom sheet
     */
    // function share($event) {
    //     var game = self.selected;

    //     $mdBottomSheet.show({
    //       parent: angular.element(document.getElementById('content')),
    //       templateUrl: '/src/games/view/contactSheet.html',
    //       controller: [ '$mdBottomSheet', UserSheetController],
    //       controllerAs: "vm",
    //       bindToController : true,
    //       targetEvent: $event
    //     }).then(function(clickedItem) {
    //       clickedItem && $log.debug( clickedItem.name + ' clicked!');
    //     });

    //     /**
    //      * Bottom Sheet controller for the Avatar Actions
    //      */
    //     function UserSheetController( $mdBottomSheet ) {
    //       this.user = user;
    //       this.items = [
    //         { name: 'Phone'       , icon: 'phone'       , icon_url: 'assets/svg/phone.svg'},
    //         { name: 'Twitter'     , icon: 'twitter'     , icon_url: 'assets/svg/twitter.svg'},
    //         { name: 'Google+'     , icon: 'google_plus' , icon_url: 'assets/svg/google_plus.svg'},
    //         { name: 'Hangout'     , icon: 'hangouts'    , icon_url: 'assets/svg/hangouts.svg'}
    //       ];
    //       this.performAction = function(action) {
    //         $mdBottomSheet.hide(action);
    //       };
    //     }
    // }

  }

})();

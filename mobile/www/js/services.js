angular.module('app.services', ['ngResource'])

.factory('BlankFactory', [function(){

}])

.factory('Bcard', function($resource) {
  var bcards =
  $resource("http://159.203.247.39:3000/bcards/:id.json", {bcard: 'bcards'},
  {
      update: { method:'PATCH', isArray: false},
      query: { method:'GET' , isArray: true},
      save: { method:'POST' , isArray: false}
  });
  return bcards;
})

.factory('Tag', function($resource) {
  return $resource("http://159.203.247.39:3000/tags/:id.json");
})

.factory('Deck', function($resource) {
  return $resource("http://159.203.247.39:3000/decks/:id.json");
})

.factory('Tagcard', function($resource) {
  return $resource("http://159.203.247.39:3000/tagcards/:id.json");
})

.factory('UserSession', function($resource) {
  return $resource("http://159.203.247.39:3000/users/sign_in.json");
})

.service('StudySession', function(){
  var total="0";
  var score="0";
  var tagcards=[];

})

.service('current_focus', function() {
  var current_card="";
  var current_deck="";


  var setCard = function(card) {
      current_card = card;
  }

  var setDeck = function(deck){
      current_deck = deck;
      // alert("Deck Set to " + current_deck);
  }

  var getCard = function(){
    // alert("Card Number: " + current_card);
    return current_card;
  }

  var getDeck = function(){
      // alert("Deck Number: " + current_deck);
      return current_deck;
  }

  return {
    setCard: setCard,
    setDeck: setDeck,
    getCard: getCard,
    getDeck: getDeck
  };

})

.service('BlankService', [function(){

}]);

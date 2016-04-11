angular.module('app.controllers', ['app.services'])

.controller('scheduleEventCtrl', function($scope) {

})

.controller('myEventsCtrl', function($scope) {

})

.controller('nearMeCtrl', function($scope) {

})

// .controller('LoginCtrl', function($scope, $location, Auth) {
//   $scope.login = function() {
//     var credentials = {
//         email: 'user@domain.com',
//         password: 'password1'
//     };
//     var config = {
//         headers: {
//             'X-HTTP-Method-Override': 'POST'
//         }
//     };
//
//     Auth.login(credentials, config).then(function(user) {
//         console.log(user); // => {id: 1, ect: '...'}
//     }, function(error) {
//         alert("authentication failed");
//     });
//
//     $scope.$on('devise:login', function(event, currentUser) {
//         // after a login, a hard refresh, a new tab
//         $location.path('/page1/tab2/page3');
//     });
//
//     $scope.$on('devise:new-session', function(event, currentUser) {
//         // user logged in by Auth.login({...})
//         alert("authentication successful");
//
//     });
//   }
// });


.controller('LoginCtrl', function($scope, $location, UserSession, $ionicPopup, $rootScope) {
$scope.data = {};

$scope.login = function() {
  var user_session = new UserSession({ user: $scope.data });
  // var user_session = new UserSession({ email: data.email, password: data.password });

  // window.localStorage['userId'] = data.id;
  // window.localStorage['userName'] = data.name;
  // user_session.$save()
  alert("Login");
  // alert(data.email);
  // alert(data.password);
  user_session.$save(
    function(data){
      window.localStorage['userId'] = data.id;
      window.localStorage['userName'] = data.name;
      $location.path('/page1/tab2/page3');
    },
    function(err){
      var error = err["data"]["error"] || err.data.join('. ')
      var confirmPopup = $ionicPopup.alert({
        title: 'An error occured',
        template: error
      });
    }
  );
}
})

.controller('signupCtrl', function($scope) {

})

.controller('signoutCtrl', function($scope, UserSession) {
  var session = UserSession.get({userId: window.localStorage['userId']});
  if ( session == 'undefined'){
    $location.path('/login');
    window.location.reload();
  }
  else {
  $http.delete('http://159.203.247.39:3000/users/sign_out', {
  auth_token: session.userId // just a cookie storing my token from devise token authentication.
  }).success( function(result) {
    $cookieStore.remove('_pf_session');
    $cookieStore.remove('_pf_name');
    $cookieStore.remove('_pf_email');
    location.reload(true); // I need to refresh the page to update cookies
  }).error( function(result) {
    console.log(result);
  });
})

.controller('searchBusinessCardsCtrl', function($scope, Bcard) {
  Bcard.query().$promise.then(function(response){
    $scope.bcards = response;
  });
  $scope.quantity = 6;
})

.controller('addTagsCtrl', function($scope, Tag) {
  Bcard.query().$promise.then(function(response){
    $scope.bcards = response;
  });
  Tag.query().$promise.then(function(response){
    $scope.tags = response;
  });
})

.controller('decksCtrl', function($scope, Deck) {
  Deck.query().$promise.then(function(response){
    $scope.decks = response;
  });
  $scope.quantity = 5;
})

.controller('viewDeckCtrl', function($scope, Deck, Bcard) {
  Deck.query().$promise.then(function(response){
    $scope.decks = response;
  });
  Bcard.query().$promise.then(function(response){
    $scope.bcards = response;
  });
  $scope.quantity = 6;
})

.controller('viewBusinessCardCtrl', function($scope, Bcard, UserSession, Tag) {
  if (UserSession.get({userId: window.localStorage['userId']}) == 'undefined'){
    $location.path('/login');
    window.location.reload();
  }
  else {
    Bcard.query().$promise.then(function(response){
      $scope.bcards = response;
    });
    Tag.query().$promise.then(function(response){
      $scope.tags = response;
    });
    $scope.orderProp = 'hits';
    $scope.quantity = 9;
  }
})

.controller('myCardCtrl', function($scope, Bcard, UserSession, $location, $ionicPopup, $rootScope) {
  // Bcard.query().$promise.then(function(response){
  //   $scope.bcards = response;
  // });
  // $scope.data={};
  if (UserSession.get({userId: window.localStorage['userId']}) == 'undefined'){
    $location.path('/login');
    window.location.reload();
  }
  else {
  Bcard.get({id: window.localStorage['userId']}).$promise.then(function(bcard) {
    $scope.bcard = bcard;
  });

  $scope.save_card = function() {
    var bcard = Bcard.get({id:window.localStorage['userId']});
    alert("Functional");
    // $scope.data={};
    // Bcard.get({id:"2"}, function(bcard, getResponseHeaders){
    //  var bcard = Bcard.get({id:"2"});
      bcard.pinterest = $scope.pinterest;
      // alert("Got!");
      Bcard.update({ id:window.localStorage['userId']}, bcard);
      $location.path('/page1/tab2/page3');
    }
  }
})

.controller('uploadImageCtrl', function($scope) {

})

.controller('eventCtrl', function($scope) {

})

.controller('studyCtrl', function($scope, Deck, Tagcard) {
  Deck.query().$promise.then(function(response){
    $scope.decks = response;
  });
  Tagcard.query().$promise.then(function(response){
    $scope.tagcards = response;
  });
})

.controller('eventSearchResultsCtrl', function($scope) {

})

.controller('studyDeckCtrl', function($scope, Deck, Tagcard, Bcard) {
  Deck.query().$promise.then(function(response){
    $scope.decks = response;
  });
  Tagcard.query().$promise.then(function(response){
    $scope.tagcards = response;
  });
  Bcard.query().$promise.then(function(response){
    $scope.bcards = response;
  });
})

.controller('studyResultsCtrl', function($scope) {

})

.controller('searchAttendeesCtrl', function($scope, Bcard) {
  Bcard.query().$promise.then(function(response){
    $scope.bcards = response;
  });
})

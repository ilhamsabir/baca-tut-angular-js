angular.module('baca-tut.services', ['firebase'])

.factory('OtherFriends', ['$firebase', function ($firebase) {

  var ref = new Firebase("https://kodejaiab.firebaseio.com/tbldepan");
  var sync = $firebase(ref);

  var otherfriends = sync.$asArray();

  return {
    all: function() {
      return otherfriends;
    },
    get: function(friendId) {
      // Simple index lookup
      return otherfriends[friendId];
    }
  }
}])
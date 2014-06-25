App = Ember.Application.create();

App.Router.map(function() {
  this.resource('playlists', function() {
    this.resource('playlist', { path: ':playlist_id'});
  });
	this.resource('about');
});

App.PlaylistsRoute = Ember.Route.extend({
  model: function() {
    return playlists;
  }
});

App.PlaylistRoute = Ember.Route.extend({
  model: function(params) {
    return playlists.findBy('id', params.playlist_id);
  }
})
var playlists = [{
  id: '1',
  title: "kpop",
  author: { name: "d2h" },
  date: new Date('12-27-2012'),
  listener_count: 18
  }, {
  id: '2',
  title: "The Parley Letter",
  author: { name: "d2h" },
  date: new Date('12-24-2012'),
  listener_count: 20
}];
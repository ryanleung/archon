App = Ember.Application.create();
App.ApplicationAdapter = DS.FixtureAdapter.extend();

App.Router.map(function() {
  this.resource('playlist', { path: 'playlist/:playlist_id'});
});

App.ApplicationRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('playlist');
  }
});

App.PlaylistRoute = Ember.Route.extend({
  model: function(params) {
    return playlists.findBy('id', params.playlist_id);
  }
});

App.Playlist = DS.Model.extend({
  title: DS.attr('string'),
  watcher_count: DS.attr('number'),
  videos: DS.hasMany('video')
});

App.Video = DS.Model.extend({
  title: DS.attr('string'),
  playlist: DS.belongsTo('playlist')
});

App.Playlist.FIXTURES = [
  {
    id: 1,
    title: "kpop",
    watcher_count: 18,
    videos: [1, 2]
  },
  {
    id: 2,
    title: "The Parley Letter",
    watcher_count: 20,
  }
];

App.Video.FIXTURES = [
  {
    id: 1,
    title: "shawshank",
  },
  {
    id: 2,
    title: "game of thrones",
  }
];
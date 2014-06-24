App = Ember.Application.create();
App.ApplicationAdapter = DS.FixtureAdapter.extend();

// Router
App.Router.map(function() {
  this.resource('playlist',  { path: '/playlist/:playlist_id' });
});

App.ApplicationRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('playlist');
  }
});

App.PlaylistRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('playlist', params.playlist_id);
  },
  renderTemplate: function() {
    this.render({ outlet: 'tracks' });
  }
});

// Model
App.Playlist = DS.Model.extend({
  name: DS.attr('string'),
  songs: DS.attr('number'),
  listeners: DS.attr('number'),
  pluralizeSongs: function() {
    return this.get('songs') == 1 ? 'song' : 'songs';
  }.property('songs'),
  noListeners: function() {
    return this.get('listeners') == 0;
  }.property('listeners'),
  tracks: function() {
    return this.store.find('track', { playlist_id: this.get('id') });
  }.property('tracks', 'id')
});

App.Playlist.FIXTURES = [
 {
   id: 1,
   name: 'kpop',
   songs: 18,
   listeners: 8
 },
 {
   id: 2,
   name: 'playlist 2',
   songs: 2,
   listeners: 3
 },
 {
   id: 3,
   name: 'empty playlist',
   songs: 0,
   listeners: 0
 }
];

App.Track = DS.Model.extend({
  title: DS.attr('string'),
  artist: DS.attr('string'),
  link: DS.attr('string'),
  art_link: DS.attr('string'),
  duration: DS.attr('number'),
  playlist_id: DS.attr('number')
});

App.Track.FIXTURES = [
  {
    id: 1,
    title: "Super Junior&Girls' Generation 소녀시대&슈퍼주니어_SEOUL(서울)_MUSIC VIDEO",
    artist: 'SMTOWN',
    link: 'link',
    art_link: 'http://i.ytimg.com/vi/afrwtA_Bfc8/1.jpg',
    duration: 254,
    playlist_id: 1
  }
];

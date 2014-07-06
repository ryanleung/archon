App = Ember.Application.create();
App.ApplicationAdapter = DS.FixtureAdapter.extend();
id_count = 3;
App.Router.map(function() {
  this.resource('about');
  this.resource('home');
  this.resource('playlist', { path: 'playlist/:playlist_id'});
});

App.ApplicationRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('playlist');
  },

  actions: {
    addPlaylist: function(playlist_name) {
      this.get('store').push('playlist', {id: id_count, title: playlist_name})
      id_count += 1;
    },
    addVideo: function() {
      alert("hi");
    }
  }
});


AViewWithLayout = Ember.View.extend({
  name: 'Teddy',
  layoutName: 'my_layout',
  templateName: 'my_content'
});



App.Playlist = DS.Model.extend({
  title: DS.attr('string'),
  watcher_count: DS.attr('number'),
  videos: DS.hasMany('video', {async: true}),
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
    videos: [3]
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
  },
  {
    id: 3,
    title: "wut",
  }
];
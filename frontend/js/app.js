App = Ember.Application.create();
App.ApplicationAdapter = DS.FixtureAdapter.extend();
id_count = 3;
App.Router.map(function() {
  this.resource('about');
  this.resource('home');
  this.resource('playlist', { path: 'playlist/:playlist_id'},
    function() {
      this.resource('video', {path: 'video/:video_id'})
    }
  );
});

App.ApplicationRoute = Ember.Route.extend({
  searchResults: [],

  model: function() {
    return this.store.find('playlist');
  },

  actions: {
    addPlaylist: function(playlist_name) {
      this.get('store').push('playlist', {id: id_count, title: playlist_name})
      id_count += 1;
    },
    youtubeSearch: function(search_query) {
      api_key = "AIzaSyAhe1BqglbuLH3s2ZUBacjEoxTQ7ZKD0-k"
      result = $.get("https://www.googleapis.com/youtube/v3/search", 
                      { key: api_key,
                        part: "snippet",
                        q: search_query
                      },
                      function(data) {
                        searchResults = data.items
                      }
                    ); 

    }
  }
});

App.Playlist = DS.Model.extend({
  title: DS.attr('string'),
  watcher_count: DS.attr('number'),
  videos: DS.hasMany('video', {async: true}),
});

App.Video = DS.Model.extend({
  title: DS.attr('string'),
  playlist: DS.belongsTo('playlist'),
  url: DS.attr('string')
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
    title: "nightblue3 game",
    url: "//www.youtube.com/embed/rqtr_RvR3sY"
  },
  {
    id: 2,
    title: "poker phil helmuth",
    url: "//www.youtube.com/embed/TJvtPnKLQ34"
  },
  {
    id: 3,
    title: "gangnam style",
    url: "//www.youtube.com/embed/rqtr_RvR3sY"
  }
];
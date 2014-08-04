// app.js
// This file is responsible for the main logic of the Ember Application.
// This is designed to be broken up into different files once we get the
// hang of things. (ex. all of the controllers will be in controllers.js,
// models in models.js, etc.)
// Right now, this file is in chronological order with how the application runs.


/**
---- APP INITIALIZATION ----
This section deals with instantiating the Ember application and
sets up custom options, like whether or not to use a fixture
for the DB.
**/
App = Ember.Application.create();
App.ApplicationAdapter = DS.FixtureAdapter.extend();

/**
---- APP ROUTER ----
This section deals with setting up the router. The router is 
responsible for setting up routes. Routes are responsible
for linking the current url to its respective controller.
(ex. www.app.com/playlist => PlaylistRoute => PlaylistController)
**/
App.Router.map(function() {
  this.resource('about');
  this.resource('home');
  this.resource('playlist', {path: 'playlist/:playlist_id'},
    function() {
      this.resource('video', {path: 'video/:video_id'})
    }
  );
});

/**
---- APP ROUTES ----
This section deals with defining routes. Routes are responsible
for initial setup of the controllers and rendering the appropriate
template to the screen using {{outlet}}

ex., initial setup
App.IndexRoute = Ember.Route.extend({
  setupController: function(controller) {
    // Set the IndexController's `title`
    controller.set('title', "My App");
  }
});

ex., rendering template
App.PostsRoute = Ember.Route.extend({
  renderTemplate: function() {
    this.render('favoritePost');
  }
});
**/

var id_count = 3; // hacky way to keep track of the number of playlists for now

App.ApplicationRoute = Ember.Route.extend({ // This route gets called every time the app loads
  model: function() {
    return this.store.find('playlist');
  }
});

App.IndexRoute = Ember.Route.extend({ // This route gets called when '/' path is loaded

});

App.PlaylistRoute = Ember.Route.extend({ // This route gets called when '/playlist' path is loaded
  model: function(params) {
    return this.store.find('playlist', params.playlist_id);
  },
  renderTemplate: function() {
    this.render('theatre', {outlet: 'theatre'});
    this.render('search_bar', {outlet: 'search_bar'});
  }
});

App.VideoRoute = Ember.Route.extend({ // This route gets called when '/playlist/:playlist_id/video' path is loaded
  model: function() {
    return this.store.find('video');
  }
});

/**
---- APP CONTROLLERS ----
This section deals with defining controllers. Controllers
are responsible for giving stuff to the templates to display,
and their logics are used after being routed to by their respective
route (ex. App.PlaylistRoute calls App.PlaylistController)

ex. 
App.SongController = Ember.ObjectController.extend({
  soundVolume: 1
});
**/

App.ApplicationController = Ember.ArrayController.extend({
  actions: {
    addPlaylist: function(playlist_name) {
      this.get('store').push('playlist', {id: id_count, title: playlist_name});
      id_count += 1;
    }
  }
});

App.IndexController = Ember.ObjectController.extend({

});

App.PlaylistController = Ember.ObjectController.extend({
  actions: {
    videoSearch: function(search_query) {
      searchResults = [{etag: "FOuwADrXJjsTKgUIQJoQC6nKNFY/7BoRtJF13QuMNFxwC3Ec8xUPaCc", description: "TAEYANG - 눈,코,입 (EYES, NOSE, LIPS) M/V] #TAEYANG #RISE #EYESNOSELIPS * 눈, 코, 입(EYES, NOSE, LIPS) COVER PROJECT BY YOU Submission ...", url: "https://i.ytimg.com/vi/UwuAPyOImoI/default.jpg", title: "TAEYANG - 눈,코,입 (EYES, NOSE, LIPS) M/V", videoId: "UwuAPyOImoI"},
                       {etag: "FOuwADrXJjsTKgUIQJoQC6nKNFY/7BoRtJF13QuMNFxwC3Ec8xUPaCc", description: "TAEYANG - 눈,코,입 (EYES, NOSE, LIPS) M/V] #TAEYANG #RISE #EYESNOSELIPS * 눈, 코, 입(EYES, NOSE, LIPS) COVER PROJECT BY YOU Submission ...", url: "https://i.ytimg.com/vi/UwuAPyOImoI/default.jpg", title: "TAEYANG - 눈,코,입 (EYES, NOSE, LIPS) M/V", videoId: "UwuAPyOImoI"}];

    },
    youtubeSearch: function(search_query) {
      searchResults = [{etag: "FOuwADrXJjsTKgUIQJoQC6nKNFY/7BoRtJF13QuMNFxwC3Ec8xUPaCc", description: "TAEYANG - 눈,코,입 (EYES, NOSE, LIPS) M/V] #TAEYANG #RISE #EYESNOSELIPS * 눈, 코, 입(EYES, NOSE, LIPS) COVER PROJECT BY YOU Submission ...", url: "https://i.ytimg.com/vi/UwuAPyOImoI/default.jpg", title: "TAEYANG - 눈,코,입 (EYES, NOSE, LIPS) M/V", videoId: "UwuAPyOImoI"},
                       {etag: "FOuwADrXJjsTKgUIQJoQC6nKNFY/7BoRtJF13QuMNFxwC3Ec8xUPaCc", description: "TAEYANG - 눈,코,입 (EYES, NOSE, LIPS) M/V] #TAEYANG #RISE #EYESNOSELIPS * 눈, 코, 입(EYES, NOSE, LIPS) COVER PROJECT BY YOU Submission ...", url: "https://i.ytimg.com/vi/UwuAPyOImoI/default.jpg", title: "TAEYANG - 눈,코,입 (EYES, NOSE, LIPS) M/V", videoId: "UwuAPyOImoI"}];
      //$('#myResults').append("<ul>")
      for (i = 0; i < searchResults.length; i++) {
        //$('#myResults').append("<li>");
        title = searchResults[i].title;
        image = searchResults[i].url;
        this.get('store').createRecord('video', {title: title})
        //$('#myResults').append("<img src=" + image + ">" + title);
        //$('#myResults').append('<button {{action "addVideo"}}>+</button>')
        //$('#myResults').append("</li>");
      //$('#myResults').append("</ul>");
    //   api_key = "AIzaSyAhe1BqglbuLH3s2ZUBacjEoxTQ7ZKD0-k"
    //   result = $.get("https://www.googleapis.com/youtube/v3/search", 
    //                   { key: api_key,
    //                     part: "snippet",
    //                     q: search_query
    //                   },
    //                   function(data) {
    //                     searchResults = data.items;
    //                     for (i = 0; i < searchResults.length; i++) {
    //                       $('#myResults').append(searchResults[i].snippet.title);
    //                     }
    //                   }
    //                 ); 
      }
    }
  }
});

App.VideoController = Ember.ObjectController.extend({

});

/**
---- APP MODELS ----
This secion deals with defining models. Models are responsible
for defining objects that will be persisted and used by the
controllers

ex. 
App.Person = DS.Model.extend({
  firstName: attr(),
  lastName: attr(),
  birthday: attr()
});
**/

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

/**
---- APP VIEWS ----
This section deals with defining views.

ex.
var view = Ember.View.create({
  templateName: 'say-hello',
  name: "Bob"
});
**/

App.SearchView = Ember.View.create({
  templateName: 'search',
  name: "test1"
});

/**
---- APP FIXTURES ----
Temporary DB objects
**/

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
    url: "//www.youtube.com/embed/3-hz4HRcbzM"
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


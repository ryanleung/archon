App = Ember.Application.create();

App.Router.map(function() {
	this.resource('about');
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
  }]
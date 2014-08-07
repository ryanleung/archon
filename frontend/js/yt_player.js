var YoutubePlayer = function() {};

YoutubePlayer.prototype.init = function() {
    var youtube_params = { allowScriptAccess: "always" };
    var youtube_atts = { id: "youtube-player" };
    swfobject.embedSWF("http://www.youtube.com/apiplayer?enablejsapi=1&version=3",
      "youtube-player", "854", "480", "8", null, null, youtube_params, youtube_atts);
}

/* Youtube Player Callbacks */
function onYouTubePlayerReady(playerId) {
    alert('hi');
    debugger;
    player.youtube_player = $('#youtube-player').get(0);
    player.youtube_player.addEventListener('onStateChange', 'onYouTubeStateChange');
}

$(function() {
    yt_player = new YoutubePlayer();
    yt_player.init();
});

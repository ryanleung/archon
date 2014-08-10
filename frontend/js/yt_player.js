/**
yt_player.js
Youtube Player
https://developers.google.com/youtube/iframe_api_reference
**/

var onYouTubeIframeAPIReady;

var YoutubePlayer = function() {
    // this isn't put under the usual scripts in index.html because it has to be
    // loaded asynchronously. We could have also done <script async src='https//www.youtube...'
    var tag = $('<script></script>').attr('src', 'https://www.youtube.com/iframe_api');
    $('body').append(tag);
    
    onYouTubeIframeAPIReady = function() {
        this.player = new YT.Player('youtube-player', {
            height: '390',
            width: '640',
            playerVars: {'controls': 0},
            events: {
                'onReady' : function() {}, // this should set some sort of bool indicating that the player is ready.
                                           // If it isn't ready we can't play anything yet. 
                'onStateChange' : function() {}
            }
        });
    }.bind(this);
};

YoutubePlayer.prototype.play = function() {
    this.player.playVideo();
}

YoutubePlayer.prototype.cueVideo = function(video_id) {
    this.player.cueVideoById(video_id);
}

YoutubePlayer.prototype.stop = function() {
    this.player.stopVideo();
}
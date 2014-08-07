var youtubePlayer;

// this isn't put under the usual scripts in index.html because it has to be
// loaded asynchronously. We could have also done <script async src='https//www.youtube...'
var tag = $('<script></script>').attr('src', 'https://www.youtube.com/iframe_api');
$('body').append(tag);

function onYouTubeIframeAPIReady() {
    youtubePlayer = new YT.Player('youtube-player', {
        height: '390',
        width: '640',
        videoId: 'M7lc1UVf-VE',
        events: {
            'onReady' : function() {},
            'onStateChange' : function() {}
        }
    });
}
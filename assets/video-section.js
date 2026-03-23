/**
 * Buenacopa Theme - Video Section
 * Handles: play/pause, single-video-at-a-time, click-to-load (no preload)
 */

document.addEventListener('DOMContentLoaded', function () {
  var activeVideo = null;
  var videoCards = document.querySelectorAll('.video-card');

  videoCards.forEach(function (card) {
    var video = card.querySelector('video');
    var playIcon = card.querySelector('.play-icon');
    var pauseIcon = card.querySelector('.pause-icon');

    if (!video) return;

    card.addEventListener('click', function () {
      // Load video src on first click if not yet loaded
      if (!video.src && video.dataset.src) {
        video.src = video.dataset.src;
        video.removeAttribute('data-src');
      }

      if (video.paused) {
        // Pause any currently playing video
        if (activeVideo && activeVideo !== video) {
          activeVideo.pause();
          var activeCard = activeVideo.closest('.video-card');
          if (activeCard) {
            var prevPlay = activeCard.querySelector('.play-icon');
            var prevPause = activeCard.querySelector('.pause-icon');
            var prevBtn = activeCard.querySelector('.video-play-btn');
            if (prevPlay) prevPlay.style.display = '';
            if (prevPause) prevPause.style.display = 'none';
            if (prevBtn) prevBtn.classList.remove('opacity-0', 'group-hover:opacity-100');
          }
        }

        video.muted = false;
        video.play();
        activeVideo = video;
        if (playIcon) playIcon.style.display = 'none';
        if (pauseIcon) pauseIcon.style.display = '';
        var btn = card.querySelector('.video-play-btn');
        if (btn) {
          btn.classList.add('opacity-0');
          btn.classList.add('group-hover:opacity-100');
        }
      } else {
        video.pause();
        activeVideo = null;
        if (playIcon) playIcon.style.display = '';
        if (pauseIcon) pauseIcon.style.display = 'none';
        var btn = card.querySelector('.video-play-btn');
        if (btn) {
          btn.classList.remove('opacity-0', 'group-hover:opacity-100');
        }
      }
    });
  });
});

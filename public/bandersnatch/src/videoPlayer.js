class VideoMediaPlayer {
  constructor() {
    this.videoElement = null;
    this.sourceBuffer = null;
  }

  initializeCodec() {
    this.videoElement = document.getElementById("vid");
    const mediaSourceSupported = !!window.MediaSource;

  }
}
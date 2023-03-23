class VideoMediaPlayer {
  constructor({ manifestJSON }) {
    this.manifestJSON = manifestJSON;
    this.videoElement = null;
    this.sourceBuffer = null;
  }

  initializeCodec() {
    this.videoElement = document.getElementById("vid");
    const mediaSourceSupported = !!window.MediaSource;
    if(!mediaSourceSupported) {
      alert('This browser or system do not support a MSE')
      return;
    }

    const codecSupported = MediaSource.isTypeSupported(this.manifestJSON.codec);
    if(!codecSupported) {
      alert(`This browser do not support the codec: ${this.manifestJSON.codec}` );
    }
  }
}
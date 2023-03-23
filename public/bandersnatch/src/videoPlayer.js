class VideoMediaPlayer {
  constructor({ manifestJSON, network }) {
    this.manifestJSON = manifestJSON;
    this.videoElement = null;
    this.sourceBuffer = null;
    this.selected = {};
    this.network = network;
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
      return;
    }

    const mediaSource = new MediaSource();
    this.videoElement.src = URL.createObjectURL(mediaSource);

    mediaSource.addEventListener("sourceopen", this.sourceOpenWrapper(mediaSource))

  }

  sourceOpenWrapper(mediaSource) {
    return async(_) => {
      this.sourceBuffer = mediaSource.addSourceBuffer(this.manifestJSON.codec);
      const selected = this.selected = this.manifestJSON.intro
      //Evita rodar como LIVE
      mediaSource.duration = 0;
      await this.fileDownload(selected.url)

    }
  }

  async fileDownload(url) {
    const prepareUrl = {
      url,
      fileResolution: 360,
      fileResolutionTag: this.manifestJSON.fileResolutionTag,
      hostTag: this.manifestJSON.hostTag
    }

    const finalUrl = this.network.parseManifestURL(prepareUrl)
    console.log('finalURL: ', finalUrl)
  }
}
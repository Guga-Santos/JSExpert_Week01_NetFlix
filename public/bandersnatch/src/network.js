class Network {
  constructor({ host }) {
    this.host = host;
  }

  parseManifestUrl({ url, fileResolution, fileResolutionTag, hostTag }) {
    return url.replace(fileResolutionTag, fileResolution)
              .replace(hostTag, this.host)
  }
}
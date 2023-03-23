class Network {
  constructor({ host }) {
    this.host = host;
  }

  parseManifestURL({ url, fileResolution, fileResolutionTag, hostTag }) {
    return url.replace(fileResolutionTag, fileResolution)
              .replace(hostTag, this.host)
  }

  async fetchFile(url) {
    const response = await fetch(url);
    return response.arrayBuffer()
  }

  async getProperResolution(url) {
    const startMs = Date.now()
    const response = await fetch(url)
    await response.arrayBuffer()

    const endMs = Date.now()
    const durationInMs = (endMs - startMs)
    console.log('durationInMs',durationInMs)

    // Ao invés de calcular o throughtPut, vamos calcular o tempo.
    const resolutions = [
      { start: 3000, end: 20000, resolution: 144},
      { start: 9, end: 30, resolution: 360},
      { start: 0, end: 9, resolution: 720},
    ]

    const item = resolutions.find((item) => {
      return item.start <= durationInMs && item.end >= durationInMs
    })

    const LOWEST_RESOLUTION = 144;
    // Se for mais de 20 segundos,retorna a resolução mais baixa.
    if(!item) return LOWEST_RESOLUTION;

    return item.resolution;
  }
}
const isTimeVersion = (version) => {
  return !!version.match(/\d{8}\.\d{6}Z(?:-(?:alpha|beta|rc)\.\d+)?$/)
}

export { isTimeVersion }
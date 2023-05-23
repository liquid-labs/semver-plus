import { TIMEVER_REGEX } from './constants'

const isTimeVersion = (version) => {
  return !!version.match(TIMEVER_REGEX)
}

export { isTimeVersion }

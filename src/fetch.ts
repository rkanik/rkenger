import { FetchAPI } from 'vuelpers'
import { apiBaseURL } from './consts'

const fetch = new FetchAPI({ baseURL: apiBaseURL })
const viaCallback = fetch.toCallback

export { fetch, viaCallback }

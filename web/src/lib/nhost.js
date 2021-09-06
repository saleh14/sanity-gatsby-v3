import { createClient } from 'nhost-js-sdk'

const config = {
  baseURL: 'https://backend-86297f6e.nhost.app',
}

const { auth, storage } = createClient(config)

export { auth, storage }

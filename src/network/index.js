import * as serverapi from './serveapi'
import * as userapi from './user'
export default {
  ...serverapi,
  ...userapi
}

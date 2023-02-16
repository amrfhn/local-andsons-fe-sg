import * as Analytics from '@/api/analytics'
import * as QS from 'querystring'

let _current

export function getCurrent() {
  if (!_current) {
    _current = Service({ api: { baseURL: process.env.VUE_APP_API_BASE_URL_V2, timeout: 5000 } })
  }

  return _current
}

export function collectQSMetadata(window) {
  const qs = (window.location.search && QS.parse(window.location.search.substring(1))) || {}

  // HACK: Google has just rolled out 2 more tracking id's in response to the release of iOS 14.5
  // which limits a marketers ability to track a user's journey through different properties
  // we're starting to see these values come through our query strings but they don't seem to
  // include utm_source values which makes it hard for us to then work out the effectiveness of
  // some of our paid marketing.
  // for the time-being we'll inject the utm_source if it doesn't exist.
  const IS_GOOGLE_SOURCED = qs.gbraid || qs.gclid || qs.wbraid
  if (IS_GOOGLE_SOURCED && !qs.utm_source) {
    qs.utm_source = 'google'
  }

  return {
    ...qs,
    origin: window.location?.pathname,
    referrer: window.document?.referrer || ''
  }
}

function Service(config) {
  if (!config) {
    throw ReferenceError('config')
  }

  const analytics = Analytics.Service(config)

  async function page(eventName, properties = {}) {
    // check if this event has been whitelisted for inclusion of extra data - this is typically where we
    // look through the query strings for UTM tags and extra parameters from advertisers.
    await analytics.page(eventName, properties)
  }

  async function track(eventName, properties = {}) {
    await analytics.track(eventName, properties)
  }

  return { page, track }
}

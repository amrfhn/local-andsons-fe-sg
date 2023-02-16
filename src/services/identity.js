import * as Identity from '@/api/identity'
import store from '@/store'

const AUTH_ALIAS = 'andsons_token'
const AUTH_HEADER_ALIAS = 'Authorization'
const DEVICE_ID_ALIAS = 'odid'
const DEVICE_ID_HEADER_ALIAS = 'x-did'
const SESSION_ID_ALIAS = 'osid'
const SESSION_ID_HEADER_ALIAS = 'x-sid'
const TIKTOK_CLICK_ID_ALIAS = 'tiktok-clid'

const TRACKING_COOKIES = new Map([
  ['_fbc', 'fbq-click'],
  ['_fbp', 'fbq-browser'],
  ['_ga', 'google-analytics'],
  ['_ttp', 'tiktok-pixel']
])

/**
 * Kicks off the first call to our backend to grab essential identifiers.
 */
export const initialize = async () => {
  try {
    // retrieve device and session metadata.
    await hello()

    // store alt-identifiers for this device & user combination.
    await tryStoreIdentities()

    // Initialize FB Pixel if user is logged in
    const userHash = store.getters.getUserHash
    if (userHash) {
      window.fbq('init', process.env.VUE_APP_FB_PIXEL, {
        external_id: userHash
      })
    }
  } catch (error) {
    console.error('General error with communicating with backend.', error)
  }
}

export function getRequiredIds() {
  const authToken = localStorage.getItem(AUTH_ALIAS) || ''

  const deviceId = localStorage.getItem(DEVICE_ID_ALIAS) || ''

  // if we don't have a deviceId, let's just ditch the sessionId and get a new set.
  const sessionId = (deviceId && sessionStorage.getItem(SESSION_ID_ALIAS)) || ''

  return {
    [AUTH_HEADER_ALIAS]: authToken,
    [DEVICE_ID_HEADER_ALIAS]: deviceId,
    [SESSION_ID_HEADER_ALIAS]: sessionId
  }
}

function getTrackingIds() {
  if (!document.cookie) {
    return undefined
  }

  const trackingCookies = document.cookie.split('; ').reduce((previous, current) => {
    const kv = current.split('=')
    const identityName = TRACKING_COOKIES.get(kv[0])
    if (!identityName) {
      return previous
    }

    previous[identityName] = kv[1]
    return previous
  }, {})

  if (!trackingCookies || Object.keys(trackingCookies).length < 1) {
    return undefined
  }

  // Check for TikTok click ID
  const tiktokID = getTikTokClickId()

  if (tiktokID) {
    trackingCookies[TIKTOK_CLICK_ID_ALIAS] = tiktokID
  }

  return trackingCookies
}

function getTikTokClickId() {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop)
  })
  // Get ttclid from query params
  const ttclid = params.ttclid
  return ttclid ?? null
}

async function hello() {
  // retrieve id's that have been stored in local and session storage
  // and hand that over to the "hello" endpoint, so we can work out what ids
  // should be kept and what should be discarded.
  const headers = getRequiredIds()

  const response = await Identity.hello(headers)
  if (!response) {
    return
  }

  // store device token in local storage for long-term
  tryStoreDeviceToken(response.device)

  // store session token in session storage so it's cleaned up
  // when the tab is closed.
  tryStoreSessionToken(response.sessionId)
}

/**
 * Stored alt-identifiers against a device or user.
 * @returns {Promise<boolean>}
 */
export async function tryStoreIdentities() {
  // pull up critical identifiers
  // this is required for storing identities
  const headers = getRequiredIds()
  if (!headers) {
    return false
  }

  // pull up trackingId's that we'll then store and use for server-to-server
  // communication.
  const identities = getTrackingIds()

  if (!identities) {
    return false
  }

  return Identity.storeIdentities(headers, identities)
}

function tryStoreDeviceToken(device) {
  if (!device) {
    return false
  }

  const deviceId = device.id

  // check if we have a deviceId stored already
  // if we do, we'll want to make sure that we're only updating the local storage
  // WHEN the deviceId's are not the same.
  const existingDeviceId = localStorage.getItem(DEVICE_ID_ALIAS)
  if (deviceId === existingDeviceId) {
    return false
  }

  localStorage.setItem(DEVICE_ID_ALIAS, deviceId)
  return true
}

function tryStoreSessionToken(sessionId) {
  if (!sessionId) {
    return false
  }

  try {
    sessionStorage.setItem(SESSION_ID_ALIAS, sessionId)
    return true
  } catch (error) {
    console.error('Failed to store value in session storage', SESSION_ID_ALIAS)
    return false
  }
}

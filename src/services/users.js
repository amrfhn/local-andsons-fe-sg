import { getMyProfile } from '@/api/users'
import store from '@/store/index.js'
import { trackUpdateProfile } from '@/utils/analytics.js'

/**
 * If the user token exist in local storage,
 * fetch the user profile and store it into vuex
 */
export const fetchProfile = async () => {
  if (localStorage.getItem('andsons_token')) {
    try {
      let response = await getMyProfile()
      let user = response.data.response.user
      store.commit('updateUserProfile', response.data.response.user)

      trackUpdateProfile(window, user)
    } catch (e) {
      console.error(e)
    }
  }
}

/**
 * This is a temporary fix to force the deletion of user profile
 * from any locked in user's profile
 *
 * @todo remove after 01 January 2022
 */
export const forceRemoveUserProfileInLocalStorage = () => {
  if (localStorage.getItem('andsons_userProfile')) {
    localStorage.removeItem('andsons_userProfile')
  }
}

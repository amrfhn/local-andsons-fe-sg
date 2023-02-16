import '@/assets/styles/main.scss'
import * as IdentityService from '@/services/identity.js'
import * as usersService from '@/services/users.js'
import { library } from '@fortawesome/fontawesome-svg-core'
import 'aos/dist/aos.css'
import Vue from 'vue'
import IosArrowForwardIcon from 'vue-ionicons/dist/ios-arrow-forward.vue'
import App from './App.vue'
import router from './router'
import './sentry'
import store from './store'

import { faComments, faQuestionCircle } from '@fortawesome/free-regular-svg-icons'

import {
  faFacebookSquare,
  faGoogle,
  faInstagram,
  faLinkedin,
  faTwitterSquare,
  faYoutube
} from '@fortawesome/free-brands-svg-icons'
import { faStar as faRegularStar } from '@fortawesome/free-regular-svg-icons'
import {
  faArrowLeft,
  faArrowRight,
  faCheck,
  faCheckCircle,
  faChevronRight,
  faCircle,
  faDotCircle,
  faEnvelope,
  faExclamationCircle,
  faEye,
  faEyeSlash,
  faMapMarkerAlt,
  faMinus,
  faPhoneAlt,
  faPlus,
  faSearch,
  faSpinner,
  faStar,
  faStarHalfAlt,
  faTimes
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueMeta from 'vue-meta'

//Plugins
import Animate from 'animate.css'
import Aos from 'aos'
import Calendar from 'v-calendar/lib/components/calendar.umd'

Vue.config.productionTip = false

library.add(faFacebookSquare)
library.add(faChevronRight)
library.add(faCircle)
library.add(faCheckCircle)
library.add(faComments)
library.add(faDotCircle)
library.add(faQuestionCircle)
library.add(faExclamationCircle)
library.add(faGoogle)
library.add(faPlus)
library.add(faMinus)
library.add(faArrowRight)
library.add(faArrowLeft)
library.add(faEyeSlash)
library.add(faEye)
library.add(faMapMarkerAlt)
library.add(faPhoneAlt)
library.add(faEnvelope)
library.add(faCheck)
library.add(faSearch)
library.add(faTimes)
library.add(faInstagram)
library.add(faTwitterSquare)
library.add(faLinkedin)
library.add(faYoutube)
library.add(faStar)
library.add(faRegularStar)
library.add(faStarHalfAlt)
library.add(faSpinner)

Vue.component('IconArrowRight', IosArrowForwardIcon)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('v-calendar', Calendar)

Vue.directive('click-outside', {
  bind: function(el, binding, vnode) {
    el.clickOutsideEvent = function(event) {
      // check that click was outside the el and its children
      if (!(el == event.target || el.contains(event.target))) {
        // and if it did, call method provided in attribute value
        vnode.context[binding.expression](event)
      }
    }
    document.body.addEventListener('click', el.clickOutsideEvent)
  },
  unbind: function(el) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  }
})

//Prototypes (accessible everywhere in Vue Instance)
Vue.prototype.window = window

Vue.use(Animate)
Vue.use(Aos)
Vue.use(VueMeta)

export const eventBus = new Vue()

Vue.config.productionTip = false

window.insider_object = {}

const mountApplication = () => {
  new Vue({
    router,
    store,
    created: async function() {
      !(function(w, d, t) {
        w.TiktokAnalyticsObject = t
        var ttq = (w[t] = w[t] || [])
        ;(ttq.methods = [
          'page',
          'track',
          'identify',
          'instances',
          'debug',
          'on',
          'off',
          'once',
          'ready',
          'alias',
          'group',
          'enableCookie',
          'disableCookie'
        ]),
          (ttq.setAndDefer = function(t, e) {
            t[e] = function() {
              t.push([e].concat(Array.prototype.slice.call(arguments, 0)))
            }
          })
        for (var i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i])
        ;(ttq.instance = function(t) {
          for (var e = ttq._i[t] || [], n = 0; n < ttq.methods.length; n++) ttq.setAndDefer(e, ttq.methods[n])
          return e
        }),
          (ttq.load = function(e, n) {
            var i = 'https://analytics.tiktok.com/i18n/pixel/events.js'
            ;(ttq._i = ttq._i || {}),
              (ttq._i[e] = []),
              (ttq._i[e]._u = i),
              (ttq._t = ttq._t || {}),
              (ttq._t[e] = +new Date()),
              (ttq._o = ttq._o || {}),
              (ttq._o[e] = n || {})
            n = document.createElement('script')
            ;(n.type = 'text/javascript'), (n.async = !0), (n.src = i + '?sdkid=' + e + '&lib=' + t)
            e = document.getElementsByTagName('script')[0]
            e.parentNode.insertBefore(n, e)
          })

        ttq.load(process.env.VUE_APP_TIKTOK_PIXEL_ID)
        ttq.page()
      })(window, document, 'ttq')
      ;(function(w, d, s, l, i) {
        w[l] = w[l] || []
        w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' })
        var f = d.getElementsByTagName(s)[0],
          j = d.createElement(s),
          dl = l != 'dataLayer' ? '&l=' + l : ''
        j.async = true
        j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl
        f.parentNode.insertBefore(j, f)
      })(window, document, 'script', 'dataLayer', process.env.VUE_APP_GOOGLE_TAG_MANAGER)

      const noscript = document.createElement('noscript')
      const iframe = document.createElement('iframe')
      iframe.src = `https://www.googletagmanager.com/ns.html?id=${process.env.VUE_APP_GOOGLE_TAG_MANAGER}`
      iframe.style.height = 0
      iframe.style.width = 0
      iframe.style.display = 'none'
      iframe.style.visibility = 'hidden'
      noscript.appendChild(iframe)

      document.body.insertBefore(noscript, document.body.firstChild)

      Aos.init({
        // Global settings:
        // delay: 200,
        duration: 1200,
        easing: 'ease-in-out',
        anchorPlacement: 'center-center'
      })

      if (localStorage.getItem('andsons_insiderUserObject')) {
        try {
          window.insider_object.user = JSON.parse(localStorage.getItem('andsons_insiderUserObject'))
          // eslint-disable-next-line no-empty
        } catch (e) {}
      }

      window.Intercom('boot', {
        app_id: process.env.VUE_APP_INTERCOM
      })

      usersService.forceRemoveUserProfileInLocalStorage()
      usersService.fetchProfile()

      await IdentityService.initialize()
    },
    render: (h) => h(App)
  }).$mount('#app')
}

mountApplication()

import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import dayjs from 'dayjs'

const baseRoute = ''
if (!process || process.env.NODE_ENV !== 'test') {
  Vue.use(VueRouter)
}

const routes = [
  {
    path: `${baseRoute}/`,
    name: 'Landing',
    component: () => import(/* webpackChunkName: "ForgotID"*/ '@/modules/Landing/views/Landing')
  },
  {
    path: `${baseRoute}/dashboard`,
    component: () => import(/* webpackChunkName: "Dashboard"*/ '@/modules/Dashboard'),
    children: [
      {
        path: '',
        name: 'DashboardMain',
        component: () => import(/* webpackChunkName: "DashboardMain"*/ '@/modules/Dashboard/Main')
      },
      {
        path: 'appointments',
        name: 'PastAppointments',
        component: () => import(/* webpackChunkName: "PastAppointments"*/ '@/modules/Dashboard/PastAppointments')
      },
      {
        path: 'cart',
        name: 'Cart',
        component: () => import(/* webpackChunkName: "Cart"*/ '@/modules/Dashboard/Cart')
      },
      {
        path: 'orders',
        component: () => import(/* webpackChunkName: "Orders"*/ '@/modules/Dashboard/Orders'),
        children: [
          {
            path: '',
            name: 'OrdersList',
            component: () => import(/* webpackChunkName: "OrdersList"*/ '@/modules/Dashboard/Orders/List')
          },
          {
            path: ':orderId',
            name: 'OrdersDetails',
            component: () => import(/* webpackChunkName: "OrdersDetails"*/ '@/modules/Dashboard/Orders/Details')
          }
        ]
      },
      {
        path: 'subscriptions',
        component: () => import(/* webpackChunkName: "Subscriptions"*/ '@/modules/Dashboard/Subscriptions'),
        children: [
          {
            path: '',
            name: 'SubscriptionList',
            component: () => import(/* webpackChunkName: "SubscriptionsList"*/ '@/modules/Dashboard/Subscriptions/List')
          }
        ]
      },
      {
        path: 'my-account',
        component: () => import(/* webpackChunkName: "MyAccount"*/ '@/modules/Dashboard/MyAccount'),
        children: [
          {
            path: '',
            name: 'MyDetails',
            component: () => import(/* webpackChunkName: "MyDetails"*/ '@/modules/Dashboard/MyAccount/MyDetails')
          }
        ]
      }
    ]
  },
  {
    path: `${baseRoute}/invoice/:orderId`,
    name: 'Invoice',
    component: () => import(/* webpackChunkName: "OrderInvoice"*/ '@/modules/Dashboard/Orders/Invoice'),
    async beforeEnter(to, from, next) {
      try {
        const orderId = to.params.orderId
        await store.dispatch('retrieveOrder', orderId)
        const order = store.state.selectedOrder
        if (order && order.approved_at && dayjs(order.approved_at).isValid()) {
          next()
        } else {
          next({ path: from.path })
        }
      } catch (e) {
        next({ path: from.path })
      }
    }
  },
  {
    path: `${baseRoute}/user`,
    name: 'User',
    component: () => import(/* webpackChunkName: "User"*/ '@/modules/User'),
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "Login"*/ '@/modules/User/Login')
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import(/* webpackChunkName: "Register"*/ '@/modules/User/Register')
      },
      {
        path: 'forgot-password',
        name: 'ForgotPassword',
        component: () => import(/* webpackChunkName: "ForgotPassword"*/ '@/modules/User/ForgotPassword')
      },
      {
        path: 'reset-password',
        name: 'ResetPassword',
        component: () => import(/* webpackChunkName: "ResetPassword"*/ '@/modules/User/ResetPassword')
      }
    ]
  },
  {
    path: `${baseRoute}/evaluation/start`,
    name: 'Evaluation',
    component: () => import(/* webpackChunkName: "StartEvaluation"*/ '@/modules/Evaluation/StartEvaluation')
  },
  {
    path: `${baseRoute}/evaluation/:categorySlug/end`,
    name: 'CategoryEvaluationEnd',
    component: () => import(/* webpackChunkName: "EndEvaluation"*/ '@/modules/Evaluation/EndEvaluation')
  },
  {
    path: `${baseRoute}/evaluation/skincare/start`,
    name: 'CategorySkincareEvaluation',
    beforeEnter: () => {
      window.location.href = `${process.env.VUE_APP_MEDICAL_EVALUATION_URL ||
        'https://staging.start.andsons.com.sg'}/skincare`
    }
  },
  {
    path: `${baseRoute}/evaluation/:categorySlug/start`,
    name: 'CategoryEvaluation',
    component: () => import(/* webpackChunkName: "Evaluation"*/ '@/modules/Evaluation')
  },
  {
    path: `${baseRoute}/checkout`,
    name: 'Checkout',
    component: () => import(/* webpackChunkName: "Checkout"*/ '@/modules/Checkout')
  },
  {
    path: `${baseRoute}/checkout/atomecallback`,
    name: 'CheckoutAtomeCallback',
    component: () =>
      import(
        /* webpackChunkName: "CheckoutAtomeCallback"*/

        '@/modules/Checkout/Payment/Atome/Callback'
      )
  },
  {
    path: `${baseRoute}/checkout/appointment/:orderId`,
    name: 'Appointment',
    component: () => import(/* webpackChunkName: "Appointment" */ '@/modules/Checkout/Appointment')
  },
  {
    path: `${baseRoute}/checkout/medical-background-form`,
    name: 'MedicalBackgroundForm',
    component: () => import(/* webpackChunkName: "MedicalBackgroundForm"*/ '@/modules/Checkout/MedicalBackgroundForm')
  },
  {
    path: `${baseRoute}/order`,
    name: 'Order',
    component: () => import(/* webpackChunkName: "Order"*/ '@/modules/Order'),
    children: [
      {
        path: 'success',
        name: 'Success',
        component: () => import(/* webpackChunkName: "AddressSuccess"*/ '@/modules/Order/Success')
      },
      {
        path: 'failed',
        name: 'Failed',
        component: () => import(/* webpackChunkName: "AddressFailed"*/ '@/modules/Order/Failed')
      },
      {
        path: 'processing',
        name: 'PaymentProcessing',
        component: () => import(/* webpackChunkName: "AddressFailed"*/ '@/modules/Order/PaymentProcessing')
      }
    ]
  },
  {
    path: `${baseRoute}/privacy-policy`,
    name: 'PrivacyAndPolicy',
    component: () => import(/* webpackChunkName: "privacy&policy"*/ '@/modules/Landing/views/Privacy&Policy')
  },
  {
    path: `${baseRoute}/terms-&-conditions`,
    name: 'TermsAndConditions',
    component: () => import(/* webpackChunkName: "privacy&policy"*/ '@/modules/Landing/views/TermsAndConditions')
  },
  {
    path: `${baseRoute}/refund-policy`,
    name: 'RefundPolicy',
    component: () => import(/* webpackChunkName: "privacy&policy"*/ '@/modules/Landing/views/RefundPolicy')
  },
  {
    path: `${baseRoute}/about-us`,
    name: 'AboutUs',
    component: () => import(/* webpackChunkName: "privacy&policy"*/ '@/modules/AboutUs/AboutUs')
  },
  {
    path: `${baseRoute}/contact-us`,
    name: 'ContactUs',
    component: () => import(/* webpackChunkName: "privacy&policy"*/ '@/modules/ContactUs/ContactUs')
  },
  {
    name: 'Shop',
    path: `${baseRoute}/treatment/:catalogue`,
    component: () => import(/* webpackChunkName: "Shop"*/ '@/modules/Shop'),
    beforeEnter: (to, from, next) => {
      const categoryFlags = store.getters['featureFlags/categoryFlags']
      if (categoryFlags[to.params?.catalogue] === false && to.query?.preview !== 'true') {
        next(`/early-access/${to.params?.catalogue}`)
      }
      return next()
    }
  },
  {
    name: 'RedirectShop',
    path: `${baseRoute}/shop/:catalogue`,
    component: () => import(/* webpackChunkName: "Shop"*/ '@/modules/Shop/Redirect')
  },
  {
    name: 'Product',
    path: `${baseRoute}/product/:slug`,
    component: () => import(/* webpackChunkName: "Product"*/ '@/modules/Product'),
    beforeEnter: (to, from, next) => {
      const productFlags = store.getters['featureFlags/productFlags']
      if (productFlags[to.params?.slug] === false && to.query?.preview !== 'true') {
        next(`/early-access/product/${to.params?.slug}`)
      }
      return next()
    }
  },
  {
    name: 'ProducAdView',
    path: `${baseRoute}/treatment/:slug/view`,
    component: () => import(/* webpackChunkName: "Product"*/ '@/modules/Shop/AdView'),
    beforeEnter: (to, from, next) => {
      const productFlags = store.getters['featureFlags/productFlags']
      if (productFlags[to.params?.slug] === false && to.query?.preview !== 'true') {
        next(`/early-access/product/${to.params?.slug}`)
      }
      return next()
    }
  },
  {
    name: 'ProductOptions',
    path: `${baseRoute}/product/:slug/options`,
    component: () => import(/* webpackChunkName: "Payment"*/ '@/modules/Product/PriceOptions'),
    beforeEnter: (to, from, next) => {
      const productFlags = store.getters['featureFlags/productFlags']
      if (productFlags[to.params?.slug] === false && to.query?.preview !== 'true') {
        next(`/early-access/product/${to.params?.slug}`)
      }
      return next()
    }
  },
  {
    name: 'ProductAddOns',
    path: `${baseRoute}/product/:slug/addons`,
    component: () => import(/* webpackChunkName: "ProductAddOns"*/ '@/modules/Product/AddOns')
  },
  {
    name: 'ProductSelections',
    path: `${baseRoute}/product/:categorySlug/select`,
    component: () =>
      import(/* webpackChunkName: "ProductSelections"*/ '@/modules/Product/CategoryPrescriptionItemSelection'),
    beforeEnter: (to, from, next) => {
      const categoryFlags = store.getters['featureFlags/categoryFlags']
      if (categoryFlags[to.params?.categorySlug] === false && to.query?.preview !== 'true') {
        next(`/early-access/product/${to.params?.categorySlug}`)
      }
      return next()
    }
  },
  {
    name: 'MentalHealth',
    path: `${baseRoute}/mental-health`,
    component: () => import(/* webpackChunkName: "Payment"*/ '@/modules/MentalHealth')
  },
  {
    name: 'MedicalTeam',
    path: `${baseRoute}/medical-team`,
    component: () => import(/* webpackChunkName: "MedicalTeam"*/ '@/modules/MedicalTeam')
  },
  {
    name: 'MedicalTeamMember',
    path: `${baseRoute}/medical-team/:member`,
    component: () => import(/* webpackChunkName: "MedicalTeam"*/ '@/modules/MedicalTeam/member')
  },
  {
    name: 'BookConsultation',
    path: `${baseRoute}/book-consultation`,
    component: () => import(/* webpackChunkName: "BookConsultation"*/ '@/modules/BookDoctor')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    } else {
      return { x: 0, y: 0 }
    }
  }
})

router.beforeEach(function(to, from, next) {
  // Delete unnecessary property from Insider object before going to the next page
  delete window.insider_object.page
  delete window.insider_object.listing
  delete window.insider_object.transaction
  delete window.insider_object.product

  const isAuthenticated = !!localStorage.getItem('andsons_token')

  if (isAuthenticated && to.matched[0] && to.matched[0].name === 'User') {
    next({ name: 'Landing' })
    return
  }
  if (!isAuthenticated && to.matched[0] && to.matched[0].name === 'DashboardMain') {
    next({ name: 'Register' })
    return
  }
  if (!isAuthenticated && to.matched[0] && to.matched[0].name === 'Checkout') {
    next({ name: 'Register' })
    return
  }
  next()
  if (to.name === 'PrivacyAndPolicy') {
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 100)
  }
})

router.afterEach(function(to) {
  window?.Intercom('update')
  if (to.hash) {
    setTimeout(() => {
      document.getElementById(to.hash.substring(1))?.scrollIntoView()
    }, 100)
  }
})

export default router

import { getOrders } from '@/api/orders'
import { getMyProfile } from '@/api/users'
import * as Analytics from '@/services/analytics'
import store from '@/store'
import { isPrescriptionBased } from '@/utils/categories.js'
import { generateHash } from '@/utils/hash'

import { pick } from 'lodash'

const CURRENCY = 'SGD'

function trackTikTokEvent(windowObj, eventName, eventData) {
  if (!windowObj) {
    return
  }

  if (store.state.userProfile) {
    windowObj.ttq.identify({
      sha256_email: store.getters.getEmailHash
    })
  }

  windowObj.ttq.track(eventName, eventData)
}

async function trackProductView(windowObj, productData) {
  const { title, product_options, category_id, prescription_based, order, slug, image_arr } = productData

  if (product_options.length === 0) {
    return
  }

  try {
    const category = store.getters['categories/idToSlug'][category_id]
    const firstProductOptionSku = product_options[0].sku
    const firstProductOptionPrice = product_options[0].product_option_prices[0].price

    windowObj?.fbq('track', 'ViewContent', {
      content_category: category,
      content_name: title,
      content_type: 'product'
    })

    windowObj?.dataLayer?.push({
      event: 'view_item',
      ecommerce: {
        items: [
          {
            item_name: title,
            item_id: firstProductOptionSku,
            price: firstProductOptionPrice,
            item_category: category,
            item_category_2: isPrescriptionBased(prescription_based),
            item_list_name: category,
            item_list_id: category_id,
            index: order
          }
        ]
      },
      eventCallback: () => {
        windowObj?.dataLayer?.push({ ecommerce: { items: undefined } })
      }
    })

    await Analytics.getCurrent().page('Product View Rendered', { category, id: firstProductOptionSku, name: title })

    if (process.env.NODE_ENV === 'production') {
      // Add product to Insider
      windowObj.insider_object = {
        page: {
          type: 'Product'
        },
        product: {
          id: firstProductOptionSku,
          name: title,
          taxonomy: [category],
          currency: CURRENCY,
          unit_price: firstProductOptionPrice,
          // @TODO: Update the sale price if there is a field for it.
          unit_sale_price: firstProductOptionPrice,
          url: `${process.env.VUE_APP_LINK}product/${slug}`,
          stock: product_options[0].quantity,
          product_image_url: image_arr[0],
          custom: {
            category_id,
            category,
            order,
            product_options: product_options,
            type: product_options[0].type
          }
        },
        basket: { ...windowObj.insider_object.basket },
        user: { ...windowObj.insider_object.user }
      }

      windowObj?.spApi?.reInitOnChange()
    }

    windowObj?.Intercom('trackEvent', 'viewed-product', {
      product: title,
      sku: firstProductOptionSku,
      category: category
    })

    // Tiktok pixel
    trackTikTokEvent(windowObj, 'ViewContent', {
      content_type: 'product',
      content_id: firstProductOptionSku,
      content_category: category,
      content_name: title,
      currency: CURRENCY,
      price: firstProductOptionPrice
    })
  } catch (error) {
    return
  }
}

async function trackCatalogView(windowObj, dataList, catalogue) {
  try {
    const filteredDataList = dataList.filter((d) => d.product_options.length > 0)

    const gtmItems = filteredDataList.map((data) => ({
      item_name: data.title,
      item_id: data.product_options[0].sku,
      price: data.product_options[0].product_option_prices[0].price,
      item_category: catalogue,
      item_category_2: isPrescriptionBased(data.prescription_based),
      item_list_name: catalogue,
      item_list_id: data.category_id,
      index: data.order
    }))

    windowObj?.dataLayer?.push({
      event: 'view_item_list',
      ecommerce: {
        items: gtmItems
      },
      eventCallback: () => {
        windowObj?.dataLayer?.push({ ecommerce: { items: undefined } })
      }
    })

    const products = filteredDataList.map((data) => ({
      name: data.title,
      id: data.product_options[0].sku,
      value: data.product_options[0].product_option_prices[0].price,
      quantity: 1
    }))

    windowObj?.fbq('track', 'ViewContent', {
      content_category: catalogue,
      content_name: catalogue,
      content_type: 'product_group'
    })

    await Analytics.getCurrent().page('Catalogue View Rendered', { category: catalogue, name: catalogue })

    if (process.env.NODE_ENV === 'production') {
      const insiderItems = filteredDataList.map((data) => ({
        id: data.product_options[0].sku,
        name: data.title,
        taxonomy: [catalogue],
        currency: CURRENCY,
        unit_price: data.product_options[0].product_option_prices[0].price,
        // @TODO: Update the sale price if there is a field for it.
        unit_sale_price: data.product_options[0].product_option_prices[0].price,
        url: `${process.env.VUE_APP_LINK}product/${data.slug}`,
        stock: data.product_options[0].quantity,
        product_image_url: data.image_arr[0],
        custom: {
          category_id: data.category_id,
          category: catalogue,
          order: data.order,
          product_options: data.product_options,
          type: data.product_options[0].type
        }
      }))

      // Add category to Insider
      windowObj.insider_object = {
        page: {
          type: 'Category'
        },
        listing: {
          items: insiderItems
        },
        basket: { ...windowObj.insider_object.basket },
        user: { ...windowObj.insider_object.user }
      }

      windowObj?.spApi?.reInitOnChange()
    }

    windowObj?.Intercom('trackEvent', 'viewed-catalog', {
      category: catalogue
    })

    // Tiktok pixel
    trackTikTokEvent(windowObj, 'Browse', {
      content_type: 'product_group',
      contents: products,
      content_category: catalogue,
      content_name: catalogue,
      currency: CURRENCY
    })
  } catch (error) {
    return
  }
}

// Track when a user lands on the checkout page
async function trackCheckoutStarted(windowObj, cartItems, cartId) {
  const gtmCart = []
  const fbIds = []
  const products = []
  const fbValue = []

  if (!cartItems || !cartId) {
    return
  }

  try {
    cartItems.map((data, index) => {
      const { price, product_option } = data.product_option_price
      const { title, prescription_based, category_id } = product_option.product

      const category = store.getters['categories/idToSlug'][category_id]
      gtmCart.push({
        item_name: title,
        item_id: product_option.sku,
        price: price,
        item_category: category,
        item_category_2: isPrescriptionBased(prescription_based),
        item_variant: product_option.name,
        item_list_name: category,
        item_list_id: category_id,
        quantity: data.quantity,
        index
      })
      fbIds.push(product_option.sku)
      fbValue.push(price * data.quantity)
      products.push({
        name: title,
        id: product_option.sku,
        value: price,
        currency: CURRENCY,
        quantity: data.quantity,
        subscription: data.product_option_price.sub_duration_type == 'MONTH'
      })
    })

    const gtmCartWithoutConsultation = gtmCart.filter((data) => data !== undefined)

    const totalCartAmt = fbValue.reduce((n1, n2) => n1 + n2)

    windowObj?.fbq(
      'track',
      'InitiateCheckout',
      {
        content_ids: fbIds,
        contents: products,
        value: totalCartAmt,
        num_items: products.length,
        currency: CURRENCY
      },
      {
        eventID: generateHash(cartId.toString(), 'sha256')
      }
    )

    windowObj?.dataLayer?.push({
      event: 'begin_checkout',
      ecommerce: {
        items: gtmCartWithoutConsultation
      },
      eventCallback: () => {
        windowObj?.dataLayer?.push({ ecommerce: { items: undefined } })
      }
    })

    if (process.env.NODE_ENV === 'production') {
      // Add checkout to Insider
      windowObj.insider_object = {
        page: {
          type: 'Checkout'
        },
        basket: { ...windowObj.insider_object.basket },
        user: { ...windowObj.insider_object.user }
      }

      windowObj?.spApi?.reInitOnChange()
    }

    windowObj?.Intercom('trackEvent', 'started-checkout')

    // Tiktok pixel
    trackTikTokEvent(windowObj, 'InitiateCheckout', {
      contents: products,
      currency: CURRENCY,
      value: totalCartAmt,
      quantity: products.length
    })

    await Analytics.getCurrent().track('Checkout Started', {
      amountTotal: totalCartAmt,
      cartId: cartItems.length > 0 ? cartItems[0].cartId : undefined,
      currency: CURRENCY,
      numOfItems: cartItems.length || 0
    })
  } catch (error) {
    return
  }
}

async function trackOrderCreated(windowObj, cartItems) {
  const products = []
  const cartValue = []

  try {
    cartItems.map((data) => {
      const { price, product_option } = data.product_option_price
      const { title } = product_option.product

      cartValue.push(price * data.quantity)
      products.push({
        name: title,
        id: product_option.sku,
        value: price,
        currency: CURRENCY,
        quantity: data.quantity,
        subscription: data.product_option_price.sub_duration_type == 'MONTH'
      })
    })

    const totalCartAmt = cartValue.reduce((n1, n2) => n1 + n2)

    // Tiktok pixel
    trackTikTokEvent(windowObj, 'PlaceAnOrder', {
      content_type: 'product_group',
      contents: products,
      currency: CURRENCY,
      value: totalCartAmt,
      quantity: products.length
    })

    await Analytics.getCurrent().track('Order Created', {
      amountTotal: totalCartAmt,
      cartId: cartItems.length > 0 ? cartItems[0].cartId : undefined,
      currency: CURRENCY,
      numOfItems: cartItems.length || 0
    })
  } catch (error) {
    return
  }
}

async function trackCartView(cart) {
  try {
    const { cart: innerCart } = cart
    const productOptionPrices = innerCart?.cart_product_option_prices || []

    const products = productOptionPrices.map((p) => ({
      name: p.product_option_price.product_option.product.title,
      productId: p.product_option_price.product_option.id,
      price: p.product_option_price.price,
      quantity: p.quantity,
      sku: p.product_option_price.product_option.sku
    }))

    await Analytics.getCurrent().page('Cart Viewed', {
      cartId: innerCart?.id,
      discount: cart.discount?.amount,
      numOfItems: products?.length || 0,
      revenue: cart.total,
      shipping: cart.shippingFee,
      skus: products.map((p) => p.sku)
    })
  } catch (error) {
    return
  }
}

function trackUpdateCart(windowObj, cart) {
  try {
    if (process.env.NODE_ENV === 'production' && cart?.cart) {
      const cartItems = normalizedProductsForInsider(cart.cart?.cart_product_option_prices)

      // Add basket to Insider
      windowObj.insider_object = {
        basket: {
          currency: CURRENCY,
          shipping_cost: cart.shippingFee,
          total: cart.total,
          vouchers: [cart?.discount?.code],
          voucher_discount: cart?.discount?.amount,
          line_items: cartItems
        },
        user: { ...windowObj.insider_object.user },
        page: { ...windowObj.insider_object.page }
      }

      windowObj?.spApi?.reInitOnChange()
    }
  } catch (error) {
    return
  }
}

async function trackAddToCart(windowObj, selectedOption, quantity = 1) {
  try {
    const { title, prescription_based, category_id, order } = selectedOption
    const category = store.getters['categories/idToSlug'][category_id]
    const firstProductOptionPrice = selectedOption.product_option_prices[0]
    const isMonthlySubscription = firstProductOptionPrice.sub_duration_type == 'MONTH'
    const totalProductValue = firstProductOptionPrice.price * quantity

    windowObj?.fbq('track', 'AddToCart', {
      content_ids: [selectedOption.sku],
      content_name: title,
      contents: [
        {
          id: selectedOption.sku,
          name: title,
          value: firstProductOptionPrice.price,
          currency: CURRENCY,
          quantity,
          subscription: isMonthlySubscription
        }
      ],
      value: totalProductValue,
      currency: CURRENCY
    })

    windowObj?.dataLayer?.push({
      event: 'add_to_cart',
      ecommerce: {
        items: [
          {
            item_name: title,
            item_id: selectedOption.sku,
            price: firstProductOptionPrice.price,
            item_category: category,
            item_category_2: isPrescriptionBased(prescription_based),
            item_variant: selectedOption.name,
            item_list_name: category,
            item_list_id: category_id,
            index: order,
            quantity
          }
        ]
      },
      eventCallback: () => {
        windowObj?.dataLayer?.push({ ecommerce: { items: undefined } })
      }
    })

    windowObj?.Intercom('trackEvent', 'add-to-cart', {
      product: title,
      sku: selectedOption.sku,
      price: firstProductOptionPrice.price,
      category: category,
      quantity
    })

    // Tiktok pixel
    trackTikTokEvent(windowObj, 'AddToCart', {
      content_type: 'product',
      contents: [
        {
          id: selectedOption.sku,
          name: title,
          value: firstProductOptionPrice.price,
          currency: CURRENCY,
          quantity,
          subscription: isMonthlySubscription
        }
      ],
      content_id: selectedOption.sku,
      content_category: category,
      content_name: title,
      currency: CURRENCY,
      value: totalProductValue,
      quantity,
      price: firstProductOptionPrice.price
    })

    // Bing pixel
    windowObj?.uetq?.push('event', 'add_to_cart', {
      currency: CURRENCY,
      ecomm_prodid: [selectedOption.sku],
      ecomm_totalvalue: firstProductOptionPrice.price,
      content_category: category
    })

    await Analytics.getCurrent().track('Product Added', {
      id: firstProductOptionPrice.product_option_price_id,
      sku: selectedOption.sku,
      name: title,
      price: firstProductOptionPrice.price,
      currency: CURRENCY,
      quantity,
      subscription: isMonthlySubscription
    })
  } catch (error) {
    return
  }
}

async function trackAddProductToCart(windowObj, product, productOption, productOptionPrice, quantity = 1) {
  try {
    const category = pick(product.category, 'id', 'name', 'slug')
    const totalProductValue = +productOptionPrice.price * quantity

    const productData = {
      category,
      order: product.order,
      quantity,
      descriptions: {
        long: product.desc_1,
        short: product.short_desc
      },
      id: product.id,
      imageURL: product.image_arr[0] || '',
      name: product.title,
      needsPrescription:  product.prescription_based == 1,
      related: product.related_products,
      slug: product.slug,
      plan: {
        descriptions: {
          discount: productOptionPrice?.discount_desc || undefined
        },
        type: productOption.type == "ONE_OFF" ? 'one-time' : 'recurring',
        price: {
          currency: CURRENCY,
          description: productOptionPrice?.price_desc || undefined,
          id: productOptionPrice?.id || undefined,
          value: +productOptionPrice?.price || undefined
        },
        sku: productOption?.sku || undefined
      }
    }

    windowObj?.fbq('track', 'AddToCart', {
      content_ids: [productOption.sku],
      content_name: product.title,
      contents: [
        { ...productData }
      ],
      value: totalProductValue,
      currency: CURRENCY
    })

    windowObj?.dataLayer?.push({
      event: 'add_to_cart',
      ecommerce: {
        items: [
          { ...productData }
        ]
      },
      eventCallback: () => {
        windowObj?.dataLayer?.push({ ecommerce: { items: undefined } })
      }
    })

    windowObj?.Intercom('trackEvent', 'add-to-cart', { ...productData })

    // Tiktok pixel
    trackTikTokEvent(windowObj, 'AddToCart', {
      content_type: 'product',
      contents: [
        { ...productData }
      ],
      content_id: productOption.sku,
      content_category: category,
      content_name: product.title,
      currency: CURRENCY,
      value: totalProductValue,
      quantity,
      price: productOptionPrice.price
    })

    // Bing pixel
    windowObj?.uetq?.push('event', 'add_to_cart', { ...productData })

    await Analytics.getCurrent().track('Product Added', { ...productData })
  } catch (error) {
    return
  }
}

function trackSignUp(windowObj, user, insiderUserObject) {
  try {
    windowObj?.dataLayer?.push({
      event: 'user-signup-success',
      method: 'email',
      user_id: user.id
    })

    // Facebook
    const userHash = store.getters.getUserHash
    windowObj.fbq('init', process.env.VUE_APP_FB_PIXEL, {
      external_id: userHash
    })

    windowObj?.fbq(
      'track',
      'CompleteRegistration',
      {
        method: 'email'
      },
      {
        eventID: userHash
      }
    )

    // Tapfiliate integration doc: https://tapfiliate.com/docs/javascript/#customer
    windowObj?.tap('customer', user.id)

    if (process.env.NODE_ENV === 'production') {
      windowObj.insider_object = {
        user: {
          ...insiderUserObject,
          custom: {
            register: true
          }
        },
        basket: { ...windowObj.insider_object.basket }
      }

      windowObj?.spApi?.reInitOnChange()
    }

    windowObj?.Intercom('update', {
      name: user.name,
      email: user.email,
      user_id: `SG-${user.id}`
    })

    // Tiktok pixel
    trackTikTokEvent(windowObj, 'CompleteRegistration', {})
  } catch (error) {
    return
  }
}

async function trackSignUpView() {
  try {
    await Analytics.getCurrent().page('Sign Up View Rendered')
  } catch (error) {
    return
  }
}

async function trackLogin(windowObj, user, insiderUserObject) {
  try {
    // send custom GTM event
    windowObj?.dataLayer?.push({
      event: 'user-login-success',
      method: 'email',
      user_id: user.id
    })

    if (process.env.NODE_ENV === 'production') {
      windowObj.insider_object = {
        user: { ...insiderUserObject },
        basket: { ...windowObj.insider_object.basket }
      }

      windowObj?.spApi?.reInitOnChange()
    }

    //  Intercom
    windowObj?.Intercom('update', {
      name: user.name,
      email: user.email,
      user_id: `SG-${user.id}`
    })

    // Facebook
    const userHash = store.getters.getUserHash
    windowObj.fbq('init', process.env.VUE_APP_FB_PIXEL, {
      external_id: userHash
    })
    await Analytics.getCurrent().track('Signed In', { username: user.email, method: 'email' })
  } catch (error) {
    return
  }
}

async function trackLoginView() {
  try {
    await Analytics.getCurrent().page('Sign In View Rendered')
  } catch (error) {
    return
  }
}

async function trackLogout(windowObj, userId) {
  try {
    windowObj?.dataLayer?.push({
      event: 'user-logout',
      user_id: userId
    })

    windowObj?.Intercom('shutdown')
    windowObj?.Intercom('boot', {
      app_id: process.env.VUE_APP_INTERCOM
    })

    await Analytics.getCurrent().track('Signed Out')
  } catch (error) {
    return
  }
}

async function trackUpdateProfile(windowObj, userProfile) {
  try {
    if (process.env.NODE_ENV === 'production') {
      const user = await normalizedUserForInsider(userProfile, true)

      windowObj.insider_object = {
        user,
        basket: { ...windowObj.insider_object.basket }
      }

      windowObj?.spApi?.reInitOnChange()
    }

    windowObj?.Intercom('update', {
      name: userProfile.name,
      email: userProfile.email,
      user_id: `SG-${userProfile.id}`
    })
  } catch (error) {
    return
  }
}

function trackCancelSubscription(windowObj, subscription_id) {
  try {
    windowObj?.dataLayer?.push({
      event: 'cancel-subscription'
    })

    windowObj?.fbq('track', 'CancelSubscription', {
      subscription_id
    })

    windowObj?.Intercom('trackEvent', 'cancel-subscription', {
      subscription_id
    })
  } catch (error) {
    return
  }
}

function trackPurchase(windowObj, order, transactionId) {
  const gtmItems = []
  const fbIds = []
  const purchasedProducts = []
  const fbValue = []

  try {
    const { currency, total_amount, order_product_option_prices, latest_transaction } = order
    order_product_option_prices.map((data) => {
      const product = data.product_option_price.product_option.product
      const quantity = data.product_option_price.sub_duration_type
        ? data.quantity / data.product_option_price.sub_duration_refresh
        : data.quantity
      gtmItems.push({
        item_name: product.title,
        item_id: data.sku,
        price: data.price,
        item_variant: data.product_option_price.product_option.name,
        item_category: store.getters['categories/idToSlug'][product.category_id],
        item_category_2: isPrescriptionBased(product.prescription_based),
        quantity: quantity
      })
      fbIds.push(data.sku)
      fbValue.push(data.price * quantity)
      purchasedProducts.push({
        name: product.title,
        id: data.sku,
        value: data.price,
        currency: CURRENCY,
        quantity: quantity,
        subscription: data.product_option_price.sub_duration_type == 'MONTH'
      })
    })

    const totalPurchaseAmt = fbValue.reduce((n1, n2) => n1 + n2) || 0

    windowObj?.fbq(
      'track',
      'Purchase',
      {
        content_ids: fbIds,
        contents: purchasedProducts,
        value: totalPurchaseAmt,
        num_items: purchasedProducts.length,
        currency: CURRENCY
      },
      { eventID: generateHash(latest_transaction.transaction_ref.toString(), 'sha256') }
    )

    windowObj?.dataLayer?.push({
      event: 'purchase',
      ecommerce: {
        purchase: {
          transaction_id: transactionId,
          affiliation: 'Online Store',
          value: total_amount,
          // tax: "",
          shipping: '0.00',
          currency: currency,
          // coupon: "",
          items: gtmItems
        }
      },
      eventCallback: () => {
        windowObj?.dataLayer?.push({ ecommerce: { items: undefined } })
      }
    })

    // Tapfiliate integration doc: https://tapfiliate.com/docs/javascript/#conversion
    windowObj?.tap('conversion', order.id, total_amount, { currency: CURRENCY })

    windowObj?.Intercom('trackEvent', 'purchased', {
      transaction_id: transactionId,
      total_amount: total_amount,
      currency,
      order_id: order.id
    })

    // Tiktok pixel
    trackTikTokEvent(windowObj, 'CompletePayment', {
      content_type: 'product_group',
      contents: purchasedProducts,
      currency: CURRENCY,
      value: totalPurchaseAmt,
      quantity: purchasedProducts.length
    })

    // Bing pixel
    windowObj?.uetq?.push('event', 'Purchase', {
      revenue_value: totalPurchaseAmt,
      currency: CURRENCY
    })
  } catch (error) {
    return
  }
}

function updateTransactionObjectForInsider(windowObj, order, transactionId) {
  try {
    if (process.env.NODE_ENV === 'production') {
      const { currency, total_amount, order_product_option_prices } = order
      const cartItems = normalizedProductsForInsider(order_product_option_prices)

      // Add confirmation to Insider
      windowObj.insider_object = {
        page: {
          type: 'Confirmation'
        },
        transaction: {
          order_id: transactionId,
          currency: currency,
          total: total_amount,
          voucher_discount: order?.discount_total_amount,
          shipping_cost: order.shipping_fee,
          delivery: {
            country: order.address?.country?.iso,
            city: order.address.city
          },
          line_items: cartItems
        },
        user: { ...windowObj.insider_object.user }
      }

      windowObj?.spApi?.reInitOnChange()
    }
  } catch (error) {
    return
  }
}

async function trackHomePageView(windowObj) {
  try {
    // send custom GTM event
    windowObj?.dataLayer?.push({ event: 'home' })

    // fire off page event to our events pipeline
    const metadata = Analytics.collectQSMetadata(window)
    await Analytics.getCurrent().page('Landing View Rendered', metadata)

    if (process.env.NODE_ENV === 'production') {
      // Add Home page view to Insider
      windowObj.insider_object = {
        page: { type: 'Home' },
        basket: { ...windowObj.insider_object.basket },
        user: { ...windowObj.insider_object.user }
      }

      windowObj?.spApi?.reInitOnChange()
    }
  } catch (error) {
    return
  }
}

function trackNewSubscription(windowObj, email) {
  try {
    // send custom GTM event
    windowObj?.dataLayer?.push({ event: 'new-subscriber' })

    if (process.env.NODE_ENV === 'production') {
      // @TODO: we should implement GDPR opt-ins.
      let user = {
        email: email,
        email_optin: true,
        custom: {
          subscribe_newsletter: true
        }
      }

      if (store.state.authenticated) {
        user = { ...windowObj.insider_object.user, ...user }
      }

      windowObj.insider_object = {
        user,
        basket: { ...windowObj.insider_object.basket }
      }

      windowObj?.spApi?.reInitOnChange()
    }

    windowObj?.Intercom('update', { email })
  } catch (error) {
    return
  }
}

async function trackForgotPasswordView() {
  try {
    await Analytics.getCurrent().page('Forgot Password View Rendered')
  } catch (error) {
    return
  }
}

async function trackResetPasswordView() {
  try {
    await Analytics.getCurrent().page('Reset Password View Rendered')
  } catch (error) {
    return
  }
}

function normalizedProductsForInsider(items) {
  const productList = []

  items &&
    items.map((data) => {
      const { product_option } = data.product_option_price
      const { product } = product_option

      // Skip adding item if product doesn't have a sku
      if (product_option.sku == undefined) {
        return
      }
      const category = store.getters['categories/idToSlug'][product.category_id]
      productList.push({
        id: product_option.sku,
        name: product.title,
        taxonomy: [category],
        currency: CURRENCY,
        unit_price: data.product_option_price.price,
        // @TODO: Update the sale price if there is a field for it.
        unit_sale_price: data.product_option_price.price,
        url: `${process.env.VUE_APP_LINK}product/${product.slug}`,
        stock: product_option.quantity,
        product_image_url: product.image_arr[0],
        custom: {
          category_id: product.category_id,
          category: category,
          order: product.order,
          product_options: product_option,
          type: product_option.type
        },
        quantity: data.quantity,
        subtotal: data.quantity * data.product_option_price.price
      })
    })

  return productList
}

async function normalizedUserForInsider(user, fetchProfile = false) {
  // @TODO: we should implement GDPR opt-ins and email opt-ins.
  const insiderUserObject = {
    uuid: user.email,
    name: user.first_name,
    surname: user.last_name,
    username: user.email,
    has_transacted: false,
    transaction_count: 0,
    email: user.email,
    email_optin: true,
    language: 'en-us',
    custom: {
      id: user.id
    }
  }

  if (fetchProfile) {
    await getMyProfile().then(({ data }) => {
      if (data.statusCode == 200 && data.response?.user?.profile) {
        const user = data.response.user
        insiderUserObject.gender = user.profile?.gender
        insiderUserObject.birthday = user.profile?.dob ? `${user.profile?.dob}T00:00:00Z` : ''
        insiderUserObject.phone_number = user?.country_code + user?.phone
        insiderUserObject.custom.profile = user?.profile
      }
    })

    // Checking the number of user's orders.
    await getOrders().then((response) => {
      const totalOrder = response.data.response.pagination.total

      if (totalOrder && totalOrder > 0) {
        insiderUserObject.has_transacted = true
        insiderUserObject.transaction_count = totalOrder
      }
    })
  }

  return insiderUserObject
}

async function trackUserAction(userAction, eventData = {}) {
  try {
    await Analytics.getCurrent().track(userAction, eventData)
  } catch (error) {
    return
  }
}

export {
  trackProductView,
  trackCatalogView,
  trackCheckoutStarted,
  trackCartView,
  trackUpdateCart,
  trackAddToCart,
  trackLoginView,
  trackSignUp,
  trackSignUpView,
  trackCancelSubscription,
  trackPurchase,
  trackHomePageView,
  trackNewSubscription,
  trackLogin,
  trackLogout,
  trackForgotPasswordView,
  trackResetPasswordView,
  trackUpdateProfile,
  trackOrderCreated,
  normalizedUserForInsider,
  updateTransactionObjectForInsider,
  trackUserAction,
  trackAddProductToCart
}

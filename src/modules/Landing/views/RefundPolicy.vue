<template>
  <div class="container">
    <!-- <the-header></the-header> -->
    <router-link tag="a" class="logoContainer" :to="{ name: 'Landing' }">
      <img src="../../../assets/images/floating_logo.svg" class="ampersandLogo" />
      <img src="../../../assets/images/sons_logo.svg" class="sonsLogo" />
    </router-link>

    <section class="privacy-section">
      <h1>Refund Policy</h1>
      <!--1. Introduction -->
      <article>
        <h4>1. General</h4>
        <p>
          Prescription products - we are unable to provide refunds on prescription products.
        </p>
        <p>
          Non-prescription products - we offer free returns or exchanges within 30 days of receiving your order subject
          to the following conditions:
        </p>
        <p>
          You can return your product for a refund to the original payment method.
        </p>

        <ol>
          <li class="tw-pl-3">
            Returned items must be returned in original packaging
          </li>
          <li class="tw-pl-3">Returned items must be unopened and unused</li>
          <li class="tw-pl-3">
            The product(s) does not sit as part of a subscription. Only applies for one-off purchases
          </li>
        </ol>
        <p>
          Subscription - Products are non-refundable and non-returnable upon renewal of your subscription plan
        </p>

        <h4>2. How to request for refund or exchange:</h4>
        <p>
          To initiate a return or exchange, please complete the following steps:
        </p>
        <ol>
          <li class="tw-pl-3">
            Contact our customer service at
            <a class="tw-text-blue-400 tw-no-underline hover:tw-underline" href="mailto:hello@andsons.com.sg"
              >hello@andsons.com.sg</a
            >
            with your order ID and reason for return
          </li>
          <li class="tw-pl-3">Choose the products you wish to return</li>
          <li class="tw-pl-3">
            We will arrange for a courier to pick up your item
          </li>
        </ol>

        <h4>3. Additional Information</h4>
        <ol>
          <li class="tw-pl-3">
            It may take up to 4 weeks to process your return
          </li>
          <li class="tw-pl-3">
            If you have more questions, contact us at
            <a class="tw-text-blue-400 tw-no-underline hover:tw-underline" href="mailto:hello@andsons.com.sg"
              >hello@andsons.com.sg</a
            >
          </li>
        </ol>
      </article>
    </section>
  </div>
</template>

<script>
// import TheHeader from '../components/TheHeader'
import { formatMetaTags } from '../../../utils/prettify.js'
export default {
  components: {
    // TheHeader,
  },
  metaInfo: formatMetaTags({
    title: 'Refund Policy',
    urlPath: 'refund-policy'
  })
}
</script>

<style scoped lang="scss">
.container {
  background-color: $springwood-background;
}

h1 {
  font-family: 'PublicSansExtraBold', sans-serif;
  font-size: 2rem;
}

h2 {
  font-family: 'PublicSansSemiBold', sans-serif;
  color: $bismark-text;
  padding: 2rem 0;
  font-size: 1.125rem;
}

h4 {
  font-family: 'PublicSans', sans-serif;
  color: $apricot-text;
  padding-bottom: 1rem;
  font-size: 1.125rem;
}

article {
  padding: 1rem 0;
}

p,
li {
  font-family: 'PublicSans', sans-serif;
  font-size: 0.9rem;
  line-height: 1.3rem;
  word-wrap: break-word;
}

p + *,
ol + * {
  padding-top: 1.3rem;
}
</style>

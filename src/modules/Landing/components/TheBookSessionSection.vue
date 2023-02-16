<template>
  <section class="book-session-content">
    <p class="content__title">Not sure what you need?</p>
    <p class="content_subtitle tw-text-bismark">
      Talk to our licensed doctor about treatment options that are suitable for you.
    </p>
    <p class="content_subtitle tw-text-bismark"><span class="line-through">$ 15</span> FREE for a limited time.</p>
    <a href="https://calendly.com/israfil-ora/15min" target="_blank" class="buttonStyle text-center hero-btn"
      >BOOK YOUR SESSION
    </a>
  </section>
</template>

<style lang="scss" scoped>
.book-session-content {
  padding: 2.5rem 2rem;
  background-color: #fff;
  text-align: center;

  @include mediaMd {
    padding: 5rem 10vw;
  }

  .buttonStyle {
    &.hero-btn {
      margin: auto;
    }
  }

  .content__title {
    font-family: 'PublicSansExtraBold', sans-serif;
    font-size: 1.375rem;
    color: #ed9075;
    @media screen and (max-width: 768px) {
      font-size: 1rem;
    }
  }

  .content_subtitle {
    font-family: PublicSansSemiBold, sans-serif;
    font-size: 1.875rem;
    margin: 16px auto;
    max-width: 768px;
    line-height: 38px;
    @media screen and (max-width: 768px) {
      font-size: 1.125rem;
    }
  }
}
</style>

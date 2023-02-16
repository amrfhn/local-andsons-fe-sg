<template>
  <section class="additional-content">
    <p class="content__title">Made in labs. Backed by science.</p>
    <p class="content_subtitle">
      All of our medications are registered and prescribed by licensed doctors. 100% online and delivered discreetly.
    </p>
  </section>
</template>

<style lang="scss" scoped>
.additional-content {
  margin: 4rem 20rem;
  background-color: $springwood-background;
  text-align: center;
  border: 2px solid black;

  @include mediaSm {
    margin: 2rem 2rem;
    padding: 1.5rem 0.8rem;
  }

  .content__title {
    font-family: 'PublicSansExtraBold', sans-serif;
    font-size: 3rem;
    @media screen and (max-width: 768px) {
      font-size: 1.8rem;
    }
  }

  .content_subtitle {
    font-family: PublicSans, sans-serif;
    font-size: 1.3rem;
    margin: 16px auto;
    max-width: 768px;
    @media screen and (max-width: 768px) {
      font-size: 1.125rem;
    }
  }
}
</style>

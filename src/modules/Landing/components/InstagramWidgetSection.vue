<template>
  <section class="section-container">
    <div class="container-fluid">
      <h2 class="mb-5 title-widget">
        @andsons Provides Teleconsultation and Telemedicine
      </h2>
      <iframe
        src="https://cdn.lightwidget.com/widgets/e70dfa1f128c57f1b0f6a88aa5495c6f.html"
        scrolling="no"
        allowtransparency="true"
        class="lightwidget-widget"
        style="width: 100%; border: 0; overflow: hidden"
      ></iframe>
    </div>
  </section>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.section-container {
  padding: 4rem 1rem;
  text-align: center;

  .title-widget {
    font-family: 'PublicSansExtraBold', sans-serif;
    font-size: 2.5rem;
    margin-bottom: 2rem;

    @include mediaMd {
      font-size: 3rem;
      margin-bottom: 4rem;
    }
  }
}
</style>

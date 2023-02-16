<template>
  <section id="promises-section" class="container">
    <h2 class="promises__title">Our Promises</h2>
    <div class="divider">
      <div class="promise">
        <img src="../../../assets/images/desktop.svg" alt="Signup" class="promise__img" />
        <h4 class="promise__title">Accesibility</h4>
        <p class="promise__description">
          Order online, get consulted online, pay online. The only thing that happens offline is your delivery.
        </p>
      </div>
      <div class="promise">
        <img src="../../../assets/images/eclipse.svg" alt="Consult" class="promise__img" />
        <h4 class="promise__title">Legitimacy</h4>
        <p class="promise__description">
          All our products are made in labs, evidence-based and prescribed by licensed doctors.
        </p>
      </div>
      <div class="promise">
        <img src="../../../assets/images/shield.svg" alt="Purchase" class="promise__img" />
        <h4 class="promise__title">Confidentiality</h4>
        <p class="promise__description">
          The only people who need to know about your medical details are you and your doctor.
        </p>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
#promises-section {
  scroll-snap-align: none;
}

section {
  padding: 3rem;
  text-align: center;
}
.container {
  max-width: 85rem;
  margin: 0 auto;
}

.promises__title {
  font-family: 'PublicSansExtraBold', sans-serif;
  font-size: 2.5rem;
  padding-bottom: 2rem;
}

.divider {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 1rem;

  & > * {
    flex-basis: 30%;
    min-width: 15rem;
  }
}

.promise {
  display: block;
  text-align: left;
  padding-bottom: 2rem;
  width: 30vw;
  max-width: 20rem;

  & > * {
    padding-bottom: 1rem;
  }

  &__img {
    height: 3rem;
    max-width: 2.5rem;
  }

  &__title {
    font-family: 'PublicSansExtraBold', sans-serif;
    color: $apricot-text;
  }

  &__description {
    font-family: 'PublicSans', sans-serif;
    color: $black-text;
    line-height: 1.4;
  }
}
</style>

<template>
  <section id="doctors-section" class="">
    <div class="container">
      <h2 class="promises__title">Meet Our Medical Team</h2>
      <p class="doctors__title_description">
        All our treatments are vetted by our team of healthcare professionals.
      </p>
      <div class="divider">
        <div v-for="doctor in doctors" :key="doctor.path" class="doctors">
          <div class="doctors__img_container">
            <img :src="require(`@/assets/images${doctor.image}`)" :alt="doctor.alt" class="doctors__img" />
          </div>
          <h3 class="doctors__title">
            {{ doctor.name }}
          </h3>
          <p class="doctors__description">
            {{ doctor.title }}<br />
            {{ doctor.credentials }}
          </p>
        </div>
      </div>
      <router-link to="/medical-team" class="buttonStyle" style="margin-left: auto; margin-right: auto">
        Meet our advisors
      </router-link>
    </div>
  </section>
</template>

<script>
import medicalTeam from '@/data/medicalTeam.json'
export default {
  name: 'TheDoctorsSection',
  created() {
    this.doctors = medicalTeam['members']
      .filter((_) => ['dr-steven-tucker', 'dr-julian-hong', 'dr-chen-ee-song'].includes(_.path))
      .map(function(_) {
        return {
          path: _.path,
          name: _.name,
          title: _.title,
          image: _.image,
          alt: _.name.replace(/[^a-zA-Z0-9 ]/, '')
        }
      })
  }
}
</script>

<style lang="scss" scoped>
#doctors-section {
  scroll-snap-align: none;
  background-color: $springwood-background;
}

section {
  padding: 4rem 3rem 3rem;
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

.doctors__title_description {
  font-size: 18px;
  padding-bottom: 50px;
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

.doctors {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: left;
  padding-bottom: 2rem;
  width: 30vw;
  max-width: 20rem;

  & > * {
    padding-bottom: 1rem;
  }

  &__img_container {
    height: 25rem;
    width: auto;
    background-color: $green-text;
    padding-bottom: 0;
    margin-bottom: 2rem;
    display: flex;

    img {
      height: auto;
      width: auto;
      max-width: unset;
    }
  }

  &__title {
    font-family: 'PublicSansExtraBold', sans-serif;
    color: $apricot-text;
    font-size: 1.5rem;
    text-align: center;
  }

  &__description {
    font-family: 'PublicSans', sans-serif;
    // color: $grey-text;
    line-height: 1.4;
    text-align: center;
    min-height: 60px;
  }
}
</style>

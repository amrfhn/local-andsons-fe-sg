<template>
  <div class="about-us-wrapper">
    <GlobalHeader show-full-logo />
    <div class="first-section">
      <div class="first-section-content">
        <div class="first-section-content-1">
          <div>
            insert pic here
          </div>
        </div>
        <div class="first-section-content-2">
          <h2>Science in a bottle.</h2>
          <p>
            Clinically proven solution to help men look good and feel better.
          </p>
          <p>
            <span>We believe two things.</span> One, that men should be allowed to care about their health. And two,
            that doing so should be easy.
          </p>
        </div>
      </div>
    </div>
    <div class="second-section">
      <div class="second-section-content">
        <div class="second-section-content-1">
          <div>
            <h3>
              We're helping guys access the best treatment science has to offer, discreetly and easily, all priced not
              to break the bank.
            </h3>
          </div>
          <p>
            We also hope to enable conversation about health, and break down the stigma that says men have to 'man up
            and deal with it'. Health affects every aspect of life, so why should us guys settle for less than the best?
          </p>
        </div>
        <div class="second-section-content-2">
          <div>
            insert pic here
          </div>
        </div>
      </div>
    </div>
    <div class="third-section">
      <div class="third-section-content">
        <div class="third-section-content-1">
          <div>
            insert pic here
          </div>
        </div>
        <div class="third-section-content-2">
          <h2>Science in a bottle.</h2>
          <p>
            Clinically proven solution to help men look good and feel better.
          </p>
          <p>
            <span>We believe two things.</span> One, that men should be allowed to care about their health. And two,
            that doing so should be easy.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GlobalHeader from '@/components/GlobalHeader'

export default {
  components: {
    GlobalHeader
  }
}
</script>

<style lang="scss" scoped>
.about-us-wrapper {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  .first-section {
    height: 80vh;
    width: 100%;
    background-color: #efefef;
    &-content {
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      &-1 {
        margin-top: 8rem;
        width: 50%;
      }
      &-2 {
        margin-top: 8rem;
        width: 50%;
      }
    }
  }
  .second-section {
    height: 80vh;
    width: 100%;
    background-color: #aca7a7;
    &-content {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
      &-1 {
        margin: auto;
        width: 65%;
      }
      &-2 {
        text-align: center;
        margin: auto;
        width: 35%;
      }
    }
  }
  .third-section {
    height: 80vh;
    width: 100%;
    background-color: #efefef;
    &-content {
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      &-1 {
        margin-top: 8rem;
        width: 50%;
      }
      &-2 {
        margin-top: 8rem;
        width: 50%;
      }
    }
  }
}
</style>

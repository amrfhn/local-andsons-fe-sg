<template>
  <div class="footer-container">
    <ul class="social">
      <li class="social__item">
        <a href="https://www.instagram.com/andsons/" class="insta"></a>
      </li>
      <!-- <li class="social__item"><a href="https://www.facebook.com/andsonsmy" class="facebook"></a></li>
      <li class="social__item"><a href="https://twitter.com/Andsonsmy" class="twitter"></a></li>
      <li class="social__item"><a href="" class="linkedin"></a></li>
      <li class="social__item"><a href="https://www.youtube.com/channel/UC9X1gQ8oP3pGLV1E7D1KtDA/" class="youtube"></a></li> -->
    </ul>
    <router-link tag="small" :to="{ name: 'PrivacyAndPolicy' }">Privacy Policy</router-link>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.footer-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5.5rem 0;
  position: relative;

  @media screen and (max-width: 1140px) {
    padding: 3rem 0;
  }
}

small {
  font-family: 'PublicSans', sans-serif;
  cursor: pointer;
}

.social {
  display: flex;
  justify-content: space-evenly;
  max-width: 20rem;
  width: 100%;
  padding-bottom: 2rem;
  text-align: center;
  margin: 0 auto;

  &__item {
    list-style: none;

    a {
      height: 30px;
      width: 30px;
      display: block;
    }
  }

  .insta {
    background: url('../../../assets/images/insta_icon.svg') center/contain no-repeat;
  }

  .facebook {
    background: url('../../../assets/images/fb_icon.svg') center/contain no-repeat;
  }

  .twitter {
    background: url('../../../assets/images/twitter_icon.svg') center/contain no-repeat;
  }

  .linkedin {
    background: url('../../../assets/images/linkedin_icon.svg') center/contain no-repeat;
  }

  .youtube {
    background: url('../../../assets/images/youtube_icon.svg') center/contain no-repeat;
  }
}
</style>

<style lang="scss" scoped>
.social-buttons {
  display: grid;
  grid-template-columns: repeat(2, minmax(auto, 1fr));
  gap: 10px;

  button {
    cursor: pointer;
    border-radius: 5px;
    outline: none;
    border: none;
    color: #fff;
    height: 50px;
    font-size: 1.125rem;
    font-family: 'Public Sans', sans-serif;
    letter-spacing: 1.8px;
    display: flex;
    align-items: center;
    padding: 0 20px;

    @media screen and (max-width: 450px) {
      justify-content: center;
    }

    svg {
      margin-right: 30px;
      font-size: 23px;

      @media screen and (max-width: 768px) {
        font-size: 20px;
        margin-right: 20px;
      }

      @media screen and (max-width: 450px) {
        margin-right: 0;
      }
    }

    @media screen and (max-width: 768px) {
      font-size: 13px;
    }
  }
  .facebook {
    background: #3b5795;

    svg {
      font-size: 26px;

      @media screen and (max-width: 768px) {
        font-size: 24px;
      }
      @media screen and (max-width: 450px) {
        font-size: 23px;
      }
    }
  }
  .google {
    background: #d34837;
  }
}

.separator-text {
  color: #b7b7b7;
  font-size: 1.125rem;
  margin: 20px 0;
  text-align: center;

  @media screen and (max-width: 410px) {
    font-size: 1rem;
  }
}

.social-name {
  @media screen and (max-width: 450px) {
    display: none;
  }
}
</style>

<script lang="jsx">
import { socialLogin } from "@/api/users";
import store from "@/store";
import {mergeTempCart} from "@/api/carts";
import {normalizedUserForInsider, trackLogin} from "@/utils/analytics";

export default {
  mounted() {
    window.addEventListener('message', this.onMessage, false);
  },
  beforeDestroy () {
    window.removeEventListener('message', this.onMessage);
  },
  methods:{
    async successSocialLogin(token, user) {
      const accessToken = `Bearer ${token}`;
      const userProfile = user;
      localStorage.setItem("andsons_token", accessToken);

      // Merge Cart if temp token exists
      if(localStorage.getItem("andsons_tmp_token")){
        await mergeTempCart({temp_token: localStorage.getItem("andsons_tmp_token").replace('Bearer ', '')}).finally(() => {
          localStorage.removeItem("andsons_tmp_token");
        });
      }
      store.commit("updateUserProfile", userProfile);
      store.commit("updateAuthenticated", true);

      const insiderUserObject = await normalizedUserForInsider(userProfile, true);
      localStorage.setItem(
        "andsons_insiderUserObject",
        JSON.stringify(insiderUserObject)
      );
      trackLogin(window, userProfile, insiderUserObject);

      if (this.$route.query.fromCheckout !== undefined) {
        this.$router.push("/checkout");
      } else if (this.$route.query.fromEvaluation !== undefined) {
        this.$router.push(`/product/${this.$route.query.fromEvaluation}/select`);
      } else {
        this.$router.push("/");
      }
    },
    openWindow (url, title, options = {}) {
      if (typeof url === 'object') {
        options = url
        url = ''
      }
      options = { url, title, width: 600, height: 720, ...options }
      const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screen.left
      const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screen.top
      const width = window.innerWidth || document.documentElement.clientWidth || window.screen.width
      const height = window.innerHeight || document.documentElement.clientHeight || window.screen.height
      options.left = ((width / 2) - (options.width / 2)) + dualScreenLeft
      options.top = ((height / 2) - (options.height / 2)) + dualScreenTop
      const optionsStr = Object.keys(options).reduce((acc, key) => {
        acc.push(`${key}=${options[key]}`)
        return acc
      }, []).join(',')
      const newWindow = window.open(url, title, optionsStr)
      if (window.focus) {
        newWindow.focus()
      }
      return newWindow
    },
    onMessage (e){
      if (e.origin !== process.env.VUE_APP_API_BASE_URL || !e.data.token) {
        return
      }
      this.successSocialLogin(e.data.token, e.data.user);
    },
    socialLogin(provider){
      const newWindow = this.openWindow('', 'message');
      socialLogin(provider).then(response => {
        newWindow.location.href = response.data.url;
      })
    }
  },
  render() {
    return (
      <div>
        <div class="social-buttons">
          <button class="facebook" type="button" onClick={() => this.socialLogin("facebook")}>
            <font-awesome-icon icon={["fab", "facebook-square"]}/>
            <p class="social-name">FACEBOOK</p>
          </button>
          <button class="google" id="google-button" type="button" onClick={() => this.socialLogin("google")}>
            <font-awesome-icon icon={["fab", "google"]}/>
            <p class="social-name">GOOGLE</p>
          </button>
        </div>
        <div class="separator-text">or continue with</div>
      </div>
    );
  },
};
</script>

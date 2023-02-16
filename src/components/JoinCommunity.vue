<style lang="scss">
.error-message {
  color: red;
  display: block;
  text-align: left;
  margin-bottom: 1rem;
  @media screen and (max-width: 768px) {
    font-size: 80%;
  }
}

.contact-container {
  position: relative;
  background: #f7f8f2;

  @media screen and (max-width: 768px) {
    background: #f7f8f2 url('../assets/images/catalogue/community-bg-mobile-1.png') center no-repeat;
    background-size: cover;
  }
}

.footer-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  object-fit: cover;

  @media screen and (max-width: 768px) {
    display: none;
  }
}

.contact-content {
  position: relative;
  padding: 15vw 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;

  .contact-header {
    & > * {
      margin-bottom: 1.5rem;
      @media screen and (max-width: 768px) {
        margin-bottom: 1rem;
      }
    }

    .contact-title {
      font-family: PublicSansExtraBold, sans-serif;
      font-size: 2rem;
      text-align: center;
      @media screen and (max-width: 768px) {
        font-size: clamp(1rem, 10vw, 2rem);
      }
      &.variant-large-title {
        font-size: 32px;
        margin-bottom: 1.5rem;

        @include mediaMd {
          font-size: 3.75rem;
        }
      }
    }
    .subtitle {
      font-size: 1.125rem;
    }

    .contact-subtitle {
      font-family: PublicSans, monospace;
      font-size: 1.125rem;
      text-align: center;

      @media screen and (max-width: 768px) {
        font-size: 0.75rem;
      }
    }
  }
}

.contact-form {
  display: flex;
  align-items: center;
  height: 58px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    height: 150px;
  }

  input {
    height: 58px;
    width: 15vw;
    max-width: 500px;
    border: 1px solid black;
    // margin-right: 2rem;
    padding: 0 2rem;
    @media screen and (max-width: 768px) {
      width: 60vw;
      margin-right: 0;
    }

    @media screen and (max-width: 450px) {
      height: 50px;
    }
  }

  .submit-button {
    display: block;
    font-family: 'PublicSansExtraBold', sans-serif;
    text-transform: uppercase;
    letter-spacing: 1px;
    height: 58px;
    width: 180px;
    line-height: 58px;
    overflow: hidden;
    background: black;
    border: 1px solid black;
    cursor: pointer;
    transition: all 0.3s ease;
    margin: 0;
    padding: 0;

    @media screen and (max-width: 768px) {
      font-size: 80%;
      width: 130px;
    }

    @media screen and (max-width: 450px) {
      height: 50px;
      line-height: 50px;
    }

    &.animated {
      animation: 0.3s short-press cubic-bezier(0.77, 0, 0.175, 1) forwards;
    }

    > span {
      display: block;
      color: white;
      text-align: center;

      &.pre-state-msg {
        transition: all 0.3s cubic-bezier(0.77, 0, 0.175, 1);
      }
    }

    &.state-1 {
      .pre-state-msg {
        margin-top: -58px;
        @media screen and (max-width: 450px) {
          margin-top: -50px;
        }
      }
    }

    &.state-2 {
      .pre-state-msg {
        margin-top: -116px;
        @media screen and (max-width: 450px) {
          margin-top: -100px;
        }
      }
    }

    &.state-3 {
      .pre-state-msg {
        margin-top: -174px;
        @media screen and (max-width: 450px) {
          margin-top: -150px;
        }
      }
    }
  }
}

.contact-card {
  margin: auto;
  padding-top: 3rem;
  display: none;

  @media screen and (max-width: 768px) {
    display: initial;
  }
}

p.fineprint {
  margin-top: 20px;

  @media screen and (max-width: 768px) {
    margin-left: 20px;
    margin-right: 20px;
    text-align: center;
  }
}
</style>
<script lang="jsx">
  import axios from "@/services/axios-config.js";
  import dom from '@/utils/domManipulation.js'
  import Field from "./Field";
  import CommunityBg from '@/assets/images/catalogue/join-community-bg.jpg';
  import CommunityMobileBg from '@/assets/images/catalogue/community-bg-mobile-2.png';

export default {
  components: { Field },
  props: ["contactTitle", "subtitle", "customTitleStyle", "hideSelectedTreatmentPrint"],
  data() {
    return {
      email: '',
      name: '',
      error: '',
      // hairChecked: false,
      // sexChecked: false,
      // skinChecked: false,
      // mindChecked: false,
      sendState: false
    };
  },
  watch: {
    email(val){
      if(val === ""){
        this.error = ""
        this.sendState = false
      }
    }
  },
  methods:{
    async callSubscribeAPI(e) {
      e.preventDefault();
      this.error = '';
      if(this.email != '' && this.name != ''){
        try{
          this.sendState = true;
          dom.updateButtonMsg();
          const response = await axios.post(`/api/v1/leads/subscribeNewsletter`, { email: this.email, name: this.name });
          if(response.status === 200){
            dom.finalButtonMsg();
            this.clearInput();

            // send custom GTM event
            window?.dataLayer?.push({
              event: 'new-subscriber',
            });
          }
        }catch(error){
          this.sendState = false;
          this.error = error.response.data.userMessage;
          dom.errorButtonMsg();
        }
      }else{
        this.error = 'Please key in your name and email';
      }
    },
    onChangeEmail(event){
      this.email = event.target.value;
    },
    onChangeName(event){
      this.name = event.target.value;
    },
    clearInput(){
      this.email = '';
      this.name = '';
      this.sexChecked = false;
      this.skinChecked = false;
      this.mindChecked = false;
      this.hairChecked = false;
    }
  },
  render() {
    return (
      <div id="contact-section" class="contact-container">
        <img src={CommunityBg} alt="background" class="footer-bg"/>
        <div class="contact-content">
          <div class="contact-header">
            <h4 class={`contact-title ${this.customTitleStyle ? 'variant-large-title' : ''}`}>{this.contactTitle ? this.contactTitle : 'Get the latest updates from andSons'}</h4>
            <p class="subtitle text-center">{this.subtitle ? this.subtitle : ''}</p>
          </div>
          <p class="error-message">{this.error}</p>
          <form action="" class="contact-form">
            <input type="text" placeholder="Name" onChange={this.onChangeName} />
            <input type="text" placeholder="Email" onChange={this.onChangeEmail}/>
            <div class="btn-submit">
              <button id="subcribeButton" class="submit-button state-0" onClick={this.callSubscribeAPI} disabled={this.sendState}>
                <span class="pre-state-msg">Subscribe</span>
                <span class="current-state-msg hide">Sending...</span>
                <span class="done-state-msg hide">Done!</span>
                <span class="error-state-msg hide">Error!</span>
              </button>
            </div>
          </form>
          {/*!this.hideSelectedTreatmentPrint ?
            <p class="fineprint">*on selected treatments.</p>
          : ''
          */}
          <img src={CommunityMobileBg} alt="contact card" class="contact-card"/>
        </div>
      </div>
    );
  },
};
</script>

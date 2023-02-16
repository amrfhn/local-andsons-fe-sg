<style lang="scss" scoped>
.card-wrapper {
  max-width: 560px;
  background: #fff;
  margin: auto;
  position: relative;

  form {
    display: flex;
    flex-direction: column;
  }

  img {
    position: absolute;
    top: 20px;
    right: 20px;
    height: 15px;
    width: 15px;
    cursor: pointer;
  }
}

.tabs {
  display: flex;

  a {
    width: 50%;
    text-align: center;
    font-size: 24px;
    text-decoration: none;
    color: #707070;
    border-bottom: 1px solid rgba(#707070, 0.5);
    text-transform: capitalize;

    &.router-link-active {
      border-bottom: 2px solid rgba(#707070, 1);
      color: #000;
      font-weight: bold;
    }
  }
}
</style>

<script lang="jsx">
import classnames from "classnames";
import close from "../../../assets/images/close.svg";

export default {
  props: {
    title: String,
    isLoginRegister: {
      type: Boolean,
      default: false
    }
  },
  methods:{
    backClick(){
      this.$router.go(-1);
    }
  },
  render() {
    const onSubmit = (e) => {
      this.$emit("submit", e);
    };
    return (
      <div class={classnames("tw-pb-10 card-wrapper", {'card-login-register': this.isLoginRegister})}>
          {this.isLoginRegister ?
              (
                  <div class="tabs">
                    <router-link
                      class="tw-py-5"
                      to={{path: "/user/register", query: this.$route.query}}
                    >
                      Register
                    </router-link>

                    <router-link
                      class="tw-py-5"
                      to={{path: "/user/login", query: this.$route.query}}
                    >
                      Login
                    </router-link>
                  </div>
              ) :
              (
                  <img src={close} onClick={this.backClick}/>
              )
          }

          {this.title && (<div class="title tw-font-bold tw-text-2xl tw-px-4 md:tw-px-10 tw-py-5">{this.title}</div>)}

        <div class="tw-px-4 md:tw-px-10">
          <form onSubmit={onSubmit}>{this.$slots.default}</form>
        </div>
      </div>
    );
  },
};
</script>

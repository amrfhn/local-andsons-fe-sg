<style lang="scss" scoped>
.header-wrapper {
  position: fixed;
  padding-top: 3rem;
  top: 0;
  width: calc(100vw - 60px - 10vw);
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 450px) {
    padding-top: 1.5rem;
  }

  .need-help {
    cursor: pointer;
    color: #d85639;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
}

.header-sticky {
  position: relative;
  // padding-top: 3rem;
  // margin: -180px 0 80px;
}
</style>

<script lang="jsx">
import Logo from "./Logo";
export default {
  render() {
    return (
      <div>
        { (this.$route.name === "Login" || this.$route.name === "Register"  ) ?
          ( <router-link to="/" class="header-wrapper header-sticky">
              <Logo />
            </router-link>
          ) :
          (<router-link to="/" class="header-wrapper">
              <Logo />
            </router-link>
          )
        }

      </div>
    );
  },
};
</script>

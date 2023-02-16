<style lang="scss" scoped>
.logo {
  display: flex;
  align-items: flex-end;

  .left-logo {
    width: 100%;
    max-width: 40px;
    height: auto;
    z-index: 19;

    @media screen and (max-width: 1140px) {
      max-width: 30px;
    }
  }

  .right-logo {
    max-width: 100px;
    margin-right: 32px;
    position: relative;

    @media screen and (max-width: 1140px) {
      max-width: 60px;
    }
  }
}
</style>
<script lang="jsx">

import floatingLogo from "../assets/images/floating_logo.svg";
import sonsLogo from "../assets/images/sons_logo.svg";

export default {
  render() {
    return (
      <router-link class="logo" to="/">
        <img src={floatingLogo} class="left-logo" alt="andsons logo"/>
        <img src={sonsLogo} class="right-logo" alt="andsons logo"/>

      </router-link>
    );
  },
};
</script>

<style lang="scss" scoped>
.my-account-wrapper {
  .profile {
    display: flex;
    align-items: center;
    font-size: 1.375rem;
    .profile-photo {
      border-radius: 50%;
      width: 100px;
      height: 100px;
      margin-right: 16px;
    }
  }
  .tabs {
    background: #fff;
    margin-top: 32px;
    li {
      list-style-type: none;
      padding: 0;
      a {
        display: block;
        padding: 16px;
        text-decoration: none;
        font-size: 1.375rem;
        font-family: PublicSans, sans-serif;
        color: #b7b7b7;
        transition: all 0.3s;
        &:hover,
        &.active {
          color: #000;
        }
      }
    }
  }
}
</style>
<script lang="jsx">
import { formatMetaTags } from "@/utils/prettify.js";

export default {
  metaInfo() {
    return formatMetaTags({
      title: "My Account",
      urlPath: this.$route.path
    })
  },
  computed: {
    userProfile() {
      return this.$store.state.userProfile;
    },
  },
  render() {
    return (
      <div class="my-account-wrapper">
        <div>
          <router-view />
        </div>
      </div>
    );
  },
};
</script>

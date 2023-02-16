<style lang="scss">
.details-wrapper {
  background: #fff;
  .details-title {
    font-family: PublicSansExtraBold, sans-serif;
    font-size: 1.375rem;
    padding: 16px 32px;
    display: flex;
    justify-content: space-between;

    @media screen and (max-width: 768px) {
      padding: 16px;
      font-size: 1.125rem;
    }
  }
  .details-section {
    background: #fbfcf9;
    padding: 32px;

    @media screen and (max-width: 410px) {
      padding: 20px;
    }
  }
  .action {
    cursor: pointer;
    text-decoration: underline;
    font-family: PublicSans, monospace;
    font-size: 1.125rem;

    @media screen and (max-width: 410px) {
      font-size: 15px;
    }
  }
}
</style>

<script lang="jsx">
import MyProfile from "@/modules/Dashboard/MyAccount/MyDetails/MyProfile";
import CardDetails from "@/modules/Dashboard/MyAccount/MyDetails/CardDetails";
import MyAddress from "@/modules/Dashboard/MyAccount/MyDetails/MyAddress";
import { trackLogout } from "@/utils/analytics";
// import { userLogout } from "@/api/users";

export default {
  components: { MyAddress, CardDetails, MyProfile },
  render() {
    const onLogout = () => {
      // userLogout().then(() => {
        const userId = this.$store.state.userProfile.id;

        localStorage.removeItem("andsons_token");
        localStorage.removeItem("andsons_insiderUserObject");
        this.$store.commit("updateAuthenticated", false);
        this.$store.commit("updateUserProfile", undefined);
        this.$store.commit("updateCart", {});

        window.insider_object = {};
        this.$router.replace("/");

        trackLogout(window, userId);
      // });
    };
    return (
      <div>
        <div class="details-wrapper">
          <MyProfile />
          <CardDetails />
          <MyAddress />
        </div>
        <button class="submit-button center" onClick={onLogout} style="border-radius:4px">
          LOGOUT
        </button>
      </div>
    );
  },
};
</script>

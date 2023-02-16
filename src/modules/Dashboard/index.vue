<style lang="scss" scoped>
.store-wrapper {
  .store {
    background: $springwood-background;
    min-height: 100vh;
    padding-left: calc(30px + 5vw);
    padding-right: calc(30px + 5vw);
    overflow: hidden;
    @media screen and (max-width: 768px) {
      padding-left: 5vw;
      padding-right: 5vw;
    }
    .header {
      display: flex;
      align-items: center;

      .action-wrapper {
        margin-left: auto;

        .btn {
          width: 50px;
          height: 50px;

          &:not(:last-child) {
            margin-right: 40px;
          }
        }
      }
    }

    .container {
      .nav-wrapper {
        @media screen and (max-width: 768px) {
          display: flex;
          align-items: center;
          overflow: auto;
        }

        a {
          color: #f0d4cc;
          text-decoration: none;

          &.active {
            color: #ed9075;
          }

          &:not(:last-child) {
            margin-right: 60px;
            @media screen and (max-width: 768px) {
              margin-right: 20px;
            }
          }
        }
      }
    }
  }
}
</style>
<style lang="scss">
.order-summary-button {
  margin-left: auto;
  font-size: 18px;
  text-align: right;
  @media screen and (max-width: 768px) {
    font-size: 0.75rem;
  }

  @media screen and (max-width: 410px) {
    margin-top: 0.5rem;
  }

  svg {
    font-size: 13px;
  }
}
.tag {
  background: #ed9075;
  border-radius: 4px;
  padding: 4px 8px;
  color: #fff;
  margin-left: 18px;
  font-size: 0.9375rem;
  display: table;
}
</style>
<script lang="jsx">
import GlobalHeader from "@/components/GlobalHeader";

export default {
  components: { GlobalHeader },
  render() {
    return (
      <div class="store-wrapper">
        <GlobalHeader showFullLogo />
        <div class="store tw-pt-20 md:tw-pt-28 tw-pb-16">
          <main class="container">
            <nav class="nav-wrapper tw-pb-3 md:tw-pb-8">
              <router-link exact class="tw-text-base md:tw-text-2xl tw-font-bold" active-class="active" to="/dashboard">
                Dashboard
              </router-link>
              <router-link class="tw-text-base md:tw-text-2xl tw-font-bold" active-class="active" to="/dashboard/orders">
                Orders
              </router-link>
              <router-link class="tw-text-base md:tw-text-2xl tw-font-bold" active-class="active" to="/dashboard/subscriptions">
                Subscriptions
              </router-link>
              <router-link
                exact
                class="tw-text-base md:tw-text-2xl tw-font-bold"
                active-class="active"
                to="/dashboard/appointments"
              >
                Appointments
              </router-link>
              <router-link class="tw-text-base md:tw-text-2xl tw-font-bold" active-class="active" to="/dashboard/my-account">
                Profile
              </router-link>
            </nav>
            <router-view />
          </main>
        </div>
      </div>
    );
  },
};
</script>

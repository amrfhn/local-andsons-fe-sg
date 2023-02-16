<style lang="scss" scoped>
.subscriptions-tabs {
  background: #fff;
  display: flex;
  overflow: auto;

  .subscriptions-tab-option {
    cursor: pointer;
    color: #b7b7b7;
    font-family: PublicSansExtraBold, sans-serif;
    font-size: 1.375rem;
    padding: 16px 32px;
    transition: all 0.2s;
    &.active {
      color: #000;
    }

    a {
      color: inherit;
    }

    @media screen and (max-width: 768px) {
      font-size: 1.1rem;
    }

    @media screen and (max-width: 510px) {
      font-size: 1rem;
      // padding: 10px;
    }
  }
}
</style>
<style lang="scss">
.subscriptions-tabs a {
  text-decoration: none;
}
.subscription-card {
  background: #fff;
  padding: 32px;
  margin-top: 16px;

  @media screen and (max-width: 410px) {
    padding: 20px;
  }

  &.transparency {
    background: rgba(255, 255, 255, 0.6);
  }
  .subscription-title {
    font-family: PublicSansExtraBold, sans-serif;
    font-size: 1.375rem;
    display: flex;
    align-items: center;
    @media screen and (max-width: 768px) {
      font-size: 1rem;
    }
    @media screen and (max-width: 410px) {
      align-items: flex-start;
    }
  }
  .subscription-subtitle {
    font-family: PublicSans, monospace;
    font-size: 1.125rem;
    color: #b7b7b7;
    margin-top: 16px;

    @media screen and (max-width: 400px) {
      font-size: 1rem;
    }
  }

  .subscription-number-anchor {
    display: flex;
    justify-content: space-between;
    flex-grow: 1;
    align-items: center;

    @media screen and (max-width: 410px) {
      flex-direction: column;
      align-items: flex-end;
    }
  }
}
</style>

<script lang="jsx">
import classnames from "classnames";
import { getSubscriptions } from "@/api/subscriptions";
import { eventBus } from '@/main.js';
import { formatMetaTags } from "@/utils/prettify.js";

const tabOptions = ["Active Subscriptions", "Past Subscriptions"];
export default {
  metaInfo() {
    return formatMetaTags({
      title: tabOptions[this.selectedTab],
      urlPath: this.$route.path,
    })
  },
  data() {
    return {
      selectedTab: 0,
    };
  },
  watch:{
    $route(){
      this.getSubscriptions()
    }
  },
  mounted(){
    this.getSubscriptions()
    eventBus.$on('refreshSubscriptionsList', () => {
      this.getSubscriptions()
    });
  },
  methods: {
    getSubscriptions(){

      let subStatus = 'active'
      if (this.selectedTab == 0) {
        subStatus = 'active'
      } else if (this.selectedTab == 1) {
        subStatus = 'inactive'
      }

      getSubscriptions(subStatus).then((response) => {
      this.subscriptions = response.data.response.subscriptions.data;
      let subscriptions = response.data.response.subscriptions.data;

      //Sort subscription by latest
      subscriptions = subscriptions.reverse();
      eventBus.$emit('loadingSubscription', false);
      eventBus.$emit('changeCurrentSubscriptionsList', subscriptions);
    });
    }
  },
  render() {
    const onTabChange = (status, index) => () => {

      if (index == 0) {
        status = 'active'
      } else if (index == 1) {
        status = 'inactive'
      }

      getSubscriptions(status).then((response) => {
        this.subscriptions = response.data.response.subscriptions.data;
        let subscriptions = response.data.response.subscriptions.data;

        //Sort subscription by latest

        subscriptions = subscriptions.reverse();
        eventBus.$emit('loadingSubscription', false);
        eventBus.$emit('changeCurrentSubscriptionsList', subscriptions);
      });

      this.selectedTab = index;
    };
    return (
      <div>
        <div class="subscriptions-tabs">
          {tabOptions.map((t, i) => (
            <div
              class={classnames("subscriptions-tab-option", {
                active: i === this.selectedTab,
              })}
              onClick={onTabChange(t, i)}
            >
            <router-link to={{ pathname: '/dashboard/subscriptions'}}>
              {t}
              </router-link>
            </div>
          ))}
        </div>
        <router-view />
      </div>
    );
  },
};
</script>

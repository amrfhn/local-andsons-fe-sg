<template>
  <div v-if="!loadingSubscriptions">
    <div v-if="subscriptions.length > 0">
      <SubscriptionListItem v-for="s of subscriptions" :key="s.id" :subscription="s" />
    </div>
    <div v-else :style="{ textAlign: 'center', marginTop: '20px' }" class="order-summary-button">
      <p>
        You have nothing here. Click
        <router-link to="/treatment/hair-loss">here</router-link> to go to shop.
      </p>
    </div>
  </div>
</template>

<script lang="jsx">
import SubscriptionListItem from "./SubscriptionListItem.vue";
import { eventBus } from '@/main.js';

export default {
  components: { SubscriptionListItem },
  data() {
    return {
      subscriptions: [],
      loadingSubscriptions: true,
    };
  },
  mounted(){
    eventBus.$on('loadingSubscription', (loading) => {
      this.loadingSubscriptions = loading;
    });
    eventBus.$on('changeCurrentSubscriptionsList', (currentSubscription) => {
      this.subscriptions = currentSubscription;
    });
  },
};
</script>

<style lang="scss" scoped></style>

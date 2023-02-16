<template>
  <div class="layout">
    <SocialChat icon class="whatsapp-chat" :attendants="attendants">
      <p slot="header">Chat with us on WhatsApp.</p>
      <template v-slot:button>
        <img src="../assets/images/whatsapp.svg" alt="icon whatsapp" aria-hidden="true" />
      </template>
      <small slot="footer">All conversations are private and confidential.</small>
    </SocialChat>
  </div>
</template>

<script>
import { SocialChat } from 'vue-social-chat'

export default {
  name: 'WhatsAppPage',

  components: {
    SocialChat
  },

  data: () => ({
    attendants: [
      {
        app: 'whatsapp',
        label: 'andSons Support',
        name: 'Alice',
        number: process.env.VUE_APP_WHATSAPP_NUMBER,
        avatar: {
          src: 'https://s3-ap-southeast-1.amazonaws.com/stagingassets.andsons.com.my/and_logo.png',
          alt: 'Alice'
        }
      }
    ]
  })
}
</script>

<style>
.whatsapp-chat {
  --whatsapp: #46c056;
  --vsc-bg-header: var(--whatsapp);
  --vsc-bg-button: var(--whatsapp);
  --vsc-outline-color: var(--whatsapp);
}
.vsc-popup {
  flex-direction: column;
  align-items: flex-end;
}
</style>

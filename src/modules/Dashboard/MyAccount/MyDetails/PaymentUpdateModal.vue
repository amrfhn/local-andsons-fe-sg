<template>
  <PopUp ref="defaultCardChangePopup">
    <template v-slot:header>
      <h1 class="popup-header">Default Card Confirmation</h1>
    </template>
    <template v-slot:body>
      <div class="popup-body">
        <div class="popup-body-text">
          Please <span class="tw-font-bold">‘Confirm’</span> that existing subscriptions will be billed to the new
          default credit card. <br /><br />
          <span class="tw-font-bold">‘Cancel’</span> to keep existing subscriptions billed to the current credit card.
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <div class="popup-footer">
        <button class="block-button" @click="changeCardForSubscriptions">
          Confirm
        </button>
        <button class="link-button" @click="cancelCardChange">Cancel</button>
      </div>
    </template>
  </PopUp>
</template>

<script>
import PopUp from '@/components/PopUp'

export default {
  name: 'PaymentUpdateModal',
  components: {
    PopUp
  },
  methods: {
    openModal: function() {
      this.$refs.defaultCardChangePopup.openModal()
    },
    closeModal: function() {
      this.$refs.defaultCardChangePopup.closeModal()
    },
    changeCardForSubscriptions: function() {
      this.$emit('subscription-update-submitted')
      this.closeModal()
    },
    cancelCardChange: function() {
      this.$emit('card-change-cancelled')
      this.closeModal()
    }
  }
}
</script>

<style lang="scss" scoped>
.popup-header {
  font-size: 1.8rem;
  padding: 1rem 0;
  @media screen and (max-width: 768px) {
    font-size: 19px;
  }
}

.popup-body {
  max-width: 100%;
  .popup-body-text {
    font-size: 16px;
    padding-bottom: 2rem;
    @media screen and (max-width: 768px) {
      font-size: 14px;
    }
  }
}

.popup-footer {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;

  button {
    margin-right: 1rem;
    cursor: pointer;
    padding: 12px 50px;
    font-size: 20px;
    border: 4px solid black;
    @media screen and (max-width: 768px) {
      font-size: 14px;
      padding: 3px 5px;
    }
  }

  .link-button {
    text-decoration: underline;
    border: none;
    transition: color 0.5s;
    font-size: 1em;
    width: 100%;
  }

  .link-button:hover {
    color: #ed9075;
  }

  .block-button {
    width: 100%;
    background-color: #000;
    color: #fff;
    transition: background-color 0.5s, border-color 0.5s;
    margin-bottom: 0.5em;
    line-height: 1.5rem;
  }

  .block-button:hover {
    background-color: #ed9075;
    border-color: #ed9075;
  }
}
</style>

<template>
  <PopUp ref="cardErrorPopup">
    <template v-slot:header>
      <div class="popup-header">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
    </template>
    <template v-slot:body>
      <div class="popup-body">
        <div class="popup-body-text">
          {{ error }}
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <div class="popup-footer">
        <button class="block-button" @click="closeModal">Okay</button>
      </div>
    </template>
  </PopUp>
</template>

<script>
import PopUp from '@/components/PopUp'

export default {
  name: 'CardErrorModal',
  components: {
    PopUp
  },
  props: {
    error: {
      type: String,
      default: ''
    }
  },
  methods: {
    openModal: function() {
      this.$refs.cardErrorPopup.openModal()
    },
    closeModal: function() {
      this.$refs.cardErrorPopup.closeModal()
    }
  }
}
</script>

<style lang="scss" scoped>
.popup-header {
  display: flex;
  justify-content: center;
  svg {
    width: 10rem;
    height: 10rem;
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

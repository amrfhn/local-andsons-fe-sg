<template>
  <div class="get-consultation-popup">
    <transition name="fade" appear>
      <div v-if="showModal" class="popup-overlay" @click="updateShowModal(false)"></div>
    </transition>

    <transition name="slide" appear>
      <div v-if="showModal" class="modal">
        <div class="modal-header mb-32">
          Looks like you're in {{ redirectCountry }}! Change your location?
          <span class="close-button" @click="updateShowModal(false)">
            <img :src="require(`@/assets/images/close.svg`)" alt="X" />
          </span>
        </div>
        <div class="modal-body text-center">
          <a target="_self" :href="redirectLink" class="btn-modal" @click="updateShowModal(false)">
            {{ redirectCountry }}
          </a>
          <a target="_self" class="btn-modal" @click="updateShowModal(false)">
            Singapore
          </a>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    showModal: {
      type: Boolean,
      default: false
    },
    redirectLink: { type: String },
    redirectCountry: { type: String }
  },
  methods: {
    updateShowModal(value) {
      this.$emit('updateShowModal', value)
    }
  }
}
</script>

<style lang="scss" scoped>
.get-consultation-popup {
  .popup-overlay {
    position: fixed;
    display: block;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 98;
    cursor: pointer;
  }
  .modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 99;
    padding: 25px;
    width: 100%;
    max-width: 415px;
    background-color: #fff;
    border-radius: 5px;
    max-height: 90vh;
    overflow: auto;
    @media screen and (max-width: 450px) {
      width: 90vw;
    }
  }
  .modal-header {
    font-size: 1.5rem;
    text-align: center;
    font-family: 'PublicSansExtraBold', sans-serif;
    @media screen and (max-width: 400px) {
      font-size: 18px;
    }
    .close-button {
      position: absolute;
      cursor: pointer;
      top: 3%;
      right: 2%;
      @media screen and (max-width: 400px) {
        right: 5%;
      }
      img {
        height: 15px;
        width: 15px;
        cursor: pointer;
      }
    }
  }
  .modal-body {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    @include mediaSm {
      flex-direction: column;
    }
    .btn-modal {
      display: inline-block;
      padding: 1.2rem 2rem;
      font-size: 18px;
      background-color: black;
      color: white;
      border: 1px solid black;
      font-family: 'PublicSansBold', sans-serif;
      text-decoration: none;
      transition: all 0.4s ease-in-out;
      @include mediaSm {
        margin-bottom: 0.5rem;
      }
      &:hover {
        background-color: white;
        color: black;
        cursor: pointer;
      }
    }
    .btn-cancel {
      background-color: white;
      color: black;
      &:hover {
        background-color: black;
        color: white;
      }
    }
  }
}
</style>

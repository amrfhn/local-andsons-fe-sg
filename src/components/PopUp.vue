<template>
  <transition name="fade">
    <div v-if="show" id="PopUp">
      <!-- Backdrop -->
      <div class="backdrop" @click="closeModal"></div>

      <!-- Dialog -->
      <div class="dialog">
        <!-- Header -->
        <div class="header">
          <slot name="header"></slot>
        </div>

        <!-- Body -->
        <div class="body">
          <slot name="body"></slot>
        </div>

        <!-- Footer -->
        <div class="footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'PopUp',
  data() {
    return {
      show: false
    }
  },
  mounted() {
    window.scrollTo(0, 0)
  },
  methods: {
    close() {
      this.$emit('close')
    },
    closeModal() {
      this.show = false
    },
    openModal() {
      this.show = true
    }
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

#PopUp {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog {
  position: relative;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-height: 90vh;
  max-width: 500px;
  padding: 25px;
  margin: 15px;
}

.body {
  overflow: auto;
  max-height: 90vh;
}

.backdrop {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 50%;
}
</style>

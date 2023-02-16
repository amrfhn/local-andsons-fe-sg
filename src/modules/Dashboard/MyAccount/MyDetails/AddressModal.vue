<template>
  <div>
    <div @click="testMethod">
      <slot></slot>
    </div>
    <transition name="fade" appear>
      <div v-if="showModal" id="overlay" @click="closeModal"></div>
    </transition>
    <template v-if="action === 'edit'">
      <EditAddressForm
        v-if="showModal && action === 'edit'"
        :address="address"
        action="edit"
        @closeModal="closeModal"
      />
    </template>
    <template v-else>
      <EditAddressForm
        v-if="showModal && action === 'create'"
        :address="address"
        action="create"
        @closeModal="closeModal"
      />
    </template>
  </div>
</template>

<script>
import EditAddressForm from './EditAddressForm'

export default {
  name: 'AddressModal',
  components: {
    EditAddressForm
  },
  props: ['action', 'address'],
  data() {
    return {
      showModal: false
    }
  },
  methods: {
    testMethod() {
      this.showModal = true
    },
    closeModal() {
      this.$emit('refresh')
      this.showModal = false
    }
  }
}
</script>

<style lang="scss" scoped>
#overlay {
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

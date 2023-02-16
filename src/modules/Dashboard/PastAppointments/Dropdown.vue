<style lang="scss">
.dropdown-wrapper {
  position: relative;
  background: #fff;
  height: 70px;
  width: 23%;
  @media screen and (max-width: 768px) {
    width: 50%;
    height: 50px;
  }
  &:not(:last-child) {
    @media screen and (max-width: 768px) {
      width: calc(50% - 20px);
      margin-right: 20px;
    }
  }
  &:after {
    content: '';
    display: block;
    position: absolute;
    right: 22px;
    top: 0;
    bottom: 0;
    margin: auto;
    background: url('../../../assets/images/arrow-down.svg') center no-repeat;
    background-size: contain;
    width: 8px;
    height: 5px;
    outline: none;
    pointer-events: none;
  }
  .icon {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 22px;
    width: 20px;
    height: 20px;
    margin: auto;
  }
  input,
  select {
    border: none;
    outline: none;
    appearance: none;
    width: 100%;
    height: 100%;
    padding: 0 32px 0 64px;
    &::-webkit-calendar-picker-indicator {
      opacity: 0;
      position: absolute;
      right: 15px;
    }
  }
}
</style>
<script lang="jsx">
export default {
  props: ["icon"],
  render() {
    return (
      <div class="dropdown-wrapper">
        <div class="icon">{this.icon}</div>
        {this.$slots.default}
      </div>
    );
  },
};
</script>

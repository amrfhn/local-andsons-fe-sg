<style lang="scss" scoped>
.order-container {
  max-width: 550px;
  margin: auto;
  text-align: center;
  overflow: hidden;
}
.order-title {
  font-family: 'Public Sans', sans-serif;
  font-size: 2.5rem;
  text-align: center;
  margin: 0;
}
.order-subtitle {
  font-family: PublicSans, monospace;
  font-size: 1.25rem;
  text-align: center;
  margin: 20px 0 0;
}
</style>
<script lang="jsx">
export default {
  mounted() {
    window.top.postMessage('3DS-authentication-complete');
  },
  render() {
    return (
      <div class="order-container">
          <div>
            <h3 class="order-title">Payment is processing.</h3>
            <p class="order-subtitle">
              Please wait...
            </p>
          </div>
      </div>
    )
  },
}
</script>
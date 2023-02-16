<script lang="jsx">
export default {
  beforeMount(){
    return this.$router.replace(`/treatment/${this.$route.params.catalogue}`)
  },
  render() {
    return (
      <div />
    )
  }
}
</script>

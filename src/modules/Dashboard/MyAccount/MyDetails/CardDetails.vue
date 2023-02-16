<script lang="jsx">
import CreditCards from './components/CreditCards.vue'

export default {
  components: {
    CreditCards
  },
  render() {
    return (
      <div>
        <div class="details-title">Card details</div>
        <CreditCards class="details-section" />
      </div>
    )
  },
}
</script>

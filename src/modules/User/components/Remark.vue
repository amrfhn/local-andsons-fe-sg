<template>
  <div class="remark-text tw-mt-5 tw-text-center tw-text-sm">
    {{ text }} &Sons'
    <a href="/terms-&-conditions" target="_blank" class="tw-underline">Terms and Conditions</a>
    &
    <a href="/privacy-policy" target="_blank" class="tw-underline">Privacy Policy</a>.
  </div>
</template>

<script>
export default {
  props: {
    text: String
  }
}
</script>

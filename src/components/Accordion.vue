<template>
  <div id="Accordion" :class="['accordion', showNumbers ? 'numbered' : '']">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    showNumbers: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss">
div.accordion {
  counter-reset: panels;
}

div.accordion.numbered {
  div.accordion-panel-header > label::before {
    counter-increment: panels;
    content: counter(panels) '. ';
  }
}

div.accordion div.panel {
  border-top: 2px solid rgba(0, 0, 0, 0.2);

  &:first-child {
    border-top: none;
  }
}
</style>

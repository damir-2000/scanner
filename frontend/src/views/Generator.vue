<template>
  <qrcode-vue :value="value" :size="size" level="H" render-as="svg"/>
</template>
<script>
  import QrcodeVue from 'qrcode.vue'

  export default {
    data() {
      return {
        value: 'https://example.com',
        size: 300,
      }
    },
    components: {
      QrcodeVue,
    },
  }
</script>
<style lang="scss" scoped>

</style>
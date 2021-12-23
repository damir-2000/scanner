<template>
  <nav>
    <ul>
      <li>
        <a href="/logout">Выйти</a>
      </li>
    </ul>
  </nav>
  <qrcode-vue :value="value" :size="size" level="H" render-as="svg" />
  <br />
  <br />
  <button @click='updateQrCode'>Обновить</button>
  <div>
    <p>Фамилия: {{ userData.last_name }}</p>
    <p>Имя: {{ userData.first_name }}</p>
    <p>Группа: {{ userData.group }}</p>
  </div>
</template>
<script>
import QrcodeVue from "qrcode.vue";
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      value: "https://example.com",
      size: 300,
    };
  },
  components: {
    QrcodeVue,
  },
  computed: {
    ...mapState({
      userData: "userData",
    }),
  },
  methods: {
    ...mapActions({
      generate: "generate",
    }),
    updateQrCode() {
      this.generate().then((data) => {
        if(data.status == 200){
          this.value = JSON.stringify(data.userData);
        }
      });
    },
  },
  mounted() {
    this.updateQrCode()
  },
};
</script>
<style lang="scss" scoped>
</style>
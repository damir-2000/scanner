<template>
  <nav>
    <ul>
      <li>
        <a href="/logout">Выйти</a>
      </li>
    </ul>
  </nav>
  <!-- <p class="error">{{ error }}</p>

  <p class="decode-result">
    Last result: <b>{{ result }}</b>
  </p> -->
  <div class="stream">
    <qrcode-stream @decode="onDecode" @init="onInit" />
  </div>
  <div class="modal-wrap" v-if="modalOpen">
    <div class="modal">
      <h4 v-if="status == 0">Вы пришли</h4>
      <h4 v-if="status == 1">Вы ушли</h4>
      <p>Дата: {{ userData.date }}</p>
      <p>Время: {{ userData.time }}</p>
      <p>Фамилия: {{ userData.last_name }}</p>
      <p>Имя: {{ userData.first_name }}</p>
      <p>Группа: {{ userData.group }}</p>
    </div>
  </div>
</template>

<script>
import { QrcodeStream } from "vue3-qrcode-reader";
import { mapActions } from "vuex";
export default {
  name: "Scanner",
  components: {
    QrcodeStream,
  },

  data() {
    return {
      result: "",
      error: "",
      modalOpen: false,
      userData: {},
      status:null
    };
  },

  methods: {
    ...mapActions({
      detect: "detect",
    }),
    onDecode(result) {
      const QRData = JSON.parse(result);
      if (
        this.result != result &&
        Object.keys(QRData).indexOf("id") != -1 &&
        Object.keys(QRData).indexOf("time") != -1
      ) {
        this.detect(QRData).then((data) => {
          if (data.userData.access == 1) {
            this.openModal();
            this.status = data.userData.status
            this.userData = data.userData.user;
            console.log(data);
          }
        });
        this.result = result;
      }
    },
    openModal() {
      this.modalOpen = true;
      setTimeout(() => {
        this.modalOpen = false;
      }, 5000);
    },
    async onInit(promise) {
      try {
        await promise;
      } catch (error) {
        if (error.name === "NotAllowedError") {
          this.error = "ERROR: you need to grant camera access permission";
        } else if (error.name === "NotFoundError") {
          this.error = "ERROR: no camera on this device";
        } else if (error.name === "NotSupportedError") {
          this.error = "ERROR: secure context required (HTTPS, localhost)";
        } else if (error.name === "NotReadableError") {
          this.error = "ERROR: is the camera already in use?";
        } else if (error.name === "OverconstrainedError") {
          this.error = "ERROR: installed cameras are not suitable";
        } else if (error.name === "StreamApiNotSupportedError") {
          this.error = "ERROR: Stream API is not supported in this browser";
        } else if (error.name === "InsecureContextError") {
          this.error =
            "ERROR: Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.";
        } else {
          this.error = `ERROR: Camera error (${error.name})`;
        }
      }
    },
  },
};
</script>

<style lang="scss">
.stream {
  width: 1000px;
}
.modal {
  position: absolute;
  left: 50%;
  top: 50%;
  background: #fff;
  transform: translate3d(-50%, -50%, 0);
  width: 400px;
  height: 600px;
  &-wrap {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.589);
  }
}
</style>

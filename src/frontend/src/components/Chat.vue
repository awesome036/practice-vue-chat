<template>
  <div>
    <div>
      <v-text-field
        @keyup.enter="sendMessage(message)"
        v-model="message"
        dark
        placeholder="Enter your history."
        height="48"
      />
    </div>
    <ul>
      <li class="star-wars-text move-message" v-for="(msg, index) in messages" :key="index">{{ msg.message }}</li>
    </ul>
  </div>
</template>

<script>
import io from "socket.io-client";

export default {
  name: "room",
  data() {
    return {
      messages: [],
      message: "",
      socket: io("http://192.168.56.107:3000", {
        withCredentials: true,
        extraHeaders: {
          "my-custom-header": "abcd",
        },
      }),
    };
  },
  methods: {
    sendMessage(message) {
      this.socket.emit("SEND_MESSAGE", { message });
      this.message = '';
    },
  },
  mounted() {
    this.socket.on("MESSAGE", (data) => {
      this.messages = [...this.messages, data];
    });
  },
};
</script>

<style scoped>
.star-wars-text {
  display: inline-block;
  visibility: hidden;
  padding: 0;
  margin: 0;
  width: 100%;
  list-style: none;
  color: yellow;
  line-height: 0.9;
  font-weight: bold;
  text-align: center;
  transform: perspective(20px) rotateX(60deg);
}

.move-message {
  animation: move-bottom-to-top 20s linear;
}
@keyframes move-bottom-to-top {
  0% {
    visibility: visible;
    font-size: 6rem;
    transform: translateY(200px) perspective(80px) rotateX(30deg);
  }
  100% {
    visibility: hidden;
    font-size: 0rem;
    transform: translateY(-200px) perspective(80px) rotateX(30deg);
  }
}
</style>

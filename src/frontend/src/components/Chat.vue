<template>
  <div>
    <h1>チャット</h1>
    <ul>
      <li v-for="(msg, index) in messages" :key="index">{{ msg.message }}</li>
    </ul>
    <div>
      <input
        type="text"
        @keyup.enter="sendMessage(message)"
        v-model="message"
      />
    </div>
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

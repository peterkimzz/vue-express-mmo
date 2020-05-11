<template>
  <div id="game">
    <ul>
      <li v-for="user in users" :key="user.id">{{ user.id }}</li>
    </ul>
    <canvas
      ref="main-canvas"
      width="600"
      height="600"
      style="border: 1px solid #333;"
    />
    <input type="text" @keydown="OnKeyDown" />
  </div>
</template>

<script>
import io from "socket.io-client";

export default {
  data() {
    return {
      id: null,
      socket: null,
      context: null,
      users: [],
      position: {
        x: 0,
        y: 0
      }
    };
  },
  mounted() {
    this.InitUser(this.position.x, this.position.y);
    this.SocketInit();
  },
  methods: {
    InitUser(x, y) {
      this.context = this.$refs["main-canvas"].getContext("2d");
      this.context.fillRect(x, y, 20, 20);
    },
    DestoryUser(id) {},
    SocketInit() {
      this.socket = io("http://localhost:3001");

      this.socket.on("disconnected", id => {
        const idx = this.users.findIndex(user => user.id === id);

        if (idx > -1) {
          this.users.splice(idx, 1);
        }
      });

      this.socket.on("new", data => {
        this.users.push({ id: data.id });
      });

      this.socket.on("move", position => {
        console.log({ position });
        this.position = position;
        this.context.fillRect(this.position.x, this.position.y, 20, 20);
      });
    },
    OnKeyDown(e) {
      if (!this.socket) return;

      switch (e.key) {
        case "ArrowUp":
          this.socket.emit("move", "UP");
          break;
        case "ArrowDown":
          this.socket.emit("move", "DOWN");
          break;
        case "ArrowLeft":
          this.socket.emit("move", "LEFT");
          break;
        case "ArrowRight":
          this.socket.emit("move", "RIGHT");
          break;
      }
    }
  }
};
</script>

<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      Based on @vue/cli 3
      <a
        href="https://cli.vuejs.org"
        target="_blank"
        rel="noopener"
      >vue-cli documentation</a>.
    </p>
    <div class="stage">
      <h3>
        Request List
        <button @click="sendRequest">request '/whoami'</button>
      </h3>
      <ul class="request-trace">
        <li
          v-for="(item, idx) in requestList"
          :key="idx"
        >-{{item[0] && item[0].toLocaleTimeString()}} [GET][/whoami] {{ item[1] }}</li>
      </ul>
    </div>
    <div class="stage">
      <h3>Edit '/whoami' controller</h3>
      <div ref="code" class="code" contenteditable="true"></div>
      <button @click="sendRequest">request '/whoami'</button>
      <br>-then>
      <button @click="changeCode">eg: Change 'you' to 'U'</button>
      -then->
      <button @click="saveCode">Save code</button>
      <br>-then->
      <button @click="sendRequest">request '/whoami'</button>
      <br>You will see the change.
    </div>
    <h3>Essential Links</h3>
    <ul>
      <li>
        <a
          href="https://codeburst.io/dont-use-nodemon-there-are-better-ways-fc016b50b45e"
          target="_blank"
          rel="noopener"
        >Don’t use nodemon, there are better ways!</a>
      </li>
      <li>
        <a
          href="https://github.com/glenjamin/ultimate-hot-reloading-example/blob/master/server.js"
          target="_blank"
          rel="noopener"
        >github code</a>
      </li>
    </ul>
  </div>
</template>

<script>
import request from "request";

const url = `http://${location.host}/whoami`;
const codeUrl = `http://${location.host}/code`;

export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data() {
    return {
      trace: 10,
      requestList: [[, "Click Button Above to Request API"]],
      responseData: "to show response data"
    };
  },
  methods: {
    sendRequest() {
      const { trace } = this;
      request.get(url, (err, response, body) => {
        const data = err ? `[err]${err.message}` : body;
        this.requestList = [[new Date(), data], ...this.requestList].slice(
          0,
          trace
        );
      });
    },
    loadCode(cb) {
      request.get(codeUrl, (err, res, body) => {
        this.$refs.code.innerText = body;
        cb && cb(err, res, body);
      });
    },
    changeCode() {
      const { innerText } = this.$refs.code;
      if (!innerText.trim()) {
        this.loadCode((err, res, body) => {
          if (!err) {
            this.changeCode();
          }
        });
      } else {
        let a = `'you are`;
        let b = `'U are`;
        if (innerText.indexOf(a) === -1) {
          [a, b] = [b, a];
        }
        this.$refs.code.innerText = innerText.replace(a, b);
      }
    },
    saveCode() {
      const { innerText } = this.$refs.code;
      request.post(codeUrl, { json: { raw: innerText } }, (err, res, body) => {
        // console.info(err, res, body);
      });
    }
  },
  mounted() {
    this.loadCode();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
a {
  color: #42b983;
}
.stage {
  text-align: left;
}
.code {
  background: #effff8;
  border-radius: 4px;
  padding: 0.5em;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-weight: 600;
  font-size: 0.8em;
}
</style>

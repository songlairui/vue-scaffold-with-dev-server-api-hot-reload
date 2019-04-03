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
      <h3>API Usage</h3>
      <p>ResponseData:[ {{responseData}} ]</p>
      <button @click="sendRequest">Click Button to request api data and set next line</button>
    </div>
    <div class="stage">
      <h3>Code Editor</h3>
      <div ref="code" class="code" contenteditable="true" @input="editing"></div>
      <button @click="loadCode">load raw code from Disk</button>
      <button @click="changeCode">eg: Change 'you' to 'U'</button>
      <button @click="saveCode">Save code</button>
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
      responseData: "to show response data"
    };
  },
  methods: {
    sendRequest() {
      request.get(url, (err, response, body) => {
        console.info(err, response, body);
        this.responseData = body;
      });
    },
    editing(e) {
      // console.info(e.target.innerText);
    },
    loadCode(cb) {
      request.get(codeUrl, (err, res, body) => {
        this.$refs.code.innerText = body;
        console.info(err, res, body);
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
        console.info(err, res, body);
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
li {
  display: inline-block;
  margin: 0 10px;
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

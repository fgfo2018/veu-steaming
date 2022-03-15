<template>
  <v-app>
    <div>
      <v-card>
        <v-responsive :aspect-ratio="16 / 9">
          <v-card-text>
            <div id="test-charts" style="width: 100%; height: 500px"></div>
            <div>現在時間:<span id="todate"></span></div>
          </v-card-text>
        </v-responsive>
      </v-card>
    </div>
  </v-app>
</template>

<script>
import axios from "axios";
import * as echarts from "echarts";
export default {
  name: "DataScrapingPage",
  modules: ['@nuxtjs/axios'],
  head: {
    title: "數據蒐集狀況監測",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Official Nuxt.js starter for CodeSandBox",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  async asyncData({ params }) {
    const { data } = await axios.get(`http://192.168.0.173:8080/camera`);
    const cameraname = [];
    const camerauid = [];
    const cameraFps = [];
    const test = Object.values(data);
    test.forEach(function (item) {
      cameraname.push(item.name);
      camerauid.push(item);
      cameraFps.push(item.fps);
    });
    return {
      tab: null,
      title: data[0].name,
      uid: data[0].uid,
      items: cameraname,
      text: camerauid,
      fps: cameraFps,
    };
  },
  data() {
    return {};
  },
  mounted() {
    this.drawBar();
    this.dateBar();
  },
  methods: {
    drawBar() {
      var chartDom = document.getElementById("test-charts");
      var myChart = echarts.init(chartDom);
      var option;
      // console.log(this.items);
      var dataArray = this.items;
      var dataFps = this.fps;
      option = {
        xAxis: {
          type: "category",
          data: dataArray,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: dataFps,
            type: "line",
          },
        ],
      };

      option && myChart.setOption(option);
    },
    dateBar() {
      mToday();
      function mToday() {
        var m = new Date();
        document.getElementById("todate").innerHTML =
          m.getUTCFullYear() +
          "/" +
          ("0" + (m.getUTCMonth() + 1)).slice(-2) +
          "/" +
          ("0" + m.getUTCDate()).slice(-2) +
          " " +
          ("0" + m.getUTCHours()).slice(-2) +
          ":" +
          ("0" + m.getUTCMinutes()).slice(-2) +
          ":" +
          ("0" + m.getUTCSeconds()).slice(-2);
      }
      setInterval(
        function () {
          //   this.drawBar();
          // let data = (await $axios.get('http://192.168.0.173:8080/camera')).data
          
          // console.log(data);
          mToday();
        }.bind(this),
        1000
      );
    },
  },
};
</script>

<style>
</style>
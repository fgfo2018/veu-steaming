<template>
  <v-app>
    <div>
      <v-card>
        <v-responsive :aspect-ratio="16 / 9">
          <div class="cover" id="cover">
            <img
              id="image"
              src="https://dummyimage.com/640x480/969696/000000&text=loading...."
            />
            <div class="crosshair">
              <img src="/images/spot(png).png" />
            </div>
            <div id="test_cover" title="test"></div>
            <!--  -->
            <!-- <div
              class="point1 point-totle"
              id="pointA"
              style="left: 40px; top: 40px"
            ></div>
            <div
              class="point1"
              id="pointB"
              style="left: 260px; top: 120px"
            ></div>
            <div class="line1" id="line"></div> -->
            <!--  -->
          </div>
          <v-btn elevation="2" id="add-line">ADD Line</v-btn>
          <v-btn elevation="2" id="add-scope">ADD Scope</v-btn>
          <v-btn elevation="2" id="add-spot">ADD SPOT</v-btn>
          <div>現在時間為:<span id="todate"></span></div>
          <div id="my-charts" style="width: 100%; height: 500px">1</div>
          <!-- <div class="tooltip_content">this a tooltip</div> -->
        </v-responsive>
      </v-card>
    </div>
  </v-app>
</template>
<script>
import * as echarts from "echarts";
export default {
  name: "IndexPage",
  head: {
    title: "即時監控1",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Official Nuxt.js starter for CodeSandBox",
      },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "stylesheet", href: "/css/jquery-ui.css" },
    ],
    script: [
      {
        src: "/js/jquery.js",
        type: "text/javascript",
      },
      {
        src: "/js/jquery-ui.js",
        type: "text/javascript",
      },
      {
        src: "/js/jquery-collision.js",
        type: "text/javascript",
      },
      {
        src: "/js/object.js",
        type: "text/javascript",
      },
    ],
  },
  data() {
    return {
      latestTickId: 0,
    };
  },
  mounted() {
    const vm = this;
    // use "main" socket defined in nuxt.config.js
    vm.socket = this.$nuxtSocket({
      name: "main", // select "main" socket from nuxt.config.js - we could also skip this because "main" is the default socket
    });
    const img = document.getElementById("image");
    const divimg = document.getElementById("cover");
    vm.socket.on("data", (data) => {
      img.src = "data:image/jpeg;base64," + data;
      img.style.transform = "rotate(360deg)";
    });
    // this.myChart();
    this.dateBar();
  },
  methods: {
    myChart() {
      
      var chartDom = document.getElementById("my-charts");
      var myChart = echarts.init(chartDom);
      var option;
      // console.log(this.items);
      option = {
        xAxis: {
          type: "category",
          data: ["one", "two", "three"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [12, 20, 11],
            type: "line",
          },
        ],
      };

      option && myChart.setOption(option);

      jQuery("#my-charts").appendTo(".tooltip_content");
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
.cover {
  position: relative;
  max-width: 100%;
  width: auto;
  display: inline-block;
}
#test_cover {
  width: 150px;
  height: 150px;
  padding: 0.5em;
  border: 10px solid rgb(17, 17, 17);
  position: absolute;
  top: 0;
  left: 0;
}
#image {
  /* transform:rotate(180deg); */
  max-width: 100%;
  pointer-events: none;
}
.wrapper {
  width: 100%;
  height: 180px;
  position: relative;
  border: 1px solid #aaa;
  background-color: #eee;
}
#pointA {
  width: 20px;
  height: 20px;
  position: absolute;
  background-color: #555;
  border: 0.5px solid rgb(0, 0, 0);
  cursor: pointer;
  border-radius: 20px;
  z-index: 1;
}
#pointB {
  width: 20px;
  height: 20px;
  position: absolute;
  background-color: #555;
  border: 0.5px solid rgb(0, 0, 0);
  cursor: pointer;
  border-radius: 20px;
  z-index: 1;
}
#line {
  position: absolute;
  height: 4px;
  background-color: #ff0000;
  border: 0.1px solid rgb(0, 0, 0);
  transform-origin: left;
  pointer-events: none;
}
.crosshair {
  top: 295px;
  left: 225px;
  position: absolute;
  cursor: pointer;
}
.crosshair > img {
  max-width: 100%;
}

.tooltip_content {
  width: 100px;
  height: 100px;
  border-radius: 5px;
  background-color: rgb(224, 231, 120);
}
</style>
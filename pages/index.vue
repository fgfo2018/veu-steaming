<template>
  <v-app>
    <div>
      <v-card>
        <v-responsive :aspect-ratio="16 / 9">
          <v-container class="lighten-5">
            <v-row no-gutters>
              <v-col cols="12" md="8">
                <div class="cover" id="cover">
                  <img
                    id="image"
                    src="https://dummyimage.com/640x480/969696/000000&text=loading...."
                  />
                </div>
                <br />
                <v-btn elevation="2" id="add-line">ADD Line</v-btn>
                <v-btn elevation="2" id="add-scope">ADD Scope</v-btn>
                <v-btn elevation="2" id="add-spot">ADD SPOT</v-btn>
                <div>現在時間為:<span id="todate"></span></div>
                <div id="my-charts" style="width: 100%; height: 500px"></div>
                <!-- <div class="tooltip_content">this a tooltip</div> -->
              </v-col>
              <v-col cols="12" md="4">
                <v-list dense>
                  <v-subheader>REPORTS</v-subheader>
                  <v-list-item-group v-model="selectedItem" color="primary">
                    <v-list-item v-for="(item, i) in items" :key="i">
                      <v-list-item-icon>
                        <v-icon v-text="item.icon"></v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title
                          v-text="item.text"
                        ></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-col>
            </v-row>
          </v-container>
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
      selectedItem: 1,
      items: [
        { text: 'Real-Time', icon: 'mdi-clock' },
        { text: 'Audience', icon: 'mdi-signal-5g' },
        { text: 'Conversions', icon: 'mdi-flag' },
      ],
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
.scope {
  width: 150px;
  height: 150px;
  /* padding: 0.5em; */
  border: 2px solid rgb(17, 17, 17);
  position: absolute;
  /* top: 0; */
  /* left: 0; */
  cursor: grab;
}
.scope > span {
  position: absolute;
  left: 100%;
  color: #000;
  background-color: #fff;
  /* border: 1px solid; */
  bottom: 100%;
  border-radius: 4px;
  padding: 0px 4px;
  box-shadow: 1px 1px 5px #4c4c4c;
  pointer-events: none;
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
  width: 15px;
  height: 15px;
  position: absolute;
  background-color: rgb(255, 255, 255);
  /* border: 0.5px solid rgb(0, 0, 0); */
  box-shadow: 1px 1px 5px #4c4c4c;
  cursor: pointer;
  border-radius: 20px;
  z-index: 1;
}
#pointB {
  width: 15px;
  height: 15px;
  position: absolute;
  background-color: rgb(255, 255, 255);
  /* border: 0.5px solid rgb(0, 0, 0); */
  box-shadow: 1px 1px 5px #4c4c4c;
  cursor: pointer;
  border-radius: 20px;
  z-index: 1;
}
#pointB > span {
  position: absolute;
  bottom: 100%;
  left: 100%;
  color: #000;
  background-color: #fff;
  border-radius: 4px;
  padding: 0px 4px;
  box-shadow: 1px 1px 5px #4c4c4c;
  pointer-events: none;
}
#line {
  position: absolute;
  height: 4px;
  background-color: #000000;
  /* border: 0.1px solid rgb(0, 0, 0); */
  box-shadow: 1px 1px 5px #4c4c4c;
  transform-origin: left;
  pointer-events: none;
}
.spot {
  /* top: 295px; */
  /* left: 225px; */
  position: absolute;
  cursor: grab;
  width: 50px;
}
.spot > img {
  max-width: 100%;
}
.spot > span {
  position: absolute;
  bottom: 70%;
  left: 70%;
  color: #000;
  background-color: #fff;
  border-radius: 4px;
  padding: 0px 4px;
  box-shadow: 1px 1px 5px #4c4c4c;
  pointer-events: none;
}

.tooltip_content {
  width: 100px;
  height: 100px;
  border-radius: 5px;
  background-color: rgb(224, 231, 120);
}
</style>
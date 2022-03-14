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
            <div id="test_cover"></div>
            <!--  -->
            <div class="point1" id="pointA" style="left: 40px; top: 40px"></div>
            <div
              class="point1"
              id="pointB"
              style="left: 260px; top: 120px"
            ></div>
            <div class="line1" id="line"></div>
            
          </div>
          <v-btn elevation="2" id="add-line">ADD Line</v-btn>
          <div>現在時間為:<span id="todate"></span></div>
        </v-responsive>
      </v-card>
    </div>
  </v-app>
</template>
<script>
export default {
  name: "IndexPage",
  head: {
    title: "即時監控",
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
    var img = document.getElementById("image");
    vm.socket.on("data", (data) => {
      img.src = "data:image/jpeg;base64," + data;
      img.style.transform = "rotate(180deg)";
    });
    this.jqueryData();
    this.dateBar();
  },
  methods: {
    jqueryData() {
      $(document).ready(function () {
        // alert("123");
        //ADD LINE
        document.getElementById("add-line").onclick = function () {
          console.log("123");
          $("#cover").append(
            '<div class="point1" id="pointA" style="left: 40px; top: 40px"></div><div class="point1"id="pointB"style="left: 260px; top: 120px"></div><div class="line1" id="line"></div>'
          );
        };
        //ADD LINE END
        $("#test_cover")
          .resizable({
            stop: function (e, ui) {
              console.log(this);
              // startResizing(ui.position.left, ui.position.right);
            },
            containment: "parent",
            handles:"all"
          })
          .draggable({
            stop: function (event, ui) {
              console.log(this);
            },
            containment: "parent",
          });
          $(".crosshair").draggable({
            containment: "parent",
          })
        // $("#test_cover").draggable();
        $(".point1").draggable({
          drag: function (e, ui) {
            wrapper();
          },
          containment: "parent",
        });
        wrapper();
        function wrapper() {
            var pointname = "point" + "1";
            var linename = "line" + "1";
            const point1 = document.getElementsByClassName(pointname)[0];
            const point2 = document.getElementsByClassName(pointname)[1];
            const line = document.getElementsByClassName(linename)[0];
            getCoordinate(point1, point2, line);
        }
        function getCoordinate(point1, point2, line) {
          // 紀錄AB兩點TOP以及LEFT位置
          var p1 = { x: point1.offsetLeft, y: point1.offsetTop };
          var p2 = { x: point2.offsetLeft, y: point2.offsetTop };

          // 兩點之間距離
          var a = p1.x - p2.x;
          var b = p1.y - p2.y;
          var length = Math.sqrt(a * a + b * b);

          // 計算兩點之間距離的角度
          var angleDeg = (Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180) / Math.PI;

          // 計算元素中心位置
          var pointWidth = point1.clientWidth / 2;
          var pointHeight = point1.clientWidth / 2;

          // 設置線距和位置
          // 從上方添加寬度/高度，使線條從中間而不是左上角開始
          line.style.width = length + "px";
          line.style.left = p1.x + pointWidth + "px";
          line.style.top = p1.y + pointHeight + "px";

          // 旋轉線以匹配點之間的角度
          line.style.transform = "rotate(" + angleDeg + "deg)";
        }
      });
    },
    dateBar() {
      mToday();
      function mToday() {
        var Today = new Date();
        document.getElementById("todate").innerHTML =
          Today.getFullYear() +
          "年" +
          Today.getMonth() +
          "月" +
          Today.getDate() +
          "日" +
          " " +
          Today.getHours() +
          ":" +
          Today.getMinutes() +
          ":" +
          Today.getSeconds();
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
  border: 1px solid rgb(201, 201, 201);
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
  cursor: pointer;
  border-radius: 20px;
}
#pointB {
  width: 20px;
  height: 20px;
  position: absolute;
  background-color: #555;
  cursor: pointer;
  border-radius: 20px;
}
#line {
  position: absolute;
  height: 2px;
  background-color: #2fd42f;
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
</style>
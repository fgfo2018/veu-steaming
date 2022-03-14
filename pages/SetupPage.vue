<template>
  <v-app>
    <div>
      <v-card>
        <v-responsive :aspect-ratio="16 / 9">
          <v-card-text>
            <v-col class="d-flex" cols="12">
              <v-tabs v-model="tab" align-with-title>
                <v-tabs-slider color="yellow"></v-tabs-slider>

                <v-tab v-for="item in items" :key="item.id">
                  {{ item }}
                </v-tab>
              </v-tabs>
            </v-col>
          </v-card-text>
          <v-card-text>
            <v-tabs-items v-model="tab">
              <v-tab-item v-for="item in text" :key="item.id">
                <v-card flat>
                  <v-card-text class="d-flex flex-column">
                    <div class="pb-4">
                      <span style="font-size: 2em"
                        >設備名稱:<a>{{ item.name }}</a></span
                      >
                    </div>
                    <div class="pb-4">
                      <span style="font-size: 2em"
                        >設備UUID:<a>{{ item.uid }}</a></span
                      >
                    </div>
                    <div class="pb-4">
                      <span style="font-size: 2em"
                        >設備UUID:<a>{{ item.fps }}</a></span
                      >
                    </div>
                  </v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </v-card-text>
        </v-responsive>
      </v-card>
    </div>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  name: "SetupPage",
  async asyncData({ params }) {
    const { data } = await axios.get(`http://192.168.0.173:8080/camera`);
    // console.log(Object.values。(data));
    const cameraname = [];
    const camerauid = [];
    const test = Object.values(data);
    // console.log(test);
    test.forEach(function (item) {
      // console.log(item);
      cameraname.push(item.name);
      camerauid.push(item);
    });

    console.log(cameraname);
    return {
      tab: null,
      title: data[0].name,
      uid: data[0].uid,
      items: cameraname,
      text: camerauid,
    };
  },
};
</script>

<style>
</style>
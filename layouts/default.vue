<template>

  <v-app dark>
      <!-- <v-app-bar app></v-app-bar> -->

      <v-navigation-drawer
        v-model="drawer"
        permanent
        expand-on-hover
        mini-variant-width="4em"
        fixed
        
      >
        <v-list>
          <!-- <v-list-item link>
            <v-list-item-content>
              <v-img src="/yst.png"></v-img>

            </v-list-item-content>
          </v-list-item> -->

          <v-list-item class="px-2">
            <v-list-item-avatar size="3em">
              <v-img
                src="https://randomuser.me/api/portraits/women/75.jpg"
              ></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>User001</v-list-item-title>
              <v-list-item-subtitle>unknown@yst93.com</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list nav dense rounded>
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.to"
            router
            color="primary"
            class="px-3"
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

         <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>


    
  </v-app>
</template>
<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-tablet',
          title: '即時監控',
          to: '/',
        },
        {
          icon: 'mdi-google-analytics',
          title: '數據蒐集狀況監測',
          to: 'DataScrapingPage',
        },
        {
          icon: 'mdi-clipboard-text-clock',
          title: '歷史監測',
          to: 'HistoricalMonitoringPage',
        },
        {
          icon: 'mdi-cog',
          title: '設定',
          to: 'SetupPage',
        },
        {
          icon: 'mdi-floor-plan',
          title: '深度分析',
          to: 'DeepLearningPage',
        },
        {
          icon: 'mdi-table-arrow-down',
          title: '智慧報表',
          to: 'SmartReportsPage',
        },
        {
          icon: 'mdi-account-group-outline',
          title: '權限管理',
          to: 'PermissionPage',
        },

        // {
        //   icon: 'mdi-chart-bubble',
        //   title: 'Inspire',
        //   to: '/inspire',
        // },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    }
  },
}
</script>
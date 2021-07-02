<template>
  <div  :style="[affilates.length > 0 ? 'width: '+String((affilates.length+1)*181)+'px' : '']" style="margin-top: -10px;margin-left: -5px" class="ui row nine link cards">
    <FraudManagerCard @createThread="startMainThread($event)" @changeService="count++" v-for="aff in affilates" :aff="aff"/>
    <button style="visibility: hidden;" class="fluid ui button"></button>
  </div>
  <div :key="count" style="position: fixed;overflow-y: auto" class="ui link cards">
    <FraudThreadCard v-for="item in fraudThreads" :item="item"/>
  </div>
</template>

<style scoped>
</style>

<script>
export default {
  data: () => ({
    count: 0,
    affilates: [],
    fraudThreads: [],
  }),
  methods: {
    startMainThread(data) {
      this.count++
      let item = {
        service: data.aff.selectProxy,
        aff: data.aff
      }
      if(data.demoMod) {
        item.demo = {
          demoCount: data.demoCount
        }
      }
      if(item.service  === 'Smartproxy') {
        item.proxy = {
          login: this.$store.getters.getCurrentUser.database.data.setting.proxyServices[data.aff.selectProxy].login,
          password: this.$store.getters.getCurrentUser.database.data.setting.proxyServices[data.aff.selectProxy].pass,
          ...data.aff.jokerSetting,
          country: data.country,
        }
      }
      item.link = data.aff.link
      this.$store.commit('setActiveFraudThread', item)
      this.fraudThreads = this.$store.getters.getActiveFraudThread
    }
  },
  mounted() {
    this.affilates = this.$store.getters.getAffilates.filter(i => i.select === true)
    this.fraudThreads = this.$store.getters.getActiveFraudThread
  },
  updated() {
    $('#app').css('overflow-x', () => {
      if(this.affilates.length === 0){
        $('#app').css('overflow-y', 'hidden')
        $('#app').css('overflow-x', '')
        return 'hidden'
      }else{
        $('#app').css('overflow', 'hidden')
        $('#app').css('overflow-x', '')
        return 'auto'
      }
    })
  },
  beforeUnmount() {
    $('#app').css('overflow', '')
  }
}
</script>
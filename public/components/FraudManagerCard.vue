<template>
  <div style="width: 183px; display: block; float: left" :key="count" class="fraudcard card">
    <div style="cursor: default" class="content">
      <img v-if="aff.selectProxy === 'Smartproxy'" @click="aff.selectProxy = 'Proxycheap'; count = count +1;$emit('changeService')" style="width: 150px; height: 18px;cursor: pointer" class="hidden content" src="https://smartproxy.com/wp-content/themes/smartproxy/images/sp-logo-web.svg">
      <img v-if="aff.selectProxy === 'Proxycheap'" @click="aff.selectProxy = 'Smartproxy'; count = count +1;$emit('changeService')" style="margin-left: 10%;width: 130px; height: 19px;cursor: pointer" class="hidden content" src="https://i.ibb.co/mD5dr5Z/proxycheap.png">
      <div style="margin-top: 5px" class="header">{{aff.title}} by {{$store.getters.getDropTitle(aff.dropId) || $store.getters.getCurrentUser.email.split('@')[1].split('.')[0]}}</div>
      <div
          onselectstart="return false" onmousedown="return false"
          class="ui label"
          @click="aff.jokerSetting.savingMode = !aff.jokerSetting.savingMode; count = count +1"
          :style="aff.jokerSetting.savingMode ? 'background-color: rgb(138, 168, 139)' : 'background-color: rgb(168, 138, 138)'"
          style="width: 78px; height: 13.5px; padding-top: 1px; padding-left: 6px; color: white; cursor: pointer; margin-left: -2px"
      >
        SavingMode
      </div>
      <div
          onselectstart="return false" onmousedown="return false"
          class="ui label"
          @click="aff.jokerSetting.hardmode = !aff.jokerSetting.hardmode; count = count +1"
          :style="aff.jokerSetting.hardmode ? 'background-color: rgb(138, 168, 139)' : 'background-color: rgb(168, 138, 138)'"
          style="width: 78px; height: 13.5px; padding-top: 1px; margin-left: 3px; color: white; cursor: pointer"
      >
        HardMode
      </div>
      <div class="description">
        <div class="right floated ui">
          <i style="cursor: pointer" @click="demoMod = !demoMod" class="life big ring icon" :class="[demoMod ? 'brown':'outline green']"></i>
          <input v-if="demoMod" style="width: 25px;padding-top: 0px;padding-right: 2px;padding-left: 2px" type="number" v-model.number="demoCount">
        </div>
        <p @click="textToClipboard(aff.link)" style="overflow:hidden;"><small>{{aff.link}}123</small></p>
      </div>
    </div>
    <div style="cursor: default">
      <p>
        <i
            v-for="(value, name) in aff.jokerSetting.country.split(',')"
            @click="$emit('createThread', {aff, country: value, demoMod, demoCount})"
            style="cursor: pointer;margin-left: 5px" v-if="aff.selectProxy === 'Smartproxy'"
            :title="value"
            :class="value"
            class="flag"
        ></i>
      </p>
    </div>
  </div>

</template>

<script>
export default {
  props: ['aff'],
  emits: ['createThread', 'changeService'],
  data: () => ({
    count: 0,
    demoCount: 10,
    demoMod: false
  }),
  methods:{
    textToClipboard (text) {
      var dummy = document.createElement("textarea");
      document.body.appendChild(dummy);
      dummy.value = text;
      dummy.select();
      document.execCommand("copy");
      document.body.removeChild(dummy);
    }
  }
}
</script>

<style scoped>

.fraudcard input::-webkit-outer-spin-button,
.fraudcard input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>
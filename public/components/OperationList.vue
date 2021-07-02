<template>
  <div class="operationlist ui mini fluid input" style="position: sticky;top: 0em;margin-left: auto;margin-right: auto;z-index: 999">
    <input style="height: 20px; padding-left: 5px" type="date" v-model="from">
    <input style="height: 20px; padding-left: 5px" type="date" v-model="to">
  </div>

  <div style="max-height: 800px;" class="operationlist ui relaxed divided list">
    <div
        v-for="i in currentList"
        :style="[i.amount > 0 ? 'background: rgba(33, 186, 69, 0.6)' : 'background: rgba(219, 40, 40, 0.6)']"
        class="ui card"
        style="width: 200px; overflow: hidden; margin-left: auto;margin-right: auto;margin-top: -6px"
    >
      <div class="content" style=";margin-top: -6px">
        <h4 style="background: rgba(255, 255, 255, 0);margin-top: -5px; z-index: 99" class="right floated mini ui header">{{i.amount}}</h4>
        <p style="font-size: 12px" class="header">{{i.title}}</p>
        <p style="font-size: 9px;margin-top: 10px;white-space: nowrap;">{{i.type}}</p>
        <textarea disabled rows="2" style="resize: none; border: none; width: 100%; font-size: 11px;margin-left: -3px;margin-top: -5px; color: black" v-model="i.description"></textarea>
      </div>
      <p style="font-size: 9px;margin-top: -15px;white-space: nowrap;margin-left: 15px">{{$filters.dateFilter(i.id, 'datetime')}}</p>
    </div>
<!--    <button style="visibility: hidden;" class="fluid ui button"></button>-->
  </div>
</template>

<script>
export default {
  props: ['setting'],
  data: () => ({
    from: (new Date((Date.now()+14400000)).toISOString()).slice(0,-14),
    to: (new Date((Date.now()+14400000)).toISOString()).slice(0,-14),
  }),
  computed: {
    currentList() {
      return this.setting.filter(i =>i.id >= Date.parse(this.from) && i.id <= Date.parse(this.to)+86400000)
    }
  },
}
</script>

<style scoped>
.operationlist textarea::-webkit-scrollbar { width: 2px; }
.operationlist textarea:disabled {
  background: none;
}
.operationlist h4 {
   position:sticky;
   top: 0;
   background: white;
   z-index: 99999
 }
</style>
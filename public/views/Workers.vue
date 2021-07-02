<template>
  <div :key="count" class="ui nine link cards">
    <WorkerCard
      @edit="onEdit"
      @delete="onDelete"
      v-for="worker in $store.getters.getWorkers"
      :worker = "worker"
    />
    <div class="card">
      <div @click="onEdit({
      title: '',
      login: '',
      pass: '',
      setting: $store.getters.defaultSetting()
    })" class="content">
        <div class="orange ui icon header" style="position: center; padding-top: 10%">
          <i class="world icon"></i>
          Add New Worker
        </div>
      </div>
    </div>
  </div>
  <WorkerModal
      @closeModal="count = count+1"
      :worker="selectWorker"
    />
</template>

<script>
export default {
  data: () => ({
    selectWorker: {},
    count: 0
  }),
  methods:{
    onEdit(i){
      if(!i.id) i.id = Date.now()
      this.selectWorker = i
      const transition = ['scale', 'zoom', 'fade', 'fade up', 'fade down', 'fade left','fade right',
        'horizontal flip', 'vertical flip', 'drop', 'fly left', 'fly right','fly up', 'fly down',
        'browse','browse right','slide left', 'slide right', 'slide up', 'slide down']
      $('.ui.modal.work')
          .modal('setting', {
            transition: transition[Math.floor(Math.random()*transition.length)],
            autofocus: false,
            allowMultiple: true,
            closable: false
          })
          .modal('show')
    },
    onDelete(i){
      if (confirm(`Точно удалить ${i.title} ?`)) {
        this.count++
        this.$store.commit('deleteWorker', i)
      }
    },
  },
}
</script>

<template>
  <div :key="count" class="ui eight link cards">
    <DropCard
        @showModal = "onShowModal"
        @delete = "onDelete"
        v-for="drop in $store.getters.getDrops"
        :key="drop.id"
        :drop="drop"
    />
    <div v-if="$store.getters.getCurrentUser.database.type === 'admin'" class="card">
      <div class="content" @click="onShowModal({
      title: '',
      info: {
        phone: '',
        email: '',
        contacts: '',
        proxy: '',
        wallets: '',
        geo: {
          latitude: 55.731781,
          longitude: 37.413341
        },
      },
      affilate: []
    }
      )"
      >
        <div class="teal ui icon header" style="position: center; padding-top: 30%">
          <i class="world icon"></i>
          Add New Drop
        </div>
      </div>
    </div>
  </div>

  <div>
    <DropModal @closeModal="onCloseModal" :drop="selectDrop"/>
  </div>
</template>

<style scoped>
textarea::-webkit-scrollbar { width: 1px; }
textarea:disabled {
  background: none;
}
.fixed {
  position: sticky;
  top: 85%;
  left: 90%;
}
</style>

<script>

export default {
  name: 'Drops',
  data: () => ({
    drops: [],
    selectDrop: {},
    count: 0,
    type: ''
  }),
  methods: {
    onCloseModal() {
      this.count = this.count+1
    },
    onDelete(i) {
      if (confirm(`Точно удалить ${i.title} ?`)) {
        this.$store.commit('deleteDrop', i)
      }
    },
    onShowModal(i) {
      if(!i.id) i.id = Date.now()
      this.selectDrop = i
      const transition = ['scale', 'zoom', 'fade', 'fade up', 'fade down', 'fade left','fade right',
        'horizontal flip', 'vertical flip', 'drop', 'fly left', 'fly right','fly up', 'fly down',
        'browse','browse right','slide left', 'slide right', 'slide up', 'slide down']
      $('.ui.modal.drop')
          .modal('setting', {
            transition: transition[Math.floor(Math.random()*transition.length)],
            allowMultiple: true,
            closable: false
          })
          .modal('show')
    },
  },
  mounted() {
    this.type = this.$store.getters.getCurrentUser.database.type
    this.drops = this.$store.getters.getDrops
  },
}
</script>



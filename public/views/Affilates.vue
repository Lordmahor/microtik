<template>
  <div  :key="count" class="ui nine link cards">
    <AffilateCard
        @edit="onEdit"
        @delete="onDelete"
        v-for="aff in $store.getters.getAffilates"
        :aff="aff"
    />
    <div v-if="$store.getters.getCurrentUser.database.type === 'admin'" class="card">
      <div class="content" @click="onEdit({
                dropId: '',
                worker: '',
                title: '',
                login: '',
                pass: '',
                wallet: '',
                link: '',
                jokerSetting: {country: ''}
               })"
      >
        <div class="blue ui icon header" style="position: center; padding-top: 10%">
          <i class="world icon"></i>
          Add New Affilate
        </div>
      </div>
    </div>
  </div>

  <AffilateModal
      @closeModal="count = count+1"
      :aff="selectAff"
  />
</template>
<script>
export default {
  name: 'Affilates',
  data: () => ({
    type: '',
    selectAff: {},
    affilates: [],
    count: 0
  }),
  methods: {
    onEdit(i) {
      this.selectAff = i
      const transition = ['scale', 'zoom', 'fade', 'fade up', 'fade down', 'fade left','fade right',
        'horizontal flip', 'vertical flip', 'drop', 'fly left', 'fly right','fly up', 'fly down',
        'browse','browse right','slide left', 'slide right', 'slide up', 'slide down']
      $('.ui.modal.aff')
          .modal('setting', {
            transition: transition[Math.floor(Math.random()*transition.length)],
            allowMultiple: true,
            duration: '10',
            closable: false
          })
          .modal('show')
    },
    onDelete(i){
      if (confirm(`Точно удалить ${i.title} ?`)) {
        this.$store.commit('deleteAff', i)
      }
    },
  },
  mounted() {
    this.type = this.$store.getters.getCurrentUser.database.type
    this.affilates = this.$store.getters.getAffilates
  },
}
</script>
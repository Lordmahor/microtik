<template>
    <div class="ui secondary pointing menu" >
      <a @click.prevent="setActive('FraudManager')" :class="[activeTab === 'FraudManager' ? 'active' : '']" style="color: #A52A2A" class="item">FraudManager</a>
      <a @click.prevent="setActive('Drops')" :class="[activeTab === 'Drops' ? 'active' : '']" style="color: #008080"  class="item">Drop's</a>
      <a @click.prevent="setActive('Affilates')" :class="[activeTab === 'Affilates' ? 'active' : '']" style="color: #2185d0"  class="item">Affilate Programs</a>
      <a @click.prevent="setActive('Workers')" :class="[activeTab === 'Workers' ? 'active' : '']" v-if="type === 'admin'"  style="color: #FE9A76"  class="item">Workers</a>
      <a @click.prevent="setActive('Finance')" :class="[activeTab === 'Finance' ? 'active' : '']" v-if="type === 'admin'"  style="color: #016936"  class="item">Finance</a>
      <div class="right menu">
        <div class="item">
          <div class="ui mini statistic">
            <div class="label">
              {{$filters.dateFilter(date, 'date')}}
            </div>
            <div class="value">
              {{$filters.dateFilter(date, 'time')}}
            </div>
          </div>
        </div>
        <div class="item">
          {{nameUser}} <i style="cursor: pointer" @click="logout" class="power off red icon"></i>
        </div>
      </div>

    </div>
</template>

<script>
export default {
  emits: ['currentTab'],
  data: () => ({
    activeTab: 'FraudManager',
    type: '',
    currentUser: '',
    date: new Date(),
    interval: null,
  }),
  methods: {
    setActive(tab) {
      this.activeTab = tab
      this.$emit('currentTab', tab)
    },
    async logout() {
      this.$store.dispatch('logout')
      this.$emit('isLogout')
    }
  },
  computed: {
    nameUser() {
      if(this.type !== 'admin') return this.currentUser.email.split('@')[0]
      return this.currentUser.email.split('@')[1].split('.')[0]
    }
  },
  mounted() {
    this.type = this.$store.getters.getCurrentUser.database.type
    console.log(this.type)
    $('.ui.dropdown').dropdown()
    this.interval = setInterval(() => {
      this.date = new Date()
    }, 1000)
  },
  beforeMount() {
    this.currentUser = this.$store.getters.getCurrentUser
  },
  beforeUnmount() {
    clearInterval(this.interval)
  },
}
</script>

<style scoped>

</style>
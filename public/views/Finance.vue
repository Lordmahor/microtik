<template>
  <div class="ui grid" style="overflow: hidden">
    <div class="three wide column">
      <div class="ui mini form" :style="[income ? 'background: rgba(33, 186, 69, 0.6)' : 'background: rgba(219, 40, 40, 0.6)']">
        <div class="field">
          <div class="ui fluid mini buttons">
            <button @click="income = true" class="ui positive button">Income</button>
            <div style="cursor: default" class="or"></div>
            <button @click="income = false" class="ui negative button">Outcome</button>
          </div>
        </div>
        <div class="field">
          <input v-model.number="amount" type="number" placeholder="Summary">
        </div>
        <div class="field ui mini fluid input">
          <input type="datetime-local" v-model="datetime">
        </div>
        <div class="field">
          <div v-if="income" class="ui selection dropdown aff">
            <div class="text"></div>
            <i class="dropdown icon"></i>
          </div>
          <div v-else class="ui selection dropdown worker">
            <div class="text"></div>
            <i class="dropdown icon"></i>
          </div>
        </div>
        <div>
          <div v-if="income" class="fields">
            <div class="eight wide field ui mini fluid input">
              <input type="date" v-model="fromDate">
            </div>
            <div class="eight wide field ui mini fluid input">
              <input type="date" v-model="beforeDate">
            </div>
          </div>
          <div v-else class="fields">
            <div class="sixteen wide field ui tiny fluid input">
              <input v-model.trim="spendType" type="text" placeholder="Category">
            </div>
          </div>
        </div>
        <div class="field">
          <textarea rows="2" style="resize: none; width: 100%;" v-model.trim="description" placeholder="Description">{{description}}</textarea>
        </div>
        <div class="field">
          <div @click.prevent="onSubmit" class="ui mini fluid button" :class="income ? 'positive' : 'negative'">Submit</div>
        </div>
      </div>
    </div>
    <div :key="refreshToken" class="five wide column">
      <div class="ui grid">
        <div class="eight wide column" style="overflow: auto;overflow-x:hidden; max-width: 280px">
          <OperationList :setting="$store.getters.getFinanceList('income')" />
        </div>
        <div class="eight wide column"  style="overflow: auto;overflow-x:hidden; max-width: 280px">
          <OperationList :setting="$store.getters.getFinanceList('outcome')" />
        </div>
      </div>
    </div>
    <div class="six wide column row">
      <div style="margin-left: auto; margin-right: auto;">
        <div class="ui mini input">
          <input style="width: 122px;height: 20px;padding-left: 5px" type="date" v-model="from">
          <input style="width: 122px;height: 20px;padding-left: 5px" type="date" v-model="to">
        </div>
        <div class="ui secondary pointing menu" style=" max-height: 10px">
          <a @click="selectChart = 'all',refreshChartToken++" style="color: #A52A2A; margin-left: 15%" class="item" :class="[selectChart === 'all' ? 'active' : '']">All</a>
          <a @click="selectChart = 'worker',refreshChartToken++" style="color: #FE9A76" class="item" :class="[selectChart === 'worker' ? 'active' : '']">Worker</a>
          <a @click="selectChart = 'aff',refreshChartToken++" style="color: rgb(33, 186, 69)" class="item" :class="[selectChart === 'aff' ? 'active' : '']">Aff</a>
        </div>
      </div>
      <Chart :key="refreshChartToken" :setting="selectChart" :date="{from, to}" style="position: fixed;margin-top: 76px"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Finance',
  data: () => ({
    from: (new Date((Date.now()+14400000)).toISOString()).slice(0,-14),
    to: (new Date((Date.now()+14400000)).toISOString()).slice(0,-14),
    selectChart: 'all',
    fromDate: (new Date((Date.now()+14400000)).toISOString()).slice(0,-14),
    beforeDate: (new Date((Date.now()+14400000)).toISOString()).slice(0,-14),
    spendType: '',
    description: '',
    aff: 100000000,
    worker: 100000000,
    income: true,
    amount: 1000,
    datetime: new Date(),
    interval: null,
    refreshToken: 1,
    refreshChartToken: 1,
  }),
  computed: {

  },
  mounted() {
    this.intervalStart()
    this.dropdown()
  },
  methods: {
    async onSubmit() {
      let workerId
      if(this.aff === 100000000) {
        workerId = 100000000
      }else {
        workerId = this.$store.getters.getAffilates.find(aff => aff.id === this.aff).workerId
      }
      let data = {
        id: Date.now(),
        amount: this.income ? this.amount : this.amount-(this.amount*2),
        description: this.description,
        type: this.income ? `C ${this.$filters.dateFilter(this.fromDate, 'date')} по ${this.$filters.dateFilter(this.beforeDate, 'date')}` : this.spendType,
        title: this.income ? this.$store.getters.getAffilateTitle(this.aff) : this.$store.getters.getWorkerTitle(this.worker),
        titleId: this.income ? this.aff : this.worker,
        workerId: workerId
      }
      try{
        this.$store.commit('addNote', data)
        await this.$store.dispatch('note', data)
      }catch (e) {alert(e)}

      this.refreshToken++
      this.refreshChartToken++
    },
    dropdown(){
      setTimeout(()=>{
        $('.ui.dropdown.worker').dropdown({
          values: [...this.$store.getters.getWorkers.map(i => {
            return {
              name: i.title,
              value: i.id,
              selected: i.id === 100000000
            }
          }), ],
          onChange: (value) => {
            this.worker = Number(value)
          }
        });
        $('.ui.dropdown.aff').dropdown({
          values: [...this.$store.getters.getAffilates.map(i => {
            return {
              name: i.title,
              value: i.id,
            }
          }),{name: (this.$store.getters.getWorkers.find(i => i.id === 100000000)).title,
            value: 100000000,
            selected: true} ],
          onChange: (value) => {
            this.aff = Number(value)
          }
        });
      }, 10)
    },
    intervalStart() {
      this.datetime = (new Date((Date.now()+14400000)).toISOString()).slice(0,-8)
      this.interval = setInterval(() => {
        this.datetime = (new Date((Date.now()+14400000)).toISOString()).slice(0,-8)
      }, 1000)
    }
  },
  watch: {
    to(v) {
      this.refreshChartToken++
    },
    from(v) {
      this.refreshChartToken++
    },
    income: async function() {
      this.intervalStart()
      this.dropdown()
    },
    datetime: async function () {
      if(Date.now()-2000 >= Date.parse(this.datetime)){
        clearInterval(this.interval)
      }
    }
  },
}
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
.form > input {
  background: inherit;
}
textarea::-webkit-scrollbar { width: 1px; }
::-webkit-scrollbar { width: 4px; }
textarea:disabled {
  background: none;
}
</style>
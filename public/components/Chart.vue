<template>
    <canvas height="200" width="200" ref="ctx" style="max-width: 100%;max-height: 400px"></canvas>
</template>

<script>
import Login from "./Login";

export default {
  props: ['setting', 'date'],
  data: () => ({
    myChart: null,
    chartData: '',
    labels: [],
    options: [],
    color: [],
    type: ''
  }),
  methods: {
    chartStart: async function() {
      if(this.setting === 'all') {
        this.chartData = {
          Income: this.$store.getters.getFinanceList('income').filter(i =>i.id >= Date.parse(this.date.from) && i.id <= Date.parse(this.date.to)+86400000),
          Outcome: this.$store.getters.getFinanceList('outcome').filter(i =>i.id >= Date.parse(this.date.from) && i.id <= Date.parse(this.date.to)+86400000),
        }
        this.labels = Object.keys(this.chartData).map(i => {
          return i + ' : ' + this.chartData[i].reduce((sum, i) => {
            return sum + i.amount
          }, 0)
        })
        this.options = Object.keys(this.chartData).map(i => {
          return this.chartData[i].reduce((sum, z) => {
            if(i === 'Outcome'){
              return sum - z.amount
            } else {
              return sum + z.amount
            }

          }, 0)
        })
        this.color = ['rgba(33, 186, 69, 0.6)','rgba(219, 40, 40, 0.6)',]
        this.type = 'doughnut'
      }

      if(this.setting === 'worker') {
        this.chartData = this.$store.getters.getFinanceList()
        this.$store.getters.getWorkers.forEach(i => {
            this.labels.push(`${i.title} income`)
            this.color.push(`rgba(${Math.floor(Math.random() * 60) + 20}, 186, ${Math.floor(Math.random() * 90) + 50} , 0.6)`)
            this.options[this.labels.indexOf(`${i.title} income`)] = this.chartData.income.filter(c => c.workerId === i.id).reduce((sum, c) => sum + c.amount, 0)
            this.labels.push(`${i.title} outcome`)
            this.color.push(`rgba(219, ${Math.floor(Math.random() * 70) + 40}, ${Math.floor(Math.random() * 70) + 40}, 0.6)`)
            this.options[this.labels.indexOf(`${i.title} outcome`)] = this.chartData.outcome.filter(c => c.titleId === i.id).reduce((sum, c) => sum - c.amount, 0)
        })
        for(let i = 0;i < this.options.length;i++){
          if(this.options[i] === undefined) this.options[i] = 0
        }
        this.type = 'doughnut'
      }

      if(this.setting === 'aff') {
        this.chartData = this.$store.getters.getFinanceList('income')
        this.chartData.map(i => {
          if(this.labels.indexOf(i.title) === -1){
            this.labels.push(i.title)
            this.color.push(`rgba(${Math.floor(Math.random() * 60) + 20}, 186,${Math.floor(Math.random() * 90) + 50} , 0.6)`)
          }
          if(this.labels.indexOf(i.title) >= 0){
            this.options[this.labels.indexOf(i.title)] = this.options[this.labels.indexOf(i.title)] === undefined
                ? this.options[this.labels.indexOf(i.title)] = i.amount
                : this.options[this.labels.indexOf(i.title)] += i.amount
          }
        })
        this.type = 'doughnut'
      }





      this.myChart = new Chart(this.$refs.ctx, {
        type: this.type,
        data: {
          labels: this.labels,
          datasets: [{
            data: this.options,
            backgroundColor: this.color
          }]
        },
        options: {
          animation: false,
          interaction: {
            intersect: false,
            mode: 'index',
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: (i) => {
                  if(this.setting === 'all'){
                    if(i.dataIndex === 1) return '-'+i.formattedValue
                    return i.formattedValue
                  }
                  if(this.setting === 'worker'){
                    return this.labels[i.dataIndex] +': '+i.formattedValue
                  }
                  return this.labels[i.dataIndex] +': '+i.formattedValue
                },
              }
            }
          }
        },
      })
    },
  },
  mounted() {
    this.chartStart()
  },

}
</script>

<style scoped>

</style>
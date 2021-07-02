<template>
  <div class="ui modal work">
    <i @click="$emit('closeModal')" class="close icon"></i>
    <h5 class="ui header">
      {{worker.title}}
    </h5>

    <form style="padding: 20px" class="ui mini form">
      <div class="fields">
        <div class="field">
          <label>Title</label>
          <input type="text" v-model="data.title">
        </div>
        <div class="field">
          <label>Login</label>
          <input disabled type="text" v-model="data.login">
        </div>
        <div class="field">
          <label>Pass</label>
          <input disabled type="text" v-model="data.pass" >
        </div>
      </div>
      <h5 class="ui header">
        Smartproxy
      </h5>
      <div class="fields">
        <div class="field">
          <label>Login</label>
          <input type="text" v-model="proxyServices.Smartproxy.login">
        </div>
        <div class="field">
          <label>Pass</label>
          <input type="text" v-model="proxyServices.Smartproxy.pass" >
        </div>
      </div>
      <h5 class="ui header">
        ProxyCheap
      </h5>
      <div class="fields">
        <div class="field">
          <label>Login</label>
          <input type="text" v-model="proxyServices.ProxyCheap.login">
        </div>
        <div class="field">
          <label>Pass</label>
          <input type="text" v-model="proxyServices.ProxyCheap.pass" >
        </div>
        <div class="field">
          <label>IpV4</label>
          <input type="text" v-model="proxyServices.ProxyCheap.ipv4" >
        </div>
        <div class="field">
          <label>Port</label>
          <input type="text" v-model="proxyServices.ProxyCheap.port" >
        </div>
      </div>
      <button @click.prevent="onSubmit" class="ui mini primary button" type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  props: ['worker'],
  data: () => ({
    data: {
      id: Date.now(),
      title: '',
      login: '',
      pass: '',
    },
    proxyServices: {
      Smartproxy: {
        login: 'login',
        pass: 'pass',
      },
      ProxyCheap: {
        login: 'login',
        pass: 'pass',
        ipv4: 'proxy.proxy-cheap.com',
        port: '10000'
      }
    }
  }),
  methods: {
    async onSubmit() {
      if (confirm(`Вы уверенны ?`)) {
        try {
          if(this.worker.login.length !== 0) {
            await this.$store.dispatch('setDatabase', {name: this.worker.title, password: this.data.pass, data: {...this.data, setting: {proxyServices: this.proxyServices}}})
          } else {
            this.data.pass = Math.random().toString(36).slice(-8)
            this.data.login = `${this.data.title}@${this.$store.getters.getCurrentUser.email.split('@')[1]}`
            await this.$store.dispatch('register', {name: this.data.title, password: this.data.pass, data: {...this.data, setting: {proxyServices: this.proxyServices}}})
          }
          this.$store.commit('setWorker', {...this.data, setting: {proxyServices: this.proxyServices}})
        }catch (e) {alert(e.message)}
        this.$emit('closeModal')
        $('.ui.modal.work').modal('hide')
      }
    },
  },
  watch: {
    worker(v){
      this.data = {
        id: v.id || Date.now(),
        title: v.title,
        login: v.login,
        pass: v.pass,
      }
      this.proxyServices = {
        Smartproxy: {
          login: v.setting.proxyServices.Smartproxy.login,
          pass: v.setting.proxyServices.Smartproxy.pass,
          savingMode: v.setting.proxyServices.Smartproxy.savingMode,
        },
        ProxyCheap: {
          login: v.setting.proxyServices.ProxyCheap.login,
          pass: v.setting.proxyServices.ProxyCheap.pass,
          ipv4: v.setting.proxyServices.ProxyCheap.ipv4,
          port: v.setting.proxyServices.ProxyCheap.port
        }

      }
    }
  },
  mounted() {
    $('.smartproxy.savingMode').checkbox({
      onChange: () => {}
    })
  }
}
</script>

<style scoped>

</style>
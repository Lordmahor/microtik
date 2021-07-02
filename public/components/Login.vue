<template>
<!--  <p>Просмотры</p>-->
<!--  <input type="number" v-model.number="visit">-->
<!--  <p>Клики</p>-->
<!--  <input type="number" v-model.number="click">-->
<!--  <p>Ставка</p>-->
<!--  <input type="number" v-model.number="bind">-->
<!--  <p>CTR =     {{ctr}} %</p>-->
<!--  <p>Потрачено =      {{outcome}}</p>-->
<!--  <p>CPM =           {{cpm}}</p>-->
<!--  <p>CPC =           {{cpc}}</p>-->
    <div style="margin-top: 10%; width: 1000px; margin-left: auto; margin-right: auto" class="ui two column centered grid">
      <div class="column">
        <h2 class="ui teal image header">
          <div class="content">
            Log-in to your account
          </div>
        </h2>
        <form class="ui large form error">
          <div class="ui stacked segment">
            <div class="field">
              <div class="ui left icon input">
                <i class="user icon"></i>
                <input type="text" name="email" placeholder="E-mail address" v-model.trim="email">
              </div>
            </div>
            <div class="field">
              <div class="ui left icon input">
                <i class="lock icon"></i>
                <input v-on:keyup.enter="onSubmit" type="password" name="password" placeholder="Password" v-model.trim="password">
              </div>
            </div>
            <div class="ui fluid large teal submit button"  @click.prevent="onSubmit">Login</div>
            <div class="ui error message">{{error}}</div>
          </div>



        </form>
      </div>
    </div>
</template>

<script>
export default {
  data: () => ({
    email: '',
    password: '',
    error: '',
    // visit: 0,
    // click: 0,
    // bind: 0
  }),
  methods: {
    async onSubmit() {
      this.error = ''
      const formData = {
        email: this.email,
        password: this.password
      }
      try {
        await this.$store.dispatch('login', formData)
        this.$emit('isLogged')
      }catch (e) {
        console.log(e)
        this.error = e.message
      }
    }
  },
  // computed: {
  //   ctr(){
  //     return this.click/this.visit*100
  //   },
  //   outcome(){
  //     return this.bind*this.click
  //   },
  //   cpm(){
  //     // return Math.round((this.bind*this.click)/(this.bind*1000)*100)/100
  //     return this.bind*this.click/this.visit*1000
  //   },
  //   cpc(){
  //     return this.bind*1000
  //   }
  // },
}
</script>

<style>

</style>
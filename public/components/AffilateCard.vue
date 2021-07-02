<template>
  <div class="card">
    <div style="cursor: default" class="content">
      <div v-if="$root.currentComponent !== 'Drops'" class="right floated ui">
        <div class="ui checkbox">
          <input type="checkbox" v-model="aff.select">
          <label></label>
        </div>
      </div>
      <div v-if="$root.currentComponent !== 'Drops'" class="header">{{aff.title}} by {{$store.getters.getDropTitle(aff.dropId) || $store.getters.getCurrentUser.email.split('@')[1].split('.')[0]}}</div>
      <div v-else class="header">{{aff.title}}</div>
      <div class="description">
        <p><strong>Login:</strong> {{aff.login}} <strong>Pass: </strong>{{aff.pass}}</p>
        <p><strong>Wallet:</strong> {{aff.wallet}}</p>
        <p><strong>Worker:</strong> {{$store.getters.getWorkerTitle(aff.workerId)}}</p>


      </div>
    </div>
    <div v-if="$root.currentComponent !== 'Drops' && $store.getters.getCurrentUser.database.type === 'admin'" class="ui mini buttons">
      <button @click.prevent="$emit('edit', aff)" :disabled="$store.getters.getCurrentUser.database.type !== 'admin'" class="ui positive button">Edit</button>
      <div style="cursor: default" class="or"></div>
      <button @click.prevent="$emit('delete', aff)" class="ui negative button">Delete</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['aff']
}
</script>

<style scoped>

</style>
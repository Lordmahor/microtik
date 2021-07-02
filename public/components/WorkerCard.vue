<template>

  <div class="card">
    <div style="cursor: default" class="content">
      <div class="header">{{worker.title}}</div>
      <div class="description">
        <p><strong>Login:</strong> {{worker.login}}</p>
        <p><strong>Pass: </strong> {{worker.pass}}</p>
        <p v-for="(value, name) in worker.setting.proxyServices"><strong>{{name}}: </strong> {{value.login}} : {{value.pass}}</p>
      </div>
    </div>
    <div class="ui mini buttons">
      <button @click.prevent="$emit('edit', worker)" class="ui positive button">Info</button>
      <div style="cursor: default" class="or"></div>
      <button @click.prevent="$emit('delete', worker)" class="ui negative button" :class="[worker.id === 100000000 ? 'disabled' : '']">Delete</button>
    </div>
  </div>
</template>

<script>
export default {
  props:['worker'],
  emits: ['edit', 'delete']
}
</script>

<style scoped>

</style>
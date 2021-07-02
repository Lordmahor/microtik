<template>
  <div class="card">
    <div style="cursor: default" class="content">
      <div class="header">{{drop.title}}</div>
      <div class="description">
        <p><strong>Mail:</strong>
          <textarea disabled rows="2" style="resize: none; border: none; width: 100%;">{{drop.info.email}}</textarea>
        </p>
<!--        <p><strong>Phone:</strong>-->
<!--          <textarea disabled rows="2" style="resize: none; border: none; width: 100%;">{{drop.info.phone}}</textarea>-->
<!--        </p>-->
        <p><strong>Contacts:</strong> </p>
        <textarea disabled rows="2" style="resize: none; border: none; width: 100%;">{{drop.info.contacts}}</textarea>
      </div>
    </div>
    <div v-if="$store.getters.getCurrentUser.database.type === 'admin'" class="ui mini buttons">
      <button class="ui positive button" @click="$emit('showModal', drop)">Edit</button>
      <div style="cursor: default" class="or"></div>
      <button class="ui negative button" @click="$emit('delete', drop)">Delete</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['drop'],
}
</script>

<style scoped>

</style>
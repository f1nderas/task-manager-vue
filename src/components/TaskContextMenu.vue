<template>
  <div class="context-menu">
    <button @click="$emit('edit')">
      <IconEdit />
      <span>Редактировать</span>
    </button>
    <button @click="$emit('delete')">
      <IconTrash />
      <span>Удалить</span>
    </button>
  </div>
</template>

<script lang="ts" setup>
import IconEdit from './icons/iconEdit.vue'
import IconTrash from './icons/iconTrash.vue'

defineEmits(['edit', 'delete'])
</script>

<style lang="scss" scoped>
.context-menu {
  position: fixed;
  background-color: #fff;
  z-index: 10;
  border: 1px solid #e3e5e8;
  border-radius: 4px;
  padding: 8px 0px;
  box-shadow:
    0 8px 16px 0 rgba(0, 0, 0, 0.06),
    0 8px 8px 0 rgba(0, 0, 0, 0.08);
}

button {
  display: flex;
  gap: 8px;
  width: 100%;
  border: none;
  background: none;
  text-align: left;
  cursor: pointer;
  padding: 5px 10px;

  &:hover {
    background-color: #f0f0f0;
  }
}
</style>

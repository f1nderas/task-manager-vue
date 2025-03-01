<template>
  <div class="fixed inset-0 flex items-center justify-center modal-bg" @click="handleOutsideClick">
    <div ref="modalContext" class="modal">
      <h2>
        {{ message }}
      </h2>
      <h3>
        {{ text }}
      </h3>
      <div class="buttons">
        <button @click="$emit('confirm')" class="bg-red-500 text-white px-4 py-2 rounded">
          Удалить
        </button>
        <button @click="$emit('cancel')" class="bg-gray-300 px-4 py-2 rounded">Отмена</button>
      </div>
      <div @click="$emit('cancel')" class="close">
        <IconClose />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import IconClose from './icons/iconClose.vue'

const emit = defineEmits(['cancel', 'confirm'])
defineProps<{ message: string; text: string }>()
const modalContext = ref<HTMLElement | null>(null)

const handleOutsideClick = (event: MouseEvent) => {
  if (modalContext.value && !modalContext.value.contains(event.target as Node)) {
    emit('cancel')
  }
}
</script>

<style lang="scss" scoped>
.modal {
  display: flex;
  flex-direction: column;
  gap: 24px;
  border-radius: 8px;
  padding: 24px 40px 40px 40px;
  width: 500px;
  box-shadow:
    0 32px 48px 0 rgba(0, 0, 0, 0.16),
    0 16px 32px 0 rgba(0, 0, 0, 0.1);
  background: #fff;

  &-bg {
    background: rgba(0, 0, 0, 0.6);
  }
}
.buttons {
  display: flex;
  gap: 16px;

  > button {
    width: 100%;
    cursor: pointer;
  }
}

.close {
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
}
</style>

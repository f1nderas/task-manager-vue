<template>
  <div class="task-form">
    <textarea
      v-model="taskText"
      type="text"
      placeholder="Введите текст..."
      class="task-form__input"
    />
    <div class="task-form__icons">
      <button @click="cancelEdit" class="task-form__icon-button" aria-label="Отменить">
        <IconClose />
      </button>
      <button @click="saveTask" class="task-form__icon-button" aria-label="Сохранить">
        <IconCheck />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import IconCheck from './icons/iconChecked.vue'
import IconClose from './icons/iconClose.vue'

const props = defineProps({
  initialText: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['save', 'cancel'])
const taskText = ref(props.initialText)

const saveTask = () => {
  if (taskText.value.trim()) {
    emit('save', taskText.value.trim())
    taskText.value = ''
  }
}

const cancelEdit = () => {
  emit('cancel')
  taskText.value = ''
}

watch(
  () => props.initialText,
  (newText) => {
    taskText.value = newText
  },
)
</script>

<style lang="scss" scoped>
.task-form {
  position: relative;
  display: flex;

  &__input {
    padding-right: 30px;
    padding-left: 8px;
    min-height: 52px;
    width: 100%;
    border: 1px solid #3d86f4;
    border-radius: 6px;
    resize: none;
  }

  &__icons {
    display: flex;
    flex-direction: column;
    gap: 8px;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }

  &__icon-button {
    cursor: pointer;

    &:first-child {
      color: red;
    }

    &:last-child {
      color: #22c33d;
    }
  }
}
</style>

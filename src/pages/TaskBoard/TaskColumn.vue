<template>
  <div class="task-column" @dragover.prevent="onDragOver" @dragLeave="onDragLeave" @drop="onDrop">
    <h3 :class="`task-column__title ${colorClass}`">{{ column.name }}</h3>
    <div class="task-column__body">
      <div class="task-column__tasks">
        <TaskItem v-for="task in column.tasks" :key="task.id" :task="task" :column-id="column.id" />
      </div>
      <button v-if="!isAdding" class="task-column__add-button" @click="isAdding = true">
        <IconPlus />
        <span>Добавить</span>
      </button>
      <TaskForm v-if="isAdding" @save="addNewTask" @cancel="isAdding = false" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useTaskStore } from '@/stores/task.store'
import type { IColumn } from '@/types/interfaces'
import TaskItem from '@/components/TaskItem.vue'
import IconPlus from '@/components/icons/iconPlus.vue'
import TaskForm from '@/components/TaskForm.vue'

const props = defineProps<{ column: IColumn }>()

const isAdding = ref(false)
const isDragOver = ref(false)

const taskStore = useTaskStore()

const colorClass = computed(() => {
  switch (props.column.id) {
    case 1:
      return 'task-column__title--pink'
    case 2:
      return 'task-column__title--blue'
    case 3:
      return 'task-column__title--yellow'
    case 4:
      return 'task-column__title--green'
    case 5:
      return 'task-column__title--red'
    default:
      return ''
  }
})

const addNewTask = (text: string) => {
  taskStore.addTask(props.column.id, text)
  isAdding.value = false
}

const onDragOver = () => {
  isDragOver.value = true
}

const onDragLeave = () => {
  isDragOver.value = false
}

const onDrop = (event: DragEvent) => {
  isDragOver.value = false
  const taskId = event.dataTransfer?.getData('task-id')

  if (taskId) {
    taskStore.moveTask(Number(taskId), props.column.id)
  }
}
</script>

<style scoped lang="scss">
.task-column {
  border: 1px solid #e3e5e8;
  border-radius: 8px;
  background: #f7f7f7;

  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  &__title {
    padding: 7px 0;
    display: flex;
    justify-content: center;
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
  }

  &__body {
    padding: 8px 16px 8px 8px;
    overflow-y: auto;
  }

  &__tasks {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__add-button {
    color: #3d86f4;
    display: flex;
    gap: 4px;
    align-items: center;
    cursor: pointer;
  }
}

.task-column__title {
  &--pink {
    background-color: #ff99e9;
  }
  &--blue {
    background-color: #66b8ff;
  }
  &--yellow {
    background-color: #ffd466;
  }
  &--green {
    background-color: #53c666;
  }
  &--red {
    background-color: #f76e85;
  }
}
</style>

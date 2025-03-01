<template>
  <div class="task-item" draggable="true" @dragstart="startDrag">
    <span v-if="!isEditing" class="task-item__text">{{ task.text }}</span>
    <button v-if="!isEditing" class="task-item__menu-button" @click="toggleContextMenu">
      <IconEllipsis />
    </button>
    <TaskForm
      v-if="isEditing"
      :initial-text="task.text"
      @save="saveEdit"
      @cancel="isEditing = false"
    />
    <ModalConfirm
      v-if="isConfirmVisible"
      message="Удалить задачу?"
      :text="task.text"
      @confirm="deleteTask"
      @cancel="isConfirmVisible = false"
    />
  </div>
  <TaskContextMenu
    v-if="isMenuVisible"
    :style="contextMenuStyle"
    @edit="editTask"
    @delete="confirmDelete"
  />
</template>

<script setup lang="ts">
import { useTaskStore } from '@/stores/task.store'
import type { ITask } from '@/types/interfaces'
import { computed, ref } from 'vue'
import ModalConfirm from './ModalConfirm.vue'
import IconEllipsis from './icons/iconEllipsis.vue'
import TaskContextMenu from './TaskContextMenu.vue'
import TaskForm from './TaskForm.vue'

const props = defineProps<{ task: ITask; columnId: number }>()

const isMenuVisible = ref(false)
const isConfirmVisible = ref(false)
const isEditing = ref(false)
const menuButtonRef = ref<HTMLElement | null>(null)

const taskStore = useTaskStore()

const toggleContextMenu = (event: MouseEvent) => {
  isMenuVisible.value = !isMenuVisible.value
  menuButtonRef.value = event.currentTarget as HTMLElement
}

const editTask = () => {
  isEditing.value = true
  isMenuVisible.value = false
}

const saveEdit = (newText: string) => {
  taskStore.editTask(props.task.id, newText)
  isEditing.value = false
}

const confirmDelete = () => {
  isConfirmVisible.value = true
  isMenuVisible.value = false
}

const deleteTask = () => {
  taskStore.deleteTask(props.task.id)
  isConfirmVisible.value = false
}

const startDrag = (event: DragEvent) => {
  if (event.dataTransfer) {
    event.dataTransfer.setData('task-id', String(props.task.id))
    event.dataTransfer.effectAllowed = 'move'
  }
}

const contextMenuStyle = computed(() => {
  if (menuButtonRef.value) {
    const rect = menuButtonRef.value.getBoundingClientRect()
    return {
      top: `${rect.bottom}px`,
      left: `${rect.left}px`,
    }
  }
  return {}
})
</script>

<style lang="scss" scoped>
.task-item {
  position: relative;

  &__text {
    border: 1px solid #c4cad4;
    border-radius: 4px;
    padding: 8px 24px 8px 8px;
    background: #fff;
    width: 100%;
    display: inline-block;
  }

  &__menu-button {
    position: absolute;
    right: 4px;
    top: 8px;
    cursor: pointer;
  }

  &:last-child {
    margin-bottom: 8px;
  }
}
</style>

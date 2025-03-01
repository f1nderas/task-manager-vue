import type { IColumn } from '@/types/interfaces'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useNotificationStore } from './notification.store'

export const useTaskStore = defineStore('tasks', () => {
  const notificationStore = useNotificationStore()

  const columns = ref<IColumn[]>([
    { id: 1, name: 'На согласовании', tasks: [] },
    { id: 2, name: 'Новые', tasks: [] },
    { id: 3, name: 'В процессе', tasks: [] },
    { id: 4, name: 'Готово', tasks: [] },
    { id: 5, name: 'Доработать', tasks: [] },
  ])

  const nextTaskId = ref(1)

  const addTask = (columnId: number, text: string) => {
    const column = columns.value.find((c) => c.id === columnId)
    if (column) {
      column.tasks.push({ id: nextTaskId.value++, text })
      notificationStore.addNotification(`Задача создана в "${column.name}"`, text)
    }
  }

  const editTask = (taskId: number, newText: string) => {
    columns.value.forEach((column) => {
      const task = column.tasks.find((t) => t.id === taskId)
      if (task) {
        task.text = newText
        notificationStore.addNotification('Задача обновлена', task.text)
      }
    })
  }

  const deleteTask = (taskId: number) => {
    columns.value.forEach((column) => {
      const taskIndex = column.tasks.findIndex((t) => t.id === taskId)
      if (taskIndex !== -1) {
        const [deleteTask] = column.tasks.splice(taskIndex, 1)
        notificationStore.addNotification('Задача удалена', deleteTask.text)
      }
    })
  }

  const moveTask = (taskId: number, targetColumnId: number) => {
    const sourceColumn = columns.value.find((column) => column.tasks.some((t) => t.id === taskId))
    const targetColumn = columns.value.find((c) => c.id === targetColumnId)

    if (!sourceColumn || !targetColumn) return

    const taskIndex = sourceColumn.tasks.findIndex((t) => t.id === taskId)
    if (taskIndex === -1) return

    const [taskToMove] = sourceColumn.tasks.splice(taskIndex, 1)
    if (!taskToMove) return

    targetColumn.tasks.push(taskToMove)

    notificationStore.addNotification(`Задача перемещена в "${targetColumn.name}"`, taskToMove.text)
  }

  const getColumnById = (columnId: number) => {
    return columns.value.find((column) => column.id === columnId)
  }

  return {
    columns,
    nextTaskId,
    addTask,
    editTask,
    deleteTask,
    moveTask,
    getColumnById,
  }
})

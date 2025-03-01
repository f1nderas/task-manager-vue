import type { INotification } from '@/types/interfaces'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNotificationStore = defineStore('notifications', () => {
  const notifications = ref<INotification[]>([])
  let nextNotificationId = 1

  const addNotification = (title: string, text: string) => {
    const id = nextNotificationId++
    notifications.value.push({ id, title, text })

    setTimeout(() => {
      removeNotification(id)
    }, 3000)
  }

  const removeNotification = (notificationId: number) => {
    notifications.value = notifications.value.filter(
      (notification) => notification.id !== notificationId,
    )
  }
  return {
    notifications,
    addNotification,
    removeNotification,
  }
})

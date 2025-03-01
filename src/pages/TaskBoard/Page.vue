<template>
  <div class="flex gap-5 h-full">
    <TaskColumn v-for="column in columns" :key="column.id" :column="column" />
    <Notifications />
  </div>
</template>

<script setup lang="ts">
import TaskColumn from '@/pages/TaskBoard/TaskColumn.vue'
import Notifications from '@/components/widgets/Notifications.vue'
import { useTaskStore } from '@/stores/task.store'

const taskStore = useTaskStore()
const columns = taskStore.columns
</script>

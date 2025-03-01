<template>
  <transition-group name="fade" tag="div" class="notification-container">
    <div class="notification" v-for="(notification, index) in notifications" :key="index">
      <div class="notification__rectangle"></div>
      <div class="notification__check">
        <IconCheck />
      </div>
      <div class="notification-info">
        <h4 class="notification-info__title">{{ notification.title }}</h4>
        <p class="notification-info__text">{{ notification.text }}</p>
      </div>
      <button
        class="notification__close"
        @click="remove(notification.id)"
        aria-label="Закрыть уведомление"
      >
        <IconClose />
      </button>
    </div>
  </transition-group>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useNotificationStore } from '@/stores/notification.store'
import IconCheck from '../icons/iconChecked.vue'
import IconClose from '../icons/iconClose.vue'

const notificationStore = useNotificationStore()
const notifications = computed(() => notificationStore.notifications)

const remove = (id: number) => {
  notificationStore.removeNotification(id)
}
</script>

<style lang="scss" scoped>
.notification {
  position: relative;
  box-shadow:
    0 8px 16px 0 rgba(0, 0, 0, 0.06),
    0 8px 8px 0 rgba(0, 0, 0, 0.08);
  background: #fff;
  border: 1px solid #e3e5e8;
  border-radius: 4px;
  display: flex;
  overflow: hidden;
  gap: 16px;
  opacity: 1;
  transition:
    opacity 0.3s,
    transform 0.3s;

  &-container {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__rectangle {
    width: 8px;
    background-color: #22c33d;
  }

  &__check {
    background-color: #22c33d;
    border-radius: 100%;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 16px 0;
    color: white;
  }

  &-info {
    padding: 16px 25px 16px 0;
  }

  &__close {
    width: 16px;
    height: 16px;
    position: absolute;
    top: 8px;
    right: 8px;
    cursor: pointer;
  }
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.3s,
    transform 0.3s;
}
</style>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isOpen" class="modal-overlay" @click.self="$emit('close')">
        <div class="modal" :class="isMobile ? 'modal--mobile' : 'modal--desktop'">
          <!-- Header -->
          <div class="modal__header">
            <div>
              <h2 class="modal__title">选择模板</h2>
              <p class="modal__subtitle">选择一个预设模板快速开始</p>
            </div>
            <button class="modal__close" @click="$emit('close')">
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Templates Grid -->
          <div class="modal__body">
            <button
              v-for="template in ganttTemplates"
              :key="template.id"
              class="template-card"
              @click="$emit('select', template); $emit('close')"
            >
              <div class="template-card__icon" :style="{ background: templateColors[template.id] || templateColors.default }">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="3"/>
                  <rect x="6" y="8" width="8" height="3" rx="1.5" opacity="0.8"/>
                  <rect x="6" y="13" width="12" height="3" rx="1.5" opacity="0.5"/>
                </svg>
              </div>
              <div class="template-card__info">
                <h3 class="template-card__name">{{ template.name }}</h3>
                <p class="template-card__desc">{{ template.description }}</p>
              </div>
              <svg class="template-card__arrow" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>

          <!-- Footer -->
          <div class="modal__footer">
            <button class="modal__cancel-btn" @click="$emit('close')">取消</button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ganttTemplates } from '../utils/mermaidTemplates'
import type { GanttTemplate } from '../types'

defineProps<{
  isOpen: boolean
}>()

defineEmits<{
  close: []
  select: [template: GanttTemplate]
}>()

const isMobile = ref(window.innerWidth < 768)

const templateColors: Record<string, string> = {
  'software-dev': 'linear-gradient(135deg, rgba(79, 140, 247, 0.12), rgba(124, 92, 252, 0.12))',
  'marketing': 'linear-gradient(135deg, rgba(247, 112, 79, 0.12), rgba(245, 166, 35, 0.12))',
  'construction': 'linear-gradient(135deg, rgba(46, 205, 167, 0.12), rgba(0, 184, 148, 0.12))',
  'blank': 'linear-gradient(135deg, rgba(148, 163, 184, 0.12), rgba(100, 116, 139, 0.12))',
  default: 'linear-gradient(135deg, rgba(79, 140, 247, 0.12), rgba(124, 92, 252, 0.12))',
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
}

.modal {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #ffffff;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.modal--desktop {
  width: 100%;
  max-width: 36rem;
  max-height: 80vh;
  border-radius: 1rem;
}

.modal--mobile {
  width: 100%;
  height: 100%;
  border-radius: 0;
}

@media (prefers-color-scheme: dark) {
  .modal {
    background: #141b2d;
  }
}

[data-theme="dark"] .modal {
  background: #141b2d;
}

/* Header */
.modal__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #f1f5f9;
  flex-shrink: 0;
}

[data-theme="dark"] .modal__header {
  border-color: #1e2538;
}

.modal__title {
  font-size: 1.125rem;
  font-weight: 700;
  color: #1e293b;
  letter-spacing: -0.01em;
}

[data-theme="dark"] .modal__title {
  color: #e2e8f0;
}

.modal__subtitle {
  font-size: 0.8125rem;
  color: #94a3b8;
  margin-top: 0.25rem;
}

.modal__close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: none;
  border-radius: 0.5rem;
  background: transparent;
  color: #94a3b8;
  cursor: pointer;
  transition: all 0.15s ease;
  flex-shrink: 0;
}

.modal__close:hover {
  background: #f1f5f9;
  color: #64748b;
}

[data-theme="dark"] .modal__close:hover {
  background: #1e2538;
  color: #e2e8f0;
}

/* Body */
.modal__body {
  padding: 1rem 1.5rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
}

/* Template Card */
.template-card {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  padding: 0.875rem 1rem;
  border: 1px solid #f1f5f9;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.15s ease;
  text-align: left;
  background: transparent;
  width: 100%;
}

.template-card:hover {
  border-color: rgba(79, 140, 247, 0.3);
  background: rgba(79, 140, 247, 0.03);
  box-shadow: 0 2px 8px rgba(79, 140, 247, 0.08);
}

[data-theme="dark"] .template-card {
  border-color: #1e2538;
}

[data-theme="dark"] .template-card:hover {
  border-color: rgba(79, 140, 247, 0.25);
  background: rgba(79, 140, 247, 0.05);
  box-shadow: 0 2px 8px rgba(79, 140, 247, 0.1);
}

.template-card__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 0.625rem;
  flex-shrink: 0;
  color: #4F8CF7;
}

.template-card__info {
  flex: 1;
  min-width: 0;
}

.template-card__name {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1e293b;
  letter-spacing: -0.01em;
}

[data-theme="dark"] .template-card__name {
  color: #e2e8f0;
}

.template-card__desc {
  font-size: 0.75rem;
  color: #94a3b8;
  margin-top: 0.125rem;
}

.template-card__arrow {
  flex-shrink: 0;
  color: #cbd5e0;
  opacity: 0;
  transition: all 0.15s ease;
}

.template-card:hover .template-card__arrow {
  opacity: 1;
  color: #4F8CF7;
}

/* Footer */
.modal__footer {
  padding: 0.75rem 1.5rem;
  border-top: 1px solid #f1f5f9;
  display: flex;
  justify-content: flex-end;
  flex-shrink: 0;
}

[data-theme="dark"] .modal__footer {
  border-top-color: #1e2538;
}

.modal__cancel-btn {
  padding: 0.4375rem 1rem;
  font-size: 0.8125rem;
  font-weight: 500;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.15s ease;
  color: #64748b;
  background: transparent;
}

.modal__cancel-btn:hover {
  background: #f1f5f9;
  color: #334155;
}

[data-theme="dark"] .modal__cancel-btn {
  color: #94a3b8;
}

[data-theme="dark"] .modal__cancel-btn:hover {
  background: #1e2538;
  color: #e2e8f0;
}

/* Transition */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-active .modal,
.modal-leave-active .modal {
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.modal-enter-from {
  opacity: 0;
}

.modal-enter-from .modal {
  transform: scale(0.96) translateY(8px);
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-leave-to .modal {
  transform: scale(0.96);
  opacity: 0;
}
</style>

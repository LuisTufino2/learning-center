<script setup>
import { ref, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import serviceOrderService from '../../infrastructure/service-order.service.js';

const { t } = useI18n();

const props = defineProps({
  editors: {
    type: Array,
    required: true,
    default: () => []
  },
  tracks: {
    type: Array,
    required: true,
    default: () => []
  }
});

const nextServiceOrder = ref(null);
const loading = ref(true);

onMounted(async () => {
  try {
    nextServiceOrder.value = await serviceOrderService.getNextHighPriorityServiceOrder();
  } catch (error) {
    console.error('Error loading next service order:', error);
  } finally {
    loading.value = false;
  }
});

// Get track information
const trackInfo = computed(() => {
  if (!nextServiceOrder.value) return null;
  return props.tracks.find(t => t.id === nextServiceOrder.value.trackId);
});

// Format date
const formattedDate = computed(() => {
  if (!nextServiceOrder.value) return '';
  const date = new Date(nextServiceOrder.value.registeredAt);
  return date.toLocaleString();
});

// Get needed action label
const neededActionLabel = computed(() => {
  if (!nextServiceOrder.value) return '';
  return t(`neededActions.${nextServiceOrder.value.neededAction}`);
});

// Get priority label
const priorityLabel = computed(() => {
  if (!nextServiceOrder.value) return '';
  return t(`priorities.${nextServiceOrder.value.priority}`);
});
</script>

<template>
  <div v-if="loading" class="loading">
    <p>{{ t('common.loading') }}</p>
  </div>

  <pv-card v-else-if="nextServiceOrder" class="service-order-card">
    <div class="service-order-content">
      <div class="order-header">
        <span class="order-id">{{ t('serviceOrder.id') }}: #{{ nextServiceOrder.id }}</span>
        <pv-tag
          :value="priorityLabel"
          severity="danger"
          aria-label="Priority label"
        />
      </div>

      <div class="order-detail">
        <label>{{ t('serviceOrder.track') }}</label>
        <span>{{ trackInfo ? trackInfo.name : t('common.notAvailable') }}</span>
      </div>

      <div class="order-detail">
        <label>{{ t('serviceOrder.issue') }}</label>
        <span>{{ nextServiceOrder.issueId }}</span>
      </div>

      <div class="order-detail">
        <label>{{ t('serviceOrder.neededAction') }}</label>
        <span>{{ neededActionLabel }}</span>
      </div>

      <div class="order-detail">
        <label>{{ t('serviceOrder.registeredAt') }}</label>
        <span>{{ formattedDate }}</span>
      </div>
    </div>
  </pv-card>

  <div v-else class="no-orders">
    <p>{{ t('serviceOrder.empty') }}</p>
  </div>
</template>

<style scoped>
.loading, .no-orders {
  padding: 20px;
  text-align: center;
  font-size: 0.95rem;
  color: #6b7280;
}

.service-order-card {
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-left: 4px solid #dc2626;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.service-order-content {
  padding: 16px;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e5e7eb;
}

.order-id {
  font-size: 0.95rem;
  font-weight: 600;
  color: #1f2937;
}

.order-detail {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding: 8px 0;
  border-bottom: 1px solid #f3f4f6;
}

.order-detail:last-child {
  border-bottom: none;
}

.order-detail label {
  font-weight: 500;
  color: #6b7280;
  font-size: 0.9rem;
}

.order-detail span {
  font-size: 0.95rem;
  color: #1f2937;
  font-weight: 500;
}
</style>




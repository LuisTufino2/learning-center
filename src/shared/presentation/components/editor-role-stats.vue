<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps({
  editorRole: {
    type: String,
    required: true
  },
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

// Get editors for this role with AVAILABLE status
const availableEditorsForRole = computed(() => {
  return props.editors.filter(
    e => e.editorRole === props.editorRole && e.status === 'AVAILABLE'
  );
});

// Calculate Cost Per Hour
const costPerHour = computed(() => {
  return availableEditorsForRole.value.reduce((total, editor) => {
    const track = props.tracks.find(t => t.id === editor.trackId);
    return total + (track ? track.costPerHour : 0);
  }, 0);
});

// Calculate Accumulated Cost
const accumulatedCost = computed(() => {
  const now = new Date();
  let totalAccumulatedCost = 0;

  availableEditorsForRole.value.forEach(editor => {
    const track = props.tracks.find(t => t.id === editor.trackId);
    if (track) {
      const registeredAt = new Date(editor.registeredAt);
      const hoursElapsed = Math.round((now - registeredAt) / (1000 * 60 * 60));
      const costForEditor = track.costPerHour * hoursElapsed;
      totalAccumulatedCost += costForEditor;
    }
  });

  return totalAccumulatedCost.toFixed(2);
});

// Active Editors count
const activeEditorsCount = computed(() => {
  return props.editors.filter(e => e.editorRole === props.editorRole).length;
});

// Get role label translated
const roleLabel = computed(() => {
  return t(`editorRoles.${props.editorRole}`);
});
</script>

<template>
  <pv-card class="editor-role-card">
    <template #header>
      <div class="card-header">
        <h3>{{ roleLabel }}</h3>
      </div>
    </template>

    <div class="card-content">
      <div class="metric-item">
        <label>{{ t('editorRoleStats.costPerHour') }}</label>
        <span class="metric-value">${{ costPerHour }}</span>
      </div>

      <div class="metric-item">
        <label>{{ t('editorRoleStats.accumulatedCost') }}</label>
        <span class="metric-value">${{ accumulatedCost }}</span>
      </div>
    </div>

    <template #footer>
      <div class="card-footer">
        <span>{{ t('editorRoleStats.activeEditors') }}: {{ activeEditorsCount }}</span>
      </div>
    </template>
  </pv-card>
</template>

<style scoped>
.editor-role-card {
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.editor-role-card:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
}

.card-header {
  padding: 16px;
  background-color: #f3f4f6;
  border-bottom: 1px solid #e5e7eb;
}

.card-header h3 {
  margin: 0;
  font-size: 1.1rem;
  color: #1f2937;
  font-weight: 600;
}

.card-content {
  padding: 16px;
}

.metric-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e5e7eb;
}

.metric-item:last-child {
  margin-bottom: 0;
  border-bottom: none;
}

.metric-item label {
  font-size: 0.9rem;
  color: #6b7280;
  font-weight: 500;
}

.metric-value {
  font-size: 1.3rem;
  font-weight: 700;
  color: #1f2937;
}

.card-footer {
  padding: 12px 16px;
  background-color: #f9fafb;
  border-top: 1px solid #e5e7eb;
  text-align: center;
  font-size: 0.9rem;
  color: #6b7280;
  font-weight: 500;
}
</style>


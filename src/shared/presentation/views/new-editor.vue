<script setup>
import { ref, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter, useRoute } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import trackService from '../../infrastructure/track.service.js';
import editorService from '../../infrastructure/editor.service.js';
import serviceOrderService from '../../infrastructure/service-order.service.js';

const { t } = useI18n();
const router = useRouter();
const route = useRoute();
const toast = useToast();

// Form data
const formData = ref({
  trackId: null,
  editorRole: null
});

// UI state
const loading = ref(true);
const submitting = ref(false);
const tracks = ref([]);
const availableTracks = computed(() => {
  return tracks.value.map(track => ({
    label: track.name,
    value: track.id
  }));
});

// Editor roles options
const editorRoles = [
  { label: t('editorRoles.METADATA_REVIEWER'), value: 'METADATA_REVIEWER' },
  { label: t('editorRoles.SYNC_SPECIALIST'), value: 'SYNC_SPECIALIST' },
  { label: t('editorRoles.AUDIO_QUALITY_ANALYST'), value: 'AUDIO_QUALITY_ANALYST' }
];

// Load tracks on component mount
onMounted(async () => {
  try {
    tracks.value = await trackService.getAllTracks();
  } catch (error) {
    console.error('Error loading tracks:', error);
    toast.add({
      severity: 'error',
      summary: t('newEditor.error'),
      detail: error.message,
      life: 3000
    });
  } finally {
    loading.value = false;
  }
});

// Methods
const onSubmit = async () => {
  // Validate form
  if (!formData.value.trackId || !formData.value.editorRole) {
    toast.add({
      severity: 'warn',
      summary: t('validation.required'),
      detail: t('validation.required'),
      life: 3000
    });
    return;
  }

  try {
    submitting.value = true;

    // Check if editor already registered today for this track
    const editorsRegisteredToday = await editorService.getEditorsRegisteredTodayForTrack(
      formData.value.trackId
    );

    if (editorsRegisteredToday.length > 0) {
      toast.add({
        severity: 'error',
        summary: t('newEditor.duplicateToday'),
        detail: t('newEditor.duplicateToday'),
        life: 3000
      });
      return;
    }

    // Create editor
    const newEditor = {
      trackId: formData.value.trackId,
      editorRole: formData.value.editorRole,
      status: 'AVAILABLE',
      registeredAt: new Date().toISOString()
    };

    const createdEditor = await editorService.createEditor(newEditor);

    // Get track info to find defaultAction
    const track = tracks.value.find(t => t.id === formData.value.trackId);

    // Auto-generate Service Order
    const newServiceOrder = {
      trackId: formData.value.trackId,
      issueId: `ISSUE_${Date.now()}`,
      neededAction: track.defaultAction,
      priority: 'NORMAL',
      registeredAt: new Date().toISOString()
    };

    await serviceOrderService.createServiceOrder(newServiceOrder);

    // Show success message
    toast.add({
      severity: 'success',
      summary: t('newEditor.created'),
      detail: t('newEditor.created'),
      life: 3000
    });

    // Redirect to home after 1 second
    setTimeout(() => {
      router.push('/home');
    }, 1000);
  } catch (error) {
    console.error('Error creating editor:', error);
    toast.add({
      severity: 'error',
      summary: t('newEditor.error'),
      detail: error.message,
      life: 3000
    });
  } finally {
    submitting.value = false;
  }
};

const onCancel = () => {
  router.push('/home');
};
</script>

<template>
  <div class="new-editor-view">
    <div class="form-container">
      <h1>{{ t('newEditor.title') }}</h1>
      <p class="subtitle">{{ t('newEditor.subtitle') }}</p>

      <div v-if="loading" class="loading">
        <p>{{ t('common.loading') }}</p>
      </div>

      <form v-else @submit.prevent="onSubmit" class="editor-form">
        <!-- Track Selection -->
        <div class="form-group">
          <label for="track-select">{{ t('newEditor.track') }} *</label>
          <pv-select
            id="track-select"
            v-model="formData.trackId"
            :options="availableTracks"
            :placeholder="t('newEditor.selectTrack')"
            aria-label="Select track"
          />
        </div>

        <!-- Editor Role Selection -->
        <div class="form-group">
          <label for="role-select">{{ t('newEditor.editorRole') }} *</label>
          <pv-select
            id="role-select"
            v-model="formData.editorRole"
            :options="editorRoles"
            :placeholder="t('newEditor.selectEditorRole')"
            aria-label="Select editor role"
          />
        </div>

        <!-- Form Actions -->
        <div class="form-actions">
          <pv-button
            type="submit"
            :label="t('newEditor.create')"
            :loading="submitting"
            aria-label="Create editor record"
          />
          <pv-button
            type="button"
            :label="t('newEditor.cancel')"
            class="p-button-secondary"
            @click="onCancel"
            aria-label="Cancel and return to home"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.new-editor-view {
  padding: 40px 20px;
  max-width: 600px;
  margin: 0 auto;
}

.form-container {
  background-color: #ffffff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 1.8rem;
  color: #1f2937;
  margin-bottom: 5px;
}

.subtitle {
  font-size: 0.95rem;
  color: #6b7280;
  margin-bottom: 30px;
}

.loading {
  text-align: center;
  padding: 40px 20px;
  color: #6b7280;
}

.editor-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-weight: 600;
  color: #1f2937;
  font-size: 0.95rem;
}

.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

:deep(.p-select) {
  width: 100%;
}

:deep(.p-button) {
  flex: 1;
}
</style>




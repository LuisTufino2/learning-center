
<script setup>
import { ref, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import { EditorHttpRepository } from '../../infrastructure/repositories/editor.http.repository.js';
import { CreateEditorUseCase, CreateEditorDTO } from '../../application/use-cases/editor.usecases.js';
import trackService from '../../../shared/infrastructure/track.service.js';
import serviceOrderService from '../../../shared/infrastructure/service-order.service.js';
import { EditorAlreadyRegisteredTodayException } from '../../domain/exceptions/editor.exceptions.js';

const { t } = useI18n();
const router = useRouter();
const toast = useToast();

// Repositories and Use Cases
const editorRepository = new EditorHttpRepository();
const createEditorUseCase = new CreateEditorUseCase(editorRepository, serviceOrderService);

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

    // Get track
    const selectedTrackId = typeof formData.value.trackId === 'object'
      ? formData.value.trackId?.value
      : formData.value.trackId;
    const track = tracks.value.find(t => t.id === Number(selectedTrackId));

    if (!track) {
      throw new Error('Selected track was not found');
    }

    // Create DTO
    const createEditorDTO = new CreateEditorDTO(
      Number(selectedTrackId),
      formData.value.editorRole
    );

    // Execute use case
    await createEditorUseCase.execute(createEditorDTO, track);

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

    if (error instanceof EditorAlreadyRegisteredTodayException) {
      toast.add({
        severity: 'error',
        summary: t('newEditor.duplicateToday'),
        detail: t('newEditor.duplicateToday'),
        life: 3000
      });
    } else {
      toast.add({
        severity: 'error',
        summary: t('newEditor.error'),
        detail: error.message,
        life: 3000
      });
    }
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
            optionLabel="label"
            optionValue="value"
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
            optionLabel="label"
            optionValue="value"
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


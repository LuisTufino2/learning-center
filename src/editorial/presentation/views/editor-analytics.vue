
<script setup>
import { ref, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import EditorRoleStats from '../components/editor-role-stats.vue';
import NextServiceOrder from '../components/next-service-order.vue';
import { EditorHttpRepository } from '../../infrastructure/repositories/editor.http.repository.js';
import trackService from '../../../shared/infrastructure/track.service.js';

const { t } = useI18n();

// Repository
const editorRepository = new EditorHttpRepository();

// Reactive data
const editors = ref([]);
const tracks = ref([]);
const loading = ref(true);
const error = ref(null);

// Computed properties for unique editor roles
const editorRoles = computed(() => {
  const roles = new Set(editors.value.map(e => e.editorRole));
  return Array.from(roles);
});

// Fetch data on component mount
onMounted(async () => {
  try {
    loading.value = true;
    const [editorsData, tracksData] = await Promise.all([
      editorRepository.getAll(),
      trackService.getAllTracks()
    ]);
    editors.value = editorsData;
    tracks.value = tracksData;
  } catch (err) {
    error.value = err.message;
    console.error('Error loading data:', err);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="home-view">
    <h1>{{ t('home.title') }}</h1>
    <p class="welcome-text">{{ t('home.welcome') }}</p>

    <div v-if="loading" class="loading">
      <p>{{ t('common.loading') }}</p>
    </div>

    <div v-else-if="error" class="error">
      <p>Error: {{ error }}</p>
    </div>

    <template v-else>
      <!-- Editor Analytics Section -->
      <section class="analytics-section">
        <h2>{{ t('home.editorAnalytics') }}</h2>
        <div class="editor-roles-grid">
          <editor-role-stats
            v-for="role in editorRoles"
            :key="role"
            :editor-role="role"
            :editors="editors"
            :tracks="tracks"
          />
        </div>
      </section>

      <!-- Next Service Order Section -->
      <section class="service-order-section">
        <h2>{{ t('home.nextServiceOrder') }}</h2>
        <next-service-order :editors="editors" :tracks="tracks" />
      </section>
    </template>
  </div>
</template>

<style scoped>
.home-view {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  font-size: 2rem;
  margin-bottom: 10px;
  color: #1f2937;
}

.welcome-text {
  font-size: 1.1rem;
  color: #6b7280;
  margin-bottom: 30px;
}

.loading, .error {
  padding: 20px;
  text-align: center;
  font-size: 1rem;
  color: #6b7280;
}

.error {
  color: #dc2626;
}

section {
  margin-bottom: 40px;
}

section h2 {
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #1f2937;
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 10px;
}

.editor-roles-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}

@media (max-width: 1024px) {
  .editor-roles-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .editor-roles-grid {
    grid-template-columns: 1fr;
  }
}

.service-order-section {
  background-color: #f9fafb;
  padding: 20px;
  border-radius: 8px;
}
</style>


<script setup>
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import cellarService from '../../infrastructure/cellar.service.js';
import preservationItemService from '../../infrastructure/preservation-item.service.js';
import CellarSummary from '../components/cellar-summary.vue';
const { t } = useI18n();
const loading = ref(true);
const cellars = ref([]);
const preservationItems = ref([]);
const errorMessage = ref('');
const sortedCellars = computed(() => [...cellars.value].sort((a, b) => a.id - b.id));
onMounted(async () => {
  try {
    const [loadedCellars, loadedItems] = await Promise.all([
      cellarService.getAllCellars(),
      preservationItemService.getAllPreservationItems()
    ]);
    cellars.value = loadedCellars;
    preservationItems.value = loadedItems;
  } catch (error) {
    errorMessage.value = error.message;
  } finally {
    loading.value = false;
  }
});
</script>
<template>
  <div class="home-view">
    <section class="hero">
      <h1>{{ t('home.title') }}</h1>
      <p>{{ t('home.subtitle') }}</p>
    </section>
    <section class="section-header">
      <h2>{{ t('home.myWineCellars') }}</h2>
      <p>{{ t('home.sectionDescription') }}</p>
    </section>
    <div v-if="loading" class="loading-state">{{ t('common.loading') }}</div>
    <div v-else-if="errorMessage" class="error-state">
      {{ errorMessage }}
    </div>
    <div v-else class="cellars-grid">
      <CellarSummary
        v-for="cellar in sortedCellars"
        :key="cellar.id"
        :cellar="cellar"
        :preservation-items="preservationItems"
      />
    </div>
  </div>
</template>
<style scoped>
.home-view {
  padding: 2rem 1.25rem 3rem;
  max-width: 1200px;
  margin: 0 auto;
}
.hero {
  padding: 1.75rem;
  border-radius: 20px;
  background: linear-gradient(135deg, #5b2a1d 0%, #7c2d12 100%);
  color: #fff7ed;
  margin-bottom: 1.25rem;
}
.hero h1,
.section-header h2 {
  margin: 0 0 0.35rem;
}
.hero p,
.section-header p {
  margin: 0;
  opacity: 0.92;
}
.section-header {
  margin: 1.5rem 0 1rem;
}
.cellars-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}
.loading-state,
.error-state {
  padding: 2rem;
  border-radius: 16px;
  background: #fff7ed;
  color: #7c2d12;
}
@media (max-width: 900px) {
  .cellars-grid {
    grid-template-columns: 1fr;
  }
}
</style>
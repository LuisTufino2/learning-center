<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import Button from 'primevue/button';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const buttonLabel = computed(() => t('pageNotFound.goHome'));

const goHome = () => {
  router.push('/home');
};
</script>

<template>
  <div class="page-not-found">
    <div class="not-found-card">
      <h1>{{ t('pageNotFound.title') }}</h1>
      <p>
        {{ t('pageNotFound.message') }}
        <code>{{ route.fullPath }}</code>
      </p>
      <Button :label="buttonLabel" @click="goHome" :aria-label="t('pageNotFound.goHome')" />
    </div>
  </div>
</template>

<style scoped>
.page-not-found {
  min-height: 60vh;
  display: grid;
  place-items: center;
  padding: 2rem;
}

.not-found-card {
  width: min(680px, 100%);
  padding: 2rem;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  text-align: center;
  border-top: 4px solid #7c2d12;
}

h1 {
  margin: 0 0 0.75rem;
}

p {
  margin: 0 0 1rem;
}

code {
  background: #f3f4f6;
  padding: 2px 6px;
  border-radius: 4px;
}
</style>
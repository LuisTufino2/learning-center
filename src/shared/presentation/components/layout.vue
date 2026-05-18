<script setup>
import { computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import LanguageSwitcher from './language-switcher.vue';
import FooterContent from './footer-content.vue';

const { t, locale } = useI18n();
const router = useRouter();
const route = useRoute();
const logoUrl = 'https://img.logo.dev/thewinesquare.com?size=64';

const navigationItems = computed(() => [
  { label: t('navigation.home'), to: '/home' },
  { label: t('navigation.newPreservationItem'), to: '/preservation/items/new' }
]);

const navigateTo = (path) => {
  router.push(path);
};

const updateDocumentTitle = () => {
  const titleKey = route.meta?.titleKey;
  const pageTitle = titleKey ? t(titleKey) : '';
  document.title = pageTitle ? `${t('app.title')} - ${pageTitle}` : t('app.title');
};

watch([() => route.fullPath, locale], updateDocumentTitle, { immediate: true });
</script>

<template>
  <pv-toast/>
  <pv-confirm-dialog/>
  <div class="header">
    <pv-toolbar class="wine-toolbar">
      <template #start>
        <div class="toolbar-start">
          <img :src="logoUrl" alt="The Wine Square logo" class="logo" />
          <h2 class="app-title">{{ t('app.title') }}</h2>
        </div>
      </template>
      <template #center>
        <div class="toolbar-center">
          <pv-button
            v-for="item in navigationItems"
            :key="item.to"
            class="nav-button p-button-text"
            :label="item.label"
            @click="navigateTo(item.to)"
            :aria-current="$route.path === item.to ? 'page' : undefined"
          />
        </div>
      </template>
      <template #end>
        <div class="toolbar-end">
          <language-switcher/>
        </div>
      </template>
    </pv-toolbar>
  </div>
  <div class="main-content">
    <router-view/>
  </div>
  <div class="footer">
    <footer-content />
  </div>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
}

.wine-toolbar {
  background: linear-gradient(135deg, #4b1f16 0%, #7c2d12 100%);
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.toolbar-start {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 0 0 auto;
}

.logo {
  height: 40px;
  width: 40px;
  border-radius: 4px;
  object-fit: contain;
}

.app-title {
  color: #ffffff;
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0;
  white-space: nowrap;
  letter-spacing: 0.5px;
}

.toolbar-center {
  display: flex;
  align-items: center;
  gap: 20px;
  flex: 1;
  justify-content: center;
  margin: 0 20px;
}

.nav-button {
  color: #e5e7eb;
  font-size: 0.95rem;
  font-weight: 500;
  padding: 8px 16px;
  transition: all 0.3s ease;
  border-radius: 4px;
}

.nav-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: #ffffff;
}

.nav-button[aria-current="page"] {
  background-color: rgba(255, 255, 255, 0.16);
  color: #ffffff;
}

.toolbar-end {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 0 0 auto;
}

.main-content {
  margin-top: 0;
  min-height: calc(100vh - 70px - 60px);
  background-color: #f9fafb;
}

.footer {
  width: 100%;
  padding: 20px;
  background-color: #4b1f16;
  color: #e5e7eb;
  text-align: center;
  margin-top: 40px;
}

:deep(.p-toolbar) {
  border: none;
  background: transparent;
  padding: 0;
}

:deep(.p-toolbar-group-start),
:deep(.p-toolbar-group-center),
:deep(.p-toolbar-group-end) {
  gap: 0;
}

@media (max-width: 768px) {

  .toolbar-center {
    margin: 0 10px;
    gap: 10px;
  }

  .nav-button {
    padding: 8px 12px;
    font-size: 0.85rem;
  }
}
</style>
<script setup>
import {useI18n} from "vue-i18n";
const { locale } = useI18n();

const languageOptions = [
  { label: 'EN', value: 'en' },
  { label: 'ES', value: 'es' }
];

</script>

<template>
  <pv-select-button v-model="locale" :options="languageOptions" optionLabel="label" optionValue="value" aria-label="Language selector">
    <template #option="slotProps">
      <span>{{ slotProps.option.label }}</span>
    </template>
  </pv-select-button>
</template>

<style scoped>

</style>
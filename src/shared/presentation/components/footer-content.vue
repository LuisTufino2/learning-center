<script setup>
  import {useI18n} from "vue-i18n";
  const { t } = useI18n();
</script>

<template>
  <footer class="footer-content">
    <div class="footer-container">
      <p class="copyright">
        &copy; 2026 YouTube Music Editorial Platform. All rights reserved.
      </p>
      <p class="powered-by">
        {{ t('footer.poweredBy') }}
        <a
            href="https://music.youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open YouTube Music website"
            class="footer-link"
        >
          YouTube Music
        </a>
      </p>
    </div>
  </footer>
</template>

<style scoped>
.footer-content {
  background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
  color: #e5e7eb;
  padding: 20px;
  text-align: center;
  font-size: 0.9rem;
  border-top: 1px solid #374151;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
}

.copyright {
  margin: 0 0 8px 0;
}

.powered-by {
  margin: 0;
}

.footer-link {
  color: #4f46e5;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: #6366f1;
  text-decoration: underline;
}

.footer-link:focus {
  outline: 2px solid #4f46e5;
  outline-offset: 2px;
}
</style>
<script setup lang="ts">
interface InfoPanelField {
  label: string
  key: string
  suffix?: string
}

const props = defineProps<{
  icon: string
  header: string
  description: string
  data: object
  fields: InfoPanelField[]
}>()

function getFieldValue(key: string): unknown {
  const record = props.data as Record<string, unknown>
  return Object.prototype.hasOwnProperty.call(record, key) ? record[key] : ''
}
</script>

<template>
  <section class="info-panel">
    <div class="panel-title-row">
      <span class="panel-icon" aria-hidden="true">{{ icon }}</span>
      <div>
        <span class="panel-kicker">{{ description }}</span>
        <h2>{{ header }}</h2>
      </div>
    </div>

    <dl class="panel-details">
      <div v-for="field in fields" :key="field.key">
        <dt>{{ field.label }}</dt>
        <dd>{{ getFieldValue(field.key) }}{{ field.suffix ?? '' }}</dd>
      </div>
    </dl>
  </section>
</template>

<style scoped>
.info-panel {
  padding: clamp(1rem, 2vw, 1.4rem);
  border: 1px solid rgba(173, 23, 70, 0.18);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.88);
  box-shadow: 0 9px 24px rgba(94, 34, 53, 0.1);
}

.info-panel h2 {
  margin: 0;
  font-size: clamp(1.15rem, 2vw, 1.45rem);
}

.panel-title-row {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e3c5ce;
}

.panel-kicker {
  display: block;
  margin-bottom: 0.2rem;
  color: #b94c6d;
  font-size: 0.85rem;
}

.panel-icon {
  display: grid;
  place-items: center;
  flex: 0 0 auto;
  width: 2.7rem;
  height: 2.7rem;
  border-radius: 10px;
  background: #bd4167;
  color: white;
  font-size: 1.45rem;
  font-weight: 800;
}

.panel-details {
  margin: 0;
}

.panel-details > div {
  display: grid;
  grid-template-columns: minmax(6.5rem, auto) 1fr;
  gap: 0.65rem;
  padding: 0.65rem 0;
  border-bottom: 1px solid #f0dde3;
}

.panel-details > div:last-child {
  border-bottom: 0;
}

dt {
  color: #8b737b;
}

dd {
  margin: 0;
  font-weight: 650;
}

@media (max-width: 650px) {
  .panel-details > div {
    grid-template-columns: 1fr;
    gap: 0.2rem;
  }
}
</style>

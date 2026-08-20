<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMockDataSections } from '@/composables/useMockDataSections'
import InfoPanel from '@/components/generic/infopanel.vue'
import TextButton from '@/components/generic/TextButton.vue'
import ConfirmPopup from '@/components/generic/ConfirmPopup.vue'
import Toast from '@/components/generic/Toast.vue'
import MapLocation, {
  type MapCenter,
  type MapLocationItem
} from '@/components/generic/MapLocation.vue'
import {
  confirmEvacuationHospital,
  getCurrentEvacuationData,
  type Hospital
} from '@/services/mockDataService'

defineOptions({ name: 'HospitalsScreen' })

const router = useRouter()

const { data, loading, error } = useMockDataSections([
  'hospitals',
  'hospitalFields',
  'evacuationSummaryFields'
])
const hospitals = computed(() => data.value?.hospitals ?? [])
const hospitalMapLocations = computed<MapLocationItem[]>(() =>
  hospitals.value.map(hospital => ({
    id: hospital.id,
    name: hospital.name,
    latitude: hospital.location.latitude,
    longitude: hospital.location.longitude
  }))
)
const hospitalFields = computed(() => data.value?.hospitalFields ?? [])
const evacuationSummaryFields = computed(() => data.value?.evacuationSummaryFields ?? [])
const evacuationData = computed(() => getCurrentEvacuationData())
const evacuationSummaryData = computed(() => {
  const current = evacuationData.value

  if (!current?.soldier) {
    return null
  }

  return {
    ...current.soldier,
    injuryType: current.injuryType,
    severity: current.severity,
    notes: current.notes || 'ללא הערות'
  }
})
const selectedHospital = ref<Hospital | null>(null)
const showConfirmation = ref(false)
const confirmationComplete = ref(false)
const hospitalIcon = '✚'
const mapCenter: MapCenter = [31.6, 34.9]

function selectHospital(location: MapLocationItem): void {
  const hospital = hospitals.value.find(item => item.id === location.id)

  if (!hospital) {
    return
  }

  selectedHospital.value = hospital
  confirmationComplete.value = false
}

function openConfirmation(): void {
  if (selectedHospital.value) {
    showConfirmation.value = true
  }
}

function confirmEvacuation(): void {
  if (!selectedHospital.value) {
    return
  }

  confirmEvacuationHospital(selectedHospital.value)
  showConfirmation.value = false
  confirmationComplete.value = true
}

function handleToastClose(): void {
  if (!confirmationComplete.value) {
    return
  }

  confirmationComplete.value = false
  router.push({ name: 'home' })
}

</script>

<template>
  <div class="map-selection-page">
    <main class="map-selection-content">
      <header class="page-heading">
        <div>
          <p class="eyebrow">הזמנת פינוי</p>
          <h1>בחירת בית חולים</h1>
          <p>בחרו יעד לפינוי מתוך בתי החולים המופיעים על המפה</p>
        </div>
      </header>

      <p v-if="error" class="status-message status-message--error">לא ניתן לטעון את רשימת בתי החולים.</p>

      <div class="selection-layout">
        <section class="map-card" aria-label="מפת בתי חולים בישראל">
          <MapLocation :locations="hospitalMapLocations" :selected-id="selectedHospital?.id"
            :center="mapCenter" @select="selectHospital" />
          <div v-if="loading" class="map-loading">טוען מפה...</div>
        </section>

        <aside class="details-column">
          <InfoPanel v-if="selectedHospital" :icon="hospitalIcon" :header="selectedHospital.name"
            description="בית החולים שנבחר" :data="selectedHospital" :fields="hospitalFields" />
          <section v-else class="panel">
            <div class="empty-selection">
              <span class="medical-icon">✚</span>
              <h2>בחרו בית חולים</h2>
              <p>לחצו על אחד הסמנים במפה כדי לראות את פרטי בית החולים.</p>
            </div>
          </section>

          <InfoPanel v-if="evacuationSummaryData" icon="✚" header="פרטי הפינוי" description="סיכום פרטי האירוע והחייל"
            :data="evacuationSummaryData" :fields="evacuationSummaryFields" />
          <section v-else class="panel">
            <p class="missing-evacuation">לא נמצאו פרטי פינוי. יש למלא אותם במסך הקודם.</p>
          </section>

          <TextButton class="confirm-button" text="אישור הזמנת פינוי" variant="primary" full-width
            :disabled="!selectedHospital || !evacuationData?.soldier" @click="openConfirmation" />
        </aside>
      </div>
    </main>

    <ConfirmPopup v-model="showConfirmation" title="אישור הזמנת פינוי"
      :message="`האם אתם בטוחים שברצונכם להזמין פינוי אל ${selectedHospital?.name}?`" confirm-text="אישור"
      cancel-text="ביטול" @confirm="confirmEvacuation" />

    <Toast v-if="confirmationComplete" type="success" message="הפינוי הוזמן בהצלחה" :duration="2000"
      @close="handleToastClose" />
  </div>
</template>

<style scoped>
.map-selection-page {
  width: 100%;
  min-height: 100dvh;
  direction: rtl;
  padding: clamp(6.5rem, 10vw, 7.5rem) clamp(1rem, 3vw, 3rem) clamp(1.5rem, 4vw, 3rem);
  background: linear-gradient(180deg, #fffafa 0%, #ffecec 50%, #ffd8d8 100%);
  color: #262126;
}

.map-selection-content {
  width: min(100%, 1600px);
  margin: 0 auto;
}

.page-heading {
  margin-bottom: clamp(1rem, 2vw, 1.5rem);
}

.page-heading h1 {
  margin: 0;
  font-size: clamp(1.8rem, 3.5vw, 2.75rem);
}

.page-heading p {
  margin: 0.3rem 0 0;
  color: #786d72;
  font-size: clamp(0.95rem, 1.6vw, 1.15rem);
}

.page-heading .eyebrow {
  margin: 0 0 0.25rem;
  color: #ad1746;
  font-weight: 700;
}

.selection-layout {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(19rem, 0.85fr);
  gap: clamp(1rem, 2vw, 1.5rem);
  align-items: start;
}

.map-card {
  position: relative;
  min-height: clamp(32rem, 68vh, 47rem);
  overflow: hidden;
  border: 2px solid #cc5a7d;
  border-radius: 18px;
  background: #f5d9df;
  box-shadow: 0 12px 30px rgba(94, 34, 53, 0.14);
}

.map-loading {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  background: rgba(255, 245, 247, 0.85);
  color: #ad1746;
  font-weight: 700;
  z-index: 500;
}

.details-column {
  display: grid;
  gap: 1rem;
}

.panel {
  padding: clamp(1rem, 2vw, 1.4rem);
  border: 1px solid rgba(173, 23, 70, 0.18);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.88);
  box-shadow: 0 9px 24px rgba(94, 34, 53, 0.1);
}

.panel h2 {
  margin: 0;
  font-size: clamp(1.15rem, 2vw, 1.45rem);
}

.medical-icon {
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

.empty-selection {
  min-height: 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.empty-selection p,
.missing-evacuation {
  margin: 0.5rem 0 0;
  color: #7c7074;
}

.empty-selection .medical-icon {
  margin-bottom: 0.75rem;
}

.status-message {
  margin: 0;
  padding: 0.85rem 1rem;
  border-radius: 10px;
  text-align: center;
  font-weight: 700;
}

.status-message--error {
  margin-bottom: 1rem;
  background: #fff;
  color: #ad1746;
}

@media (max-width: 950px) {
  .selection-layout {
    grid-template-columns: 1fr;
  }

  .map-card {
    min-height: clamp(25rem, 58vh, 36rem);
  }

  .details-column {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .confirm-button {
    grid-column: 1 / -1;
  }
}

@media (max-width: 650px) {
  .map-selection-page {
    padding-inline: 0.75rem;
  }

  .details-column {
    grid-template-columns: 1fr;
  }

  .confirm-button {
    grid-column: auto;
  }

}
</style>

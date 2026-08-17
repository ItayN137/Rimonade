<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import DropdownLine from '../generic/DropdownLine.vue'
import InputLine from '../generic/InputLine.vue'
import LevelsBar from '../generic/levelsbar.vue'
import searchIcon from '../../assets/search.svg'
import {
    type EvacuationData,
    type Soldier,
    type SoldierFieldValue
} from '@/services/mockDataService'
import { useMockDataSections } from '@/composables/useMockDataSections'

const { data, loading, error } = useMockDataSections([
    'soldiers',
    'soldierFields',
    'injuryTypes',
    'severityLevels',
    'evacuationData'
])

const soldiers = computed(() => data.value?.soldiers ?? [])
const soldierFields = computed(() => data.value?.soldierFields ?? [])
const injuryTypes = computed(() => data.value?.injuryTypes ?? [])
const severityLevels = computed(() => data.value?.severityLevels ?? [])
const evacuationTemplate = computed(() => data.value?.evacuationData ?? null)

const personalNumber = ref('')
const injuryType = ref('')
const notes = ref('')
const severity = ref('')
const selectedSoldier = ref<Soldier | null>(null)
const lookupAttempted = ref(false)

const personalNumberPlaceholder = computed(() => {
    const exampleNumber = soldiers.value[0]?.personalNumber
    return exampleNumber ? `לדוגמה: ${exampleNumber}` : 'לדוגמה'
})

watch(personalNumber, () => {
    selectedSoldier.value = null
    lookupAttempted.value = false
})

const canContinue = computed(() => {
    return (
        selectedSoldier.value !== null &&
        evacuationTemplate.value !== null &&
        injuryType.value !== '' &&
        severity.value !== ''
    )
})

function findSoldier() {
    lookupAttempted.value = true
    selectedSoldier.value = soldiers.value.find(
        soldier => soldier.personalNumber === personalNumber.value.trim()
    ) ?? null
}

function getSoldierFieldValue(soldier: Soldier, key: string): SoldierFieldValue {
    return soldier[key] ?? ''
}

function continueToClinic() {
    const template = evacuationTemplate.value
    const soldier = selectedSoldier.value

    if (!canContinue.value || !template || !soldier) {
        return
    }

    const evacuationData: EvacuationData = {
        ...template,
        personalNumber: personalNumber.value.trim(),
        soldier,
        injuryType: injuryType.value,
        severity: severity.value,
        notes: notes.value
    }

    sessionStorage.setItem(
        'evacuationData',
        JSON.stringify(evacuationData)
    )

    console.log('Evacuation data saved')

}
</script>

<template>
    <div class="evacuation-page">

        <main class="evacuation-content">

            <!-- TITLE -->
            <div class="page-title">
                <h1>הזמנת פינוי</h1>
                <p>מילוי פרטי האירוע</p>
            </div>

            <div class="evacuation-card">

                <!-- PERSONAL NUMBER -->
                <section class="personal-section">
                    <InputLine id="personalNumber" v-model="personalNumber" label="הזן מספר אישי" type="text"
                        :icon="searchIcon" :icon-size="16" maxlength="7" :placeholder="personalNumberPlaceholder"
                        @keyup.enter="findSoldier" />
                </section>

                <!-- SOLDIER -->
                <section v-if="selectedSoldier" class="soldier-section">

                    <div class="soldier-title">
                        <div class="soldier-avatar">👤</div>
                        <h2>{{ selectedSoldier.fullName }}</h2>
                    </div>


                    <div class="soldier-details">
                        <div v-for="field in soldierFields" :key="field.key" class="soldier-field">
                            <span>{{ field.label }}</span>
                            <strong>{{ getSoldierFieldValue(selectedSoldier, field.key) }}</strong>
                        </div>
                    </div>

                </section>

                <div v-else-if="lookupAttempted" class="not-found">לא נמצא חייל עם המספר האישי שהוזן</div>

                <!-- EVENT DETAILS -->
                <section class="event-section">

                    <div class="field-group">
                        <DropdownLine v-model="injuryType" label="סוג פציעה" :options="injuryTypes"
                            placeholder="בחר פציעה" />
                    </div>

                    <div class="field-group notes-field">
                        <InputLine v-model="notes" label="הערות" :rows="2"
                            placeholder="הזן פרטים נוספים על האירוע..." />
                    </div>

                </section>


                <!-- SEVERITY -->
                <section class="severity-section">
                    <h3> חומרת הפינוי</h3>
                    <LevelsBar v-model="severity" :levels="severityLevels" />
                </section>

                <!-- CONTINUE -->
                <section class="continue-section">
                    <p v-if="!canContinue"> יש להזין מספר אישי, לבחור פציעה וחומרת פינוי כדי להמשיך</p>
                    <button class="continue-button" :disabled="!canContinue" @click="continueToClinic">
                        מצא מרפאה לפינוי
                        <span>←</span>
                    </button>
                </section>

            </div>

        </main>

    </div>
</template>

<style scoped>
.evacuation-page {
    width: 100%;
    min-height: 100dvh;

    direction: rtl;

    padding: clamp(6.5rem, 12vw, 7.5rem) clamp(1rem, 4vw, 3.5rem) clamp(2rem, 6vw, 3.125rem);
    overflow-x: hidden;

    background:
        linear-gradient(180deg,
            #fff9f9 0%,
            #ffeaea 45%,
            #ffd4d4 100%);
}


/* MAIN */

.evacuation-content {
    width: min(92%, 1400px);

    margin: 0 auto;
}


/* TITLE */

.page-title {
    margin-bottom: clamp(1.25rem, 3vw, 1.875rem);
}

.page-title h1 {
    margin: 0;

    font-size: clamp(1.75rem, 4vw, 2.5rem);
    font-weight: 700;

    color: #1d1d1d;
}

.page-title p {
    margin: clamp(0.25rem, 1vw, 0.375rem) 0 0;

    font-size: clamp(1rem, 2vw, 1.1875rem);

    color: #777;
}


/* MAIN CARD */

.evacuation-card {
    width: 100%;

    display: grid;

    grid-template-columns: repeat(auto-fit, minmax(min(100%, 20rem), 1fr));

    gap: clamp(1rem, 2.5vw, 1.5625rem);

    padding: clamp(1.25rem, 3vw, 2.1875rem);

    border-radius: clamp(0.75rem, 2vw, 1.125rem);

    background: rgba(255, 193, 193, 0.45);

    box-shadow:
        0 10px 30px rgba(0, 0, 0, 0.07);
}


/* PERSONAL NUMBER */

.personal-section {
    grid-column: 1 / -1;

    width: 100%;
}

/* SOLDIER */

.soldier-section {
    grid-column: 1 / -1;

    padding: clamp(1rem, 2.5vw, 1.5625rem);

    border-radius: 12px;

    background: rgba(255, 255, 255, 0.58);
}

.soldier-title {
    display: flex;
    align-items: center;

    flex-wrap: wrap;
    gap: clamp(0.75rem, 2vw, 0.9375rem);

    margin-bottom: clamp(1rem, 2vw, 1.25rem);
}

.soldier-avatar {
    width: clamp(3.25rem, 7vw, 4.0625rem);
    height: clamp(3.25rem, 7vw, 4.0625rem);

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 50%;

    background: #ffe0e0;

    font-size: clamp(1.5rem, 4vw, 2rem);
}

.soldier-title h2 {
    margin: 0;

    font-size: clamp(1.25rem, 3vw, 1.6875rem);
}

.soldier-details {
    display: grid;

    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));

    gap: clamp(0.75rem, 2vw, 0.9375rem);
}

.soldier-field {
    display: flex;
    flex-direction: column;

    gap: clamp(0.25rem, 1vw, 0.375rem);

    padding: clamp(0.875rem, 2vw, 1.125rem);

    border-radius: 10px;

    background: #fff;
}

.soldier-field span {
    color: #777;

    font-size: clamp(0.875rem, 1.5vw, 0.9375rem);
}

.soldier-field strong {
    font-size: clamp(1rem, 2vw, 1.25rem);

    color: #222;
}

.not-found {
    grid-column: 1 / -1;

    padding: clamp(0.75rem, 2vw, 0.9375rem) clamp(1rem, 2.5vw, 1.25rem);

    border-radius: 8px;

    background: rgba(173, 23, 70, 0.08);

    color: #ad1746;

    font-size: clamp(0.9375rem, 2vw, 1.0625rem);
}


/* EVENT */

.event-section {
    grid-column: 1 / -1;

    display: grid;

    grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr));

    gap: clamp(1rem, 2.5vw, 1.5625rem);
}

.field-group {
    display: flex;
    flex-direction: column;

    gap: clamp(0.375rem, 1vw, 0.5rem);
}

/* SEVERITY */

.severity-section {
    grid-column: 1 / -1;
}

.severity-section h3 {
    margin: 0 0 clamp(0.5rem, 1.5vw, 0.75rem);

    font-size: clamp(1rem, 2vw, 1.1875rem);
}

/* CONTINUE */

.continue-section {
    grid-column: 1 / -1;

    display: flex;
    flex-direction: column;
    align-items: center;

    gap: clamp(0.5rem, 1.5vw, 0.625rem);

    margin-top: clamp(0.5rem, 1.5vw, 0.625rem);
}

.continue-section p {
    margin: 0;

    color: #777;

    font-size: clamp(0.875rem, 1.5vw, 0.9375rem);
}

.continue-button {
    width: min(100%, 22rem);
    min-height: clamp(3.125rem, 6vw, 3.625rem);

    padding: 0 clamp(1rem, 3vw, 1.5625rem);

    border: none;
    border-radius: 9px;

    background: #ad1746;

    color: white;

    font-size: clamp(1rem, 2.5vw, 1.25rem);
    font-weight: 600;

    cursor: pointer;

    transition: 0.15s;
}

.continue-button:hover:not(:disabled) {
    background: #94123b;

    transform: translateY(-1px);
}

.continue-button:disabled {
    background: #bdbdbd;

    color: #777;

    cursor: not-allowed;

    opacity: 0.7;
}


/* RESPONSIVE */

@media (max-width: 550px) {

    .evacuation-page {
        padding-inline: 1rem;
    }

}
</style>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import InputLine from '../generic/InputLine.vue'

import searchIcon from '../../../assets/search.svg'

const router = useRouter()

type Soldier = {
    personalNumber: string
    fullName: string
    gender: string
    age: number
    profile: number
}

const soldiers: Soldier[] = [
    {
        personalNumber: '1234567',
        fullName: 'ישראל ישראלי',
        gender: 'זכר',
        age: 25,
        profile: 92
    },
    {
        personalNumber: '2345678',
        fullName: 'נועה לוי',
        gender: 'נקבה',
        age: 21,
        profile: 97
    },
    {
        personalNumber: '3456789',
        fullName: 'דניאל כהן',
        gender: 'זכר',
        age: 23,
        profile: 82
    },
    {
        personalNumber: '4567890',
        fullName: 'מיה אברהם',
        gender: 'נקבה',
        age: 20,
        profile: 64
    }
]

const injuryTypes = [
    'פציעת רגל',
    'פציעת יד',
    'פגיעת ראש',
    'כוויה',
    'חבלה',
    'פציעה מדממת',
    'תגובה אלרגית',
    'אחר'
]

const personalNumber = ref('')
const injuryType = ref('')
const notes = ref('')
const severity = ref('')

const selectedSoldier = computed(() => {
    return soldiers.find(
        soldier =>
            soldier.personalNumber === personalNumber.value.trim()
    )
})

const canContinue = computed(() => {
    return (
        selectedSoldier.value !== undefined &&
        injuryType.value !== '' &&
        severity.value !== ''
    )
})

function chooseSeverity(value: string) {
    severity.value = value
}

function continueToClinic() {
    if (!canContinue.value) {
        return
    }

    sessionStorage.setItem(
        'evacuationData',
        JSON.stringify({
            soldier: selectedSoldier.value,
            injuryType: injuryType.value,
            severity: severity.value,
            notes: notes.value
        })
    )

    console.log('Evacuation data saved')

    // When we build the next screen:
    // router.push('/clinic')
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
                        maxlength="7" placeholder="לדוגמה: 1234567" />
                </section>


                <!-- SOLDIER -->
                <section v-if="selectedSoldier" class="soldier-section">

                    <div class="soldier-title">
                        <div class="soldier-avatar">
                            👤
                        </div>

                        <h2>
                            {{ selectedSoldier.fullName }}
                        </h2>
                    </div>


                    <div class="soldier-details">

                        <div class="soldier-field">
                            <span>מין</span>
                            <strong>
                                {{ selectedSoldier.gender }}
                            </strong>
                        </div>

                        <div class="soldier-field">
                            <span>גיל</span>
                            <strong>
                                {{ selectedSoldier.age }}
                            </strong>
                        </div>

                        <div class="soldier-field">
                            <span>פרופיל</span>
                            <strong>
                                {{ selectedSoldier.profile }}
                            </strong>
                        </div>

                        <div class="soldier-field">
                            <span>מספר אישי</span>
                            <strong>
                                {{ selectedSoldier.personalNumber }}
                            </strong>
                        </div>

                    </div>

                </section>


                <div v-else-if="personalNumber.length === 7" class="not-found">
                    לא נמצא חייל עם המספר האישי שהוזן
                </div>


                <!-- EVENT DETAILS -->
                <section class="event-section">

                    <div class="field-group">

                        <label>
                            סוג פציעה
                        </label>

                        <select v-model="injuryType">
                            <option value="" disabled>
                                בחר פציעה
                            </option>

                            <option v-for="injury in injuryTypes" :key="injury" :value="injury">
                                {{ injury }}
                            </option>
                        </select>

                    </div>


                    <div class="field-group notes-field">

                        <label>
                            הערות
                        </label>

                        <textarea v-model="notes" placeholder="הזן פרטים נוספים על האירוע..."></textarea>

                    </div>

                </section>


                <!-- SEVERITY -->
                <section class="severity-section">

                    <h3>
                        חומרת הפינוי
                    </h3>

                    <div class="severity-bar">

                        <button type="button" class="severity-option mild" :class="{ selected: severity === 'קל' }"
                            @click="chooseSeverity('קל')">
                            קל
                        </button>

                        <button type="button" class="severity-option medium"
                            :class="{ selected: severity === 'בינוני' }" @click="chooseSeverity('בינוני')">
                            בינוני
                        </button>

                        <button type="button" class="severity-option urgent" :class="{ selected: severity === 'דחוף' }"
                            @click="chooseSeverity('דחוף')">
                            דחוף
                        </button>

                    </div>

                </section>


                <!-- CONTINUE -->
                <section class="continue-section">

                    <p v-if="!canContinue">
                        יש להזין מספר אישי, לבחור פציעה וחומרת פינוי כדי להמשיך
                    </p>

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

.personal-section :deep(.input-line) {
    min-height: 0;
    margin: 0;
    padding: 0;
    border: 0;
    border-radius: 0;
    box-shadow: none;
}

.personal-section :deep(.input-label) {
    display: block;

    margin-bottom: clamp(0.375rem, 1vw, 0.5rem);

    font-size: clamp(1rem, 2vw, 1.125rem);
    font-weight: 600;
}

.personal-section :deep(input) {
    position: static;
    width: 100%;
    min-height: clamp(3.125rem, 6vw, 3.625rem);
    height: auto;
    margin: 0;

    padding: 0 clamp(1rem, 2vw, 1.25rem) 0 clamp(2.75rem, 5vw, 3.4375rem);

    border: none;
    border-bottom: 2px solid #222;

    border-radius: 10px 10px 0 0;

    outline: none;

    background: rgba(255, 255, 255, 0.75);

    font-size: clamp(1.125rem, 2.5vw, 1.375rem);

    text-align: right;
}

.personal-section :deep(.input-line)::after {
    content: '🔎';
    position: absolute;

    left: clamp(0.75rem, 2vw, 1.125rem);
    bottom: calc(clamp(3.125rem, 6vw, 3.625rem) / 2);

    transform: translateY(50%);

    font-size: clamp(1.125rem, 2.5vw, 1.375rem);
    pointer-events: none;
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

.field-group label {
    font-size: clamp(1rem, 2vw, 1.125rem);
    font-weight: 600;
}

.field-group select {
    width: 100%;
    min-height: clamp(3rem, 6vw, 3.4375rem);

    padding: 0 clamp(0.75rem, 2vw, 1rem);

    border: none;
    border-radius: 9px;

    outline: none;

    background: white;

    font-size: clamp(1rem, 2vw, 1.125rem);
}

.notes-field textarea {
    width: 100%;
    min-height: clamp(6.5rem, 15vw, 8.125rem);

    padding: clamp(0.75rem, 2vw, 0.9375rem);

    resize: vertical;

    border: none;
    border-radius: 9px;

    outline: none;

    background: white;

    font-size: clamp(0.9375rem, 2vw, 1.0625rem);

    font-family: inherit;
}


/* SEVERITY */

.severity-section {
    grid-column: 1 / -1;
}

.severity-section h3 {
    margin: 0 0 clamp(0.5rem, 1.5vw, 0.75rem);

    font-size: clamp(1rem, 2vw, 1.1875rem);
}

.severity-bar {
    width: 100%;

    display: grid;

    grid-template-columns: repeat(3, minmax(0, 1fr));

    overflow: hidden;

    border: 2px solid #ad1746;

    border-radius: 30px;

    background:
        linear-gradient(to left,
            #bd2929,
            #f0c640,
            #5ccf4b);
}

.severity-option {
    min-height: clamp(3rem, 6vw, 3.4375rem);

    border: none;

    background: transparent;

    color: #252525;

    font-size: clamp(1rem, 2vw, 1.1875rem);
    font-weight: 600;

    cursor: pointer;
}

.severity-option.selected {
    background: rgba(255, 255, 255, 0.92);

    box-shadow:
        inset 0 0 0 3px #ad1746;
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

    .severity-bar {
        grid-template-columns: 1fr;
        border-radius: 0.75rem;
    }

}
</style>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

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

                    <label for="personalNumber">
                        הזן מספר אישי
                    </label>

                    <div class="personal-input-wrapper">
                        <input id="personalNumber" v-model="personalNumber" type="text" maxlength="7"
                            placeholder="לדוגמה: 1234567" />

                        <span class="search-icon">
                            🔎
                        </span>
                    </div>

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

<style>
.evacuation-page {
    width: 100%;
    min-height: 100vh;

    direction: rtl;

    padding: 120px 4% 50px;

    background:
        linear-gradient(180deg,
            #fff9f9 0%,
            #ffeaea 45%,
            #ffd4d4 100%);
}


/* MAIN */

.evacuation-content {
    width: 100%;
    max-width: 1400px;

    margin: 0 auto;
}


/* TITLE */

.page-title {
    margin-bottom: 30px;
}

.page-title h1 {
    margin: 0;

    font-size: 40px;
    font-weight: 700;

    color: #1d1d1d;
}

.page-title p {
    margin: 6px 0 0;

    font-size: 19px;

    color: #777;
}


/* MAIN CARD */

.evacuation-card {
    width: 100%;

    display: grid;

    grid-template-columns: 1fr 1fr;

    gap: 25px;

    padding: 35px;

    border-radius: 18px;

    background: rgba(255, 193, 193, 0.45);

    box-shadow:
        0 10px 30px rgba(0, 0, 0, 0.07);
}


/* PERSONAL NUMBER */

.personal-section {
    grid-column: 1 / -1;

    width: 100%;
}

.personal-section label {
    display: block;

    margin-bottom: 8px;

    font-size: 18px;
    font-weight: 600;
}

.personal-input-wrapper {
    position: relative;

    width: 100%;
}

.personal-input-wrapper input {
    width: 100%;
    height: 58px;

    padding: 0 20px 0 55px;

    border: none;
    border-bottom: 2px solid #222;

    border-radius: 10px 10px 0 0;

    outline: none;

    background: rgba(255, 255, 255, 0.75);

    font-size: 22px;

    text-align: right;
}

.search-icon {
    position: absolute;

    left: 18px;
    top: 50%;

    transform: translateY(-50%);

    font-size: 22px;
}


/* SOLDIER */

.soldier-section {
    grid-column: 1 / -1;

    padding: 25px;

    border-radius: 12px;

    background: rgba(255, 255, 255, 0.58);
}

.soldier-title {
    display: flex;
    align-items: center;

    gap: 15px;

    margin-bottom: 20px;
}

.soldier-avatar {
    width: 65px;
    height: 65px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 50%;

    background: #ffe0e0;

    font-size: 32px;
}

.soldier-title h2 {
    margin: 0;

    font-size: 27px;
}

.soldier-details {
    display: grid;

    grid-template-columns:
        repeat(4, 1fr);

    gap: 15px;
}

.soldier-field {
    display: flex;
    flex-direction: column;

    gap: 6px;

    padding: 18px;

    border-radius: 10px;

    background: #fff;
}

.soldier-field span {
    color: #777;

    font-size: 15px;
}

.soldier-field strong {
    font-size: 20px;

    color: #222;
}

.not-found {
    grid-column: 1 / -1;

    padding: 15px 20px;

    border-radius: 8px;

    background: rgba(173, 23, 70, 0.08);

    color: #ad1746;

    font-size: 17px;
}


/* EVENT */

.event-section {
    grid-column: 1 / -1;

    display: grid;

    grid-template-columns: 1fr 1fr;

    gap: 25px;
}

.field-group {
    display: flex;
    flex-direction: column;

    gap: 8px;
}

.field-group label {
    font-size: 18px;
    font-weight: 600;
}

.field-group select {
    width: 100%;
    height: 55px;

    padding: 0 16px;

    border: none;
    border-radius: 9px;

    outline: none;

    background: white;

    font-size: 18px;
}

.notes-field textarea {
    width: 100%;
    height: 130px;

    padding: 15px;

    resize: vertical;

    border: none;
    border-radius: 9px;

    outline: none;

    background: white;

    font-size: 17px;

    font-family: inherit;
}


/* SEVERITY */

.severity-section {
    grid-column: 1 / -1;
}

.severity-section h3 {
    margin: 0 0 12px;

    font-size: 19px;
}

.severity-bar {
    width: 100%;

    display: grid;

    grid-template-columns:
        repeat(3, 1fr);

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
    height: 55px;

    border: none;

    background: transparent;

    color: #252525;

    font-size: 19px;
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

    gap: 10px;

    margin-top: 10px;
}

.continue-section p {
    margin: 0;

    color: #777;

    font-size: 15px;
}

.continue-button {
    min-width: 300px;
    height: 58px;

    padding: 0 25px;

    border: none;
    border-radius: 9px;

    background: #ad1746;

    color: white;

    font-size: 20px;
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

@media (max-width: 900px) {

    .evacuation-card {
        grid-template-columns: 1fr;
    }

    .event-section {
        grid-template-columns: 1fr;
    }

    .soldier-details {
        grid-template-columns:
            repeat(2, 1fr);
    }

}


@media (max-width: 550px) {

    .evacuation-page {
        padding:
            110px 18px 30px;
    }

    .evacuation-card {
        padding: 20px;
    }

    .soldier-details {
        grid-template-columns: 1fr;
    }

    .severity-bar {
        grid-template-columns: 1fr;
        border-radius: 12px;
    }

    .continue-button {
        width: 100%;
        min-width: 0;
    }

}
</style>

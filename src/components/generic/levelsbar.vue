<script setup lang="ts">
interface Level {
    name: string
    color: string
}

defineProps<{
    levels: Level[]
}>()

const model = defineModel<string>()
</script>

<template>
    <div class="levels-bar">
        <button v-for="level in levels" :key="level.name" type="button" class="level-option"
            :class="{ selected: model === level.name }" :style="{ backgroundColor: level.color }"
            :aria-pressed="model === level.name" @click="model = level.name">
            {{ level.name }}
        </button>
    </div>
</template>

<style scoped>
.levels-bar {
    width: 100%;
    display: flex;
    overflow: hidden;
    border: 2px solid #ad1746;
    border-radius: 999px;
    background: #f7c1d1;
    box-shadow: 0 8px 20px rgba(173, 23, 70, 0.12);
}

.level-option {
    position: relative;
    flex: 1 1 0;
    min-width: 0;
    min-height: clamp(3rem, 6vw, 3.4375rem);
    padding: 0 clamp(0.5rem, 2vw, 1rem);
    border: none;
    border-inline-start: 1px solid rgba(255, 255, 255, 0.35);
    color: #35151f;
    font-size: clamp(0.875rem, 2vw, 1.1875rem);
    font-weight: 700;
    cursor: pointer;
    transition: filter 0.15s ease, box-shadow 0.15s ease, color 0.15s ease;
}

.level-option:first-child {
    border-inline-start: 0;
}

.level-option:hover:not(.selected) {
    filter: brightness(1.06);
}

.level-option.selected {
    z-index: 1;
    box-shadow: inset 0 0 0 3px #fff, inset 0 0 0 5px #ad1746;
    color: #211016;
    filter: brightness(1.08);
}

.level-option:first-child.selected {
    border-start-start-radius: 999px;
    border-end-start-radius: 999px;
}

.level-option:last-child.selected {
    border-start-end-radius: 999px;
    border-end-end-radius: 999px;
}
</style>

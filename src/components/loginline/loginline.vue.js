const props = defineProps();
const emit = defineEmits();
function updateValue(event) {
    const target = event.target;
    emit('update:modelValue', target.value);
}
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "login-line" },
});
/** @type {__VLS_StyleScopedClasses['login-line']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "login-label" },
});
/** @type {__VLS_StyleScopedClasses['login-label']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.text);
__VLS_asFunctionalElement1(__VLS_intrinsics.img)({
    src: (__VLS_ctx.icon),
    ...{ style: ({
            width: `${__VLS_ctx.iconSize || 16}px`,
            height: `${__VLS_ctx.iconSize || 16}px`
        }) },
});
__VLS_asFunctionalElement1(__VLS_intrinsics.input)({
    ...{ onInput: (__VLS_ctx.updateValue) },
    value: (props.modelValue),
    type: (props.type || 'text'),
});
// @ts-ignore
[text, icon, iconSize, iconSize, updateValue,];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};

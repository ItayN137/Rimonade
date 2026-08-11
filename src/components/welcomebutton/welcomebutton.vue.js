const __VLS_props = defineProps();
const __VLS_emit = defineEmits();
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (...[$event]) => {
            return (__VLS_ctx.$emit('click'));
            // @ts-ignore
            [$emit,];
        } },
    ...{ class: "welcome-button" },
});
/** @type {__VLS_StyleScopedClasses['welcome-button']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.text);
__VLS_asFunctionalElement1(__VLS_intrinsics.img)({
    src: (__VLS_ctx.icon),
    ...{ style: ({
            width: `${__VLS_ctx.iconSize || 48}px`,
            height: `${__VLS_ctx.iconSize || 48}px`
        }) },
    alt: "",
});
// @ts-ignore
[text, icon, iconSize, iconSize,];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};

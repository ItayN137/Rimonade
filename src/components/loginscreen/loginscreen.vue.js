import { ref } from 'vue';
import LoginLine from '../loginline/loginline.vue';
import logoIcon from '../../assets/logo.svg';
import userIcon from '../../assets/user.svg';
import keyIcon from '../../assets/key.svg';
const props = defineProps();
const emit = defineEmits(['login-success']);
const username = ref('');
const password = ref('');
const errorMessage = ref('');
function login() {
    const enteredUsername = username.value.trim();
    if (enteredUsername === props.validUsername &&
        password.value === props.validPassword) {
        errorMessage.value = '';
        emit('login-success', enteredUsername);
    }
    else {
        errorMessage.value = 'שם משתמש או סיסמה שגויים';
    }
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
    ...{ class: "login-page" },
});
/** @type {__VLS_StyleScopedClasses['login-page']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.header, __VLS_intrinsics.header)({
    ...{ class: "login-header" },
});
/** @type {__VLS_StyleScopedClasses['login-header']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "logo" },
});
/** @type {__VLS_StyleScopedClasses['logo']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.img)({
    src: (__VLS_ctx.logoIcon),
    alt: "RimonAde",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.main, __VLS_intrinsics.main)({
    ...{ class: "login-main" },
});
/** @type {__VLS_StyleScopedClasses['login-main']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({
    ...{ class: "login-title" },
});
/** @type {__VLS_StyleScopedClasses['login-title']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "login-card" },
});
/** @type {__VLS_StyleScopedClasses['login-card']} */ ;
const __VLS_0 = LoginLine;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    modelValue: (__VLS_ctx.username),
    text: "שם משתמש",
    icon: (__VLS_ctx.userIcon),
    iconSize: (40),
}));
const __VLS_2 = __VLS_1({
    modelValue: (__VLS_ctx.username),
    text: "שם משתמש",
    icon: (__VLS_ctx.userIcon),
    iconSize: (40),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const __VLS_5 = LoginLine;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent1(__VLS_5, new __VLS_5({
    modelValue: (__VLS_ctx.password),
    text: "סיסמה",
    icon: (__VLS_ctx.keyIcon),
    iconSize: (40),
    type: "password",
}));
const __VLS_7 = __VLS_6({
    modelValue: (__VLS_ctx.password),
    text: "סיסמה",
    icon: (__VLS_ctx.keyIcon),
    iconSize: (40),
    type: "password",
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
if (__VLS_ctx.errorMessage) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "error-message" },
    });
    /** @type {__VLS_StyleScopedClasses['error-message']} */ ;
    (__VLS_ctx.errorMessage);
}
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (__VLS_ctx.login) },
    ...{ class: "login-button" },
    type: "button",
});
/** @type {__VLS_StyleScopedClasses['login-button']} */ ;
// @ts-ignore
[logoIcon, username, userIcon, password, keyIcon, errorMessage, errorMessage, login,];
const __VLS_export = (await import('vue')).defineComponent({
    emits: {},
    __typeProps: {},
});
export default {};

import { useRouter } from 'vue-router';
import homeIcon from '../../assets/home.svg';
import logoIcon from '../../assets/logo.svg';
import auth from '../../auth/auth';
const { currentUser, isLoggedIn, logoutUser } = auth;
const router = useRouter();
function goHome() {
    router.push('/home');
}
function logout() {
    logoutUser();
    router.push('/login');
}
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.header, __VLS_intrinsics.header)({
    ...{ class: "navbar" },
});
/** @type {__VLS_StyleScopedClasses['navbar']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (__VLS_ctx.goHome) },
    ...{ class: "home-button" },
});
/** @type {__VLS_StyleScopedClasses['home-button']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.img)({
    src: (__VLS_ctx.homeIcon),
    alt: "Home",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "navbar-left" },
});
/** @type {__VLS_StyleScopedClasses['navbar-left']} */ ;
if (__VLS_ctx.isLoggedIn) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "user-area" },
    });
    /** @type {__VLS_StyleScopedClasses['user-area']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    (__VLS_ctx.currentUser);
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.logout) },
        ...{ class: "logout-button" },
    });
    /** @type {__VLS_StyleScopedClasses['logout-button']} */ ;
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "brand" },
});
/** @type {__VLS_StyleScopedClasses['brand']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.img)({
    src: (__VLS_ctx.logoIcon),
    alt: "RimonAde",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
// @ts-ignore
[goHome, homeIcon, isLoggedIn, currentUser, logout, logoIcon,];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};

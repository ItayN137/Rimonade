import WelcomeButton from '../welcomebutton/welcomebutton.vue';
import registerIcon from '../../assets/user.svg';
import approveIcon from '../../assets/key.svg';
import historyIcon from '../../assets/logo.svg';
const username = sessionStorage.getItem('username') || 'User';
const actions = [
    {
        id: 'register',
        text: 'רישום פינוי',
        icon: registerIcon
    },
    {
        id: 'approve',
        text: 'אשר הגעת פינוי',
        icon: approveIcon
    },
    {
        id: 'history',
        text: 'ההיסטוריה שלי',
        icon: historyIcon
    }
];
function actionClicked(action) {
    console.log('clicked:', action);
}
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "welcome-page" },
});
/** @type {__VLS_StyleScopedClasses['welcome-page']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "hello-user" },
});
/** @type {__VLS_StyleScopedClasses['hello-user']} */ ;
(__VLS_ctx.username);
__VLS_asFunctionalElement1(__VLS_intrinsics.main, __VLS_intrinsics.main)({
    ...{ class: "welcome-main" },
});
/** @type {__VLS_StyleScopedClasses['welcome-main']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({
    ...{ class: "welcome-title" },
});
/** @type {__VLS_StyleScopedClasses['welcome-title']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "actions-container" },
});
/** @type {__VLS_StyleScopedClasses['actions-container']} */ ;
for (const [action] of __VLS_vFor((__VLS_ctx.actions))) {
    const __VLS_0 = WelcomeButton;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
        ...{ 'onClick': {} },
        key: (action.id),
        text: (action.text),
        icon: (action.icon),
        iconSize: (40),
    }));
    const __VLS_2 = __VLS_1({
        ...{ 'onClick': {} },
        key: (action.id),
        text: (action.text),
        icon: (action.icon),
        iconSize: (40),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    let __VLS_5;
    const __VLS_6 = {
        /** @type {typeof __VLS_5.click} */
        onClick: (...[$event]) => {
            return (__VLS_ctx.actionClicked(action.id));
            // @ts-ignore
            [username, actions, actionClicked,];
        },
    };
    var __VLS_3;
    var __VLS_4;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};

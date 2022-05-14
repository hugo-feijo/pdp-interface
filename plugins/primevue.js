import { defineNuxtPlugin } from "#app";
import PrimeVue from "primevue/config";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Toast from "primevue/toast";
import Carousel from "primevue/carousel";
import Avatar from 'primevue/avatar';
import AvatarGroup from 'primevue/avatargroup';
import ToastService from 'primevue/toastservice';
import StyleClass from 'primevue/styleclass';
import InputMask from 'primevue/inputmask';
import Skeleton from 'primevue/skeleton';


export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(PrimeVue, {ripple: true});
    nuxtApp.vueApp.use(ToastService);
    nuxtApp.vueApp.component('Button', Button);
    nuxtApp.vueApp.component('InputText', InputText);
    nuxtApp.vueApp.component('InputMask', InputMask);
    nuxtApp.vueApp.component('Toast', Toast);
    nuxtApp.vueApp.component('Carousel', Carousel);
    nuxtApp.vueApp.component('Avatar', Avatar);
    nuxtApp.vueApp.component('AvatarGroup', AvatarGroup);
    nuxtApp.vueApp.component('Skeleton', Skeleton);
    nuxtApp.vueApp.directive('styleclass', StyleClass);
});
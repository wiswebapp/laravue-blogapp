/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'
import AppRoutes from './AppRoutes'
import Vuelidate from 'vuelidate'

window.Vue = require('vue');

const router = new VueRouter({
    routes: AppRoutes,
    mode:'hash'
})

Vue.use(VueRouter)
Vue.use(Vuelidate)
Vue.use(VueAxios, axios)
/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('header-bar', require('./components/includes/HeaderBar.vue').default);

//Creating Filer
Vue.filter('to-uppercase',function (value){
    return value.toUpperCase(); 
});
Vue.filter('to-lowercase',function (value){
    return value.toLowerCase(); 
});
Vue.filter('shrinkBody',function (value, length){
    var string = value;
    if(value.length > length){
        string = value.slice(0,length/2) + '.....';
    }
    return string;
});

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
const app = new Vue({
    el: '#app',
    router:router
});
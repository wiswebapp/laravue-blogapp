/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'
import AppRoutes from './appRoutes'
import Vuelidate from 'vuelidate'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import moment from 'moment'

window.Vue = require('vue');

const router = new VueRouter({
    routes: AppRoutes,
    mode:'hash'
})
const swaloptions = {
    confirmButtonColor: '#2f8912',
    cancelButtonColor: '#ff0039',
};

Vue.use(moment)
Vue.use(VueRouter)
Vue.use(Vuelidate)
Vue.use(VueAxios, axios)
Vue.use(VueSweetalert2,swaloptions)
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
Vue.filter('formatDate', function(value, customFormat) {
    if (value) {
      return moment(String(value)).format( (customFormat != '') ? customFormat : 'DD/MM/YYYY hh:mm' )
    }
})
Vue.filter('shrinkBody',function (value, length){
    var string = value;
    if(value.length > length){
        string = value.slice(0,length/2) + '.....';
    }
    return string;
});

const app = new Vue({
    el: '#app',
    router:router
});
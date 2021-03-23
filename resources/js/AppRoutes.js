import blogList from './components/BlogList.vue';
import blogView from './components/BlogView.vue';
import blogCreate from './components/BlogCreate.vue';
import blogEdit from './components/BlogEdit.vue';

export default[
    { path: '/', component: blogList },
    { path: '/blog/view/:id', component: blogView },
    { path: '/blog/create', component: blogCreate },
    { path: '/blog/edit/:id', component: blogEdit },
]
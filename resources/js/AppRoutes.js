import blogList from './components/blog/BlogList.vue';
import blogView from './components/blog/BlogView.vue';
import blogCreate from './components/blog/BlogCreate.vue';
import blogEdit from './components/blog/BlogEdit.vue';

export default[
    { path: '/', component: blogList },
    { path: '/blog/view/:id', component: blogView },
    { path: '/blog/create', component: blogCreate },
    { path: '/blog/edit/:id', component: blogEdit },
]
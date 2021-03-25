<template>
    <div>
        <header-bar pageTitle="Blog"></header-bar>
        <div class="container">
            <h1>Blog List
                <router-link v-bind:to="'blog/create'">
                <button class="pull-right btn btn-sm btn-default">Add Blog</button>
                </router-link>
            </h1>
            <hr>
            <div class="alert alert-dismissible alert-success" v-if="showalert">
                <router-link v-bind:to="'/'">
                <button type="button" class="close" data-dismiss="alert">&times;</button>
                </router-link>
                <h4>Data Updated Successfully !</h4>
            </div>
            <table class="table table-striped table-hover ">
                <thead>
                    <tr>
                        <th align="left" colspan="4">
                            <input v-model="searchQ" style="float:right" type="text" placeholder="Search here(min:3 keyword).." v-on:input="filteredBlog" >
                        </th>
                    </tr>
                    <tr>
                        <th>#</th>
                        <th>Blog Title</th>
                        <th>Blog Content</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(blog, counter) in blogData" v-bind:key="blog.id">
                        <td>{{counter+1}}</td>
                        <td>{{blog.title | shrinkBody(120)}}</td>
                        <td>{{blog.body | shrinkBody(400)}}</td>
                        <td style="width:15%">
                            <router-link v-bind:to="'blog/view/' + blog.id">
                                <button class="btn btn-sm btn-success">View</button>
                            </router-link>
                            <router-link v-bind:to="'blog/edit/' + blog.id">
                                <button class="btn btn-sm btn-warning">Edit</button>
                            </router-link>
                            <button @click="deleteBlog(blog.id)" class="btn btn-sm btn-danger">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <hr>
            <div>
                <p class="text-danger" style="float:left">Showing Result From {{from}} - {{to}} out of {{total}}</p>
                <div style="float:right">
                    <div>
                        <ul class="pagination">
                            <li @click="fetchBlogs(prevUrl)" v-bind:class="{ disabled: !prevUrl }" class="page-item">
                                <a class="page-link" href="#">&laquo;</a>
                            </li>
                            <li @click="fetchBlogs(nextUrl)" v-bind:class="{ disabled: !nextUrl }" class="page-item">
                                <a class="page-link" href="#">&raquo;</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import commonFunc from '../../mixins/CommonFunc'

export default {
    data: function(){
        return {
            blogData : [],
            searchQ: '',            
            showalert: this.$route.query.sucess,
        }
    },
    methods: {
        filteredBlog: function(){
            var dataSearch = "";
            if(this.searchQ && this.searchQ.length >= 3){
                var pageUrl = '/api/search?title=' + this.searchQ;
                this.fetchBlogs(pageUrl);
            }else{
                return this.fetchBlogs(this.page_url);
            }
        }
    },
    created() {
        this.fetchBlogs(this.page_url);
        this.hidealert()
    },
    mixins: [commonFunc],
}
</script>
<template>
    <div>
        <header-bar pageTitle="Blog"></header-bar>
        <div class="container">
            <h3>Blog List
                <router-link v-bind:to="'blog/create'">
                <button class="pull-right btn btn-sm btn-default">Add Blog</button>
                </router-link>
            </h3>
            <hr>
            <div class="alert alert-dismissible alert-success" v-if="showalert === 'true'">
                <router-link v-bind:to="'/'">
                <button type="button" class="close" data-dismiss="alert">&times;</button>
                </router-link>
                <h4>Data Updated Successfully !</h4>
            </div>
            <table class="table table-striped table-hover ">
                <thead>
                    <tr>
                        <th align="left" colspan="4">
                            <input v-model="searchQ" style="float:right" type="text" placeholder="Search here..">
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
                    <tr v-for="(blog, counter) in filteredBlog" v-bind:key="blog.id">
                        <td>{{counter+1}}</td>
                        <td>{{blog.title | shrinkBody(120)}}</td>
                        <td>{{blog.body | shrinkBody(400)}}</td>
                        <td style="width:10%">
                            <router-link v-bind:to="'blog/view/' + blog.id">
                                <button class="btn btn-sm btn-success">View</button>
                            </router-link>
                            <router-link v-bind:to="'blog/edit/' + blog.id">
                                <button class="btn btn-sm btn-warning">Edit</button>
                            </router-link>
                        </td>
                    </tr>
                </tbody>
            </table>
            <hr>
            <div>
                <p class="text-danger" style="float:left">Showing Result From {{from}} - {{to}} out of {{total}}</p>
                <div style="float:right">
                    <button v-bind:class="{ disabled: !prevUrl }" class="btn btn-info" @click="fetchBlogs(prevUrl)">Prev</button>
                <button v-bind:class="{ disabled: !nextUrl }" class="btn btn-info" @click="fetchBlogs(nextUrl)">Next</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data: function(){
        return {
            blogData : [],
            searchQ: '',
            showalert: this.$route.query.sucess,
            nextUrl: '',
            prevUrl: '',
            total : '',
            from : '',
            to : '',
        }
    },
    created() {
        this.fetchBlogs();
    },
    methods: {
        fetchBlogs(page_url) {
            var app = this;
            page_url = page_url || '/api/blog/';
            axios.get(page_url)
                .then(function (resp) {
                    app.blogData = resp.data.data
                    app.total = resp.data.total;
                    app.from = resp.data.from;
                    app.to = resp.data.to;
                    app.nextUrl = (resp.data.next_page_url === null) ? '' : resp.data.next_page_url;
                    app.prevUrl = (resp.data.prev_page_url === null) ? '' : resp.data.prev_page_url;
                })
                .catch(function (resp) {
                    console.log(resp);
                    alert("Whoops ! Some Error Has been encoutered");
                });
        }
    },
    computed:{
        filteredBlog: function(){
            return this.blogData.filter((blog) => {
                return blog.title.toLowerCase().match(this.searchQ.toLowerCase());
            })
        }
    }
}
</script>
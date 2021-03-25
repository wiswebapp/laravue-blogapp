<template>
    <div>
        <header-bar pageTitle="Edit Blog"></header-bar>
        <div class="container">
            <h1>Edit Blog
                <a class="pull-right btn btn-sm btn-info" @click="$router.go(-1)">Cancel</a>
            </h1>
            <hr>
            <div v-if="isError" class="alert alert-danger">
                <strong>Please Solve Following Errors</strong>
                <p v-for="value in errors" :key="value">
                    <span v-if="value !== ''">- {{value}}</span>
                </p>
            </div>
            <form v-on:submit.prevent="saveForm()">
                <div class="form-group">
                    <label>Select User</label>
                    <select v-model="blog.user_id" class="form-control" required>
                        <option v-for="(user,iteration) in usersArr" :key="iteration" :value="user.id">{{user.name}}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Blog Title</label>
                    <input type="text" v-model="blog.title" name="title" class="form-control" placeholder="Enter Blog Title.">
                    <small class="text-danger">{{errors.title}}</small>
                </div>
                <div class="form-group">
                    <label>Blog Description</label>
                    <textarea class="form-control" v-model="blog.body" name="body" cols="30" rows="10" placeholder="Enter Blog Description"></textarea>
                    <small class="text-danger">{{errors.body}}</small>
                </div>
                <div class="form-group">
                    <button type="submit" class="btn btn-success">Submit</button>
                    <a class="btn btn-info" @click="$router.go(-1)">Cancel</a>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import commonFunc from '../../mixins/CommonFunc'

export default {
    data: function(){
        return {
            blogId : this.$route.params.id,
            blog: {
                title: '',
                body: '',
                user_id : ''
            },
            isError :false,
            errors: {
                title: '',
                body: '',
            }
        }
    },
    methods: {
        saveForm() {
            var app = this;
            var blog = app.blog;
            axios.put('/api/blog/'+app.blogId, blog)
                .then(function (resp) {
                    app.isError = false;
                    app.$router.push({path: '/?sucess=true'});
                })
                .catch(function (resp) {
                    app.isError = true;
                    var errorData = resp.response.data.errors;
                    app.errors.title = (errorData.title) ? errorData.title[0] : '';
                    app.errors.body = (errorData.body) ? errorData.body[0] : '';
                });
        },
    },
    mounted(){
        this.fetchUsers();//Fetches User
        var app = this;
        axios.get('/api/blog/' + app.blogId)
        .then(function(resp){
            app.blog.title = resp.data.blog.title,
            app.blog.body = resp.data.blog.body
            app.blog.user_id = resp.data.blog.user_id
        })
        .catch(function (resp) {
            alert("Whoops ! Some Error Encounter");
        });
    },
    mixins: [commonFunc],
}
</script>
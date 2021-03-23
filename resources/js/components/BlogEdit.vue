<template>
    <div>
        <header-bar pageTitle="Edit Blog"></header-bar>
        <div class="container">
            <h3>Edit Blog
                <a class="pull-right btn btn-sm btn-info" @click="$router.go(-1)">Cancel</a>
            </h3>
            <hr>
            <div v-if="isError" class="alert alert-danger">
                <strong>Please Solve Following Errors</strong>
                <li v-for="(value, name) in errors" v-if="value !== ''">
                    {{value}}
                </li>
            </div>
            <form v-on:submit.prevent="saveForm()">
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
export default {
    data: function(){
        return {
            blogId : this.$route.params.id,
            blog: {
                title: '',
                body: '',
            },
            isError :false,
            errors: {
                title: '',
                body: '',
            }
        }
    },
    mounted(){
        var app = this;
        axios.get('/api/blog/' + app.blogId)
        .then(function(resp){
            app.blog.title = resp.data.title,
            app.blog.body = resp.data.body
        })
        .catch(function (resp) {
            alert("Whoops ! Some Error Encounter");
        });
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
        }
    }
}
</script>
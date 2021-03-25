<template>
    <div>
        <header-bar pageTitle="Create Blog"></header-bar>
        <div class="container">
            <h1>Create Blog
                <a class="pull-right btn btn-sm btn-info" @click="$router.go(-1)">Cancel</a>
            </h1>
            <hr>
            <div v-if="isError" class="alert alert-danger">
                <strong>Please Solve Following Errors</strong>
                <p v-for="value in errors" :key="value">
                    <span v-if="value !== ''">- {{value}}</span>
                </p>
            </div>
            <div v-if="submitStatus === 'ERROR'" class="alert alert-danger">
                <p>Please fill the form correctly.</p>
            </div>
            <form v-on:submit.prevent="saveForm()">
                <div class="form-group">
                    <label>Select User</label>
                    <select v-model="blog.user_id" class="form-control">
                        <option v-for="(user,iteration) in usersArr" :key="iteration" :value="user.id">{{user.name}}</option>
                    </select>
                    <small class="text-danger" v-if="!$v.blog.user_id.required">*required</small>
                </div>
                <div class="form-group">
                    <label>Blog Title</label>
                    <input type="text" v-model="blog.title" name="title" class="form-control" placeholder="Enter Blog Title.">
                    <small class="text-danger" v-if="!$v.blog.title.required">*required</small>
                    <small class="text-danger" v-if="!$v.blog.title.minLength">*min length:{{$v.blog.title.$params.minLength.min}}</small>
                    <small class="text-danger" v-if="!$v.blog.title.maxLength">*Max length:{{$v.blog.title.$params.maxLength.max}}</small>
                    <small class="text-danger">{{errors.title}}</small>
                </div>
                <div class="form-group">
                    <label>Blog Description</label>
                    <textarea class="form-control" v-model="blog.body" name="body" cols="30" rows="10" placeholder="Enter Blog Description"></textarea>
                    <small class="text-danger">{{errors.body}}</small>
                    <small class="text-danger" v-if="!$v.blog.body.required">*required</small>
                    <small class="text-danger" v-if="!$v.blog.body.minLength">*min length:{{$v.blog.body.$params.minLength.min}}</small>
                    <small class="text-danger" v-if="!$v.blog.body.maxLength">*max length:{{$v.blog.body.$params.maxLength.max}}</small>
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
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import commonFunc from '../../mixins/CommonFunc'

export default {
    data: function(){
        return {
            blog: {
                title: '',
                body: '',
                user_id: ''
            },
            isError : false,
            errors: {
                title: '',
                body: '',
                user_id: '',
            },
            submitStatus : false
        }
    },
    validations: {
        blog:{
            user_id: { required },
            title: {
                required,
                minLength: minLength(10),
                maxLength: maxLength(40)
            },
            body: {
                required,
                minLength: minLength(20),
                maxLength: maxLength(5000)
            }
        }
    },
    methods: {
        saveForm() {
            var app = this;
            var blog = app.blog;
            this.$v.$touch()
            if (this.$v.$invalid) {
                this.submitStatus = 'ERROR'
            } else {
                axios.post('/api/blog', blog)
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
    },
    created() {
        this.fetchUsers();//Fetches User
    },
    mixins: [commonFunc],
}
</script>
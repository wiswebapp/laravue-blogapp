<template>
    <div class="container">
        <h1>Testing</h1>
        <div v-if="submitStatus === 'ERROR'" class="alert alert-danger">
            <p>Please fill the form correctly.</p>
        </div>
        <form @submit.prevent="submit">
            <div class="form-group" :class="{ 'form-group has-error': $v.blog.title.$error }">
                <label class="control-label">Title</label>
                <input class="form-control" v-model.trim="$v.blog.title.$model"/>
                <small class="text-danger" v-if="!$v.blog.title.required">*required</small>
                <small class="text-danger" v-if="!$v.blog.title.minLength">*min length:{{$v.blog.title.$params.minLength.min}}</small>
                <small class="text-danger" v-if="!$v.blog.title.maxLength">*max length:{{$v.blog.title.$params.maxLength.max}}</small>
            </div>
            <button class="button" type="submit" :disabled="submitStatus === 'PENDING'">Submit!</button>
            <p v-if="submitStatus === 'OK'">Thanks for your submission!</p>
            <p v-if="submitStatus === 'PENDING'">Sending...</p>
        </form>
    </div>
</template>
<script>
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
export default {
    data() {
        return {
            blog:{
                title: '',
            },
            submitStatus: null
        }
    },
    validations: {
        blog:{
            title: {
                required,
                minLength: minLength(4),
                maxLength: maxLength(8)
            }
        }
    },
    watch:{
        title(value){
            setTimeout(() => {
                this.submitStatus = null
            },500)            
        }
    },
    methods: {
        submit() {
            console.log('submit!')
            this.$v.$touch()
            if (this.$v.$invalid) {
                this.submitStatus = 'ERROR'
            } else {
                // do your submit logic here
                this.submitStatus = 'PENDING'
                setTimeout(() => {
                    this.submitStatus = 'OK'
                }, 5000)
            }
        }
    }
}
</script>
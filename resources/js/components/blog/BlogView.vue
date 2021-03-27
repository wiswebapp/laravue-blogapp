<template>
    <div>
        <header-bar pageTitle="View Blog"></header-bar>
        <div class="container">
            <div class="alert alert-dismissible alert-warning">
                <button type="button" class="close" data-dismiss="alert">&times;</button>
                <h4 class="alert-heading">Updated On {{blogData.updated_at | formatDate('DD-MM-YYYY (hh:mm a)')}}</h4>
                
            </div>
            <h1>{{blogData.title | to-uppercase}}</h1>
            <hr>
            <div>
                {{blogData.body}}
                <div class="clearfix"></div>
                <h4><i>- Written By {{blogData.user.name}} on {{blogData.created_at | formatDate('DD-MM-YYYY (hh:mm a)')}}</i></h4>
            </div>
            <hr>
            <a class="btn btn-sm btn-info" @click="$router.go(-1)">Back to Home</a>
        </div>
    </div>
</template>
<script>
export default {
    data: function(){
        return {
            blogId : this.$route.params.id,
            blogData : []
        }
    },
    mounted() {
        var app = this;
        axios.get('/api/blog/' + app.blogId)
            .then(function (resp) {
                app.blogData = resp.data.blog
            })
            .catch(function (resp) {
                alert("Whoops ! Some Error Has been encoutered");
            });
    }
}
</script>
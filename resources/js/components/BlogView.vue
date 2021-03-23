<template>
    <div>
        <header-bar pageTitle="View Blog"></header-bar>
        <div class="container">
            <div class="alert alert-dismissible alert-warning">
                <button type="button" class="close" data-dismiss="alert">&times;</button>
                <h4 class="alert-heading">Updated On {{blogData.updated_at}}</h4>
            </div>
            <h3>{{blogData.title | to-uppercase}}</h3>
            <hr>
            <div>
                {{blogData.body}}
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
                app.blogData = resp.data
            })
            .catch(function (resp) {
                console.log(resp);
                alert("Whoops ! Some Error Has been encoutered");
            });
    }
}
</script>
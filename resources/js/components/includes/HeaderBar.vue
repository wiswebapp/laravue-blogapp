<template>
    <div class="container-fluide">
        <nav class="navbar navbar-inverse">
            <div class="container-fluid">
                <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-2">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#">LaraVue App</a>
                </div>

                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-2">
                <ul class="nav navbar-nav">
                    <li>
                        <router-link v-bind:to="'/'">Home</router-link>
                    </li>
                </ul>
                <!-- <ul class="nav navbar-nav navbar-right">
                    <li><a href="#">Link</a></li>
                </ul> -->
                </div>
            </div>
        </nav>
        <div class="container">
            <p>Home > {{pageTitle}}</p>
        </div>
    </div>
</template>
<script>
export default {
    data: function(){
        return {
            
        }
    },
    props:['pageTitle'],
}
</script>
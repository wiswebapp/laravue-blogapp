export default {
    data: (() => {
        return {
            page_url : '/api/blog/',
            nextUrl: '',
            prevUrl: '',
            total : '',
            from : '',
            to : '',
        }
    }),
    methods: {
        hidealert(){
            setTimeout(() => {
                this.showalert = false
            }, 3000);
        },
        fetchBlogs: function(page_url) {
            var app = this;
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
        },
        deleteBlog(blogId){
            var current = this;
            current.$swal({
                title: 'Are you sure?',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                icon : 'warning',
                timer: 5000,
                timerProgressBar: true,
            })
            .then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`/api/blog/` + blogId)
                    .then(function (resp) {
                        current.fetchBlogs('/api/blog/');
                        current.$swal.fire({
                            title: 'Successfully Deleted',
                            showCancelButton: true,
                            confirmButtonText: 'Undo',
                            cancelButtonText: "Close",
                            icon : 'success',
                            timer: 5000,
                            timerProgressBar: true,
                        })
                        .then((result) => {
                            if (result.isConfirmed) {
                                current.$swal.fire('Blog Has been recovered', 'Actually it\'s not recovered since logic of recovered data is not added yet. you can add and recover data In <code>CommonFunc.js</code>', 'info')
                            }
                        })
                    })
                    .catch(function (resp) {
                        current.$swal.fire('Oops Some Error Occured', '', 'error')
                    })
                }
            })
        }
    },
    computed:{
        //
    }
}
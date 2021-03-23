var blamessage ='Hello World from the mixins';
export default {   
    created() {
        console.log(this.blamessage);
    },
    methods: {
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
    },
    computed:{
        //
    }
}
window.addEventListener("load",function(){
    const vueContainer = new Vue({
        el: '#vueContainer',
        data:{
            usersList: globalUsersList,
            activeChat : 0
        },
        methods:{
            setActiveChat(user){
                this.activeChat = parseInt(user.substring(1)) - 1;
            },
            getTimeHm(date){
                return moment(date).format("HH:mm")
            },

        }
    })
});
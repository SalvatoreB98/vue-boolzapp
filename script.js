window.addEventListener("load",function(){
    const vueContainer = new Vue({
        el: '#vueContainer',
        data:{
            usersList: globalUsersList,
            activeChat : 0,
            isChatOpen: false
        },
        methods:{
            setActiveChat(id){
                this.activeChat = id;
            },
            getTimeHm(date){
                return moment(date).format("HH:mm")
            },
            chatOpen(){
                this.isChatOpen = true;
            },
            chatClose(){
                this.isChatOpen = false;
            }
        }
    })
});
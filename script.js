window.addEventListener("load",function(){
    const vueContainer = new Vue({
        el: '#vueContainer',
        data:{
            usersList: globalUsersList,
            activeChat : ''
        },
        methods:{
            setActiveChat(user){
                this.activeChat = user;
            }
        }
    })
});
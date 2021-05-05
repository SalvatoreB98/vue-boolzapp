window.addEventListener("load",function(){
    const vueContainer = new Vue({
        el: '#vueContainer',
        data:{
            usersList: globalUsersList,
            activeChat : 0,
            isChatOpen: false,
            textInput: "",
            date: ''
        },
        computed:{

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
            },
            sendMessage(){
                let date = moment()
               this.usersList[this.activeChat].messages.push({
                                                                date: date, 
                                                                text: this.textInput,  
                                                                status: 'sent'})
            }
        }
    })
});
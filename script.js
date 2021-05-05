window.addEventListener("load", function () {
    const vueContainer = new Vue({
        el: '#vueContainer',
        data: {
            usersList: globalUsersList,
            activeChat: 0,
            isChatOpen: false,
            textInput: "",
            date: '',
            searchInput : ''
        },
        computed: {

        },
        methods: {
            setActiveChat(id) {
                this.activeChat = id;
            },
            getTimeHm(date) {
                return moment(date).format("HH:mm")
            },
            chatOpen() {
                this.isChatOpen = true;
            },
            chatClose() {
                this.isChatOpen = false;
            },
            sendMessage() {
                if(this.textInput!==""){
                    let date = moment()
                this.usersList[this.activeChat].messages.push({
                    date: date,
                    text: this.textInput,
                    status: 'sent'
                });
                this.textInput = '';
                this.serverAnswer();
                }
            },
            serverAnswer() {
                setTimeout(() => {
                    let date = moment()
                    this.usersList[this.activeChat].messages.push({
                        date: date,
                        text: "OK!",
                        status: 'received'
                    });
                }, 1000);

            },
            search(searchInput){
                return this.usersList.filter((element) => element.name.toLowerCase().includes(searchInput.toLowerCase()));
            }
        }
    })
});
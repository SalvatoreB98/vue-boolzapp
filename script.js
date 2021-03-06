window.addEventListener("load", function () {
    const vueContainer = new Vue({
        el: '#vueContainer',
        data: {
            usersList: globalUsersList,
            activeChat: 0,
            isChatOpen: false,
            textInput: "",
            date: '',
            searchInput: '',
            indexMenuOpen: null,
            isMenuOpen: false
        },
        computed: {

        },
        methods: {
            setActiveChat(id) {
                this.activeChat = id;
                this.scroll();
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
                if (this.textInput !== "") {
                    let date = moment()
                    this.usersList[this.activeChat].messages.push({
                        date: date,
                        text: this.textInput,
                        status: 'sent'
                    });
                    this.textInput = '';
                    this.serverAnswer(this.activeChat);
                }
                this.scroll();
            },
            serverAnswer(chatToAnswer) {
                setTimeout(() => {
                    let date = moment()
                    this.usersList[chatToAnswer].messages.push({
                        date: date,
                        text: "OK!",
                        status: 'received'
                    });
                    this.scroll();
                }, 1000);

            },
            search(searchInput) {
                return this.usersList.filter((element) => element.name.toLowerCase().startsWith(searchInput.toLowerCase()));
            },
            clickOption(index) {
                if (this.indexMenuOpen == null) {
                    this.indexMenuOpen = index;
                    setTimeout(() => {
                        this.isMenuOpen = true;
                    }, 100)
                }
                else {
                    this.indexMenuOpen = null;
                    this.isMenuOpen = false;
                }


            },
            reset() {
                if (this.isMenuOpen == true) {
                    this.isMenuOpen = false;
                    this.indexMenuOpen = null;
                }
            },
            remove(index) {
                this.usersList[this.activeChat].messages.splice(index, 1)
                console.log(this.usersList[this.activeChat].messages[index])
            },
            scroll() {
                Vue.nextTick(() => {
                    var containerToScroll = this.$refs.toScroll;
                    containerToScroll.scrollTop = containerToScroll.scrollHeight;
                })
            },
            lastAccess() {
                let filteredReceived = this.usersList[this.activeChat].messages.filter((element) => element.status == 'received')
                if (filteredReceived.length > 0) {
                    let date1 = moment()
                    let date2 = this.usersList[this.activeChat].messages[this.usersList[this.activeChat].messages.length - 1].date
                    let time1 = moment(date1).format('YYYY-MM-DD');
                    let time2 = moment(date2).format('YYYY-MM-DD');
                    if (time1 == time2) {
                        return 'oggi alle ' + this.getTimeHm(filteredReceived[filteredReceived.length - 1].date);
                    } else {
                        console.log(filteredReceived[filteredReceived.length - 1].date)
                        return moment(filteredReceived[filteredReceived.length - 1].date).format('DD/MM/Y');
                    }
                }
                else {
                    return ' ';
                }
            },
            lastMessage(index) {
                if (this.usersList[index].messages.length > 0) {
                    let openedMessages = this.usersList[index].messages;
                    let lastMessage = openedMessages[openedMessages.length - 1];
                    return lastMessage;
                }
                else {
                    return ' ';
                }
            },
            lastMessageText(index) {
                if (this.lastMessage(index).text){
                    if (this.lastMessage(index).text.length > 50) {
                        return this.lastMessage(index).text.substring(0, 50) + "..."
                    } else {
                        return this.lastMessage(index).text;
                    }
            }
                }
                    
        },
        mounted() {
            this.scroll();
        }
    })
});
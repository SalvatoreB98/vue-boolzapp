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
                    this.serverAnswer();
                }
                this.scroll();
            },
            serverAnswer() {
                setTimeout(() => {
                    let date = moment()
                    this.usersList[this.activeChat].messages.push({
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
                setTimeout(() => {
                    var containerToScroll = this.$refs.toScroll;
                    containerToScroll.scrollTop = containerToScroll.scrollHeight;
                }, 100)

            },
            lastAccess(){
                let filteredReceived = this.usersList[this.activeChat].messages.filter((element) => element.status == 'received' )
                return this.getTimeHm(filteredReceived[filteredReceived.length-1].date);
            }
        },
        mounted() {
            this.scroll();
        }
    })
});
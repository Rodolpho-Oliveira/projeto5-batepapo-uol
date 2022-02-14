const baseUrl = "https://mock-api.driven.com.br/api/v4/uol"
const loginName = prompt("Qual seu nome?")

function login(){
    axios.post(`${baseUrl}/participants`, {name: loginName})
}

function keepConnected(){
    axios.post(`${baseUrl}/status`, {name: loginName})
}

login()
setInterval(keepConnected, 5000)

function sendMessage(){
    let message = document.querySelector(".write-message")
    let value = message.value
    let messageSend = axios.post(`${baseUrl}/messages`, 
    {
        from: loginName,
        to: "Todos",
        text: value,
        type: "message"
    })
}

function pressEnter(){
    document.addEventListener("keyup", function(e) {
        if(e.key === 'Enter') {
            let btn = document.querySelector(".submit")  
            btn.click()
        }
    })
}

pressEnter()

function getServerMessage(){
    const serverMessage = axios.get(`${baseUrl}/messages`)
    serverMessage.then(showMessage)
}

function showMessage(serverMessage){
    let serverMessages = serverMessage.data
    let chat = document.querySelector(".chat")
    chat.innerHTML = ""
    for(let i = 0; i < serverMessages.length;i++){
        if(serverMessages[i].type === "status"){
            chat.innerHTML += `<div class="message-box"><p class = "status">(${serverMessages[i].time}) ${serverMessages[i].from} ${serverMessages[i].text}</p></div>`
        }
        else if(serverMessages[i].type === "message"){
            chat.innerHTML += `<div class="message-box"><p class = "message">(${serverMessages[i].time}) ${serverMessages[i].from} para: ${serverMessages[i].to}: ${serverMessages[i].text}</p></div>`
        }
    }
}

getServerMessage()
setInterval(getServerMessage, 3000)
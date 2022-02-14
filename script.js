const baseUrl = "https://mock-api.driven.com.br/api/v4/uol"
let loginName = prompt("Qual seu nome?")

function login(){
    let teste = axios.post(`${baseUrl}/participants`, {name: loginName})
    teste.then(keepConnected)
    teste.catch(errorLogin)
}

function errorLogin(){
    loginName = prompt("Nome em uso! Digite outro:")
    login()
}

function keepConnected(){
    axios.post(`${baseUrl}/status`, {name: loginName})
}

login()
setInterval(keepConnected, 5000)

function sendMessage(){
    let message = document.querySelector(".write-message")
    let value = message.value
    const teste = axios.post(`${baseUrl}/messages`, 
    {
        from: loginName,
        to: "Todos",
        text: value,
        type: "message"
    })
    message.value = ""
    teste.then(getServerMessage)
    teste.catch(leftChat)
}

function leftChat(){
    alert("Usuário desconectado! reiniciando...")
    window.location.reload()
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
    for(let i = 0; i < serverMessages.length ;i++){
        if(serverMessages[i].type === "status"){
            chat.innerHTML += `<div class="message-box"><p class = "status">(${serverMessages[i].time}) ${serverMessages[i].from} ${serverMessages[i].text}</p></div>`
        }
        else if(serverMessages[i].type === "message"){
            chat.innerHTML += `<div class="message-box"><p class = "message">(${serverMessages[i].time}) ${serverMessages[i].from} para ${serverMessages[i].to}: ${serverMessages[i].text}</p></div>`
        }
        else if(serverMessages[i].type === "private_message" && serverMessages[i].to !== "Todos" && serverMessages[i].to === loginName){
            chat.innerHTML += `<div class="message-box"><p class = "private_message">(${serverMessages[i].time}) ${serverMessages[i].from} para ${serverMessages[i].to}: ${serverMessages[i].text}</p></div>`
        }
    }
    chat.scrollIntoView({block: "end", behavior: "smooth", inline: "end"});
}

getServerMessage()
setInterval(getServerMessage, 3000)
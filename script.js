const baseUrl = "https://mock-api.driven.com.br/api/v4/uol"
let loginName

function login(){
    names = document.querySelector(".login-value")
    loginName = names.value
    let teste = axios.post(`${baseUrl}/participants`, {name: loginName})
    teste.then(document.querySelector(".login-input").style.display = "none")
    teste.then(document.querySelector(".loading").style.display = "block")
    teste.catch(errorLogin)
    teste.then(keepConnected)
    teste.then(setInterval(keepConnected, 5000))
    teste.then(pressEnter)
}

function errorLogin(){
    alert("Nome inválido, tente outro!")
    window.location.reload()
}

function keepConnected(){
    document.querySelector(".login-page").style.display = "none"
    document.querySelector("body").style.overflow = "visible"
    axios.post(`${baseUrl}/status`, {name: loginName})
}

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
            chat.innerHTML += `<div class="message-box"><p class = "status">(${serverMessages[i].time}) <strong>${serverMessages[i].from}</strong> ${serverMessages[i].text}</p></div>`
        }
        else if(serverMessages[i].type === "message"){
            chat.innerHTML += `<div class="message-box"><p class = "message">(${serverMessages[i].time}) <strong>${serverMessages[i].from}</strong> para <strong>${serverMessages[i].to}</strong>: ${serverMessages[i].text}</p></div>`
        }
        else if(serverMessages[i].type === "private_message" && serverMessages[i].to !== "Todos" && serverMessages[i].to === loginName){
            chat.innerHTML += `<div class="message-box"><p class = "private_message">(${serverMessages[i].time}) <strong>${serverMessages[i].from}</strong> para <strong>${serverMessages[i].to}</strong>: ${serverMessages[i].text}</p></div>`
        }
    }
    chat.scrollIntoView({block: "end", behavior: "smooth", inline: "end"});
}

getServerMessage()
setInterval(getServerMessage, 3000)
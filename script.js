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

function showValue(){
    let message = document.querySelector(".write-message")
    let value = message.value
}

function getServerMessage(){
    const serverMessage = axios.get(`${baseUrl}/messages`)
    serverMessage.then(showMessage)
}

function showMessage(serverMessage){
    let serverMessages = serverMessage.data
    for(let i = 0; i < serverMessages.length;i++){
        if(serverMessages[i].type === "status"){
            document.querySelector(".chat").innerHTML += `<p>${serverMessages[i].from} ${serverMessages[i].text}</p>`
        }
        else if(serverMessages[i].type === "message"){
            document.querySelector(".chat").innerHTML += `<p>${serverMessages[i].from} para: ${serverMessages[i].to}: ${serverMessages[i].text}</p>`
        }
    }
}

setInterval(getServerMessage, 3000)
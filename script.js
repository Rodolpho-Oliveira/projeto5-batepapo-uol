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


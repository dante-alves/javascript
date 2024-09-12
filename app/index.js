// () => {} é uma arrow function
const start = () => {
    let opcao = "Cadastrar"
    switch (opcao) {
        case "Cadastrar":
            console.log ("Vamos cadastrar!")
            break
        case "Listar":
            console.log ("Vamos listar!")
            break
        case "Sair":
            return
    }
}

start ()
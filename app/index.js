// () => {} é uma arrow function
const { select, input } = require('@inquirer/prompts')

let meta = {
    value: 'Tomar 3L de água por dia',
    checked: false,
}
let metas = [ meta ]

// função de cadastrar metas
const cadastrarMeta = async () => {
    const meta = await input ({message: "Digite a meta:"})

    if (meta.length == 0) {
        console.log ("A meta não pode ser vazia.")
        return
    }
    
    metas.push (
        { value: meta, checked: false }
    )
}
// função que inicia o menu de aplicação
const start = async () => { //async para fazer o await funcionar
    while (true) {
        const opcao = await select ({
            message: "Menu >",
            choices: [
                {
                    name: "Cadastrar meta",
                    value: "Cadastrar"
                },
                {
                    name: "Listar metas",
                    value: "Listar"
                },
                {
                    name: "Sair",
                    value: "Sair"
                }

            ]
        }) 
            
        switch (opcao) {
            case "Cadastrar":
                await cadastrarMeta()
                console.log (metas)
                break
            case "Listar":
                console.log ("Vamos listar!")
                break
            case "Sair":
                console.log ("Até a próxima!")
                return
        }
    }
}

start ()
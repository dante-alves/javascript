// () => {} é uma arrow function
const { select, input, checkbox } = require('@inquirer/prompts')

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

// função de listar metas
const listarMetas = async () => {
    const respostas = await checkbox ({
        message: "Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o Enter para finalizar essa etapa",
        choices: [...metas],
        instructions: false,
    })
    
    metas.forEach((m) => {
        m.checked = false

    if (respostas.length == 0) {
        console.log ("Nenhuma meta selecionada!")
        return
    }

    })

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })
        meta.checked = true
    })

    console.log ('Meta(s) concluída(s)')
}

// função de mostrar metas realizadas 
const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if (realizadas.length == 0) {
        console.log('Não existem metas realizadas por enquanto!')
        return
    }

    await select ({
        message: `Metas Realizadas: ${realizadas.length}`,
        choices: [...realizadas]
    })
}

// função de metas em aberto
const metasAbertas = async () => {
    const abertas = metas.filter((meta) => {
        return !meta.checked
    })

    if (abertas.length == 0) {
        console.log('Não existem metas em aberto, parabéns!')
        return
    }

    await select ({
        message: `Metas em aberto: ${abertas.length}`,
        choices: [...abertas]
    })
}

// função de deletar metas
const deletarMetas = async () => {
    const metasDesmarcadas = metas.map ((meta) => {
        return { value: meta.value, checked: false }
    })
    const itensDeletar = await checkbox ({
        message: "Selecione meta para deletar",
        choices: [...metasDesmarcadas],
        instructions: false,
    })

    if (itensDeletar == 0) {
        console.log("Nenhum item deletado.")
        return
    }

    itensDeletar.forEach((item) => {
        metas = metas.filter((meta) => {
            return meta.value != item
        })
    })

    console.log("Meta(s) deletada(s) com sucesso!")
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
                    name: "Metas Realizadas",
                    value: "Realizadas"
                },
                {
                    name: "Metas em Aberto",
                    value: "Abertas"
                },
                {
                    name: "Deletar Metas",
                    value: "Deletar"
                },
                {
                    name: "Sair",
                    value: "Sair"
                }

            ]
        }) 
        //Seleção de opções     
        switch (opcao) {
            case "Cadastrar":
                await cadastrarMeta()
                console.log (metas)
                break
            case "Listar":
                await listarMetas()
                break
            case "Realizadas":
                await metasRealizadas()
                break
            case "Abertas":
                await metasAbertas()
                break
            case "Deletar":
                await deletarMetas()
                break
            case "Sair":
                console.log ("Até a próxima!")
                return
        }
    }
}

start ()
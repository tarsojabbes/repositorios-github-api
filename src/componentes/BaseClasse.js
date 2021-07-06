import React from 'react'

export default class BaseClasse extends React.Component {
    constructor(props) {

        // Para permitir o uso de props
        super(props)

        // State
        this.state = {
            canal: "CFB Curso",
            curso: "ReactJS",
            ativo: false,
            nome: this.props.nomeAluno
        }

    }

    // Função para manipular state
    ativarDesativar() {
        this.setState(
            (state) => ({ ativo: !state.ativo })
        )
        console.log(this.state.ativo)
    }

    // Métodos de ciclo de vida
    componentDidMount() {
        console.log('O componente foi criado')
    }

    componentDidUpdate() {
        console.log('O componente foi atualizado')
    }

    componentWillUnmount() {
        console.log('O componente foi removido')
    }

    render() {
        return (
            <>
                <h1>Componente de Classe</h1>
                <p>Situação: {this.state.ativo ? "Ativo" : "Desativo"}</p>
                <button onClick={() => this.ativarDesativar()}>{this.state.ativo ? "Desativar" : "Ativar"}</button>
            </>
        )
    }

}
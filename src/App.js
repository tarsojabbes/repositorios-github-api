import React, { useState } from 'react'
import axios from 'axios'

export default function App() {

  const [usuario, setUsuario] = useState('') // Armazena os valores do input Usuário
  const [repositorios, setRepositorios] = useState([])
  const [username, setUsername] = useState('')

  const handlePesquisa = () => {
    axios.get(`https://api.github.com/users/${usuario}/repos`).then(response => { // Faz o request na API sobre os repositórios do Usuário inserido no Input
      const repositories = response.data; // Atribui os dados enviado pela API a uma variável local
      const repositoriesName = [] // Criado para atribuir valores a ele
      repositories.map((repository) => repositoriesName.push(repository.name)) // Para cada nome de repositório dos repositórios da API adicionar o nome em repositoriesName
      localStorage.setItem('repositoriesName', repositoriesName)
      setUsername(usuario)

      if (localStorage.getItem('repositoriesName') !== null) {
        const nomeArray = localStorage.getItem('repositoriesName').split(',')
        setRepositorios(nomeArray)
      }
    }
    );
  }



  return (

    <>


      <div id="landing">
        <div className="wrapper">
          <div className="typing-demo">
            <h1>Repositórios do Github</h1>
          </div>
        </div>
        <div id="campo">
          <div className="form-floating mb-3">
            <input className="form-control"
              id="floatingInput"
              placeholder="Usernname"
              onChange={(e) => setUsuario(e.target.value)}
              value={usuario} />
            <label for="floatingInput">Username</label>
          </div>

          <button type='button' onClick={handlePesquisa}>Pesquisar</button>

        </div>
        <p>Após clicar em "Pesquisar" os resultados estarão disponíveis abaixo!</p>
      </div>

      <div id="repositorios">
        <h1>{usuario === '' ? "Nenhum username informado" : `Repositórios encontrados para ${username}`}</h1>
        <div id="box-repo">
          {repositorios.map((nome) => <li>{nome.split('-').join(" ").split("_").join(" ")}</li>)}
        </div>
      </div>

      <footer>
        <a href="https://github.com/tarsojabbes" target="_blank" rel="noreferrer noopener"><img src="https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2012/png/iconmonstr-github-1.png&r=224&g=220&b=220" alt="Github" /></a>
        <a href="https://linkedin.com/in/tarsojabbes/" target="_blank" rel="noreferrer noopener"><img src="https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2012/png/iconmonstr-linkedin-4.png&r=224&g=220&b=220" alt="LinkedIn" /></a>
      </footer>

    </>
  )
}





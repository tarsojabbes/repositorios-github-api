import React, { useState } from 'react'
import axios from 'axios'

export default function App() {

  const [usuario, setUsuario] = useState('') // Armazena os valores do input Usuário
  const [repositorios, setRepositorios] = useState([])
  const [link, setLink] = useState([])
  const [username, setUsername] = useState('')

  const handlePesquisa = () => {
    axios.get(`https://api.github.com/users/${usuario}/repos`).then(response => { // Faz o request na API sobre os repositórios do Usuário inserido no Input
      const repositories = response.data; // Atribui os dados enviado pela API a uma variável local
      const repositoriesNameLink = [] // Criado para atribuir valores a ele
      repositories.map((repository) => repositoriesNameLink.push({ nome: repository.name, link: `https://github.com/${usuario}/${repository.name}` })) // Para cada nome de repositório dos repositórios da API adicionar o nome em repositoriesName
      localStorage.setItem('repositoriesName', repositoriesNameLink.map((obj) => (obj.nome)))
      localStorage.setItem('repositoriesLink', repositoriesNameLink.map((obj) => (obj.link)))
      // console.log(repositoriesNameLink)
      setUsername(usuario)

      if (localStorage.getItem('repositoriesName') !== null) {
        const nomeArray = localStorage.getItem('repositoriesName').split(',')
        const linkArray = localStorage.getItem('repositoriesLink').split(',')
        console.log(linkArray)
        //console.log(nomeArray)
        setLink(linkArray)
        setRepositorios(nomeArray)
      }


      //const repositoriesLink = []
      //repositories.map((repository) => repositoriesLink.push(repository.url))
      //localStorage.setItem('repositoriesLink', repositoriesLink)

      //if (localStorage.getItem('repositoriesLink') !== null) {
      //  const linkArray = localStorage.getItem('repositoriesLink').split(',')
      //  setLink(linkArray)
      //}

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
            <label>Username</label>
          </div>

          <button type='button' onClick={handlePesquisa}>Pesquisar</button>

        </div>
        <p>Após clicar em "Pesquisar" os resultados estarão disponíveis abaixo!</p>
      </div>

      <div id="repositorios">
        <h1>{usuario === '' ? "Nenhum username informado" : `Repositórios encontrados para ${username}`}</h1>
        <div id="box-repo">
          {repositorios.map((name, index) => <div className="inline-div"><li key={index}>{name.split('-').join(' ').split('_').join(" ")} </li></div>)}
          {link.map((link) => <a href={link}><button>Abrir</button></a>)}

        </div>
      </div>

      <footer>
        <a id="footer-link" href="/">Esta é uma ferramenta desenvolvida por Tarso Jabbes</a>
        <a id="footer-link" href="https://github.com/tarsojabbes" target="_blank" rel="noreferrer noopener"><img src="https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2012/png/iconmonstr-github-1.png&r=224&g=220&b=220" alt="Github" /></a>
        <a id="footer-link" href="https://linkedin.com/in/tarsojabbes/" target="_blank" rel="noreferrer noopener"><img src="https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2012/png/iconmonstr-linkedin-4.png&r=224&g=220&b=220" alt="LinkedIn" /></a>
      </footer>

    </>
  )
}





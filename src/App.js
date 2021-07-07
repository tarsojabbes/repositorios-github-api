import React, { useState } from 'react'
import axios from 'axios'

export default function App() {

  const [usuario, setUsuario] = useState('')
  const [repositorios, setRepositorios] = useState([])
  const [link, setLink] = useState([])
  const [username, setUsername] = useState('')

  const formatar = (str) => {
    let newStr = str.split('-').join(' ').split('_').join(" ");
    return (newStr.toUpperCase())

  }

  const handlePesquisa = () => {
    axios.get(`https://api.github.com/users/${usuario}/repos`).then(response => {
      localStorage.clear()
      const repositories = response.data;
      const repositoriesNameLink = []
      repositories.map((repository) => repositoriesNameLink.push({ nome: repository.name, link: `https://github.com/${usuario}/${repository.name}` }))
      localStorage.setItem('repositoriesName', repositoriesNameLink.map((obj) => (obj.nome)))
      localStorage.setItem('repositoriesLink', repositoriesNameLink.map((obj) => (obj.link)))
      setUsername(usuario)

      if (localStorage.getItem('repositoriesName') !== null) {
        const nomeArray = localStorage.getItem('repositoriesName').split(',')
        const linkArray = localStorage.getItem('repositoriesLink').split(',')
        setLink(linkArray)
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
            <label>Username</label>
          </div>
          <button type='button' onClick={handlePesquisa}>Pesquisar</button>
        </div>
        <p>Após clicar em "Pesquisar" os resultados estarão disponíveis abaixo!</p>
      </div>
      <div id="repositorios">
        <h1>{usuario === '' ? "Nenhum username informado" : `Repositórios encontrados para ${username}`}</h1>
        <div className="row">
          <div id="box-repo">
            <div className="col">
              {repositorios.map((name, index) => <li key={index}>{formatar(name)} </li>)}
            </div>
            <div className="col">
              {link.map((link) => <div id="box-links"><a href={link} target="_blank" rel="noreferrer noopener"><button className="link-btn">Abrir</button></a></div>)}
            </div>
          </div>
        </div>
      </div>
      <footer>
        <a id="footer-link" href="/" className="frase">Esta é uma ferramenta desenvolvida por Tarso Jabbes</a>
        <a id="footer-link" href="/" className="tarso">Tarso Jabbes</a>
        <a id="footer-link" href="https://github.com/tarsojabbes" target="_blank" rel="noreferrer noopener"><img src="https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2012/png/iconmonstr-github-1.png&r=224&g=220&b=220" alt="Github" /></a>
        <a id="footer-link" href="https://linkedin.com/in/tarsojabbes/" target="_blank" rel="noreferrer noopener"><img src="https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2012/png/iconmonstr-linkedin-4.png&r=224&g=220&b=220" alt="LinkedIn" /></a>
      </footer>
    </>
  )
}





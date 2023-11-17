import { GithubUser } from "./GithubUser.js"

// classe qu vai conter a lógica dos dados
// como os dados serão estruturados
export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root)
    this.load()

    // GithubUser.search('magnohr').then(user => console.log(user))
  }

  load() {
    this.entries = JSON.parse(localStorage.getItem
    ("@github-favorites:")) || []

    console.log(this.entries)
  }

  save() {
    localStorage.setItem("@github-favorites:", JSON.stringify(this.entries))
  }

  async add(username) {
    try {

      const userExists = this.entries.find(entry => entry.login === username)

      if(userExists) {
        throw new Error('Usuário já cadastrado')
      }

      const user = await GithubUser.search(username)

      if(user.login === undefined) {
        throw new Error("Usuário não encontrado")
      }

      this.entries = [user, ...this.entries]
      this.update()
      this.save()

    } catch (error) {
      alert(error.message)
    }
  }

  delete(user){
  const filteredEntries = this.entries
    .filter(entry => entry.login !== user.login)

    this.entries =  filteredEntries
    this.update()
    this.save()
  }
}

// classe que vai  criar a visualização e eventos do HTML
export class FavoritesView extends Favorites {
  constructor(root) {
    super(root)

    this.tbody = this.root.querySelector("table tbody")

    this.update()
    this.onadd()
  }


  onadd() {
    const addButton = this.root.querySelector(".search button")
    addButton.onclick = () => {
      const { value } = this.root.querySelector(".search input")

      this.add(value)
    }

    console.log(addButton)
  }

  update() {
    this.removeAllTr()
      
   
    this.entries.forEach( user => {
      const row = this.createRow()
      // console.log(user)

      row.querySelector(".user img").src = `https://github.com/${user.login}.png`

      row.querySelector(".user img").alt = `Imagem de ${user.name}`

      row.querySelector(".user a").href = ` https://github.com/${user.login}`

      row.querySelector(".user p").textContent = user.name

      row.querySelector(".user span").textContent = user.login

      row.querySelector(".repositories").textContent = user.public_repos

      row.querySelector(".followers").textContent = user.followers

      row.querySelector(".remove").onclick = () => {
        const isOk = confirm("Tem certeza que deseja deletar essa linha?")
        if(isOk) {
          this.delete(user)
        }
      }

      this.tbody.append(row)
    } )

    const empty = this.root.querySelector('.boxEmpty');

        if (this.entries.length === 0) {
            empty.classList.remove('hide');
        } else {
            empty.classList.add('hide');
        }

    

    
  }

  createRow() {
    const tr = document.createElement('tr')

    tr.innerHTML = `
      <td class="user">
        <img src="https://github.com/DevMaroto.png" alt="Imagem de DevMaroto">
      <a href="https://github.com/DevMaroto" target="_blank">
        <p>Pedro Paulo</p>
        <span>DevMaroto</span>
      </a>
    </td>
    <td class="repositories">
      41
    </td>
    <td class="followers">
     20
    </td>
    <td>
      <button class="remove" >Remover</button>
    </td>
    `
    return tr
  }

  removeAllTr() {
    
    this.tbody.querySelectorAll("tr").forEach((tr) => {
      tr.remove()
    })
  }
}
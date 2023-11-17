export class GithubUser {
  static search(username){
    const endpoint = `https://api.github.com/users/${username}`

    return fetch(endpoint)
    .then(data => data.json())
    .then(data => ({
      login: data.login,
      name: data.name,
      public_repos: data.public_repos,
      followers: data.followers
    // desestruturei o objeto par ficar mais clean e menos verboso
    // .then(data => data.json())
    // .then(data => (({ login, name, public_repos, followers }) => ({
    //   login,
    //   name,
    //   public_repos,
    //   followers
    //  }))
    }))
  }
}


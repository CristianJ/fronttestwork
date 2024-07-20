export class Actor {
    constructor({
      id,
      name,
      character,
      profile_path
    }) {
      this.id = id;
      this.name = name;
      this.character = character;
      this.profilePath = profile_path;
    }
  
 
    getFullProfilePath() {
      return this.profilePath ? `https://image.tmdb.org/t/p/w200${this.profilePath}` : '/path/to/default-image.jpg';
    }
  }
  
  export default Actor;
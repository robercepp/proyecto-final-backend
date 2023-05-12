module.exports = class UsuariosDTO {
  constructor(data) {
    this.data = data;
  }
  readMultipleUsers() {
    if (this.data.error) {
      return this.data;
    } else {
      const users = [];
      this.data.forEach((user) => {
        const usr = {
          id: user.id,
          nombre: user.nombre,
          apellido: user.apellido,
          email: user.email,
          avatar: user.avatar,
          admin: user.admin,
          password: user.password,
        };
        users.push(usr);
      });
      return users;
    }
  }

  readSingleUser() {
    if (this.data.error) {
      return this.data;
    } else {
      const user = {
        id: this.data.id,
        nombre: this.data.nombre,
        apellido: this.data.apellido,
        email: this.data.email,
        avatar: this.data.avatar,
        admin: this.data.admin,
        password: this.data.password,
      };
      return user;
    }
  }
};

import React from "react";

class AuthService {
  isAuthenticated = false;

  getAuthStatus = () => {
    // let token = localStorage.getItem("token");
    // //u slucaju da postoji token u storage-u
    // if (!!token) {
    //   this.setJwt(token);
    // }

    // return !!token ? true : false;
    return this.isAuthenticated;
  };

  async login() {}

  logout = () => {};
}

export const auth = new AuthService();

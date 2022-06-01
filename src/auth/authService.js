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

  setJwt = (token) => {
    // apiUsers.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("accessToken", token);
  };

  async login() {}

  logout = () => {};
}

export const auth = new AuthService();

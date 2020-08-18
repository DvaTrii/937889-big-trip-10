const API = class {
  getPoints() {
    return fetch(`https://htmlacademy-es-10.appspot.com/big-trip/points`);
  }
};

export default API;

export default class LocalStorageService {
    constructor(key) {
      this.key = key;
    }
  
    getData() {
      const dataJSON = localStorage.getItem(this.key);
      return dataJSON ? JSON.parse(dataJSON) : null;
    }
  
    setData(data) {
      const dataJSON = JSON.stringify(data);
      localStorage.setItem(this.key, dataJSON);
    }
  
    clearData() {
      localStorage.removeItem(this.key);
    }
  }
  
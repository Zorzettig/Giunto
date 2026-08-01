export const state = {
  moduliSalvati: [],
  
  init() {
    this.loadFromStorage();
  },

  loadFromStorage() {
    const saved = localStorage.getItem('moduli_sei_giunto');
    if (saved) {
      try {
        this.moduliSalvati = JSON.parse(saved);
      } catch (e) {
        console.error("Errore nel caricamento dei dati", e);
        this.moduliSalvati = [];
      }
    }
  },

  saveToStorage() {
    localStorage.setItem('moduli_sei_giunto', JSON.stringify(this.moduliSalvati));
  },

  addModulo(moduloTesto) {
    this.moduliSalvati.push(moduloTesto);
    this.saveToStorage();
  },

  clearModuli() {
    this.moduliSalvati = [];
    this.saveToStorage();
  },

  getModuliCount() {
    return this.moduliSalvati.length;
  },
  
  getModuli() {
    return this.moduliSalvati;
  }
};

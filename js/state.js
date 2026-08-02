export const state = {
  moduliSalvati: [],
  savedPDC: '',
  
  init() {
    this.loadFromStorage();
  },

  loadFromStorage() {
    const saved = localStorage.getItem('moduli_sei_giunto');
    const savedPdcValue = localStorage.getItem('pdc_sei_giunto');
    if (saved) {
      try {
        this.moduliSalvati = JSON.parse(saved);
      } catch (e) {
        console.error("Errore nel caricamento dei dati", e);
        this.moduliSalvati = [];
      }
    }
    if (savedPdcValue) {
      this.savedPDC = savedPdcValue;
    }
  },

  saveToStorage() {
    localStorage.setItem('moduli_sei_giunto', JSON.stringify(this.moduliSalvati));
  },

  savePDC(pdcValue) {
    this.savedPDC = pdcValue;
    localStorage.setItem('pdc_sei_giunto', pdcValue);
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

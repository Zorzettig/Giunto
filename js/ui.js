import { state } from './state.js';

export const ui = {
  elements: {
    currentDate: document.getElementById('currentDate'),
    contatoreMemoria: document.getElementById('contatoreMemoria'),
    ora: document.getElementById('ora'),
    stazioneScelta: document.getElementById('stazioneScelta'),
    colonnaTestoStazione: document.getElementById('colonnaTestoStazione'),
    stazioneTesto: document.getElementById('stazioneTesto'),
    formScreen: document.getElementById('formScreen'),
    summaryScreen: document.getElementById('summaryScreen'),
    listaModuliStampati: document.getElementById('listaModuliStampati'),
    confirmModal: document.getElementById('confirmModal'),
    toastMsg: document.getElementById('toastMsg')
  },

  init() {
    this.updateDate();
    this.impostaOraAttuale();
    this.gestisciStazione();
    this.updateMemoryCounter();
    this.setupEventListeners();
  },

  setupEventListeners() {
    this.elements.stazioneScelta.addEventListener('change', () => this.gestisciStazione());
  },

  updateDate() {
    const oggi = new Date();
    const dataOggiStr = `${String(oggi.getDate()).padStart(2, '0')}/${String(oggi.getMonth() + 1).padStart(2, '0')}/${oggi.getFullYear()}`;
    if (this.elements.currentDate) {
      this.elements.currentDate.innerText = dataOggiStr;
    }
    return dataOggiStr; // Useful for module generation
  },

  impostaOraAttuale() {
    const adesso = new Date();
    const ore = String(adesso.getHours()).padStart(2, '0');
    const minuti = String(adesso.getMinutes()).padStart(2, '0');
    if (this.elements.ora) {
      this.elements.ora.value = `${ore}:${minuti}`;
    }
  },

  gestisciStazione() {
    if (this.elements.stazioneScelta.value === 'altro') {
      this.elements.colonnaTestoStazione.classList.remove('hidden');
    } else {
      this.elements.colonnaTestoStazione.classList.add('hidden');
      this.elements.stazioneTesto.value = ''; 
    }
  },

  updateMemoryCounter() {
    if (this.elements.contatoreMemoria) {
      this.elements.contatoreMemoria.innerText = state.getModuliCount();
    }
  },

  mostraToast(messaggio) {
    const toast = this.elements.toastMsg;
    toast.innerText = messaggio;
    toast.classList.add('active');
    
    setTimeout(() => { 
      toast.classList.remove('active');
    }, 2500);
  },

  pulisciForm() {
    document.getElementById('prog').value = '';
    document.getElementById('salt').value = '';
    document.getElementById('localita').value = 'Mestre';
    document.getElementById('treno').value = '';
    this.elements.stazioneScelta.value = 'altro';
    this.gestisciStazione();
    this.elements.stazioneTesto.value = '';
    document.getElementById('binario').value = '';
    document.getElementById('binSx').checked = false;
    document.getElementById('binDx').checked = false;
    document.getElementById('manigliaRAR').checked = false;
    document.getElementById('plLibero').checked = false;
    document.getElementById('progDCO').value = '';
    document.getElementById('saltDCO').value = '';
    document.getElementById('firma').value = '';
    this.impostaOraAttuale();
  },

  mostraRiepilogo() {
    const contenitore = this.elements.listaModuliStampati;
    contenitore.innerHTML = ''; 
    const moduli = state.getModuli();

    if (moduli.length === 0) {
      contenitore.innerHTML = `<div class="empty-state">Nessun modulo salvato.</div>`;
    } else {
      moduli.forEach((testo) => {
        const box = document.createElement('div');
        box.className = 'module-card';
        box.innerText = testo; 
        contenitore.appendChild(box);
      });
    }

    this.elements.formScreen.classList.add('hidden');
    this.elements.summaryScreen.classList.remove('hidden');
  },

  tornaAlForm() {
    this.elements.summaryScreen.classList.add('hidden');
    this.elements.formScreen.classList.remove('hidden');
  },

  apriModal() {
    if (state.getModuliCount() === 0) {
      this.mostraToast("La memoria è già vuota");
      return;
    }
    this.elements.confirmModal.classList.add('active');
  },

  chiudiModal() {
    this.elements.confirmModal.classList.remove('active');
  }
};

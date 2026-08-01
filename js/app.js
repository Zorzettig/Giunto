import { state } from './state.js';
import { ui } from './ui.js';
import { pdfService } from './pdfService.js';

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
  state.init();
  ui.init();
  
  // Register Service Worker for PWA
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').then((registration) => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, (err) => {
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  }
});

// Setup Global Functions for onclick handlers in HTML
window.salvaModulo = () => {
  const prog = document.getElementById('prog').value || '___';
  const salt = document.getElementById('salt').value || '___';
  const tipoRuolo = document.getElementById('tipoRuolo').value;
  const localita = document.getElementById('localita').value || '______';
  const treno = document.getElementById('treno').value || '______';
  
  const stazScelta = document.getElementById('stazioneScelta').value;
  const stazTesto = document.getElementById('stazioneTesto').value;
  const nomeStazione = stazScelta === 'altro' ? (stazTesto || '______') : stazScelta;

  const binario = document.getElementById('binario').value || '___';
  const binSx = document.getElementById('binSx').checked;
  const binDx = document.getElementById('binDx').checked;
  const manigliaRAR = document.getElementById('manigliaRAR').checked;
  const plLibero = document.getElementById('plLibero').checked;
  
  const progDCO = document.getElementById('progDCO').value || '___';
  const saltDCO = document.getElementById('saltDCO').value || '___';
  const firma = document.getElementById('firma').value || '______';
  const ora = document.getElementById('ora').value || '___';
  const pdcValore = document.getElementById('pdc').value || 'Zorzettig';

  const dataOggiStr = ui.updateDate();

  let testoModulo = `${dataOggiStr}  n° ${prog}/${salt},\n`;
  testoModulo += `${tipoRuolo} ${localita} Tr. ${treno} giunto a ${nomeStazione} in ${binario} bin.\n`;
  
  if (binSx) testoModulo += `Proveniente dal binario di SX,\n`;
  if (binDx) testoModulo += `Proveniente dal binario di DX,\n`;
  if (manigliaRAR) testoModulo += `Azionata maniglia RAR per tr. incrociante,\n`;
  if (plLibero) testoModulo += `Sede Stradale PL KM. 65+070 Libera da rotabili.\n`;
  
  testoModulo += `${tipoRuolo} n° ${progDCO}/${saltDCO}  ${firma} (Ore ${ora})\n`;
  testoModulo += `PDC: ${pdcValore}`;

  state.addModulo(testoModulo);
  ui.updateMemoryCounter();
  ui.pulisciForm();
  ui.mostraToast("Modulo Salvato in Memoria");
  ui.mostraRiepilogo();
};

window.mostraRiepilogo = () => ui.mostraRiepilogo();
window.tornaAlForm = () => ui.tornaAlForm();
window.richiediSvuotaMemoria = () => ui.apriModal();
window.chiudiModal = () => ui.chiudiModal();
window.confermaSvuotaMemoria = () => {
  state.clearModuli();
  ui.updateMemoryCounter();
  ui.chiudiModal();
  ui.mostraToast("Memoria svuotata");
  ui.tornaAlForm(); 
};
window.scaricaPDF = () => pdfService.scaricaPDF();
window.condividi = () => pdfService.condividi();

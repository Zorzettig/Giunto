import { state } from './state.js';
import { ui } from './ui.js';

export const pdfService = {
  getPdfOptions() {
    const dataOggiStr = ui.updateDate().replace(/\//g, '-');
    const nomeFile = `Moduli_SeiGiunto_${dataOggiStr}.pdf`;
    return {
      margin:       0.5,
      filename:     nomeFile,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true, backgroundColor: '#ffffff' },
      jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
  },

  condividi() {
    if (state.getModuliCount() === 0) {
      ui.mostraToast("Nessun dato da condividere");
      return;
    }
    
    ui.mostraToast("Creazione file in corso...");
    const elementoDaStampare = document.getElementById('listaModuliStampati');
    const opt = this.getPdfOptions();

    html2pdf().set(opt).from(elementoDaStampare).output('blob').then((pdfBlob) => {
      const filePdf = new File([pdfBlob], opt.filename, { type: 'application/pdf' });

      if (navigator.canShare && navigator.canShare({ files: [filePdf] })) {
        navigator.share({
          title: 'Moduli Sei Giunto',
          files: [filePdf]
        }).then(() => {
          ui.mostraToast("Condiviso con successo!");
        }).catch((error) => {
          console.log('Condivisione annullata', error);
        });
      } else {
        ui.mostraToast("Download avviato (Condivisione non supportata)");
        html2pdf().set(opt).from(elementoDaStampare).save();
      }
    }).catch(err => {
      ui.mostraToast("Errore nella generazione del file");
      console.error(err);
    });
  },

  scaricaPDF() {
    if (state.getModuliCount() === 0) {
      ui.mostraToast("Nessun dato da salvare nel PDF");
      return;
    }

    ui.mostraToast("Generazione PDF in corso...");
    const elementoDaStampare = document.getElementById('listaModuliStampati');
    const opt = this.getPdfOptions();

    html2pdf().set(opt).from(elementoDaStampare).save()
      .then(() => ui.mostraToast("PDF Scaricato!"))
      .catch(() => ui.mostraToast("Errore nel PDF"));
  }
};

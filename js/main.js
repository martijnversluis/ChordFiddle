import ChordProEditor from './chord_pro_editor';

const viewTypeHTMLRadio = getElementByDataId('view-type-html');
const viewTypePlainRadio = getElementByDataId('view-type-plain');
const textPreviewer = getElementByDataId('chordSheetTextViewer');
const htmlPreviewer = getElementByDataId('chordSheetHTMLViewer');
const chordSheetImportArea = getElementByDataId('chord-sheet-import-area');

function getElementByDataId(dataId) {
  return document.querySelector(`[data-id='${dataId}']`);
}

const chordProEditor = new ChordProEditor({
  editor: getElementByDataId('chordProEditor'),
  textPreviewer: textPreviewer,
  htmlPreviewer: htmlPreviewer
});

getElementByDataId('transpose-up').addEventListener('click', () => {
  chordProEditor.transposeUp();
});

getElementByDataId('transpose-down').addEventListener('click', () => {
  chordProEditor.transposeDown();
});

getElementByDataId('switch-to-sharp').addEventListener('click', () => {
  chordProEditor.switchToSharp();
});

getElementByDataId('switch-to-flat').addEventListener('click', () => {
  chordProEditor.switchToFlat();
});

viewTypePlainRadio.addEventListener('change', (event) => {
  const html = !event.target.checked;
  textPreviewer.classList.toggle('active', !html);
  htmlPreviewer.classList.toggle('active', html);
});

viewTypeHTMLRadio.addEventListener('change', (event) => {
  const html = event.target.checked;
  textPreviewer.classList.toggle('active', !html);
  htmlPreviewer.classList.toggle('active', html);
});

getElementByDataId('import-chord-sheet-submit').addEventListener('click', () => {
  chordProEditor.importChordSheet(chordSheetImportArea.value);
  chordSheetImportArea.value = '';
  window.location = '#';
});

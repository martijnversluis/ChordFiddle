import ChordProEditor from './chord_pro_editor';

function getElementByDataId(dataId) {
  return document.querySelector(`[data-id="${dataId}"]`);
}

const chordProEditor = new ChordProEditor({
  editor: getElementByDataId('chordProEditor'),
  previewer: getElementByDataId('chordSheetTextViewer')
});

getElementByDataId('transpose-up').addEventListener('click', () => {
  chordProEditor.transposeUp();
});

getElementByDataId('transpose-down').addEventListener('click', () => {
  chordProEditor.transposeDown();
});

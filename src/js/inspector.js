import 'luna-object-viewer/luna-object-viewer.css';
import LunaObjectViewer from 'luna-object-viewer';

import Component from './component';

class Inspector extends Component {
  setup() {
    this.objectViewer = new LunaObjectViewer(this.element('outlet'), {
      unenumerable: true,
      accessGetter: true,
    });

    this.onClick('title', () => this.container.classList.toggle('Inspector--collapsed'));
  }

  setSong(song) {
    this.objectViewer.set(song);
  }
}

export default Inspector;

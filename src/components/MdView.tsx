import * as marked from 'marked';
import * as React from 'react';

import 'highlight.js/styles/atelier-forest-light.css';
marked.setOptions({
  highlight: function(code) {
    return (
      '<pre class="hljs"><code>' +
      require('highlight.js').highlightAuto(code).value +
      '</code></pre>'
    );
  }
});

export function MdView(props: { md: string }) {
  return <div dangerouslySetInnerHTML={{ __html: marked(props.md) }} />;
}
export default MdView;

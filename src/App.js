// import React, { Component } from 'react';
// import { EditorState } from 'draft-js';
// import Editor from 'draft-js-plugins-editor';
// import createEmojiPlugin from 'draft-js-emoji-plugin';
// import 'draft-js-emoji-plugin/lib/plugin.css';

// const emojiPlugin = createEmojiPlugin();

// const { EmojiSuggestions } = emojiPlugin;

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       editorState: EditorState.createEmpty()
//     };
//   }

//   onChange = editorState => {
//     this.setState({
//       editorState
//     });
//   };

//   render() {
//     return (
//       <div>
//         <h1>hello world</h1>
//         <Editor
//           editorState={this.state.editorState}
//           onChange={this.onChange}
//           plugins={[emojiPlugin]}
//         />
//         <EmojiSuggestions />
//       </div>
//     );
//   }
// }

// export default App;

import React, { Component } from 'react';
import { convertFromRaw, EditorState } from 'draft-js';

import Editor, { composeDecorators } from 'draft-js-plugins-editor';

import createImagePlugin from 'draft-js-image-plugin';

import createFocusPlugin from 'draft-js-focus-plugin';

import createBlockDndPlugin from 'draft-js-drag-n-drop-plugin';
import editorStyles from './editorStyles.css';

const focusPlugin = createFocusPlugin();
const blockDndPlugin = createBlockDndPlugin();

const decorator = composeDecorators(
  focusPlugin.decorator,
  blockDndPlugin.decorator
);
const imagePlugin = createImagePlugin({ decorator });

const plugins = [blockDndPlugin, focusPlugin, imagePlugin];

/* eslint-disable */
const initialState = {
  entityMap: {
    '0': {
      type: 'IMAGE',
      mutability: 'IMMUTABLE',
      data: {
        src:
          'data:image/jpeg;base64,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'
      }
    }
  },
  blocks: [
    {
      key: '9gm3s',
      text:
        'You can have images in your text field which are draggable. Hover over the image press down your mouse button and drag it to another position inside the editor.',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {}
    },
    {
      key: 'ov7r',
      text: ' ',
      type: 'atomic',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [
        {
          offset: 0,
          length: 1,
          key: 0
        }
      ],
      data: {}
    },
    {
      key: 'e23a8',
      text:
        'You can checkout the alignment tool plugin documentation to see how to build a compatible block plugin …',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {}
    }
  ]
};
/* eslint-enable */

export default class App extends Component {
  state = {
    editorState: EditorState.createWithContent(convertFromRaw(initialState))
  };

  onChange = editorState => {
    this.setState({
      editorState
    });
  };

  focus = () => {
    this.editor.focus();
  };

  render() {
    return (
      <div>
        <div className={editorStyles.editor} onClick={this.focus}>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            plugins={plugins}
            ref={element => {
              this.editor = element;
            }}
          />
        </div>
      </div>
    );
  }
}

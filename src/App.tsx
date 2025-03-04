import { useState } from "react";
import { schema } from "prosemirror-schema-basic";
import { EditorState } from "prosemirror-state";
import { ProseMirror } from "@nytimes/react-prosemirror";
import EmojiPicker from 'emoji-picker-react';
import './App.css'


function App() {

	const [mount, setMount] = useState<HTMLElement | null>(null);
	const [state, setState] = useState(() => EditorState.create({ schema }));

	return (
		<div id="app">
			<div className="ProseMirrorContainer">
				<ProseMirror
					mount={mount}
					state={state}
					dispatchTransaction={(tr) => setState(state.apply(tr))}>
					<div className="toolbar">
						<button popovertarget="emojipicker">{'\u{1F600}'}</button>
						<div popover="auto" id="emojipicker">
							<EmojiPicker onEmojiClick={(e) => {
								setState(state.apply(state.tr.insertText(e.emoji)));
							}} />
						</div>
					</div>
					<div ref={setMount} />
				</ProseMirror>
			</div>
		</div>
	)
}


export default App

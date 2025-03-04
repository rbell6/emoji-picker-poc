import { useState } from "react";
import { schema } from "prosemirror-schema-basic";
import { toggleMark } from "prosemirror-commands";
import { EditorState } from "prosemirror-state";
import { ProseMirror, useEditorEventCallback } from "@nytimes/react-prosemirror";
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
						<BoldButton />
						<ItalicsButton />
					</div>
					<div ref={setMount} />
				</ProseMirror>
			</div>
		</div>
	)
}

function BoldButton() {
	const onClick = useEditorEventCallback((view) => {
		const toggleBoldMark = toggleMark(view.state.schema.marks.strong);
		toggleBoldMark(view.state, view.dispatch, view);
	});
	
	return <button onClick={onClick}>Bold</button>;
}

function ItalicsButton() {
	const onClick = useEditorEventCallback((view) => {
		toggleMark(view.state.schema.marks.em)(view.state, view.dispatch, view);
	});
	
	return <button onClick={onClick}>Italics</button>;
}


export default App

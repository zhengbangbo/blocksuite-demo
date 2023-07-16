import '@blocksuite/editor/themes/affine.css'
import {EditorContainer} from '@blocksuite/editor'
import {Workspace} from '@blocksuite/store'
import {AffineSchemas} from '@blocksuite/blocks/models'
import {useEffect, useRef} from "react";
import {atom, useAtomValue} from 'jotai'

const workspace = new Workspace({
    id: 'test-workspace'
})
workspace.register(AffineSchemas)
const page = workspace.createPage({id: 'page0'});

const pageBlockId = page.addBlock('affine:page', {
    title: new Text(),
});

// Uncaught Error: Invalid schema for affine:surface: Hub/Content must have parent.
page.addBlock('affine:surface', {}, pageBlockId);

const noteId = page.addBlock('affine:note', {}, pageBlockId);
page.addBlock('affine:paragraph', {}, noteId);
page.resetHistory();

const editor = new EditorContainer()
editor.page = page

// const workspaceAtom = atom(workspace)
const editorAtom = atom(editor)

function App() {
    const ref = useRef<HTMLDivElement>(null)  // 一定要加 null
    const editor = useAtomValue(editorAtom)
    useEffect(() => {
        if (ref.current) {
            const div = ref.current
            div.appendChild(editor)
            return () => {
                div.removeChild(editor)
            }
        }

    }, [editor])

    return (
        <div>
            <div ref={ref} id='editor-container'/>
            Hello, world!
        </div>
    )
}

export default App

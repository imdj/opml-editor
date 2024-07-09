<script>
    import { EditorView, basicSetup } from "codemirror";
    import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
    import { closeBrackets, closeBracketsKeymap } from "@codemirror/autocomplete";
    import { keymap } from "@codemirror/view";
    import { xml } from "@codemirror/lang-xml";

    import {getContext, onMount} from 'svelte';

    let { classes } = $props();
    let element;

    const opml = getContext("state");

    const watcher = EditorView.updateListener.of((e) => {
        if (e.docChanged && opml.rawContent !== e.state.doc.toString().valueOf()) {
            opml.rawContent = e.state.doc.toString().valueOf()
            opml.parseDoc(e.state.doc.toString().valueOf());
        }
    });

    let extensions = [
        basicSetup,
        history(),
        closeBrackets(),
        xml(),
        EditorView.lineWrapping,
        keymap.of([
            ...defaultKeymap,
            ...historyKeymap,
            ...closeBracketsKeymap
        ]),
        watcher
    ]

    onMount(() => {
        const view = new EditorView({
            doc: opml.rawContent,
            extensions,
            parent: element,
        })

        $effect(() => {
            if (opml.rawContent !== view.state.doc.toString().valueOf()) {
                view.dispatch({
                    changes: {
                        from: 0,
                        to: view.state.doc.length,
                        insert: opml.rawContent
                    }
                })
            }
        });
    })
</script>

<div class="codemirror flex flex-col flex-grow min-h-0 {classes}" bind:this={element}></div>

<style>
    .codemirror :global(.cm-scroller) {
        overflow-x: unset;
        overflow-y: auto;
        overflow-wrap: normal;
    }

    .codemirror :global(.cm-editor) {
        height: 100%;
    }
</style>
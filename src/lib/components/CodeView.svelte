<script>
    import { EditorView, basicSetup } from "codemirror";
    import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
    import { closeBrackets, closeBracketsKeymap } from "@codemirror/autocomplete";
    import { keymap } from "@codemirror/view";
    import { xml } from "@codemirror/lang-xml";
    import xmlFormat from "xml-formatter";

    import {getContext, onMount} from 'svelte';

    let { classes } = $props();
    let element;

    const opml = getContext("state");

    const watcher = EditorView.updateListener.of((e) => {
        if (e.docChanged && opml.rawContent !== e.state.doc.toString().valueOf())
            opml.rawContent = e.state.doc.toString()
    });

    let extensions = [
        basicSetup,
        history(),
        closeBrackets(),
        xml(),
        keymap.of([
            ...defaultKeymap,
            ...historyKeymap,
            ...closeBracketsKeymap
        ]),
        watcher
    ]

    onMount(() => {
        const view = new EditorView({
            doc: xmlFormat(opml.rawContent),
            extensions,
            parent: element,
        })

        $effect(() => {
            if (opml.rawContent !== view.state.doc.toString().valueOf()) {
                view.dispatch({
                    changes: {
                        from: 0,
                        to: view.state.doc.length,
                        insert: xmlFormat(opml.rawContent)
                    }
                })
            }
        });
    })
</script>

<div class="codemirror {classes}" bind:this={element}></div>
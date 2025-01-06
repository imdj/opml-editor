<script>
    import { EditorView, basicSetup } from "codemirror";
    import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
    import { closeBrackets, closeBracketsKeymap } from "@codemirror/autocomplete";
    import { keymap, placeholder } from "@codemirror/view";
    import { EditorState } from "@codemirror/state";
    import { xml } from "@codemirror/lang-xml";

    import {onMount} from 'svelte';

    let { class: classes, content = $bindable(), placeholder: placeholderText, readonly } = $props();
    let element;

    const watcher = EditorView.updateListener.of((e) => {
        if (e.docChanged) {
            content = e.state.doc.toString().valueOf()
        }
    });

    let extensions = [
        basicSetup,
        history(),
        closeBrackets(),
        xml(),
        placeholder(placeholderText),
        EditorState.readOnly.of(readonly),
        keymap.of([
            ...defaultKeymap,
            ...historyKeymap,
            ...closeBracketsKeymap
        ]),
        watcher
    ]

    onMount(() => {
        const view = new EditorView({
            doc: content,
            extensions,
            parent: element,
        })

        $effect(() => {
            // compare against formatted view.state because rawContent is formatted when updated using stringify
            if (content !== view.state.doc.toString().valueOf()) {
                view.dispatch({
                    changes: {
                        from: 0,
                        to: view.state.doc.length,
                        insert: content
                    }
                })
            }
        });
    })
</script>

<div class="codemirror flex flex-col flex-grow w-full min-h-0 {classes}" bind:this={element}></div>

<style>
    .codemirror :global(.cm-scroller) {
        overflow-y: auto;
    }

    .codemirror :global(.cm-editor) {
        height: 100%;
    }
</style>
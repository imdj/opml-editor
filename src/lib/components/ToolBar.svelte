<script>
    import {getContext} from "svelte";
    import xmlFormat from "xml-formatter";
    import ActionMenu from "$lib/components/ActionMenu.svelte";
    import {opmlDoc} from "$lib/opml.svelte.js";

    let { outlinerView = $bindable() } = $props()

    const opml = getContext("state")

    const FileMenu = [
        {
            name: "Save file",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 20h12M12 4v12m0 0l3.5-3.5M12 16l-3.5-3.5"/></svg>`,
            callback: saveToFile
        },
        {
            name: "Add file",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M22 14V8.5M6 13V6a3 3 0 0 1 3-3h5m2.992 1h3m3 0h-3m0 0V1m0 3v3M12 21H6a4 4 0 0 1 0-8h12a4 4 0 1 0 4 4v-3"/></svg>`,
            callback: mergeFile
        }
    ]

    const EditMenu = $state([
        {
            name: "Remove duplicates",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M7 2h9.5L21 6.5V19"/><path d="M11 22h5.5a1.5 1.5 0 0 0 1.5-1.5V8.749a.6.6 0 0 0-.176-.425l-3.148-3.148A.6.6 0 0 0 14.25 5H4.5A1.5 1.5 0 0 0 3 6.5V13m-1.008 6h6"/><path d="M14 5v3.4a.6.6 0 0 0 .6.6H18"/></g></svg>`,
            callback: () => opml.removeOutlineDupes(),
            disabled: opml.numOfFeeds < 2
        },
        {
            name: "Reformat file",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5"><path stroke-linecap="round" d="m3 21l10-10m5-5l-2.5 2.5"/><path d="m9.5 2l.945 2.555L13 5.5l-2.555.945L9.5 9l-.945-2.555L6 5.5l2.555-.945zm9.5 8l.54 1.46L21 12l-1.46.54L19 14l-.54-1.46L17 12l1.46-.54z"/></g></svg>`,
            callback: () => opml.rawContent = xmlFormat(opml.rawContent),
        }
    ])

    function switchView() {
        outlinerView = !outlinerView;

        // update content when switching views
        if (!outlinerView) {
            opml.rawContent = opml.stringify();
        }
        else {
            opml.parseDoc(opml.rawContent);
        }
    }

    function saveToFile() {
        const blob = new Blob([opml.rawContent], { type: "text/xml" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "feeds.opml";
        a.click();
        URL.revokeObjectURL(url);
    }

    function mergeFile() {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".opml";
        input.onchange = function(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const newOPML = new opmlDoc();
                    newOPML.parseDoc(e.target.result);
                    opml.append(newOPML.body.children);
                };
                reader.readAsText(file);
            }
        };
        input.click();
    }

    function selectAll() {
        // deselect if all outlines are selected
        if (all_selected) {
            opml.selectedItems.clear();
        }
        // select all
        else {
            opml.body.children.forEach(item => {
                opml.selectedItems.add(item.id);
                opml.body.selectChildren(opml);
            })
        }
    }
    let all_selected = $derived(opml.selectedItems.size && opml.body.children.every(item => opml.selectedItems.has(item.id)))
</script>

<div class="sticky top-0 flex flex-row bg-white z-10 w-full rounded-t-xl p-0.5 border-b-2">
    {#if outlinerView}
        <div class="flex flex-row flex-grow gap-1 overflow-x-auto">
            <button class="flex flex-row gap-2 py-1 px-2 whitespace-nowrap items-center rounded-lg hover:bg-slate-200" onclick={selectAll} disabled={!opml.body.children.length}>
                <input type="checkbox" checked={all_selected} class="mr-1"/>
                <span class="hidden sm:inline-block">{all_selected? 'Deselect all' : 'Select all'}</span>
            </button>
            <button class="flex flex-row gap-2 py-1 px-2 whitespace-nowrap items-center rounded-lg hover:bg-slate-200" onclick={() => opml.deleteSelected()} disabled={!opml.selectedItems.size}>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M14.871 19.121L16.993 17m2.121-2.121L16.993 17m0 0l-2.122-2.121M16.993 17l2.121 2.121"/><path d="M4 9.4V4.6a.6.6 0 0 1 .6-.6h4.8a.6.6 0 0 1 .6.6v4.8a.6.6 0 0 1-.6.6H4.6a.6.6 0 0 1-.6-.6Zm0 10v-4.8a.6.6 0 0 1 .6-.6h4.8a.6.6 0 0 1 .6.6v4.8a.6.6 0 0 1-.6.6H4.6a.6.6 0 0 1-.6-.6Zm10-10V4.6a.6.6 0 0 1 .6-.6h4.8a.6.6 0 0 1 .6.6v4.8a.6.6 0 0 1-.6.6h-4.8a.6.6 0 0 1-.6-.6Z"/></g></svg>
                Remove selected
            </button>
        </div>
        <button class="flex flex-row gap-2 py-1 px-2 whitespace-nowrap items-center rounded-lg bg-white text-black hover:bg-slate-200" onclick={switchView}>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13.5 6L10 18.5m-3.5-10L3 12l3.5 3.5m11-7L21 12l-3.5 3.5"/></svg>
            <span>Raw OPML view</span>
        </button>
    {:else}
        <div class="flex flex-row flex-grow gap-1">
            <ActionMenu
                    name="File"
                    icon='<svg xmlns="http://www.w3.org/2000/svg" class="h-6" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M4 21.4V2.6a.6.6 0 0 1 .6-.6h11.652a.6.6 0 0 1 .424.176l3.148 3.148A.6.6 0 0 1 20 5.75V21.4a.6.6 0 0 1-.6.6H4.6a.6.6 0 0 1-.6-.6M8 10h8m-8 8h8m-8-4h4"/><path d="M16 2v3.4a.6.6 0 0 0 .6.6H20"/></g></svg>'
                    items={FileMenu}/>
            <ActionMenu
                name="Edit"
                icon='<svg xmlns="http://www.w3.org/2000/svg" class="h-6" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L5 14h6v7l8-11z"/></svg>'
                items={EditMenu}/>
        </div>
        <button class="flex flex-row gap-2 py-1 px-2 whitespace-nowrap items-center rounded-lg bg-white text-black hover:bg-slate-200" onclick={switchView}>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M3 13c3.6-8 14.4-8 18 0"/><path d="M12 17a3 3 0 1 1 0-6a3 3 0 0 1 0 6"/></g></svg>
            <span>Outliner view</span>
        </button>
    {/if}
</div>
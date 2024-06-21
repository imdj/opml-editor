<script>
    import {getContext} from "svelte";
    import xmlFormat from "xml-formatter";
    import {parseBody, merge, removeDuplicates, removeItems} from "$lib/opml.js"

    let { viewState = $bindable() } = $props()

    const opml = getContext("state")

    function switchView() {
        viewState = !viewState;
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
                    const newOPML = xmlFormat(String(e.target.result));
                    const newOutlines = parseBody(newOPML);
                    opml.body = merge(opml.body, newOutlines);
                };
                reader.readAsText(file);
            }
        };
        input.click();
    }

    let all_selected = $state(false);
</script>

<div class="sticky top-0 flex flex-row gap-1 bg-white z-10 w-full rounded-t-xl p-0.5 border-b-2">
    {#if viewState}
        <button class="flex flex-row gap-2 py-1 px-2 items-center rounded-lg hover:bg-slate-200" onclick={() => {}}>
            <input type="checkbox" checked={all_selected} class="mr-1"/>
            {all_selected? 'Deselect all' : 'Select all'}
        </button>
        <button class="flex flex-row gap-2 py-1 px-2 items-center rounded-lg hover:bg-slate-200" onclick={() => opml.body = removeItems(opml.body, opml.selectedItems)}>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M14.871 19.121L16.993 17m2.121-2.121L16.993 17m0 0l-2.122-2.121M16.993 17l2.121 2.121"/><path d="M4 9.4V4.6a.6.6 0 0 1 .6-.6h4.8a.6.6 0 0 1 .6.6v4.8a.6.6 0 0 1-.6.6H4.6a.6.6 0 0 1-.6-.6Zm0 10v-4.8a.6.6 0 0 1 .6-.6h4.8a.6.6 0 0 1 .6.6v4.8a.6.6 0 0 1-.6.6H4.6a.6.6 0 0 1-.6-.6Zm10-10V4.6a.6.6 0 0 1 .6-.6h4.8a.6.6 0 0 1 .6.6v4.8a.6.6 0 0 1-.6.6h-4.8a.6.6 0 0 1-.6-.6Z"/></g></svg>
            Remove selected
        </button>
        <button class="flex flex-row gap-2 py-1 px-2 items-center rounded-lg ml-auto hover:bg-slate-200" onclick={switchView}>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13.5 6L10 18.5m-3.5-10L3 12l3.5 3.5m11-7L21 12l-3.5 3.5"/></svg>
            Raw OPML view
        </button>
    {:else}
        <button class="flex flex-row gap-2 py-1 px-2 items-center rounded-lg hover:bg-slate-200" onclick={saveToFile}>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 20h12M12 4v12m0 0l3.5-3.5M12 16l-3.5-3.5"/></svg>
            Save file
        </button>
        <button class="flex flex-row gap-2 py-1 px-2 items-center rounded-lg hover:bg-slate-200" onclick={mergeFile}>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M22 14V8.5M6 13V6a3 3 0 0 1 3-3h5m2.992 1h3m3 0h-3m0 0V1m0 3v3M12 21H6a4 4 0 0 1 0-8h12a4 4 0 1 0 4 4v-3"/></svg>
            Add file
        </button>
        <button class="flex flex-row gap-2 py-1 px-2 items-center rounded-lg hover:bg-slate-200" onclick={() => opml.body = removeDuplicates(opml.body)}>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M7 2h9.5L21 6.5V19"/><path d="M11 22h5.5a1.5 1.5 0 0 0 1.5-1.5V8.749a.6.6 0 0 0-.176-.425l-3.148-3.148A.6.6 0 0 0 14.25 5H4.5A1.5 1.5 0 0 0 3 6.5V13m-1.008 6h6"/><path d="M14 5v3.4a.6.6 0 0 0 .6.6H18"/></g></svg>
            Remove duplicates
        </button>
        <button class="flex flex-row gap-2 py-1 px-2 items-center rounded-lg ml-auto hover:bg-slate-200" onclick={switchView}>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M3 13c3.6-8 14.4-8 18 0"/><path d="M12 17a3 3 0 1 1 0-6a3 3 0 0 1 0 6"/></g></svg>
            Outliner view
        </button>
    {/if}
</div>
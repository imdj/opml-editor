<script>
    import CodeMirror from "svelte-codemirror-editor";
    import { xml } from "@codemirror/lang-xml";
    import xmlFormat from "xml-formatter";
    import opml from "$lib/opml.js";
    import {browser} from "$app/environment";
    import OutlinerView from "$lib/components/OutlinerView.svelte";
    import { setContext } from "svelte";
    import {writable} from 'svelte/store';

    let opmlContent = writable("")
    let numItems = 0;
    let outliner_view = writable(false);
    let selectedItems = writable([]);
    setContext("opmlContent", opmlContent);
    setContext("selectedItems", selectedItems);
    setContext("outliner_view", outliner_view);

    function updateCount(opmlText) {
        if (browser) {
            if (opmlText === "") {
                numItems = 0;
                return;
            }
            numItems = opml.countFeeds(opml.parse(opmlText));
        }
    }

    $: updateCount($opmlContent)

    function handleFileSelect(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                $opmlContent = xmlFormat(String(e.target.result));
            };
            reader.readAsText(file);
        }
    }

    function saveToFile() {
        const blob = new Blob([$opmlContent], { type: "text/xml" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "feeds.opml";
        a.click();
        URL.revokeObjectURL(url);
    }

    function mergeOPML() {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".opml";
        input.onchange = function(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const newOPML = xmlFormat(String(e.target.result));
                    $opmlContent = xmlFormat(opml.merge($opmlContent, newOPML));
                };
                reader.readAsText(file);
            }
        };
        input.click();
    }
</script>

<svelte:head>
    <title>OPML Online Editor</title>
    <meta name="description" content="Free OPML Editor. Online editor to create, edit, and merge OPML files easily.">
</svelte:head>

<div class="flex flex-col items-center">
    <h1 class="text-4xl font-bold mt-8">Free Online OPML Editor</h1>
</div>
<div class="flex flex-col grow w-full items-center mt-8">
    {#if $opmlContent === ""}
        <div class="flex w-full h-96 grow overflow-y-auto relative mt-4 p-2 border-2 rounded-xl items-center justify-center bg-slate-100">
            <label for="opmlFile" class="absolute text-lg text-center m-auto opacity-70 z-10 pointer-events-none">
                <div><svg xmlns="http://www.w3.org/2000/svg" class="inline-block w-16 text-gray-500 mb-4" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 20h12m-6-4V4m0 0l3.5 3.5M12 4L8.5 7.5"/></svg></div>
                Upload an OPML file or <button class="text-sky-500 hover:text-sky-700 pointer-events-auto" on:click={() => { $opmlContent = xmlFormat(opml.createEmpty()) }}>Create a new one</button>
            </label>
            <input type="file" accept=".opml" on:change={handleFileSelect} class="opacity-0 w-full h-full cursor-pointer"/>
        </div>
    {:else if $outliner_view}
        <div class="flex flex-col w-full h-96 flex-grow mt-4 border-2 rounded-xl">
            <OutlinerView data="{opml.parse($opmlContent)}" />
        </div>
    {:else }
        <div class="flex flex-col w-full h-96 flex-grow mt-4 border-2 rounded-xl">
            <div class="sticky top-0 flex flex-row gap-1 bg-white z-10 w-full rounded-t-xl p-0.5 border-b-2">
                <button class="flex flex-row gap-2 py-1 px-2 items-center rounded-lg hover:bg-slate-200" on:click={saveToFile} disabled={$opmlContent === "" }>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 20h12M12 4v12m0 0l3.5-3.5M12 16l-3.5-3.5"/></svg>
                    Save file
                </button>
                <button class="flex flex-row gap-2 py-1 px-2 items-center rounded-lg hover:bg-slate-200" on:click={mergeOPML} disabled={$opmlContent === "" }>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M22 14V8.5M6 13V6a3 3 0 0 1 3-3h5m2.992 1h3m3 0h-3m0 0V1m0 3v3M12 21H6a4 4 0 0 1 0-8h12a4 4 0 1 0 4 4v-3"/></svg>
                    Add file
                </button>
                <button class="flex flex-row gap-2 py-1 px-2 items-center rounded-lg hover:bg-slate-200" on:click={() => { $opmlContent = xmlFormat(opml.removeDupes($opmlContent)) }} disabled={$opmlContent === "" }>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M7 2h9.5L21 6.5V19"/><path d="M11 22h5.5a1.5 1.5 0 0 0 1.5-1.5V8.749a.6.6 0 0 0-.176-.425l-3.148-3.148A.6.6 0 0 0 14.25 5H4.5A1.5 1.5 0 0 0 3 6.5V13m-1.008 6h6"/><path d="M14 5v3.4a.6.6 0 0 0 .6.6H18"/></g></svg>
                    Remove duplicates
                </button>
                <button class="flex flex-row gap-2 py-1 px-2 items-center rounded-lg ml-auto hover:bg-slate-200" on:click={() => $outliner_view = !$outliner_view}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M3 13c3.6-8 14.4-8 18 0"/><path d="M12 17a3 3 0 1 1 0-6a3 3 0 0 1 0 6"/></g></svg>
                    Outliner view
                </button>
            </div>
            <div class="p-2 flex-grow overflow-y-auto">
                <CodeMirror bind:value={$opmlContent} lang={xml()} />
            </div>
        </div>
    {/if}
</div>
<div class="flex flex-row w-full items-center mt-4 gap-2 flex-wrap">
    <p class="text-lg">Number of feeds: {numItems}</p>
</div>
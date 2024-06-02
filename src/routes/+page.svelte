<script>
    import CodeMirror from "svelte-codemirror-editor";
    import { xml } from "@codemirror/lang-xml";
    import xmlFormat from "xml-formatter";
    import opml from "$lib/opml.js";
    import {browser} from "$app/environment";

    let opmlText;
    let numItems = 0;
    $: numItems = browser && opml.countFeeds(opml.parse(opmlText));

    function handleFileSelect(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                opmlText = xmlFormat(String(e.target.result));
                const outline = opml.parse(opmlText);
                numItems = opml.countFeeds(outline);
            };
            reader.readAsText(file);
        }
    }

    function saveToFile() {
        const blob = new Blob([opmlText], { type: "text/xml" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "feeds.opml";
        a.click();
        URL.revokeObjectURL(url);
    }
</script>

<svelte:head>
    <title>OPML Online Editor</title>
    <meta name="description" content="Free online editor to create, edit, and merge OPML files.">
</svelte:head>

<main class="container mx-auto flex flex-col grow items-center p-4">
    <h1 class="text-4xl font-bold mt-8">Free Online OPML Editor</h1>
    <div class="flex flex-col grow w-full items-center mt-8">
        <button class="bg-sky-500 hover:bg-sky-700 text-white py-2 px-4 rounded-lg mt-4 disabled:bg-slate-500 disabled:opacity-50 disabled:cursor-not-allowed" on:click={() => { opmlText = xmlFormat(opml.removeDupes(opmlText)) }} disabled={opmlText === "" }>Remove duplicates</button>

        {#if opmlText === ""}
            <div class="flex w-full h-96 grow overflow-y-auto relative mt-4 p-2 border-2 rounded-xl items-center justify-center bg-slate-100">
                <label for="opmlFile" class="absolute text-lg m-auto opacity-70 z-10">
                    <div class="text-center"><svg xmlns="http://www.w3.org/2000/svg" class="inline-block w-16 text-gray-500 mb-4" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 20h12m-6-4V4m0 0l3.5 3.5M12 4L8.5 7.5"/></svg></div>
                    Upload an OPML file or <button class="text-sky-500 hover:text-sky-700" on:click={() => { opmlText = xmlFormat(opml.createEmpty()) }}>Create a new one</button>
                </label>
                <input type="file" accept=".opml" on:change={handleFileSelect} class="opacity-0 w-full h-full cursor-pointer"/>
            </div>
        {:else }
            <CodeMirror class="w-full h-96 grow overflow-y-auto mt-4 p-2 border-2 rounded-xl" bind:value={opmlText} lang={xml()} />
        {/if}
    </div>
    <div class="flex flex-row w-full items-center mt-4 gap-2 flex-wrap">
        <p class="text-lg">Number of feeds: {numItems}</p>
        <button class="bg-sky-500 hover:bg-sky-700 text-white py-2 px-4 rounded-lg disabled:bg-slate-500 disabled:opacity-50 disabled:cursor-not-allowed" on:click={() => { saveToFile() }} disabled={opmlText === "" }>Save file</button>
    </div>
</main>

<footer>
    <div class="flex flex-wrap container mx-auto justify-center items-center gap-2 mt-4 mb-2">
    <p>
        By <a href="https://www.imadij.com">Imad Aldij</a>
    </p>
    <a class="flex flex-row space-x-2 bg-gray-100 border border-gray-300 hover:bg-gray-200 items-center font-semibold rounded-md p-2 md:py-2 md:px-3" href="https://github.com/imdj/opml-editor">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-auto inline-block" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M16 22.027v-2.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7a5.44 5.44 0 0 0-1.5-3.75a5.07 5.07 0 0 0-.09-3.77s-1.18-.35-3.91 1.48a13.4 13.4 0 0 0-7 0c-2.73-1.83-3.91-1.48-3.91-1.48A5.07 5.07 0 0 0 5 5.797a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7a3.37 3.37 0 0 0-.94 2.58v2.87"/><path d="M9 20.027c-3 .973-5.5 0-7-3"/></g></svg>
        <span class="flex-none">Source code on GitHub</span>
    </a>
    </div>
</footer>
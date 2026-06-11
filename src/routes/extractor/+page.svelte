<script>
    import { goto } from '$app/navigation';
    import {getContext} from "svelte";

    const opml = getContext("state");
    const title = "Extract URLs from OPML";
    let input = $state("");
    let output = $state("");
    let showOutput = $state(false);

    function extractURLs() {
        if (!input.trim()) return;

        const parser = new DOMParser();
        const doc = parser.parseFromString(input, "text/xml");
        const outlines = doc.querySelectorAll("outline[xmlUrl]");
        const urls = [...new Set([...outlines].map(o => o.getAttribute("xmlUrl")))];
        output = urls.join("\n");
        showOutput = true;
    }

    function copyToClipboard() {
        navigator.clipboard.writeText(output);
    }

    function switchToEditor() {
        opml.rawContent = input;
        goto('/');
    }
</script>

<svelte:head>
    <title>{title} - Online OPML Editor</title>
</svelte:head>

<div class="flex flex-col text-center">
    <h1 class="text-2xl md:text-4xl font-bold mt-4 md:mt-8 mb-2 text-[#00004b]">Extract URLs from OPML</h1>
    <p class="text-base md:text-2xl mb-2 md:mb-4 text-[#0052ff]">Extract all feed URLs from your OPML file into a plain text list</p>
</div>

<div class="w-full grid grid-cols-1 lg:grid-cols-2 gap-2">
    <textarea
        class="min-h-56 lg:h-96 p-2 border-2 rounded-xl {showOutput ? 'hidden lg:block' : ''}"
        bind:value={input}
        placeholder="Paste your OPML content here...">
    </textarea>

    <div class="flex flex-row items-center mt-2 gap-2 flex-wrap lg:order-last">
        <button
            class="flex flex-row space-x-2 text-white bg-gray-800 hover:bg-black items-center font-semibold rounded-md p-2 no-underline md:py-2 md:px-3"
            onclick={extractURLs}>Extract URLs</button>
        <button
            class="flex flex-row space-x-2 text-white bg-gray-800 hover:bg-black items-center font-semibold rounded-md p-2 no-underline md:py-2 md:px-3"
            disabled={output === ""}
            onclick={copyToClipboard}>Copy to Clipboard</button>
        <button
            class="flex flex-row space-x-2 text-white bg-gray-800 hover:bg-black items-center font-semibold rounded-md p-2 no-underline md:py-2 md:px-3"
            disabled={input === ""}
            onclick={switchToEditor}>Continue in Editor</button>
        <button
            class="flex flex-row space-x-2 text-white bg-gray-800 hover:bg-black items-center font-semibold rounded-md p-2 no-underline md:py-2 md:px-3 lg:hidden"
            class:hidden={!showOutput}
            onclick={() => showOutput = false}>← Back to Input</button>
    </div>

    <textarea
        class="min-h-56 lg:h-96 p-2 border-2 rounded-xl {showOutput ? '' : 'hidden lg:block'}"
        readonly
        bind:value={output}
        placeholder="Extracted URLs will appear here, one per line">
    </textarea>
</div>

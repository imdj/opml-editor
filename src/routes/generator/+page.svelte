<script>
    import { goto } from '$app/navigation';
    import CodeView from "$lib/components/CodeView.svelte";
    import {getContext, onMount } from "svelte";
    import xmlFormat from "xml-formatter";

    const opml = getContext("state");
    const title = "OPML Generator from URLs";
    let input = $state("");
    let output = $state("");

    function generateOPML() {
        let urlList = input.split("\n").map(url => url.trim());
        
        let feeds = urlList.map(url => `<outline type="rss" text="${url}" xmlUrl="${url}"/>`).join("\n");

        output = `<?xml version="1.0" encoding="UTF-8"?>
                <opml version="2.0">
                    <head>
                        <title>Subscriptions</title>
                    </head>
                    <body>
                        ${feeds}
                    </body>
                </opml>`;

        output = xmlFormat(output, { lineSeparator: '\n' });
    }

    function switchToEditor() {
        opml.rawContent = output;
        goto('/');
    }
</script>

<svelte:head>
    <title>{title} - Online OPML Editor</title>
</svelte:head>

<div class="flex flex-col text-center">
    <h1 class="text-2xl md:text-4xl font-bold mt-4 md:mt-8 mb-2 text-[#00004b]">Free Online OPML Generator</h1>
    <p class="text-base md:text-2xl mb-2 md:mb-4 text-[#0052ff]">Turn your list of feeds URLs into an OPML file</p>
</div>

<div class="w-full grid grid-cols-1 lg:grid-cols-2 gap-2">
    <textarea class="min-h-56 lg:h-96 p-2 border-2 rounded-xl" bind:value={input}
    placeholder="https://example.com/feed.xml
https://example.com/feed2.xml
https://example.com/feed3.xml
...">
    </textarea>

    <div class="flex flex-row items-center mt-2 gap-2 flex-wrap lg:order-last">
        <button class="flex flex-row space-x-2 text-white bg-gray-800 hover:bg-black items-center font-semibold rounded-md p-2 no-underline md:py-2 md:px-3" onclick={generateOPML}>Generate OPML</button>
        <button class="flex flex-row space-x-2 text-white bg-gray-800 hover:bg-black items-center font-semibold rounded-md p-2 no-underline md:py-2 md:px-3" disabled={output === ""} onclick={switchToEditor}>Continue in Editor</button>
    </div>
    
    <div class="flex min-h-56 border-2 rounded-xl">
        <CodeView bind:content={output} placeholder="Generated OPML will be displayed here" readonly/>
    </div>
</div>

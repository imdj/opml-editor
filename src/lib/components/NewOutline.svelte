<script>
    import {getContext} from "svelte";
    import {opmlNode} from "$lib/opml.svelte.js";

    let { index = 0 } = $props();
    let show = $state(false);

    let feedText = $state("");
    let feedUrl = $state("");

    const opml = getContext("state");

    function get_attributes() {
        let attributes = new Map();

        attributes.set("text", feedText);

        if (feedUrl) {
            attributes.set("xmlUrl", feedUrl);
            attributes.set("type", "rss");
        }

        return attributes;
    }

    function addOutline() {

        const id = opml.generateId();

        const outline = new opmlNode(id, opml.body.id);
        outline.tagName = "outline";

        outline.attributes = get_attributes();

        opml.insertNode(outline.parent_id, outline, index);

        show = false;
    }
</script>

{#if show}
    <form class="relative flex flex-col gap-2 p-2 border border-dashed rounded-lg" onsubmit={addOutline}>
        <button class="absolute self-end" type="button" onclick={() => show = false}>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243"/></svg>
        </button>
        <label for="feed-text">Text</label>
        <input type="text" id="feed-text" placeholder="Enter text" class="w-full p-1 border border-gray-300 rounded-md" bind:value={feedText} required/>
        <label for="feed-url">URL (Optional)</label>
        <input type="url" id="feed-url" placeholder="Enter URL" class="w-full p-1 border border-gray-300 rounded-md" bind:value={feedUrl}/>
        <button type="submit" class="inline-flex mx-auto min-w-20 justify-center align-text-bottom px-4 py-1 rounded-md bg-green-300 hover:bg-green-400">Add outline</button>
    </form>
{:else}
    <button class="group relative w-full h-full text-xs max-h-6 hover:max-h-12 transition-max-h" onclick={() => show = true}>
        <span class="relative inline-flex flex-row px-1.5 h-fit items-center align-middle gap-1 rounded-full border-2 border-gray-300 bg-white z-10 group-hover:border-green-300 group-hover:bg-green-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 12h4m4 0h-4m0 0V8m0 4v4m0 6c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10"/></svg>
            <span class="mr-1">Add new outline</span>
        </span>
        <hr class="absolute w-full top-1/2 border border-gray-300 group-hover:border-green-300"/>
    </button>
{/if}

<style>
    button.transition-max-h {
        transition: max-height 0.4s ease;
    }

    button.transition-max-h:hover {
        transition: max-height 0.6s ease-in;
    }
</style>
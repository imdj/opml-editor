<script>
    import {getContext} from "svelte";
    import {opmlNode} from "$lib/opml.svelte.js";

    let {parentID, index = 0, isOpen = $bindable() } = $props();

    const opml = getContext("state");

    let feedText = $state("");
    let feedUrl = $state("");

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

        const outline = new opmlNode(id, parentID);
        outline.tagName = "outline";
        outline.attributes = get_attributes();

        opml.insertNode(outline.parent_id, outline, index);
        
        isOpen = false;
    }
</script>

<form class="relative flex flex-col gap-2 p-2 border border-dashed rounded-lg" onsubmit={addOutline}>
    <button class="absolute self-end" type="button" onclick={() => isOpen = false}>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243"/></svg>
    </button>
    <label for="feed-text">Text</label>
    <input type="text" id="feed-text" placeholder="Enter text" class="w-full p-1 border border-gray-300 rounded-md" bind:value={feedText} required/>
    <label for="feed-url">URL (Optional)</label>
    <input type="url" id="feed-url" placeholder="Enter URL" class="w-full p-1 border border-gray-300 rounded-md" bind:value={feedUrl}/>
    <button type="submit" class="inline-flex mx-auto min-w-20 justify-center align-text-bottom px-4 py-1 rounded-md bg-green-300 hover:bg-green-400">Add outline</button>
</form>
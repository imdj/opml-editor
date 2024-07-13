<script>
    import { enhance } from "$app/forms";
    import {getContext} from "svelte";

    let { showModal = $bindable()} = $props();

    let opml = getContext("state");
    let dialogElement = $state(null);
    let feedURL = $state("");

    $effect(() => {
        if (dialogElement && showModal) {
            dialogElement.showModal();
        }
    });

    function addFeed(feedData) {
        opml.addFeed(feedData.title, feedData.xmlUrl, feedData.htmlUrl);
        dialogElement.close();
    }
</script>


<dialog class="modal" bind:this={dialogElement} onclose={() => {feedURL = ""; showModal = false }}>
    <div class="flex flex-row mb-4">
        <h2 class="flex-grow text-xl font-normal m-0">Add feed by URL</h2>
        <button onclick={() => dialogElement.close()}>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
    </div>
    <form method="POST" action="?/fetchFeedInfo" use:enhance={() => {
        return async ({ result }) => {
            addFeed(result.data)
        }}}>
        <input name="feed-url" class="block w-full rounded px-2 py-1 border-2 border-gray-300 mb-2" type="url" placeholder="Enter URL" bind:value={feedURL} />
        <button class="inline-flex mx-auto min-w-20 justify-center align-text-bottom px-4 py-1 rounded-md border border-gray-300 hover:bg-green-300">Add feed</button>
    </form>
</dialog>

<style>
    .modal {
        @apply relative p-4 w-80 bg-white rounded-lg shadow-lg;
    }
</style>
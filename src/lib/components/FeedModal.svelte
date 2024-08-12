<script>
    import { enhance } from "$app/forms";
    import {getContext} from "svelte";

    let { showModal = $bindable()} = $props();

    let opml = getContext("state");
    let dialogElement = $state(null);
    let feedURL = $state("");
    let errorMessage = $state("");
    let successMessage = $state("");

    $effect(() => {
        if (dialogElement && showModal) {
            dialogElement.showModal();
        }
    });

    function addDefaultFeed() {
        let url = new URL(feedURL);
        addFeed({
            title: url.hostname,
            xmlUrl: url.href,
            htmlUrl: url.origin
        });
    }

    function resetForm() {
        feedURL = "";
        errorMessage = "";
        successMessage = "";
    }

    function addFeed(feedData) {
        opml.addFeed(feedData.title, feedData.xmlUrl, feedData.htmlUrl);

        // Display the message briefly before closing the dialog
        successMessage = feedData.xmlUrl + " added successfully!";
        setTimeout(() => {
            dialogElement.close();
        }, 1500);
    }
</script>


<dialog class="modal" bind:this={dialogElement} onclose={() => { resetForm(); showModal = false }}>
    <div class="flex flex-row mb-4">
        <h2 class="flex-grow text-xl font-normal m-0">Add feed by URL</h2>
        <button onclick={() => dialogElement.close()}>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
    </div>
    {#if successMessage}
        <p class="text-green-500 text-sm mb-2">{successMessage}</p>
    {:else}
        <form method="POST" action="?/fetchFeedInfo" use:enhance={() => {
            return async ({ result }) => {
                if (result.error) {
                    errorMessage = "Error! " + result.error.message;
                } else {
                    addFeed(result.data)
                }
            }}}>
            <input name="feed-url" class="block w-full rounded px-2 py-1 border-2 border-gray-300 mb-2" type="url" placeholder="Enter URL" bind:value={feedURL} />
            {#if errorMessage}
                <p class="text-red-500 text-sm mb-2">{errorMessage}</p>
                <p class="text-sm mb-2">Note: you can ignore this error and force add the feed</p>
                <button class="inline-flex mx-auto min-w-20 justify-center align-text-bottom px-4 py-1 rounded-md border border-gray-300 hover:bg-green-300" onclick={addDefaultFeed}>Proceed</button>
            {:else}
                <button class="inline-flex mx-auto min-w-20 justify-center align-text-bottom px-4 py-1 rounded-md border border-gray-300 hover:bg-green-300">Add feed</button>
            {/if}
        </form>
    {/if}
</dialog>

<style>
    .modal {
        @apply relative p-4 w-80 bg-white rounded-lg shadow-lg;
    }
</style>
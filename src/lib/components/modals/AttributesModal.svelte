<script>
    import {getContext} from "svelte";
    import {SvelteMap} from 'svelte/reactivity';

    let { showModal = $bindable()} = $props();
    
    const opml = getContext("state");
    let dialogElement = $state(null);

    let attributesStatus = new SvelteMap();

    $effect(() => {
        // only populate initially without being reactive to changes
        // as that proved to cause issues and prevent the dialog from closing after applying changes
        if (!attributesStatus.size) {
            opml.getAllAttributes().forEach(attr => attributesStatus.set(attr, true));
        }
    });

    $effect(() => {
        if (dialogElement && showModal) {
            dialogElement.showModal();
        }
    });

    function applyChanges() {
        attributesStatus.forEach((status, attr) => {
            if (!status) {
                opml.deleteAttributeForAll(attr);
            }
        })
        dialogElement.close();
    }
</script>

<dialog class="modal" bind:this={dialogElement} onclose={() => {attributesStatus.clear(); showModal = false;}}>
    <div class="flex flex-row mb-2">
        <h2 class="flex-grow text-xl font-normal m-0">Enabled Attributes</h2>
        <button onclick={() => dialogElement.close()}>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
    </div>
    <p class="mb-2">Unchecked attributes will be removed from all instances</p>
    {#if attributesStatus.size}
    <ul class="flex flex-col rounded-md border-2 p-2 max-h-24 overflow-y-auto">
        {#each attributesStatus as [attr, status]}
            <li>
                <input type="checkbox" id={attr} onchange={e => attributesStatus.set(attr, e.target.checked)} checked={status}/>
                <label for={attr}>{attr === "text" ? attr + " (required)" : attr}</label>
            </li>
        {/each}
    </ul>
    <p class="text-sm text-red-500 my-2">Warning: The changes cannot be undone. Review before applying.</p>
    <button class="inline-flex mx-auto min-w-20 justify-center align-text-bottom px-4 py-1 rounded-md border border-gray-300 hover:bg-green-300" onclick={() => applyChanges()}>Apply</button>
    {:else}
    <p>No attributes found</p>
    {/if}
</dialog>

<style>
    .modal {
        @apply relative p-4 w-96 bg-white rounded-lg shadow-lg z-50;
    }
</style>
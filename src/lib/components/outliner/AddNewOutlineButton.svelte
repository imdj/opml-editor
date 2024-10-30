<script>
    import NewOutline from "$lib/components/outliner/NewOutline.svelte";
    let {parentID, index, show = false } = $props();
</script>

{#if show}
    <NewOutline bind:isOpen={show} {index} {parentID}/>
{:else}
    <button class="relative w-full h-2 hover:h-6 opacity-40 hover:opacity-100 transition-all duration-300" onclick={() => show = true} aria-label="Add new outline">
        <div class="absolute flex flex-row w-full h-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="min-h-4 max-h-6 top-1/2 translate-y-[-50%] text-gray-500" viewBox="0 0 24 24">
                <!-- Plus sign -->
                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 5v14m-7-7h14"/>
            </svg>
            <div class="flex-grow h-0.5 bg-gray-500 border-dashed border-t top-1/2 translate-y-[-50%] border-gray-500"></div>
        </div>
    </button>
{/if}
<script>
    import {getContext} from "svelte";
    import Outline from "$lib/components/Outline.svelte";
    import opml from "$lib/opml.js";

    let opmlContent = getContext('opmlContent');
    let selectedItems = getContext('selectedItems');
    let outliner_view = getContext('outliner_view');

    export let data;

    $: all_selected = data.length === $selectedItems.length && $selectedItems.length > 0 && data.every(item => $selectedItems.some(e => e.id === item.id));

    function selectAll() {
        if (all_selected) {
            $selectedItems = [];
            all_selected = false;
        }
        else {
            $selectedItems = data;
            all_selected = true;
        }
    }

    function deleteSelected() {
        $opmlContent = opml.removeItems($opmlContent, $selectedItems);
        $selectedItems = [];
    }
</script>

<div class="sticky top-0 flex flex-row gap-1 bg-white z-10 w-full rounded-t-xl p-0.5 border-b-2">
    <button class="flex flex-row gap-2 py-1 px-2 items-center rounded-lg hover:bg-slate-200" on:click={() => selectAll()}>
        <input type="checkbox" checked={all_selected} class="mr-1"/>
        {all_selected? 'Deselect all' : 'Select all'}
    </button>
    <button class="flex flex-row gap-2 py-1 px-2 items-center rounded-lg hover:bg-slate-200" on:click={deleteSelected} disabled={$selectedItems.length === 0}>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M14.871 19.121L16.993 17m2.121-2.121L16.993 17m0 0l-2.122-2.121M16.993 17l2.121 2.121"/><path d="M4 9.4V4.6a.6.6 0 0 1 .6-.6h4.8a.6.6 0 0 1 .6.6v4.8a.6.6 0 0 1-.6.6H4.6a.6.6 0 0 1-.6-.6Zm0 10v-4.8a.6.6 0 0 1 .6-.6h4.8a.6.6 0 0 1 .6.6v4.8a.6.6 0 0 1-.6.6H4.6a.6.6 0 0 1-.6-.6Zm10-10V4.6a.6.6 0 0 1 .6-.6h4.8a.6.6 0 0 1 .6.6v4.8a.6.6 0 0 1-.6.6h-4.8a.6.6 0 0 1-.6-.6Z"/></g></svg>
        Remove selected
    </button>
    <button class="flex flex-row gap-2 py-1 px-2 items-center rounded-lg ml-auto hover:bg-slate-200" on:click={() => $outliner_view = !$outliner_view}>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13.5 6L10 18.5m-3.5-10L3 12l3.5 3.5m11-7L21 12l-3.5 3.5"/></svg>
        Raw OPML view
    </button>
</div>
<div class="p-2 flex-grow overflow-y-auto">
    <ul>
        {#each data as item}
            <li class="hover:bg-gray-200" class:bg-gray-200={$selectedItems.some(e => e.id === item.id)}>
                <Outline isSelected={$selectedItems.some(e => e.id === item.id)} {item}/>
            </li>
        {/each}
    </ul>
</div>

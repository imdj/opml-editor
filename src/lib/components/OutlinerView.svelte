<script>
    import {getContext} from "svelte";
    import Outline from "$lib/components/Outline.svelte";

    let selectedItems = getContext('selectedItems');
    let outliner_view = getContext('outliner_view');

    export let data;

    $: all_selected = data.length === $selectedItems.length && data.every(item => $selectedItems.some(e => e.id === item.id));

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
</script>

<div class="sticky top-0 flex flex-row bg-white z-10 w-full rounded-t-xl p-0.5 border-b-2">
    <button class="flex flex-row gap-2 py-1 px-2 items-center rounded-lg hover:bg-slate-200" on:click={() => selectAll()}>
        <input type="checkbox" checked={all_selected} class="mr-1"/>
        {all_selected? 'Deselect all' : 'Select all'}
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

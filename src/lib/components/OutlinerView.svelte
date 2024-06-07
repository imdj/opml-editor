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

<div class="flex flex-row justify-between">
    <div class="flex flex-row">
        <button class="py-1 px-2" on:click={() => selectAll()}>
            <input type="checkbox" checked={all_selected} class="mr-1"/>
            {all_selected? 'Deselect all' : 'Select all'}
        </button>
    </div>
    <button class="py-1 px-2 ml-auto" on:click={() => $outliner_view = !$outliner_view}>Toggle outliner view</button>
</div>
<ul>
    {#each data as item}
        <li class="hover:bg-gray-200" class:bg-gray-200={$selectedItems.some(e => e.id === item.id)}>
            <Outline isSelected={$selectedItems.some(e => e.id === item.id)} {item}/>
        </li>
    {/each}
</ul>


<script>
    import {decodeValue} from "$lib/opml.js";
    import {getContext} from "svelte";
    import {selectChildren, deselectChildren, checkParent} from "$lib/utils.js";

    let opml = getContext("state");

    let { item = $bindable()} = $props();
    let isSelected = $derived(opml.selectedItems.includes(item.id));

    /*
    - if parent is selected then all children should be selected
    - if any child is unselected then its parent cannot be selected
    - if all children are selected then parent should be selected automatically
     */
    function selectItem(id) {
        if (!isSelected) {
            opml.selectItem = id;
            selectChildren(item.children);
        }
        else {
            opml.deselectItem = id;
            deselectChildren(item.children);
        }

        checkParent(item.parent_id);
    }
</script>

<div class="flex flex-row w-full py-1 px-2" >
    <input type="checkbox" class="mr-2 self-baseline mt-3" checked={isSelected} oninput={() => selectItem(item.id)} />

    {#if !item.attributes.xmlUrl}
        <details class="flex-grow text-start" open>
            <summary class="text-2xl">
                {decodeValue(item.attributes.text)}
            </summary>
            {#if item.children.length}
                <ul class="ml-4">
                    {#each item.children as child}
                        <li><svelte:self item={child}/></li>
                    {/each}
                </ul>
            {:else}
                <p class="ml-4 opacity-50">No feeds</p>
            {/if}
        </details>
    {:else}
        <div class="flex-grow text-start">
            <div class="text-2xl">{decodeValue(item.attributes.text)}</div>
            <a href={item.attributes.xmlUrl} class="text-gray-500" target="_blank">{item.attributes.xmlUrl}</a>
        </div>
    {/if}
</div>
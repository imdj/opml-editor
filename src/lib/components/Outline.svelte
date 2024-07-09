<script>
    import {decodeValue} from "$lib/opml.js";
    import {getContext} from "svelte";

    let opml = getContext("state");

    let { item = $bindable()} = $props();
    let isSelected = $derived(opml.selectedItems.has(item.id));

    /*
    - if parent is selected then all children should be selected
    - if any child is unselected then its parent cannot be selected
    - if all children are selected then parent should be selected automatically
     */
    function selectItem(id) {
        if (!isSelected) {
            opml.selectedItems.add(id);
            item.selectChildren(opml);
        }
        else {
            opml.selectedItems.delete(id);
            item.deselectChildren(opml);
        }

        item.checkParent(opml);
    }
</script>

<div class="flex flex-row w-full py-1 px-2 border border-gray-200 hover:bg-gray-200" >
    <input type="checkbox" class="mr-2 self-baseline mt-3" checked={isSelected} title={"This items " + item.id + " is selected: " + isSelected} oninput={() => selectItem(item.id)} />

    {#if !item.attributes.get('xmlUrl')}
        <details class="flex-grow text-start" open>
            <summary class="text-2xl">
                {decodeValue(item.attributes.get('text'))}
            </summary>
            {#if item.children.length}
                <ul class="flex flex-col gap-2 ml-4">
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
            <div class="text-2xl">{decodeValue(item.attributes.get('text'))}</div>
            <a href={item.attributes.get('xmlUrl')} class="text-gray-500" target="_blank">{item.attributes.get('xmlUrl')}</a>
        </div>
    {/if}
</div>
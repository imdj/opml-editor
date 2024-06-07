<script>
    import {getContext} from "svelte";

    let selectedItems = getContext('selectedItems');

    export let item;
    export let isSelected = false;

    function select() {
        if ($selectedItems.some(e => e.id === item.id)) {
            $selectedItems = $selectedItems.filter(e => e.id !== item.id);
            isSelected = false;
        } else {
            $selectedItems.push(item);
            isSelected = true;
        }
    }
</script>


<button class="flex flex-row w-full py-1 px-2" on:click={() => select()}>
    <input type="checkbox" class="mr-2 self-baseline mt-3" checked={isSelected} />

    {#if !item.attributes.xmlUrl}
        <details class="flex-grow text-start" open>
            <summary class="text-2xl mt-2">
                {item.attributes.title}
            </summary>
            {#if item.children && item.children.length > 0}
                <ul>
                    {#each item.children as child}
                        <li><svelte:self item={child}/></li>
                    {/each}
                </ul>
            {:else}
                <p class="opacity-50">No feeds</p>
            {/if}
        </details>
    {:else}
        <div class="flex-grow text-start">
            <div class="text-2xl">{item.attributes.title}</div>
            <a href={item.attributes.xmlUrl} target="_blank">{item.attributes.xmlUrl}</a>
        </div>
    {/if}
</button>
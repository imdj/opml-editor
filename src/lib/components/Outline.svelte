<script>
    import {decodeValue} from "$lib/opml.js";
    import {getContext} from "svelte";

    let opml = getContext("state");

    let { item = $bindable()} = $props();
    let isSelected = $derived(opml.selectedItems.has(item.id));

    let showMenu = $state(false);

    function handleMenu(node) {
        function onClickOutside(event) {
            if (!node.contains(event.target)) {
                showMenu = false;
            }
        }

        document.body.addEventListener('click', onClickOutside);

        return {
            destroy() {
                document.body.removeEventListener('click', onClickOutside);
            }
        };
    }

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

<div class="outline-container relative flex flex-row w-full p-2 border-2 rounded-md bg-white border-gray-200">
    <input type="checkbox" class="mr-2 self-baseline mt-3" checked={isSelected} title={"This items " + item.id + " is selected: " + isSelected} oninput={() => selectItem(item.id)} />

    {#if !item.attributes.get('xmlUrl')}
        <details class="flex-grow text-start" open>
            <summary class="text-2xl align-top">{decodeValue(item.attributes.get('text'))}</summary>
            {#if item.children.length}
                <ul class="flex flex-col gap-2 ml-4 mt-2">
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
            <div class="text-2xl align-top">{decodeValue(item.attributes.get('text'))}</div>
            <a href={item.attributes.get('xmlUrl')} class="text-gray-500" target="_blank">{item.attributes.get('xmlUrl')}</a>
        </div>
    {/if}
    <div class="absolute flex flex-row-reverse gap-1 p-1 right-1 top-1 rounded-full border-2 border-transparent" class:open-menu={showMenu}  use:handleMenu>
        <button class="rounded-full opacity-30 size-6 hover:opacity-100 hover:bg-gray-300" title="Open menu" class:hidden={showMenu} onclick={() => showMenu = true}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path fill="currentColor" d="M12 7.5a.5.5 0 1 0 0-1a.5.5 0 0 0 0 1m0 10a.5.5 0 1 0 0-1a.5.5 0 0 0 0 1m0-5a.5.5 0 1 0 0-1a.5.5 0 0 0 0 1"/><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10"/></g></svg>
        </button>
        <button class="rounded-full size-6 hover:bg-gray-300" title="Close" class:hidden={!showMenu} onclick={() => showMenu = false}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 14.828L12.001 12m2.828-2.828L12.001 12m0 0L9.172 9.172M12.001 12l2.828 2.828M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10"/></svg>        </button>
        <button class="rounded-full size-6 p-0.5 hover:bg-gray-300" title="Move up" class:hidden={!showMenu} onclick={() => item.moveUp(opml)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 21V3m0 0l8.5 8.5M12 3l-8.5 8.5"/></svg>
        </button>
        <button class="rounded-full size-6 p-0.5 hover:bg-gray-300" title="Move down" class:hidden={!showMenu} onclick={() => item.moveDown(opml)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 3v18m0 0l8.5-8.5M12 21l-8.5-8.5"/></svg>
        </button>
    </div>
</div>

<style>
    .outline-container:hover:not(:has(.outline-container:hover)) {
        @apply border-gray-400;
    }
    .open-menu {
        @apply bg-white border-gray-400;
    }
</style>
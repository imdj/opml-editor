<script>
    let { name, icon, items } = $props();

    let showMenu = $state(false);

    function performAction(callback) {
        callback();
        showMenu = false;
    }

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
</script>

<div class="relative" use:handleMenu>
    <button type="button" class="flex flex-row gap-2 py-1 px-2 whitespace-nowrap items-center rounded-lg hover:bg-slate-200" onclick={() => showMenu = !showMenu}>
        <span class="hidden sm:block">
        {#if icon}
            {@html icon}
        {/if}
        </span>
        <span>{name}</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m6 9l6 6l6-6"/></svg>
    </button>

    <div class="absolute shadow-2xl w-48 mt-2 rounded-lg bg-white p-1 z-30" class:hidden={!showMenu}>
        <ul>
            {#each items as item}
                <li>
                    <button type="button" class="flex flex-row gap-2 py-1 px-2 w-full whitespace-nowrap items-center rounded hover:bg-slate-200" onclick={() => performAction(item.callback)}>
                        {#if item.icon}
                            {@html item.icon}
                        {/if}
                        <span>{item.name}</span>
                    </button>
                </li>
            {/each}
        </ul>
    </div>
</div>
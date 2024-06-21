<script>
    import Outline from "$lib/components/Outline.svelte";
    import {getContext} from "svelte";

    const opml = getContext("state");

    let { classes } = $props();
</script>

<div class="p-2 flex-grow {classes}">
    <ul>
        {#each opml.body as item}
            <li class="hover:bg-gray-200" class:bg-gray-200={false}>
                <Outline isSelected={false} {item}/>
            </li>
        {/each}
    </ul>
</div>

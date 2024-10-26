<script>
    import Outline from "$lib/components/outliner/Outline.svelte";
    import {getContext} from "svelte";
    import NewOutline from "$lib/components/outliner/NewOutline.svelte";

    const opml = getContext("state");

    let { classes } = $props();
</script>

<div class="p-2 flex-grow {classes}">
    {#if !opml.body.children.length}
        <NewOutline/>
    {:else}
        <ul class="flex flex-col gap-2">
            {#each opml.body.children as item, index}
                <li>
                    <Outline {item} {index}/>
                </li>
            {/each}
        </ul>
    {/if}
</div>
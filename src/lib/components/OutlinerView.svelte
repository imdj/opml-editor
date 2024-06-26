<script>
    import Outline from "$lib/components/Outline.svelte";
    import {getContext} from "svelte";
    import NewOutline from "$lib/components/NewOutline.svelte";

    const opml = getContext("state");

    let { classes } = $props();
</script>

<div class="p-2 flex-grow {classes}">
    {#if !opml.body.length}
        <NewOutline/>
    {:else}
        <ul class="flex flex-col gap-2">
            <li class="new-outline overflow-y-hidden">
                <NewOutline/>
            </li>
            {#each opml.body as item, i}
                <li>
                    <Outline {item}/>
                </li>
                <li class="new-outline overflow-y-hidden">
                    <NewOutline index={i+1}/>
                </li>
            {/each}
        </ul>
    {/if}
</div>
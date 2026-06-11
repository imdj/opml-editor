<script>
    import OutlinerView from "$lib/components/OutlinerView.svelte";
    import CodeView from "$lib/components/CodeView.svelte";
    import InitialView from "$lib/components/InitialView.svelte";
    import ToolBar from "$lib/components/toolbar/ToolBar.svelte";
    import {viewMode} from "$lib/opml.svelte.js";

    import {getContext, onMount } from "svelte";
    import ShortcutBar from "$lib/components/toolbar/ShortcutBar.svelte";

    const opml = getContext("state");
    let view = $state(viewMode.CODE);
    let fullscreen = $state(false);
    const title = "Online OPML Editor: Manage your feed lists";

    // create a basic example initially to introduce the user to the app
    onMount(() => {
        if (!opml.rawContent) {
            opml.createBasic();
        }
    });
</script>

<svelte:head>
    <title>{title}</title>
</svelte:head>
    
{#if !fullscreen}
<div class="flex flex-col text-center">
    <h1 class="text-2xl md:text-4xl font-bold mt-4 md:mt-8 mb-2 text-[#00004b]">Free Online OPML Editor</h1>
    <p class="text-base md:text-2xl mb-2 md:mb-4 text-[#0052ff]" >Manage your feed subscription lists</p>
</div>
<ShortcutBar class="mt-2"/>
{/if}
<div class="flex flex-col w-full flex-grow mt-2 border-2 rounded-xl {fullscreen ? 'fixed inset-0 z-50 mt-0 rounded-none border-0 bg-white' : 'h-96'}">
    {#if !opml.rawContent }
        <InitialView />
    {:else}
        <ToolBar bind:view bind:fullscreen/>
        {#if view === viewMode.OUTLINER}
            <OutlinerView classes="overflow-y-auto"/>
        {:else}
            <CodeView bind:content={opml.rawContent}/>
        {/if}
    {/if}
</div>
{#if !fullscreen}
<div class="flex flex-row w-full items-center mt-2 gap-2 flex-wrap">
    <p class="text-lg">
        <span class="text-gray-500">Number of feeds:</span>
        <span class="px-1">{opml.numOfFeeds}</span>
    </p>
</div>
{/if}
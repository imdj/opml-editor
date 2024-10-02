<script>
    import Head from "$lib/components/Head.svelte";
    import OutlinerView from "$lib/components/OutlinerView.svelte";
    import CodeView from "$lib/components/CodeView.svelte";
    import InitialView from "$lib/components/InitialView.svelte";
    import ToolBar from "$lib/components/ToolBar.svelte";
    import {viewMode} from "$lib/opml.svelte.js";

    import {getContext, onMount } from "svelte";

    const opml = getContext("state");
    let view = $state(viewMode.CODE);

    // create a basic example initially to introduce the user to the app
    onMount(() => {
        if (!opml.rawContent) {
            opml.createBasic();
        }
    });
</script>

<Head title="Online OPML Editor: Manage your feed lists" extension={false}/>

<div class="flex flex-col text-center">
    <h1 class="text-2xl md:text-4xl font-bold mt-4 md:mt-8 mb-2 text-[#00004b]">Free Online OPML Editor</h1>
    <p class="text-base md:text-2xl mb-2 md:mb-4 text-[#0052ff]" >Manage your feed subscription lists</p>
</div>
<div class="flex flex-col w-full h-96 flex-grow mt-4 border-2 rounded-xl">
    {#if !opml.rawContent }
        <InitialView />
    {:else}
        <ToolBar bind:view/>
        {#if view === viewMode.OUTLINER}
            <OutlinerView classes="overflow-y-auto"/>
        {:else}
            <CodeView/>
        {/if}
    {/if}
</div>
<div class="flex flex-row w-full items-center mt-4 gap-2 flex-wrap">
    <p class="text-lg">
        <span class="text-gray-500">Number of feeds:</span>
        <span class="px-1">{opml.numOfFeeds}</span>
    </p>
</div>
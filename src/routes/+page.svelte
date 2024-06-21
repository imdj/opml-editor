<script>
    import OutlinerView from "$lib/components/OutlinerView.svelte";
    import CodeView from "$lib/components/CodeView.svelte";
    import InitialView from "$lib/components/InitialView.svelte";
    import ToolBar from "$lib/components/ToolBar.svelte";

    import {getContext} from "svelte";

    const opml = getContext("state");
</script>

<svelte:head>
    <title>OPML Online Editor</title>
    <meta name="description" content="Free OPML Editor. Online editor to create, edit, and merge OPML files easily.">
</svelte:head>

<div class="flex flex-col items-center">
    <h1 class="text-4xl font-bold mt-8">Free Online OPML Editor</h1>
</div>
<div class="flex flex-col grow w-full items-center mt-8">
    {#if !opml.rawContent}
        <InitialView bind:viewState={opml.outlineViewStatus} />
    {:else}
        <div class="flex flex-col w-full h-96 flex-grow mt-4 border-2 rounded-xl">
            <ToolBar bind:viewState={opml.outlineViewStatus}/>
            {#if opml.outlineViewStatus}
                <OutlinerView classes="overflow-y-auto"/>
            {:else}
                <CodeView classes="overflow-y-auto"/>
            {/if}
        </div>
    {/if}
</div>
<div class="flex flex-row w-full items-center mt-4 gap-2 flex-wrap">
    <p class="text-lg">Number of feeds: {opml.numFeeds}</p>
</div>
<script>
    const title = "Features";

    let features = [
        {
            title: "Create new OPML file",
            description: "Create a new OPML file from scratch and populate it with feeds",
        },
        {
            title: "Add feeds by URL",
            description: "Automatically fetching the feed info from its URL",
        },
        {
            title: "Merge OPML files",
            description: "Merge multiple OPML files into one without duplicates",
        },
        {
            title: "Remove duplicate feeds",
            description: "Remove any duplicate feeds from your subscription list",
        },
        {
            title: "Rearrange feeds",
            description: "Change the order of your feeds interactively",
        },
        {
            title: "Generate OPML from bulk URLs",
            description: "Turn a list of feed URLs into an OPML file with a single click",
        }
    ]
</script>

<svelte:head>
    <title>{title} - Online OPML Editor</title>
</svelte:head>

<h1 class="mb-12">Features</h1>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-flow-row gap-4">
    {#each features as {title, description}}
        <div class="w-full p-4 bg-white border-2 border-gray-200 rounded-lg">
            <h2 class="text-xl font-bold mt-0">{title}</h2>
            <p>{description}</p>
        </div>
    {/each}
</div>
<script>
    let { title, extension = true } = $props();

    let completeTitle = extension ? title + " - Online OPML Editor" : title;
</script>

<svelte:head>
    <link rel="icon" href="favicon.ico" type="image/x-icon" />
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <link rel="icon" type="image/png" href="/favicon.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="manifest" href="/site.webmanifest">
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#00004b">
    <meta name="msapplication-TileColor" content="#00004b">
    <meta name="theme-color" content="#ffffff">

    <title>{completeTitle}</title>
    <meta name="description" content="Online editor for feed lists. Create, edit, and manage your OPML files. Add new RSS/Atom feeds to the list, detect and remove duplicates, rearrange outlines, and easily merge multiple OPML files together.">
    <meta content="/thumbnail.jpg" property="og:image">
</svelte:head>
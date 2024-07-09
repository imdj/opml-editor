<script>
    import "../app.css";
    import Footer from "$lib/components/Footer.svelte";
    import Header from "$lib/components/Header.svelte";
    import {opmlDoc} from "$lib/opml.svelte.js";
    import {setContext} from "svelte";

    const opml = new opmlDoc();
    setContext("state", opml);
</script>

<svelte:head>
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="manifest" href="/site.webmanifest">
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#00004b">
    <meta name="msapplication-TileColor" content="#00004b">
    <meta name="theme-color" content="#ffffff">

    <meta content="/thumbnail.jpg" property="og:image">
</svelte:head>

<div class="flex flex-col min-h-full grow bg-slate-50">
    <Header />
    <main class="flex flex-col container mx-auto grow px-6 py-8">
        <slot />
    </main>
    <Footer />
</div>
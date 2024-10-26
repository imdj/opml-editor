<script>
    import "../app.css";
    import Footer from "$lib/components/partials/Footer.svelte";
    import Header from "$lib/components/partials/Header.svelte";
    import {opmlDoc} from "$lib/opml.svelte.js";
    import {setContext} from "svelte";

    const opml = new opmlDoc();
    setContext("state", opml);
</script>

<div class="flex flex-col min-h-full grow bg-slate-50">
    <Header />
    <main class="flex flex-col container mx-auto grow px-2 pt-8 pb-2">
        <slot />
    </main>
    <Footer />
</div>
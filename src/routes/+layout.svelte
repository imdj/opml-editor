<script>
    import "../app.css";
    import Footer from "$lib/components/Footer.svelte";
    import Header from "$lib/components/Header.svelte";
</script>

<div class="flex flex-col min-h-full grow bg-slate-50">
    <Header />
    <main class="flex flex-col container mx-auto grow px-6 py-8">
        <slot />
    </main>
    <Footer />
</div>
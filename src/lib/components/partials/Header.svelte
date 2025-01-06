<script>
    let isDropdownOpen = false;

    const handleDropdownFocusLoss = ({ relatedTarget, currentTarget }) => {
        // check if the new focus target doesn't present in the dropdown tree (exclude ul\li padding area because relatedTarget, in this case, will be null)
        if (relatedTarget instanceof HTMLElement && currentTarget.contains(relatedTarget)) return;
        isDropdownOpen = false
    }
</script>

<header class="container mx-auto flex justify-between items-center h-12 mt-2 p-2 z-50">
    <a href="/" aria-label="Homepage">
        <svg xmlns="http://www.w3.org/2000/svg" class="logo h-12" viewBox="0 0 283.46 283.46"><defs><linearGradient id="A" x1="229.2" y1="293.24" x2="54.26" y2="-9.77" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#b4ffff"/><stop offset=".4" stop-color="#28d2ff"/><stop offset="1" stop-color="#0052ff"/></linearGradient></defs><rect width="283.46" height="283.46" rx="51.02" fill="url(#A)" class="logo-bg"/><path d="M87.87 94.17c0-29.17 4.81-37.41 28.06-37.41s27.96 8.24 27.96 37.41-4.81 37.41-27.96 37.41-28.06-8.24-28.06-37.41zm28.05 24.35c11.3 0 12.5-2.5 12.5-24.35s-1.2-24.35-12.5-24.35-12.59 2.5-12.59 24.35 1.2 24.35 12.59 24.35zm52.78-60.37h27.04c20.83 0 26.67 5.65 26.67 25.09s-5.83 25.28-26.67 25.28h-11.57v21.67h-15.46V58.15zm26.67 37.68c9.26 0 11.57-2.04 11.57-12.59s-2.31-12.41-11.57-12.41h-11.2v25h11.2zm-108.5 48.88h19.81l5.37 20.46 2.87 13.52h.19l2.87-13.52 5.37-20.46h19.63v72.04h-13.43v-29.63l.74-29.35h-.19l-10.46 40h-9.54l-10.46-40h-.19l.74 29.35v29.63H86.86v-72.04zm82.41 0h15.46v59.17h35.46v12.87h-50.92v-72.04z" fill="#00004b" class="logo-body logo-opml"/><path d="M207.75 157.51l33.24-11.67v-.19l-33.24-11.67v-14.26l50 19.35v13.33l-50 19.35v-14.26zm-188.22-5.09v-13.33l50-19.35V134l-33.24 11.67v.19l33.24 11.67v14.26l-50-19.35z" class="logo-body logo-brackets"/></svg>
    </a>
    <div class="relative inline-block ml-auto" on:focusout={handleDropdownFocusLoss}>
        <button aria-label="Open navigation menu" on:click={() => isDropdownOpen = !isDropdownOpen}>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 5h8m-8 7h13M3 19h18"/></svg>
        </button>
        <ul class="absolute shadow-2xl w-48 right-0 rounded-lg bg-white p-1" style:visibility={isDropdownOpen ? 'visible' : 'hidden'}>
            <li><a class="block p-2 rounded hover:bg-slate-200 no-underline" href="/">Editor</a></li>
            <li><a class="block p-2 rounded hover:bg-slate-200 no-underline" href="/generator">Generator</a></li>
            <li><a class="block p-2 rounded hover:bg-slate-200 no-underline" href="/features">Features</a></li>
            <li><a class="block p-2 rounded hover:bg-slate-200 no-underline" href="/about">About</a></li>
        </ul>
    </div>
</header>

<style>
    svg.logo .logo-opml {
        fill: rgb(0, 0, 75);
    }

    svg.logo .logo-brackets {
        fill: url(#A);
    }

    svg.logo .logo-bg {
        opacity: 0;
        transition: opacity 0.4s ease-out;
    }

    svg.logo:hover .logo-bg {
        opacity: 1;
    }

    svg.logo:hover .logo-brackets {
        fill: white;
    }
</style>
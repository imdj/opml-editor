<script>
    let isDropdownOpen = false;

    const handleDropdownFocusLoss = ({ relatedTarget, currentTarget }) => {
        // check if the new focus target doesn't present in the dropdown tree (exclude ul\li padding area because relatedTarget, in this case, will be null)
        if (relatedTarget instanceof HTMLElement && currentTarget.contains(relatedTarget)) return;
        isDropdownOpen = false
    }
</script>

<header class="container mx-auto flex justify-between items-center h-12 mt-2 p-2">
    <div class="relative inline-block ml-auto" on:focusout={handleDropdownFocusLoss}>
        <button on:click={() => isDropdownOpen = !isDropdownOpen}>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 5h8m-8 7h13M3 19h18"/></svg>
        </button>
        <ul class="absolute shadow-2xl w-48 right-0 rounded-lg bg-white p-1" style:visibility={isDropdownOpen ? 'visible' : 'hidden'}>
            <li><a class="block p-2 rounded hover:bg-slate-200" href="/">Editor</a></li>
            <li><a class="block p-2 rounded hover:bg-slate-200" href="/about">About</a></li>
        </ul>
    </div>
</header>
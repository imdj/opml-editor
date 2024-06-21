<script>
    import {createEmpty} from "$lib/opml.js";
    import {getContext} from "svelte";
    import xmlFormat from "xml-formatter";

    const opml = getContext("state");

    function createFile() {
        opml.rawContent = createEmpty();
    }

    function readFile(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                opml.rawContent = xmlFormat(String(e.target.result));
            };
            reader.readAsText(file);
        }
    }
</script>
<div class="flex w-full h-96 grow overflow-y-auto relative p-2 rounded-xl items-center justify-center bg-slate-100">
    <label for="opmlFile" class="absolute flex flex-col text-lg text-center m-auto opacity-70 z-10 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" class="inline-block self-center w-16 text-gray-500 mb-4" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 20h12m-6-4V4m0 0l3.5 3.5M12 4L8.5 7.5"/>
        </svg>
        <span>Upload an OPML file or <button class="text-sky-500 hover:text-sky-700 pointer-events-auto" onclick={createFile}>Create a new one</button></span>
    </label>
    <input type="file" accept=".opml" onchange={readFile} class="opacity-0 w-full h-full cursor-pointer"/>
</div>
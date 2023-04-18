<script lang ="ts" > 
  export let frameName;
  export let labelName;
  export let elementId;
  export let valid;

</script>

<div class="basis-1/2">
  <label class="block text-sm font-medium mb-1 text-white" for={elementId}>{labelName}</label>
  <div id={elementId} class="text-sm text-white 
        border rounded leading-5 py-2 px-3
        hover:border:[#675982] shadow-sm 
        {frameName} h-10 min-w-full"
        class:border-rose-500={!valid}
        class:border-gray-200={valid}
        >
  </div>
  
  {#if !valid}
    <div class="text-sm text-red-500 outline outline-1 
    min-h-8 h-auto outline-rose-500 rounded m-1 
    bg-rose-200 p-2 text-xs w-auto md:w-6/12 
    lg:w-3/12"> 
   <svg viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 inline">
  <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
</svg>
      Invalid {labelName}</div>
  {/if}

</div>


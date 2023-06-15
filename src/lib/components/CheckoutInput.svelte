<script lang ="ts" > 
  import {styles} from '../store';

  export let frameName;
  export let labelName;
  export let elementId;
  export let valid;
  export let cardholder;
</script>

<div class={$styles.inputContainer}>
  <label class={$styles.inputLabel} for={elementId}>{labelName}</label>
  {#if frameName == "card-name"}
    <input id={elementId} class={$styles.nonePCIInputWrapper}
        type="text" placeholder="Name on card" 
        bind:value={cardholder} />
  {:else}
    <div id={elementId} class={$styles.PCIInputWrapper  +" "+ frameName}
        class:border-rose-500={!valid}
        class:border-gray-200={valid}
        >
  </div>
  {/if}

  {#if !valid}
    <div class={$styles.error} > 
   <svg viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 inline">
  <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
</svg>
      Invalid {labelName}</div>
  {/if}

</div>


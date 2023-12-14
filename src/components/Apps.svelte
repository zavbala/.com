<script lang="ts">
  import { fly } from 'svelte/transition';
  import _ from 'lodash';

  const fetcher = async () =>
    await (await fetch('http://localhost:4321/api/apps/data.json')).json();
</script>

<div class="lg:col-span-4 space-y-2">
  <div class="flex items-center gap-x-3 text-sm">
    <svg
      width="12"
      height="16"
      fill="currentColor"
      viewBox="0 0 384 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 64C16 28.7 44.7 0 80 0H304c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H80c-35.3 0-64-28.7-64-64V64zM144 448c0 8.8 7.2 16 16 16h64c8.8 0 16-7.2 16-16s-7.2-16-16-16H160c-8.8 0-16 7.2-16 16zM304 64H80V384H304V64z"
      />
    </svg>

    <span class="font-bold tracking-wider"> APPS </span>
  </div>

  {#await fetcher()}
    <!--  -->
  {:then data}
    {#each data as app, index}
      <a
        href={app.url}
        target="_blank"
        in:fly|global={{ y: 100, duration: 1000, delay: index * 100 }}
        class="w-full flex items-center justify-between gap-x-2 rounded-md p-4 bg-[#262626]"
      >
        <div class="p-3 rounded-md">
          <img
            loading="lazy"
            src={app.icon}
            alt={app.title}
            on:dragstart|preventDefault
            class="w-12 h-12 rounded-md shadow-sm"
          />
        </div>

        <div
          class="flex items-center gap-x-2 rounded-full bg-[#ff4700] px-5 py-2 shadow-sm"
        >
          <span class="font-jetbrains text-sm">
            {Intl.NumberFormat('en-US', {
              notation: 'compact',
              compactDisplay: 'short',
            }).format(app.downloads + 5500)}
          </span>
        </div>
      </a>
    {/each}
  {/await}
</div>

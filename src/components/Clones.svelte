<script lang="ts">
  import { fade } from 'svelte/transition';

  const Apps = [
    {
      url: 'https://gfonts.vercel.app',
      base: 'google fonts',
    },
    {
      url: 'https://gkeep.vercel.app',
      base: 'google keep',
    },
    {
      url: 'https://weather-kit.vercel.app',
      base: 'apple weather',
    },
  ];

  const fakePromise = () => new Promise((resolve) => setTimeout(resolve, 1000));
</script>

<div class="lg:col-span-8 space-y-2">
  <div class="flex items-center gap-x-2 text-sm">
    <svg
      width="16"
      height="16"
      fill="currentColor"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M288 448H64V224h64V160H64c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H288c35.3 0 64-28.7 64-64V384H288v64zm-64-96H448c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H224c-35.3 0-64 28.7-64 64V288c0 35.3 28.7 64 64 64z"
      />
    </svg>

    <span class="font-bold tracking-wider"> CLONES </span>
  </div>

  {#await fakePromise()}
    <!--  -->
  {:then result}
    <div class="flex gap-2 flex-wrap">
      {#each Apps as app, index}
        <a
          href={app.url}
          target="_blank"
          in:fade|global={{ duration: 1000, delay: index * 100 }}
          class="flex items-center rounded-full justify-between gap-x-2 bg-[#ff4700] px-7 py-2"
        >
          <span class="text-sm capitalize">{app.base}</span>
        </a>
      {/each}
    </div>
  {/await}
</div>

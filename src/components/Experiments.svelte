<script lang="ts">
  import { fade } from 'svelte/transition';

  const Projects = [
    {
      url: 'https://funklo.shop',
      description: 'Dropshipping store about Funko Toys.',
      favicon: 'favicon.ico',
    },
    {
      url: 'https://lengva.org',
      description: 'Native translation app.',
      favicon: 'favicon.png',
    },
    {
      url: 'https://cinepolis.one',
      description: 'A modern replica of Cinepolis website.',
      favicon: 'favicon.ico',
    },
    {
      url: 'https://sargabot.com',
      description: 'Daily tracking of seaweed in the Caribbean.',
      favicon: 'favicon.ico',
    },
  ];

  const fakePromise = () => new Promise((resolve) => setTimeout(resolve, 1500));
</script>

<div class="lg:col-span-12 flex flex-col gap-3">
  <div class="flex items-center gap-x-2 text-sm">
    <svg
      height="16"
      width="16"
      fill="currentColor"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M342.6 9.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l9.4 9.4L28.1 342.6C10.1 360.6 0 385 0 410.5V416c0 53 43 96 96 96h5.5c25.5 0 49.9-10.1 67.9-28.1L448 205.3l9.4 9.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-32-32-96-96-32-32zM205.3 256L352 109.3 402.7 160l-96 96H205.3z"
      />
    </svg>

    <span class="font-bold tracking-wider"> EXPERIMENTS </span>
  </div>

  {#await fakePromise()}
    <!--  -->
  {:then result}
    <div class="flex lg:flex-row flex-col gap-3 h-full flex-wrap">
      {#each Projects as app, index}
        {@const name = app.url.split('://')[1].split('.')[0]}

        <a
          href={'/' + name}
          in:fade|global={{ duration: 1000, delay: index * 100 }}
          class="group relative flex flex-col flex-1 h-full rounded-lg justify-between gap-2 p-5 bg-[#262626]"
        >
          <svg
            width="15"
            height="15"
            fill="none"
            viewBox="0 0 15 15"
            xmlns="http://www.w3.org/2000/svg"
            class="absolute top-5 right-5 group-hover:opacity-100 opacity-0 transition-opacity"
          >
            <path
              fill="currentColor"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
            >
            </path>
          </svg>

          <div class="flex gap-x-3 items-center">
            <img
              alt=""
              draggable="false"
              class="w-5 h-5 rounded-full"
              src={app.url + '/' + app.favicon}
            />

            <h3 class="font-inter text-sm capitalize">{name}</h3>
          </div>

          <p class="text-sm font-inter">{app.description}</p>
        </a>
      {/each}
    </div>
  {/await}
</div>

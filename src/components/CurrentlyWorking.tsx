import React from 'react';

const startup = {
  name: 'Overol',
  color: 'bg-blue-500',
  url: 'https://overol.mx',
  logo: 'https://overol.mx/minimal-white.svg',
  banner: 'https://overol.mx/overol-white.svg',
  description: 'Car service booking platform.',
};

const CurrentlyWorking = () => {
  return (
    <a
      href="/overol"
      className="relative space-y-3 rounded-2xl bg-[#262626] p-7 transition-all duration-300 ease-in-out md:p-10 lg:col-span-12 lg:h-[300px]"
    >
      <svg
        width="15"
        height="15"
        fill="none"
        viewBox="0 0 15 15"
        className="absolute right-5 top-5"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="currentColor"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
        ></path>
      </svg>

      {/* <h1 className="font-bold uppercase md:text-6xl">{startup.name}</h1> */}

      <img alt="Overol Logo" src={startup.banner} className="w-32 md:w-48" />

      <p className="">{startup.description}</p>

      <img
        alt="Overol Logo"
        src={startup.logo}
        className="absolute bottom-5 right-5 w-8 lg:w-24"
      />
    </a>
  );
};

export default CurrentlyWorking;

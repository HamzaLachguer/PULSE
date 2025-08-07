

// Caching DOM elements
const menuBtn = document.querySelector("#menu-btn");
const navList = document.querySelector("#nav-list");
const navMenu = document.querySelector("#nav-menu");

menuBtn.addEventListener('click', () => {
  const isMenuOpen = menuBtn.classList.toggle("close-icon");
  navList.classList.toggle("open", isMenuOpen);

  // update aria-atributes
  navMenu.setAttribute("aria-hidden", !isMenuOpen);
  menuBtn.setAttribute("aria-expanded", isMenuOpen);
})



// caching DOM elements
const gridContainer = document.querySelector(".track-list");

async function fetchAPI() {
  try {
    const response = await fetch("https://api.audius.co/v1/tracks/trending?app_name=YOUR_APP_NAME");
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const data = await response.json();
    return data.data;
  } 
  catch(error) {
    console.error(error)
  }
}

async function renderGrid() {
  const trackList = await fetchAPI();
  console.log(trackList)

  trackList.map(track => {
    return gridContainer.innerHTML += `
      <li class="track-card relative cursor-pointer group/track" data-track-id=${track.id}>
        <div class="h-full w-full overflow-hidden relative  pb-[100%]">
          <img src=${track.artwork["480x480"]} alt="track title" loading="lazy" class="h-full w-full object-cover object-center absolute top-0 group-hover/track:scale-110 transition-all duration-300 ease-in-out">
        </div>

        <div class="flex items-center justify-between gap-4 uppercase px-4 pb-4 absolute w-full left-0 bottom-0">
          <h2 class="text-xl font-bold max-w-52">${track.title}</h2>
          <button id="play-pause-btn" class="h-7 w-7 bg-[#e1e1e1] grid place-items-center text-[#101010]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5 grid place-items-center"><path d="M19.376 12.4161L8.77735 19.4818C8.54759 19.635 8.23715 19.5729 8.08397 19.3432C8.02922 19.261 8 19.1645 8 19.0658V4.93433C8 4.65818 8.22386 4.43433 8.5 4.43433C8.59871 4.43433 8.69522 4.46355 8.77735 4.5183L19.376 11.584C19.6057 11.7372 19.6678 12.0477 19.5146 12.2774C19.478 12.3323 19.4309 12.3795 19.376 12.4161Z"></path></svg>
          </button>
        </div>
      </li>
    `
  }).join("")
}

renderGrid()
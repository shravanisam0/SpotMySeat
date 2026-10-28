/**
 * ============================================================
 * SpotMySeat — script.js
 * Complete Client-Side Movie Ticket Booking Engine
 * ============================================================
 * 
 * This single JavaScript file powers ALL three pages:
 *   1. index.html   — Movie browsing, search, and genre filtering
 *   2. booking.html — Showtime selection, seat map, and checkout
 *   3. confirmation.html — Booking receipt and ticket display
 * 
 * DATA FLOW:
 *   index.html → (URL param: ?movieId=X) → booking.html
 *   booking.html → (localStorage: spotMySeat_booking) → confirmation.html
 * 
 * NO SERVER REQUIRED — runs 100% locally and offline in the browser.
 * Posters are served from the local 'posters/' directory with fallback.
 * ============================================================
 */

// ============================================================
// SECTION 1: REAL MOVIE DATA STORE (8 MOVIES)
// ============================================================

const MOVIES = [
    {
        id: 1,
        title: "Minions & Monsters",
        releaseYear: 2026,
        genre: "Animation",
        language: "English",
        duration: "1h 30m",
        rating: 7.2,
        certification: "U",
        description: "In 1927 Old Hollywood, the Minions attempt to shoot their own monster movie, only to accidentally unleash real creatures upon the world.",
        poster: "posters/minions_and_monsters.jpg",
        fallbackColor: "#1b263b",
        shows: [
            { id: "s1_1", time: "10:30 AM", hall: "Screen 1 — Dolby Atmos", priceVIP: 350, priceClassic: 220, bookedSeats: ["A3", "A7", "B2", "C5", "D8", "E1", "F4"] },
            { id: "s1_2", time: "02:00 PM", hall: "Screen 2 — IMAX", priceVIP: 400, priceClassic: 250, bookedSeats: ["A1", "B5", "C3", "C4", "D6", "E9", "F2", "F7"] },
            { id: "s1_3", time: "06:30 PM", hall: "Screen 1 — Dolby Atmos", priceVIP: 350, priceClassic: 220, bookedSeats: ["A2", "A4", "B8", "C1", "D3", "E5", "F9"] },
            { id: "s1_4", time: "09:45 PM", hall: "Screen 3 — Standard", priceVIP: 300, priceClassic: 180, bookedSeats: ["A5", "B3", "C7", "D2", "E6", "F1", "F10"] }
        ]
    },
    {
        id: 2,
        title: "The Lion King",
        releaseYear: 1994,
        genre: "Animation",
        language: "English",
        duration: "1h 28m",
        rating: 8.5,
        certification: "U",
        description: "Lion prince Simba flees his kingdom after the tragic death of his father Mufasa, only to learn the true meaning of responsibility and courage.",
        poster: "posters/the_lion_king.jpg",
        fallbackColor: "#780000",
        shows: [
            { id: "s2_1", time: "11:00 AM", hall: "Screen 3 — Standard", priceVIP: 300, priceClassic: 180, bookedSeats: ["A2", "B6", "C8", "D1", "E4", "F3"] },
            { id: "s2_2", time: "03:30 PM", hall: "Screen 1 — Dolby Atmos", priceVIP: 350, priceClassic: 220, bookedSeats: ["A1", "A4", "B3", "C2", "D5", "D9", "E7", "F8"] },
            { id: "s2_3", time: "07:00 PM", hall: "Screen 2 — IMAX", priceVIP: 400, priceClassic: 250, bookedSeats: ["A6", "B1", "C9", "D4", "E2", "F5"] },
            { id: "s2_4", time: "10:15 PM", hall: "Screen 3 — Standard", priceVIP: 300, priceClassic: 180, bookedSeats: ["A8", "B4", "C6", "D7", "E3", "F9", "F10"] }
        ]
    },
    {
        id: 3,
        title: "Zootopia 2",
        releaseYear: 2025,
        genre: "Animation",
        language: "English",
        duration: "1h 45m",
        rating: 8.0,
        certification: "PG",
        description: "Detectives Judy Hopps and Nick Wilde tackle an undercover mystery that leads them deep into the city's hidden, shadowy reptile underworld.",
        poster: "posters/zootopia_2.jpg",
        fallbackColor: "#003049",
        shows: [
            { id: "s3_1", time: "10:00 AM", hall: "Screen 2 — IMAX", priceVIP: 400, priceClassic: 250, bookedSeats: ["A5", "B7", "C2", "D10", "E8"] },
            { id: "s3_2", time: "01:30 PM", hall: "Screen 1 — Dolby Atmos", priceVIP: 350, priceClassic: 220, bookedSeats: ["A3", "A9", "B1", "C6", "D4", "E10", "F2"] },
            { id: "s3_3", time: "05:00 PM", hall: "Screen 3 — Standard", priceVIP: 300, priceClassic: 180, bookedSeats: ["A1", "B8", "C4", "D6", "E3", "F7"] }
        ]
    },
    {
        id: 4,
        title: "Coco",
        releaseYear: 2017,
        genre: "Animation",
        language: "English",
        duration: "1h 45m",
        rating: 8.4,
        certification: "U",
        description: "Aspiring young musician Miguel defies his family's generational ban on music and accidentally enters the vibrant Land of the Dead to discover his heritage.",
        poster: "posters/coco.jpg",
        fallbackColor: "#2b0938",
        shows: [
            { id: "s4_1", time: "12:00 PM", hall: "Screen 1 — Dolby Atmos", priceVIP: 350, priceClassic: 220, bookedSeats: ["A4", "A6", "B2", "C8", "D3", "E7", "F1"] },
            { id: "s4_2", time: "04:00 PM", hall: "Screen 3 — Standard", priceVIP: 300, priceClassic: 180, bookedSeats: ["A2", "B9", "C1", "D5", "E10", "F6"] },
            { id: "s4_3", time: "08:30 PM", hall: "Screen 2 — IMAX", priceVIP: 400, priceClassic: 250, bookedSeats: ["A7", "B3", "C5", "D9", "E4", "F8", "F10"] }
        ]
    },
    {
        id: 5,
        title: "Inside Out 2",
        releaseYear: 2024,
        genre: "Animation",
        language: "English",
        duration: "1h 36m",
        rating: 7.6,
        certification: "U",
        description: "Riley becomes a teenager, throwing Headquarters into chaos as Joy, Sadness, Anger, Fear, and Disgust make room for new emotions led by Anxiety.",
        poster: "posters/inside_out_2.jpg",
        fallbackColor: "#e65c00",
        shows: [
            { id: "s5_1", time: "01:00 PM", hall: "Screen 3 — Standard", priceVIP: 300, priceClassic: 180, bookedSeats: ["A1", "A10", "B5", "C3", "D7", "E9"] },
            { id: "s5_2", time: "06:00 PM", hall: "Screen 1 — Dolby Atmos", priceVIP: 350, priceClassic: 220, bookedSeats: ["A8", "B4", "C6", "D2", "E1", "F5", "F9"] },
            { id: "s5_3", time: "09:30 PM", hall: "Screen 2 — IMAX", priceVIP: 400, priceClassic: 250, bookedSeats: ["A3", "B7", "C9", "D1", "E6", "F4"] }
        ]
    },
    {
        id: 6,
        title: "Toy Story 5",
        releaseYear: 2026,
        genre: "Animation",
        language: "English",
        duration: "1h 40m",
        rating: 7.9,
        certification: "U",
        description: "Woody, Buzz Lightyear, and Jessie face their biggest challenge yet when digital tech, screens, and smart electronics disrupt traditional playtime.",
        poster: "posters/toy_story_5.jpg",
        fallbackColor: "#0077b6",
        shows: [
            { id: "s6_1", time: "10:00 AM", hall: "Screen 3 — Standard", priceVIP: 300, priceClassic: 180, bookedSeats: ["A2", "B6", "C4", "D8", "E5"] },
            { id: "s6_2", time: "12:30 PM", hall: "Screen 1 — Dolby Atmos", priceVIP: 350, priceClassic: 220, bookedSeats: ["A5", "A9", "B3", "C7", "D1", "E10", "F3"] },
            { id: "s6_3", time: "03:00 PM", hall: "Screen 2 — IMAX", priceVIP: 400, priceClassic: 250, bookedSeats: ["A7", "B1", "C10", "D4", "E8", "F6"] },
            { id: "s6_4", time: "05:30 PM", hall: "Screen 3 — Standard", priceVIP: 300, priceClassic: 180, bookedSeats: ["A4", "B8", "C2", "D6", "E3", "F9"] }
        ]
    },
    {
        id: 7,
        title: "Kung Fu Panda 4",
        releaseYear: 2024,
        genre: "Animation",
        language: "English",
        duration: "1h 34m",
        rating: 6.3,
        certification: "U",
        description: "Po is selected to become the Spiritual Leader of the Valley of Peace, requiring him to find and train a new Dragon Warrior while defeating The Chameleon.",
        poster: "posters/kung_fu_panda_4.jpg",
        fallbackColor: "#132a13",
        shows: [
            { id: "s7_1", time: "11:30 AM", hall: "Screen 2 — IMAX", priceVIP: 400, priceClassic: 250, bookedSeats: ["A3", "A6", "B2", "C5", "D9", "E7", "F1"] },
            { id: "s7_2", time: "02:30 PM", hall: "Screen 1 — Dolby Atmos", priceVIP: 350, priceClassic: 220, bookedSeats: ["A1", "B4", "C8", "D3", "E10", "F5"] },
            { id: "s7_3", time: "06:00 PM", hall: "Screen 3 — Standard", priceVIP: 300, priceClassic: 180, bookedSeats: ["A8", "B10", "C1", "D7", "E2", "F8", "F4"] },
            { id: "s7_4", time: "09:00 PM", hall: "Screen 1 — Dolby Atmos", priceVIP: 350, priceClassic: 220, bookedSeats: ["A5", "B7", "C9", "D4", "E6", "F10"] }
        ]
    },
    {
        id: 8,
        title: "Ratatouille",
        releaseYear: 2007,
        genre: "Animation",
        language: "English",
        duration: "1h 51m",
        rating: 8.1,
        certification: "U",
        description: "In this 2007 Disney • Pixar animated classic, a determined young rat named Remy gifted with culinary genius forms an unlikely alliance with a clumsy kitchen worker to create culinary masterpieces in Paris.",
        poster: "posters/ratatouille.jpg",
        fallbackColor: "#3d0000",
        shows: [
            { id: "s8_1", time: "10:30 AM", hall: "Screen 1 — Dolby Atmos", priceVIP: 350, priceClassic: 220, bookedSeats: ["A2", "B4", "C6", "D8", "E1", "F3"] },
            { id: "s8_2", time: "01:45 PM", hall: "Screen 3 — Standard", priceVIP: 300, priceClassic: 180, bookedSeats: ["A7", "B1", "C3", "D5", "E9", "F2"] },
            { id: "s8_3", time: "05:15 PM", hall: "Screen 2 — IMAX", priceVIP: 400, priceClassic: 250, bookedSeats: ["A3", "B5", "C7", "D1", "E4", "F8", "F10"] },
            { id: "s8_4", time: "08:45 PM", hall: "Screen 1 — Dolby Atmos", priceVIP: 350, priceClassic: 220, bookedSeats: ["A1", "B8", "C2", "D9", "E6", "F7"] }
        ]
    }
];

// Convenience fee per ticket
const CONVENIENCE_FEE = 30;

// ============================================================
// SECTION 2: HELPER FUNCTIONS
// ============================================================

function getUrlParam(param) {
    const params = new URLSearchParams(window.location.search);
    return params.get(param);
}

function generateBookingId() {
    return "SMS-" + Math.floor(100000 + Math.random() * 900000);
}

function getDateOptions() {
    const options = [];
    const days = ["Today", "Tomorrow", "Day After"];
    for (let i = 0; i < 3; i++) {
        const d = new Date();
        d.setDate(d.getDate() + i);
        options.push({
            label: days[i],
            date: d.toLocaleDateString("en-IN", { month: "short", day: "numeric" }),
            fullDate: d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" })
        });
    }
    return options;
}

function getMovieById(id) {
    return MOVIES.find(m => m.id === parseInt(id));
}

function getAllGenres() {
    const genres = new Set();
    MOVIES.forEach(m => genres.add(m.genre));
    return ["All", ...Array.from(genres)];
}

// ============================================================
// SECTION 3: PAGE INITIALIZATION
// ============================================================

document.addEventListener("DOMContentLoaded", function() {
    const page = document.body.getAttribute("data-page");

    if (page === "home") {
        initHomePage();
    } else if (page === "booking") {
        initBookingPage();
    } else if (page === "confirmation") {
        initConfirmationPage();
    }
});

// ============================================================
// SECTION 4: HOME PAGE (index.html)
// ============================================================

function initHomePage() {
    renderHeroBanner();
    renderGenreFilter();
    renderMovieCards(MOVIES);
    setupSearch();
}

/** Renders hero banner featuring highest-rated movie */
function renderHeroBanner() {
    const topMovie = MOVIES.reduce((best, m) => m.rating > best.rating ? m : best, MOVIES[0]);

    const banner = document.getElementById("hero-banner");
    const heroBg = document.getElementById("hero-bg");
    const heroTitle = document.getElementById("hero-title");
    const heroMeta = document.getElementById("hero-meta");
    const heroDesc = document.getElementById("hero-description");
    const heroCta = document.getElementById("hero-cta");

    if (!banner) return;

    if (heroBg) {
        heroBg.innerHTML = '<img src="' + topMovie.poster + '" alt="' + topMovie.title + '" onerror="this.style.display=\'none\';">';
        heroBg.style.backgroundColor = topMovie.fallbackColor || "#111";
    }
    if (heroTitle) heroTitle.textContent = topMovie.title;
    if (heroDesc) heroDesc.textContent = topMovie.description;
    if (heroCta) heroCta.href = "booking.html?movieId=" + topMovie.id;

    if (heroMeta) {
        heroMeta.innerHTML =
            '<span class="rating-star">★ ' + topMovie.rating + '</span>' +
            '<span>' + topMovie.releaseYear + '</span>' +
            '<span>' + topMovie.duration + '</span>' +
            '<span>' + topMovie.genre + '</span>' +
            '<span>' + topMovie.language + '</span>' +
            '<span>' + topMovie.certification + '</span>';
    }

    banner.style.display = "flex";
}

/** Renders genre filter pill buttons */
function renderGenreFilter() {
    const filterBar = document.getElementById("genre-filter");
    if (!filterBar) return;

    const genres = getAllGenres();
    filterBar.innerHTML = "";

    genres.forEach(function(genre) {
        const pill = document.createElement("button");
        pill.className = "filter-pill" + (genre === "All" ? " active" : "");
        pill.textContent = genre;
        pill.setAttribute("data-genre", genre);

        pill.addEventListener("click", function() {
            document.querySelectorAll(".filter-pill").forEach(p => p.classList.remove("active"));
            pill.classList.add("active");

            const searchInput = document.getElementById("search-input");
            const searchTerm = searchInput ? searchInput.value.toLowerCase() : "";
            filterMovies(genre, searchTerm);
        });

        filterBar.appendChild(pill);
    });
}

/** Renders movie cards into the grid */
function renderMovieCards(movies) {
    const grid = document.getElementById("movies-grid");
    const emptyState = document.getElementById("empty-state");
    const movieCount = document.getElementById("movie-count");

    if (!grid) return;
    grid.innerHTML = "";

    if (movies.length === 0) {
        if (emptyState) emptyState.style.display = "block";
        if (movieCount) movieCount.textContent = "";
        return;
    }

    if (emptyState) emptyState.style.display = "none";
    if (movieCount) movieCount.textContent = movies.length + " movie" + (movies.length !== 1 ? "s" : "");

    movies.forEach(function(movie) {
        const minPrice = Math.min(...movie.shows.map(s => s.priceClassic));

        const card = document.createElement("div");
        card.className = "movie-card fade-in";
        card.innerHTML =
            '<div class="movie-poster" style="background-color: ' + (movie.fallbackColor || "#1c1c1c") + ';">' +
                '<img src="' + movie.poster + '" alt="' + movie.title + '" class="poster-img" onerror="this.style.display=\'none\'; this.nextElementSibling.style.display=\'flex\';">' +
                '<div class="poster-fallback" style="display:none;">' +
                    '<span class="fallback-title">' + movie.title + '</span>' +
                '</div>' +
                '<div class="poster-overlay">' +
                    '<span class="movie-rating-badge">★ ' + movie.rating + '</span>' +
                    '<span class="movie-cert-badge">' + movie.certification + '</span>' +
                '</div>' +
            '</div>' +
            '<div class="movie-info">' +
                '<h3 class="movie-title">' + movie.title + ' (' + movie.releaseYear + ')</h3>' +
                '<div class="movie-meta">' +
                    '<span class="genre-badge">' + movie.genre + '</span>' +
                    '<span class="lang-badge">' + movie.language + '</span>' +
                '</div>' +
                '<div class="movie-details">' +
                    '<span>' + movie.duration + '</span>' +
                    '<span class="separator"></span>' +
                    '<span>' + movie.shows.length + ' shows</span>' +
                '</div>' +
                '<div class="movie-price-row">' +
                    '<div class="movie-price">' +
                        '<span class="from-label">From </span>₹' + minPrice +
                    '</div>' +
                '</div>' +
                '<a href="booking.html?movieId=' + movie.id + '" class="btn-primary btn-book">Book Tickets</a>' +
            '</div>';

        grid.appendChild(card);
    });
}

/** Sets up the search input listener */
function setupSearch() {
    const searchInput = document.getElementById("search-input");
    if (!searchInput) return;

    searchInput.addEventListener("input", function() {
        const searchTerm = searchInput.value.toLowerCase();
        let activeGenre = "All";
        const activePill = document.querySelector(".filter-pill.active");
        if (activePill) {
            activeGenre = activePill.getAttribute("data-genre");
        }
        filterMovies(activeGenre, searchTerm);
    });
}

/** Filters movies by genre AND search term, then re-renders */
function filterMovies(genre, searchTerm) {
    const filtered = MOVIES.filter(function(movie) {
        const matchesGenre = (genre === "All") || (movie.genre === genre);
        const matchesSearch = !searchTerm ||
            movie.title.toLowerCase().includes(searchTerm) ||
            movie.genre.toLowerCase().includes(searchTerm) ||
            movie.language.toLowerCase().includes(searchTerm) ||
            (movie.releaseYear && movie.releaseYear.toString().includes(searchTerm));
        return matchesGenre && matchesSearch;
    });

    const sectionTitle = document.getElementById("section-title");
    if (sectionTitle) {
        if (genre !== "All") {
            sectionTitle.textContent = genre + " Movies";
        } else if (searchTerm) {
            sectionTitle.textContent = 'Results for "' + searchTerm + '"';
        } else {
            sectionTitle.textContent = "Now Showing";
        }
    }

    renderMovieCards(filtered);
}

// ============================================================
// SECTION 5: BOOKING PAGE (booking.html)
// ============================================================

const bookingState = {
    movie: null,
    selectedDate: null,
    selectedShow: null,
    selectedSeats: [],
    totalPrice: 0
};

function initBookingPage() {
    const movieId = getUrlParam("movieId");
    if (!movieId) {
        window.location.href = "index.html";
        return;
    }

    const movie = getMovieById(movieId);
    if (!movie) {
        window.location.href = "index.html";
        return;
    }

    bookingState.movie = movie;

    renderBookingHeader(movie);
    renderDateSelector();
    renderShowtimeSelector(movie);

    const btnConfirm = document.getElementById("btn-confirm");
    if (btnConfirm) {
        btnConfirm.addEventListener("click", handleBookingConfirm);
    }
}

/** Renders the movie info bar at the top of the booking page */
function renderBookingHeader(movie) {
    const container = document.getElementById("booking-movie-info");
    if (!container) return;

    container.innerHTML =
        '<div class="booking-movie-poster-mini" style="background-color: ' + (movie.fallbackColor || "#222") + ';">' +
            '<img src="' + movie.poster + '" alt="' + movie.title + '" class="poster-mini-img" onerror="this.style.display=\'none\';">' +
        '</div>' +
        '<div class="booking-movie-details">' +
            '<h1>' + movie.title + ' (' + movie.releaseYear + ')</h1>' +
            '<div class="booking-movie-meta">' +
                '<span class="genre-badge">' + movie.genre + '</span>' +
                '<span class="lang-badge">' + movie.language + '</span>' +
                '<span class="text-caption">' + movie.duration + '</span>' +
                '<span class="text-caption">★ ' + movie.rating + '</span>' +
                '<span class="text-caption">Rated ' + movie.certification + '</span>' +
            '</div>' +
        '</div>';

    const checkoutMovie = document.getElementById("checkout-movie");
    if (checkoutMovie) checkoutMovie.textContent = movie.title;
}

/** Renders the 3-day date selector */
function renderDateSelector() {
    const dateContainer = document.getElementById("date-selector");
    if (!dateContainer) return;

    const dateOptions = getDateOptions();
    dateContainer.innerHTML = "";

    dateOptions.forEach(function(opt, index) {
        const chip = document.createElement("button");
        chip.className = "date-chip" + (index === 0 ? " active" : "");
        chip.innerHTML =
            '<span class="date-day">' + opt.label + '</span>' +
            '<span>' + opt.date + '</span>';

        chip.addEventListener("click", function() {
            document.querySelectorAll(".date-chip").forEach(c => c.classList.remove("active"));
            chip.classList.add("active");
            bookingState.selectedDate = opt;
            const checkoutDate = document.getElementById("checkout-date");
            if (checkoutDate) checkoutDate.textContent = opt.fullDate;

            bookingState.selectedShow = null;
            bookingState.selectedSeats = [];
            document.querySelectorAll(".showtime-chip").forEach(c => c.classList.remove("active"));
            const screenContainer = document.getElementById("screen-container");
            if (screenContainer) screenContainer.style.display = "none";
            updateCheckoutSummary();
        });

        dateContainer.appendChild(chip);

        if (index === 0) {
            bookingState.selectedDate = opt;
            const checkoutDate = document.getElementById("checkout-date");
            if (checkoutDate) checkoutDate.textContent = opt.fullDate;
        }
    });
}

/** Renders showtime chips for the movie */
function renderShowtimeSelector(movie) {
    const container = document.getElementById("showtime-selector");
    if (!container) return;

    container.innerHTML = "";
    movie.shows.forEach(function(show) {
        const chip = document.createElement("button");
        chip.className = "showtime-chip";
        chip.innerHTML =
            '<span>' + show.time + '</span>' +
            '<span class="hall-label">' + show.hall + '</span>';

        chip.addEventListener("click", function() {
            document.querySelectorAll(".showtime-chip").forEach(c => c.classList.remove("active"));
            chip.classList.add("active");

            bookingState.selectedShow = show;
            bookingState.selectedSeats = [];

            const checkoutTime = document.getElementById("checkout-time");
            const checkoutHall = document.getElementById("checkout-hall");
            if (checkoutTime) checkoutTime.textContent = show.time;
            if (checkoutHall) checkoutHall.textContent = show.hall;

            const screenContainer = document.getElementById("screen-container");
            if (screenContainer) screenContainer.style.display = "block";
            renderSeatMap(show);
            updateCheckoutSummary();
        });

        container.appendChild(chip);
    });
}

/** Renders the interactive 60-seat map grid */
function renderSeatMap(show) {
    const vipContainer = document.getElementById("seat-map-vip");
    const classicContainer = document.getElementById("seat-map-classic");

    if (!vipContainer || !classicContainer) return;
    vipContainer.innerHTML = "";
    classicContainer.innerHTML = "";

    const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
    const seatsPerRow = 10;

    const storedBookings = JSON.parse(localStorage.getItem("spotMySeat_allBookings") || "[]");
    let locallyBookedSeats = [];
    storedBookings.forEach(function(b) {
        if (b.showId === show.id) {
            locallyBookedSeats = locallyBookedSeats.concat(b.seats);
        }
    });

    rows.forEach(function(rowLetter) {
        const isVIP = (rowLetter === 'A' || rowLetter === 'B');
        const container = isVIP ? vipContainer : classicContainer;

        const rowDiv = document.createElement("div");
        rowDiv.className = "seat-row";

        const leftLabel = document.createElement("span");
        leftLabel.className = "row-label";
        leftLabel.textContent = rowLetter;
        rowDiv.appendChild(leftLabel);

        for (let num = 1; num <= seatsPerRow; num++) {
            if (num === 6) {
                const aisle = document.createElement("div");
                aisle.className = "seat-aisle";
                rowDiv.appendChild(aisle);
            }

            const seatId = rowLetter + num;
            const seatEl = document.createElement("div");
            seatEl.className = "seat";
            seatEl.textContent = num;
            seatEl.setAttribute("data-seat-id", seatId);

            if (isVIP) {
                seatEl.classList.add("vip");
            }

            const isPreBooked = show.bookedSeats.includes(seatId);
            const isLocallyBooked = locallyBookedSeats.includes(seatId);

            if (isPreBooked || isLocallyBooked) {
                seatEl.classList.add("booked");
                seatEl.title = "Sold Out";
            } else {
                seatEl.title = seatId + " — " + (isVIP ? "VIP ₹" + show.priceVIP : "Classic ₹" + show.priceClassic);
                seatEl.addEventListener("click", function() {
                    toggleSeat(seatId, isVIP, show);
                });
            }

            rowDiv.appendChild(seatEl);
        }

        const rightLabel = document.createElement("span");
        rightLabel.className = "row-label";
        rightLabel.textContent = rowLetter;
        rowDiv.appendChild(rightLabel);

        container.appendChild(rowDiv);
    });
}

/** Toggles seat selection */
function toggleSeat(seatId, isVIP, show) {
    const seatEl = document.querySelector('[data-seat-id="' + seatId + '"]');
    const index = bookingState.selectedSeats.findIndex(s => s.id === seatId);

    if (index >= 0) {
        bookingState.selectedSeats.splice(index, 1);
        if (seatEl) seatEl.classList.remove("selected");
    } else {
        if (bookingState.selectedSeats.length >= 10) {
            showError("You can select a maximum of 10 seats.");
            return;
        }
        const price = isVIP ? show.priceVIP : show.priceClassic;
        bookingState.selectedSeats.push({ id: seatId, type: isVIP ? "VIP" : "Classic", price: price });
        if (seatEl) seatEl.classList.add("selected");
    }

    updateCheckoutSummary();
}

/** Updates checkout summary panel */
function updateCheckoutSummary() {
    const seats = bookingState.selectedSeats;
    const count = seats.length;

    const seatsDisplay = document.getElementById("selected-seats-display");
    if (seatsDisplay) {
        if (count === 0) {
            seatsDisplay.innerHTML = '<span class="no-seats-msg">No seats selected yet</span>';
        } else {
            seatsDisplay.innerHTML = seats.map(s => '<span class="selected-seat-tag">' + s.id + ' (' + s.type + ')</span>').join("");
        }
    }

    const countEl = document.getElementById("checkout-ticket-count");
    if (countEl) countEl.textContent = count;

    const ticketCost = seats.reduce((sum, s) => sum + s.price, 0);
    const costEl = document.getElementById("checkout-ticket-cost");
    if (costEl) costEl.textContent = "₹" + ticketCost;

    const convFee = count > 0 ? (count * CONVENIENCE_FEE) : 0;
    const feeEl = document.getElementById("checkout-convenience");
    if (feeEl) feeEl.textContent = "₹" + convFee;

    const total = ticketCost + convFee;
    bookingState.totalPrice = total;
    const totalEl = document.getElementById("checkout-total");
    if (totalEl) totalEl.textContent = "₹" + total;

    const btn = document.getElementById("btn-confirm");
    if (btn) {
        if (count > 0) {
            btn.disabled = false;
            btn.classList.remove("disabled");
        } else {
            btn.disabled = true;
            btn.classList.add("disabled");
        }
    }
}

function showError(msg) {
    const banner = document.getElementById("error-banner");
    if (!banner) return;
    banner.textContent = msg;
    banner.classList.add("visible");
    setTimeout(function() {
        banner.classList.remove("visible");
    }, 4000);
}

/** Handles booking confirmation */
function handleBookingConfirm() {
    document.querySelectorAll(".form-error").forEach(e => e.classList.remove("visible"));
    document.querySelectorAll(".form-control").forEach(e => e.classList.remove("error"));

    const name = document.getElementById("cust-name").value.trim();
    const email = document.getElementById("cust-email").value.trim();
    const phone = document.getElementById("cust-phone").value.trim();

    let hasError = false;

    if (!name || name.length < 2) {
        document.getElementById("name-error").classList.add("visible");
        document.getElementById("cust-name").classList.add("error");
        hasError = true;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        document.getElementById("email-error").classList.add("visible");
        document.getElementById("cust-email").classList.add("error");
        hasError = true;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phone || !phoneRegex.test(phone)) {
        document.getElementById("phone-error").classList.add("visible");
        document.getElementById("cust-phone").classList.add("error");
        hasError = true;
    }

    if (bookingState.selectedSeats.length === 0) {
        showError("Please select at least one seat.");
        hasError = true;
    }

    if (!bookingState.selectedShow) {
        showError("Please select a showtime.");
        hasError = true;
    }

    if (hasError) return;

    const bookingId = generateBookingId();
    const booking = {
        bookingId: bookingId,
        movieTitle: bookingState.movie.title,
        releaseYear: bookingState.movie.releaseYear,
        genre: bookingState.movie.genre,
        language: bookingState.movie.language,
        date: bookingState.selectedDate.fullDate,
        time: bookingState.selectedShow.time,
        hall: bookingState.selectedShow.hall,
        showId: bookingState.selectedShow.id,
        seats: bookingState.selectedSeats.map(s => s.id),
        seatDetails: bookingState.selectedSeats,
        customerName: name,
        customerEmail: email,
        customerPhone: phone,
        ticketCount: bookingState.selectedSeats.length,
        totalAmount: bookingState.totalPrice,
        timestamp: new Date().toLocaleString("en-IN")
    };

    localStorage.setItem("spotMySeat_booking", JSON.stringify(booking));

    const allBookings = JSON.parse(localStorage.getItem("spotMySeat_allBookings") || "[]");
    allBookings.push(booking);
    localStorage.setItem("spotMySeat_allBookings", JSON.stringify(allBookings));

    window.location.href = "confirmation.html";
}

// ============================================================
// SECTION 6: CONFIRMATION PAGE (confirmation.html)
// ============================================================

function initConfirmationPage() {
    const bookingData = localStorage.getItem("spotMySeat_booking");
    if (!bookingData) {
        window.location.href = "index.html";
        return;
    }

    const booking = JSON.parse(bookingData);

    const bId = document.getElementById("ticket-booking-id");
    const mTitle = document.getElementById("ticket-movie-title");
    const bDate = document.getElementById("ticket-date");
    const bTime = document.getElementById("ticket-time");
    const bHall = document.getElementById("ticket-hall");
    const bCount = document.getElementById("ticket-count");
    const cName = document.getElementById("ticket-customer-name");
    const cEmail = document.getElementById("ticket-customer-email");
    const cPhone = document.getElementById("ticket-customer-phone");
    const bTotal = document.getElementById("ticket-total-amount");
    const barcodeText = document.getElementById("barcode-text");

    if (bId) bId.textContent = booking.bookingId;
    if (mTitle) mTitle.textContent = booking.movieTitle + (booking.releaseYear ? " (" + booking.releaseYear + ")" : "");
    if (bDate) bDate.textContent = booking.date;
    if (bTime) bTime.textContent = booking.time;
    if (bHall) bHall.textContent = booking.hall;
    if (bCount) bCount.textContent = booking.ticketCount + " ticket" + (booking.ticketCount > 1 ? "s" : "");

    const seatsRow = document.getElementById("ticket-seats-row");
    if (seatsRow) {
        seatsRow.innerHTML = booking.seats.map(seatId => '<span class="ticket-seat-badge">' + seatId + '</span>').join("");
    }

    if (cName) cName.textContent = booking.customerName;
    if (cEmail) cEmail.textContent = booking.customerEmail;
    if (cPhone) cPhone.textContent = booking.customerPhone;
    if (bTotal) bTotal.textContent = "₹" + booking.totalAmount;
    if (barcodeText) barcodeText.textContent = booking.bookingId;

    generateBarcode();
}

function generateBarcode() {
    const container = document.getElementById("barcode-lines");
    if (!container) return;
    container.innerHTML = "";
    for (let i = 0; i < 40; i++) {
        const line = document.createElement("span");
        const height = 15 + Math.floor(Math.random() * 25);
        line.style.height = height + "px";
        line.style.width = (Math.random() > 0.6 ? "3px" : "2px");
        container.appendChild(line);
    }
}

function clearBookingData() {
    localStorage.removeItem("spotMySeat_booking");
}

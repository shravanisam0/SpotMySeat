# 🎬 SpotMySeat — Movie Ticket Booking System

A complete Java OOP mini-project paired with a fully functional, offline-ready movie ticket booking web application.

---

## 📁 Project Structure

```
SpotMySeat/
├── src/                        # Java domain model classes (Core OOP Concepts)
│   ├── Person.java             # Abstract base class (Abstraction, Encapsulation)
│   ├── Customer.java           # Concrete subclass of Person (Inheritance, Polymorphism)
│   ├── Bookable.java           # Interface defining booking contract (Abstraction)
│   ├── Seat.java               # Implements Bookable; VIP & Classic seat tiers (Encapsulation)
│   ├── Show.java               # Movie screening with seat layout (Composition, ArrayList)
│   ├── Movie.java              # Movie entity with showtimes (Composition, Encapsulation)
│   └── Booking.java            # Completed booking record with customer & seats (Composition)
├── website/                    # Standalone web application (ready to run offline!)
│   ├── posters/                # Local high-resolution movie poster images
│   │   ├── minions_and_monsters.jpg
│   │   ├── the_lion_king.jpg
│   │   ├── zootopia_2.jpg
│   │   ├── coco.jpg
│   │   ├── inside_out_2.jpg
│   │   ├── toy_story_5.jpg
│   │   ├── kung_fu_panda_4.jpg
│   │   └── ratatouille.jpg
│   ├── logo.png                # Full brand logo
│   ├── logo-icon.png           # Transparent brand emblem & favicon
│   ├── logo-emblem.png         # High-resolution brand emblem
│   ├── fire-icon.png           # Hero top-pick badge icon
│   ├── search-icon.png         # Navbar search bar icon
│   ├── index.html              # Home page — browse, search & filter movies with city selector
│   ├── booking.html            # Booking page — date/showtime picker, seat map & checkout
│   ├── confirmation.html       # Confirmation page — digital cinema ticket & receipt
│   ├── common.css              # Shared design tokens, navbar, buttons & footer
│   ├── home.css                # Home page styles (hero banner, search, movie grid)
│   ├── booking.css             # Booking page styles (screen, seat layout, summary panel)
│   ├── confirmation.css        # Confirmation page styles (ticket voucher, barcode, print)
│   └── script.js               # Client-side booking engine (localStorage persistence)
└── README.md                   # Project documentation
```

---

## ☕ Java OOP Architecture & Concepts

The domain model in `src/` demonstrates all fundamental Object-Oriented Programming (OOP) principles:

| Concept | Implementation in Code |
| :--- | :--- |
| **Abstraction** | `Person.java` (abstract class with abstract `getDisplayInfo()` method); `Bookable.java` (interface defining reservation behavior and contract). |
| **Inheritance** | `Customer.java` extends the abstract `Person` class, inheriting core identity fields while adding customer-specific booking behavior. |
| **Polymorphism** | Method overriding in `Customer.java` implementing `getDisplayInfo()` from `Person`; `Seat.java` implementing the `Bookable` interface contract. |
| **Encapsulation** | Private instance variables across all model classes (`Movie`, `Show`, `Seat`, `Booking`, `Customer`) accessed via getters, setters, and validation methods. |
| **Composition** | `Movie` has-a list of `Show` objects (`ArrayList<Show>`); `Show` has-a list of `Seat` objects; `Booking` links a `Customer`, a `Show`, and selected `Seat` instances. |

---

## 🌐 Web Application Features

### 1. Home Page (`index.html`)
- 📍 **City / Location Selector** — Select city from the navbar dropdown (Pusad, Nagpur, Pune, Mumbai).
- 🎬 **Hero Banner** — Spotlights the top-rated featured movie with quick booking CTA.
- 🔍 **Real-Time Search** — Instant client-side search filtering by movie title, genre, or language.
- 🏷️ **Genre Filter Pills** — Filter catalog dynamically (All, Animation, Adventure, Comedy, Family, etc.).
- 🎴 **Movie Cards** — Detailed cards with poster art, ratings, release year, runtime, and price ranges.
- 🎞️ **Empty State** — Friendly placeholder when search or filter queries return no matches.

### 2. Booking Page (`booking.html`)
- 📅 **Date Selector** — 3-day advance booking (Today, Tomorrow, Day After).
- ⏰ **Showtime & Hall Selection** — Dynamic showtime chips displaying hall type (IMAX, Dolby Atmos, Standard).
- 💺 **Interactive 60-Seat Cinema Map** (6 rows × 10 seats):
  - **VIP Lounge (Rows A–B)**: Premium seating with gold accents and elevated pricing.
  - **Classic Hall (Rows C–F)**: Standard seating with classic pricing.
  - **Visual States**: Available, Selected (highlighted), and Sold Out (disabled).
  - Seat limit validation (up to 10 seats per transaction).
- 💰 **Live Checkout Calculation** — Real-time price computation with itemized ticket costs and convenience fees.
- 📝 **Customer Form Validation** — Client-side validation for customer name, email format, and 10-digit mobile number.

### 3. Confirmation Page (`confirmation.html`)
- ✅ **Animated Confirmation Badge** — Visual verification of successful booking.
- 🎟️ **Perforated Cinema Ticket Voucher** — Digital ticket styling with realistic perforated division.
- 📊 **Complete Booking Details** — Displays unique Booking ID, movie title, screening date, showtime, hall, seat numbers, customer details, and total amount paid.
- 📱 **Dynamic Barcode** — Generated barcode patterned to match the booking reference.
- 🖨️ **Print Ticket** — Ready for browser printing or saving to PDF.
- 🔄 **Book Another Movie** — Direct flow reset to return to the catalog.

---

## 🎬 Movie Catalog (8 Featured Films)

1. **Minions & Monsters** (2026) — Universal / Illumination
2. **The Lion King** (1994) — Walt Disney Animation
3. **Zootopia 2** (2025) — Walt Disney Animation
4. **Coco** (2017) — Disney / Pixar
5. **Inside Out 2** (2024) — Disney / Pixar
6. **Toy Story 5** (2026) — Disney / Pixar
7. **Kung Fu Panda 4** (2024) — DreamWorks Animation
8. **Ratatouille** (2007) — Disney / Pixar

*All posters are stored locally in `website/posters/` with fallback color placeholders.*

---

## 🎨 Design & Aesthetic

Netflix-inspired dark cinema theme engineered with modern CSS:
- **Canvas**: Pure black canvas (`#000000`) and layered dark surfaces (`#121212`, `#1c1c1c`).
- **Brand Accent**: Vibrant cinema red (`#E50914`) for primary CTAs, active tags, and accents.
- **VIP Accents**: Elegant gold accents (`#D4AF37`) for VIP lounge seats.
- **Status Colors**: Emerald green (`#46D369`) for confirmed states and positive feedback.
- **Typography & Motion**: Sleek sans-serif typography, smooth micro-interactions, and responsive layout across desktop, tablet, and mobile devices.

---

## 🚀 How to Run

### Running the Web Application
No local server, database, or package manager installation is required.
1. Navigate to the `website/` directory.
2. Double-click or open [index.html](file:///d:/Projects/moviebook/SpotMySeat/website/index.html) in any modern browser (Chrome, Edge, Firefox, Safari).

### Compiling Java Domain Classes
To compile and verify the Java OOP classes:
```powershell
# From the project root (SpotMySeat)
javac src/*.java
```

---

## ⚙️ Tech Stack

- **Java** — Object-Oriented domain modeling (Inheritance, Polymorphism, Abstraction, Encapsulation, Composition)
- **HTML5** — Semantic page structure with responsive meta tags
- **CSS3** — Custom properties, CSS Grid, Flexbox, keyframe animations
- **JavaScript (ES6+)** — Client-side booking engine with `localStorage` state management
- **Zero External Dependencies** — Runs completely offline without server or internet connection

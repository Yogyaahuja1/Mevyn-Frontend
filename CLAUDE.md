# Mevyn Frontend

React frontend for the Mevyn media body website.

**Stack:** React 19 + Vite 8 + Tailwind CSS v4 + TipTap + React Router v7 + Axios

---

## Dev Commands

```bash
npm run dev      # Start dev server on port 5173
npm run build    # Production build to dist/
npm run preview  # Preview production build locally
npm run lint     # Run ESLint
```

---

## Environment Variables

| Variable             | Description                          | Default                  |
| -------------------- | ------------------------------------ | ------------------------ |
| `VITE_API_BASE_URL`  | Backend API base URL (no trailing /) | `http://localhost:3000`  |

Copy `.env.example` to `.env` and adjust as needed.

---

## Project Structure

```
src/
  App.jsx                         # Root component, wraps providers
  main.jsx                        # Entry point, renders App into DOM
  index.css                       # Global styles and Tailwind imports
  assets/images/                  # Static images bundled by Vite
  components/
    about/                        # About page components (team cards)
    admin/                        # Admin panel components (editor, tables, forms)
    common/                       # Shared UI components (Navbar, Footer, Button, Modal, etc.)
    events/                       # Event display components
    home/                         # Homepage section components
    posts/                        # Blog post display components
    series/                       # Series display components
  config/
    constants.js                  # App-wide constants (API URL, pagination, storage keys)
    router.jsx                    # React Router route tree
    routes.js                     # Route path constants (single source of truth)
  contexts/
    AuthContext.jsx                # Authentication state (user, token, login/logout)
    ThemeContext.jsx               # Theme state (light/dark mode)
  data/
    team.json                     # Team member data (name, role, photo, socials)
    series-config.json            # Series definitions (name, slug, description)
  hooks/                          # Custom React hooks (data fetching, auth, theme, debounce)
  layouts/
    AdminLayout.jsx               # Admin shell (sidebar + header + content area)
    PublicLayout.jsx               # Public shell (navbar + content + footer)
  pages/
    NotFoundPage.jsx              # 404 catch-all page
    admin/                        # Admin pages (dashboard, post/event/account management)
    public/                       # Public pages (home, blog listing, blog post, series, about, login)
  services/
    api.js                        # Axios instance with JWT interceptor and error handling
    authService.js                # Auth and admin account API calls
    eventService.js               # Event API calls
    postService.js                # Post API calls
    searchService.js              # Client-side post search/filtering
  utils/
    cn.js                         # clsx + tailwind-merge helper
    formatDate.js                 # Date formatting utility
    logger.js                     # Logging utility (respects prod/dev, redacts secrets)
    readingTime.js                # Estimated reading time calculator
    storage.js                    # localStorage wrapper
    truncate.js                   # Text truncation helper
public/
  mevyn-logo.svg                  # Site favicon/logo
  team/                           # Team member photos
```

---

## Component Map -- "To change X, edit Y"

| UI Element                          | File                                              |
| ----------------------------------- | ------------------------------------------------- |
| Public Navbar                       | `src/components/common/Navbar.jsx`                |
| Footer                              | `src/components/common/Footer.jsx`                |
| Dark mode toggle                    | `src/components/common/ThemeToggle.jsx`            |
| Series dropdown in navbar           | `src/components/series/SeriesDropdown.jsx`         |
| Homepage hero banner                | `src/components/home/HeroSection.jsx`              |
| Homepage recent posts               | `src/components/home/RecentPosts.jsx`              |
| Homepage upcoming events            | `src/components/home/UpcomingEvents.jsx`           |
| Homepage ticker/marquee             | `src/components/home/Ticker.jsx`                   |
| Topic suggestion section            | `src/components/home/TopicSuggestion.jsx`          |
| Blog post card (in grids)           | `src/components/posts/PostCard.jsx`                |
| Blog post content (full view)       | `src/components/posts/PostContent.jsx`             |
| Blog post metadata bar              | `src/components/posts/PostMeta.jsx`                |
| Tag filter chips                    | `src/components/posts/TagFilter.jsx`               |
| Post grid layout                    | `src/components/posts/PostGrid.jsx`                |
| Event card                          | `src/components/events/EventCard.jsx`              |
| Event list layout                   | `src/components/events/EventList.jsx`              |
| Series card                         | `src/components/series/SeriesCard.jsx`             |
| Series detail page (3 layouts)      | `src/pages/public/SeriesDetailPage.jsx`            |
| Team member card                    | `src/components/about/MemberCard.jsx`              |
| Team members grid                   | `src/components/about/MembersPanel.jsx`            |
| Admin sidebar nav                   | `src/components/admin/AdminSidebar.jsx`            |
| Admin top header                    | `src/components/admin/AdminHeader.jsx`             |
| TipTap blog editor                  | `src/components/admin/PostEditor.jsx`              |
| Post metadata sidebar (in editor)   | `src/components/admin/PostMetadataPanel.jsx`       |
| Event form                          | `src/components/admin/EventForm.jsx`               |
| Account form modal                  | `src/components/admin/AccountForm.jsx`             |
| Account table                       | `src/components/admin/AccountTable.jsx`            |
| Event table                         | `src/components/admin/EventTable.jsx`              |
| Post table                          | `src/components/admin/PostTable.jsx`               |
| Dashboard stats card                | `src/components/admin/StatsCard.jsx`               |
| Login form                          | `src/pages/public/LoginPage.jsx`                   |
| Shared Button                       | `src/components/common/Button.jsx`                 |
| Shared Input                        | `src/components/common/Input.jsx`                  |
| Shared Modal                        | `src/components/common/Modal.jsx`                  |
| Shared Badge                        | `src/components/common/Badge.jsx`                  |
| Confirm dialog                      | `src/components/common/ConfirmDialog.jsx`          |
| Empty state placeholder             | `src/components/common/EmptyState.jsx`             |
| Error message banner                | `src/components/common/ErrorMessage.jsx`           |
| Loading spinner                     | `src/components/common/LoadingSpinner.jsx`         |
| Pagination controls                 | `src/components/common/Pagination.jsx`             |
| Search bar                          | `src/components/common/SearchBar.jsx`              |
| Auth route guard                    | `src/components/common/ProtectedRoute.jsx`         |

---

## Conventions

- **Component naming:** PascalCase for components, camelCase for hooks/utils.
- **File extensions:** `.jsx` for components and pages, `.js` for utilities, hooks, and services.
- **Path aliases:** `@/` maps to `src/` (configured in `vite.config.js`).
- **Styling (public):** Editorial CSS classes in `index.css` (`.card`, `.section-label`, `.btn-accent`, `.pill`, `.site-nav`, etc.) with CSS variables (`--accent`, `--bg`, `--text`, `--serif`, `--sans`). Variables switch automatically between light/dark via `:root` and `.dark` scopes.
- **Styling (admin):** Tailwind CSS v4 utilities with `dark:` variants. Admin pages are NOT affected by editorial CSS.
- **AMOLED dark mode:** `#0a0a0a` body, `#111111` surfaces, `#161616` cards -- CSS var `--bg`, `--bg2`, `--bg3`.
- **Fonts:** Syne (serif, headings), Space Grotesk (sans, body), Inter (fallback). Loaded via Google Fonts in `index.html`.
- **State management:** Context API for auth (`AuthContext`), theme (`ThemeContext`), toasts (`ToastContext`); local state for everything else.
- **API layer:** Axios instance (`services/api.js`) -> service functions -> custom hooks -> page components.
- **Anonymous posts:** When `post.anonymous` is `true`, display "Mevyn Editorial Team" as author (constant in `config/constants.js`).
- **Icons:** `lucide-react` for all icons. LinkedIn uses text link "LinkedIn -->" in `MemberCard`.
- **Touch targets:** Minimum 44x44px on all interactive elements.
- **Logging:** Use the logger utility (`utils/logger.js`) -- NEVER log tokens, passwords, or emails.
- **Route paths:** Import from `config/routes.js` -- never hardcode path strings.

---

## Data Files

| File                          | Purpose                                       |
| ----------------------------- | --------------------------------------------- |
| `src/data/team.json`          | Team members -- update to add/remove/reorder  |
| `src/data/series-config.json` | Series definitions (slug, title, description, layout, accent) |

---

## Adding a New Page

1. Create the page component in `src/pages/public/` (or `src/pages/admin/` for admin pages).
2. Add a route constant to `src/config/routes.js`.
3. Add the route entry to `src/config/router.jsx` under the appropriate layout (PublicLayout or AdminLayout).
4. If it needs navigation links, update `src/components/common/Navbar.jsx` (public) or `src/components/admin/AdminSidebar.jsx` (admin).
5. If it fetches data, create a service function in `src/services/` and a custom hook in `src/hooks/`.

---

## Backend API

The frontend consumes a REST API served by the Mevyn Backend (Express + MongoDB). All calls go through the Axios instance in `src/services/api.js`, which prepends `/api` to the base URL.

### Endpoints consumed

| Area     | Endpoints                                                                 |
| -------- | ------------------------------------------------------------------------- |
| Auth     | `POST /api/admins/login`, `GET /api/admins/me`, `PUT /api/admins/me/password` |
| Accounts | `GET /api/admins`, `POST /api/admins`, `PUT /api/admins/:uuid`, `DELETE /api/admins/:uuid` |
| Posts    | `GET /api/posts`, `GET /api/posts/:identifier`, `GET /api/posts/drafts/all`, `POST /api/posts`, `PUT /api/posts/:uuid`, `DELETE /api/posts/:uuid`, `PATCH /api/posts/:uuid/restore` |
| Events   | `GET /api/events`, `GET /api/events/:identifier`, `POST /api/events`, `PUT /api/events/:uuid`, `DELETE /api/events/:uuid`, `PATCH /api/events/:uuid/restore` |

For full API documentation (request/response schemas, error codes, pagination), see:
`D:\VSCode\Mevyn-Backend\docs\api-reference.md`

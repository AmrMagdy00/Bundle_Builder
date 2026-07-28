# Bundle Builder

A multi-step wizard for configuring a personalized security system — pick cameras, choose a monitoring plan, add sensors, and optionally include extra protection. Built with React 19, TypeScript, Vite, and Tailwind CSS v4.

## Architecture

### Feature-first folder structure

The entire bundle builder lives under `src/features/BundleBuilder/` as a self-contained module. Shared UI primitives (button, skeleton) and utilities (`cn()`) live under `src/shared/`.

```
src/
├── App.tsx                              # Root — renders <BundleBuilder />
├── main.tsx                             # Entry point
├── index.css                            # Tailwind imports + theme tokens
├── features/
│   └── BundleBuilder/
│       ├── index.tsx                    # Feature entry — wraps provider + view
│       ├── config/
│       │   └── steps.ts                 # Step definitions (title, icon, order)
│       ├── context/
│       │   └── BuilderContext.tsx        # React Context — shared state for all descendants
│       ├── hooks/
│       │   ├── useBuilderCatalog.ts      # Fetches catalog data from JSON API
│       │   └── useBundleBuilder.ts       # Manages selections, localStorage persistence
│       ├── types/
│       │   └── index.ts                 # TypeScript interfaces (Product, Plan, etc.)
│       ├── utils/
│       │   ├── catalog.ts               # Category-key to catalog-key mapping
│       │   └── price.ts                 # formatMoney(), discountedPrice(), lookups
│       ├── components/
│       │   └── shared/
│       │       ├── QuantityStepper.tsx   # +/- stepper with min/max guards
│       │       ├── PriceDisplay.tsx      # Original (strikethrough) + final price
│       │       ├── ProductThumbnail.tsx  # Image or fallback placeholder
│       │       └── ...                  # LoadingView, ErrorView, EmptyView, SectionHeader
│       └── pages/
│           ├── BundleBuilderPage/        # Wizard: accordion steps for each category
│           │   ├── index.tsx
│           │   └── components/
│           │       ├── StepContainer.tsx # Maps catalog to Step components
│           │       ├── Step.tsx          # Accordion shell (header + collapsible content)
│           │       ├── StepCard.tsx      # Mobile row for a single product/plan
│           │       ├── PcProductCard.tsx # Desktop card for a product
│           │       ├── ProductCard.tsx   # Legacy product card (accessories)
│           │       ├── ProtectionCard.tsx# Desktop card for protection add-ons
│           │       ├── VariantChips.tsx  # Color/variant selector chips
│           │       ├── StepHeader.tsx    # Step header with title, icon, count
│           │       └── AccordionContent.tsx # Collapsible wrapper
│           └── OrderSummaryPage/         # Review panel at bottom of page
│               ├── index.tsx
│               └── components/
│                   ├── SelectedProductsCart.tsx  # Groups selected items by category
│                   ├── ProductRow.tsx    # Camera/sensor/accessory row in summary
│                   ├── PlanRow.tsx       # Plan row in summary
│                   ├── ProtectionRow.tsx # Protection row in summary
│                   ├── ShippingRow.tsx   # Shipping information display
│                   ├── PromoBadge.tsx    # Discount/promo badge
│                   ├── Section.tsx       # Reusable section wrapper with title
│                   └── SummaryFooter.tsx # Pricing totals + Save/Checkout buttons
└── shared/
    ├── assets/
    │   ├── fonts/  (Gilroy family — Light, Regular, Medium, Bold, Heavy)
    │   ├── icons/  (camera, plan, sensors, shield, delivery, lock, etc.)
    │   └── images/ (product thumbnails, guarantee badge)
    ├── components/
    │   └── ui/
    │       ├── button.tsx               # shadcn-style button with variants
    │       ├── skeleton.tsx             # Loading skeleton
    │       └── LoadingIndicator.tsx     # Spinner
    └── lib/
        └── utils.ts                     # cn() — clsx + tailwind-merge helper
```

### Data flow

```
JSON API (Render)
      │
      ▼
useBuilderCatalog ─────────┐
(fetch + loading/error)    │
                           ▼
                    BuilderContext ───────────▶ BundleBuilderPage (wizard)
                    (catalog, items,               │
                     step state,                   ▼
                     actions)               OrderSummaryPage (review)
                           │                      │
      useBundleBuilder ────┘                      ▼
      (items state,                   SummaryFooter (totals)
       localStorage,                  Save / Checkout
       step navigation)
```

**Key points:**
- `useBuilderCatalog` fetches all products, plans, and protections from a JSON API in parallel with `Promise.all`.
- `useBundleBuilder` manages selected items as a flat `SelectedItem[]` array in React state, persisted to `localStorage` on every change.
- `BuilderContext` composes both hooks and provides a single memoized context value to all descendants.
- Step gating is derived: step N is enabled only when step N-1 has at least one selection.

### Component design

| Layer | Examples | Purpose |
|---|---|---|
| **Pages** | `BundleBuilderPage`, `OrderSummaryPage` | Top-level layout, compose sections |
| **Page components** | `Step`, `StepCard`, `ProductRow` | Specific UI for a page |
| **Shared feature components** | `QuantityStepper`, `PriceDisplay` | Reusable across pages within the feature |
| **Shared app components** | `Button`, `Skeleton` | Generic UI primitives |

### Mobile-first responsive strategy

- **Mobile** (< `lg` breakpoint, 1024px): horizontal rows with thumbnail, title, quantity stepper, and price; accordion-style step toggling.
- **Desktop** (≥ `lg`): card-based layout with larger thumbnails, variant selection chips, and a sticky order summary sidebar. The wizard and summary are placed side-by-side in a 2-column grid.
- The `lg:` prefix in Tailwind classes consistently gates desktop-only styles; mobile is the default.

### Key design decisions

1. **Feature encapsulation** — The entire builder is a single feature folder with its own types, hooks, context, and components. This keeps related code colocated and makes it easy to extract or reuse later.

2. **Context + hooks over Redux/Zustand** — For a form-like wizard with relatively simple state (selected items + open step), React Context with memoized values is sufficient and avoids external dependencies.

3. **localStorage persistence** — Selections survive page refreshes via `localStorage`. The `saveSystemForLater` action explicitly flushes state to storage; auto-save also runs on every `items` change via `useEffect`.

4. **Step gating** — Steps are progressively unlocked: you must select a camera to proceed to plans, select a plan to proceed to sensors, etc. This is derived from the `selectedCount` computation rather than stored separately.

5. **Grid-aligned quantity stepper** — The mobile row uses a CSS Grid with fixed 96px columns for the stepper and price, ensuring the `-/+/value` buttons stay at consistent horizontal positions regardless of price text width.

## Tech Stack

| Technology | Purpose |
|---|---|
| **React 19** | UI framework |
| **TypeScript 6** | Type safety |
| **Vite 8** | Build tool and dev server |
| **Tailwind CSS v4** | Utility-first styling |
| **shadcn/ui** | Component primitives (button, skeleton) |
| **@base-ui/react** | Accessible UI primitives |
| **lucide-react** | Icon library |
| **Oxlint** | Linting (Rust-based, fast) |
| **Render** | Backend JSON API hosting |

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Type-check and build for production
npm run build

# Preview production build
npm run preview

# Lint
npm run lint
```

## API

The app fetches catalog data from a JSON API hosted on Render:
- `GET /cameras` — Camera products with variants
- `GET /sensors` — Sensor products with variants
- `GET /accessories` — Accessory products with variants
- `GET /plans` — Monitoring plans
- `GET /protections` — Protection add-ons

The base URL is configured in `src/features/BundleBuilder/hooks/useBuilderCatalog.ts`.

## Pricing Logic

- `formatMoney(amount)` — Formats a number as `$XX.XX`
- `discountedPrice(price, discountPercentage)` — Applies a percentage discount
- `PriceDisplay` component — Renders original (strikethrough) and final price, or `"FREE"` when discounted to $0
- All prices in the summary are multiplied by quantity

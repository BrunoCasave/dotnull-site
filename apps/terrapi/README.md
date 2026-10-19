# Terrapi product site

Public route: https://dotnull.co.jp/apps/terrapi/

Static HTML, CSS and browser-local JavaScript. No package install or build is required. Serve the repository root with a static HTTP server. The company product entry is in `/index.html`, and the route is included in `/sitemap.xml`. Existing support, terms and privacy pages are linked without modification.

## Product and artwork sources

- App repository: https://github.com/BrunoCasave/terrapi
- Gameplay/roster verified against main `9b2c24824cb57bad7459162c8fa6254d6b2882e0`, including `README.md`, `lib/core/roster.dart`, `lib/core/rules.dart`, and `tool/art/`.
- The 34 SVG pet poses are exported from the app's `tool/pixel_art.py` bitmap and face functions, centered in a 32×16 viewBox. Geometry is unchanged; the site uses a dark green ink color.
- Icon: main's `ios/Runner/Assets.xcassets/AppIcon.appiconset/Icon-App-1024x1024@1x.png`.
- Wordmark, social image, screenshots: owner-approved `store/opus-artwork/` assets from store-preparation commit `46fe45f`. Logo, widget and Apple promotional artwork in that preparation branch are not yet present in main. The original image files are preserved.
- Screenshot fixture data is illustrative, not user/customer results. The illustrated hero device is explicitly labeled as a website demo.

## Store release switch

At creation on 2026-10-19, the public Google Play URL for `com.dotnull.terrapi` returned 404 and the Japanese iTunes search returned no Terrapi app. The site intentionally shows “配信準備中”, with no fabricated Store URL, date, reviews or download count.

When the app is publicly available:

1. Verify its actual App Store ID and Google Play listing, including target regions.
2. Replace the two informational `.store-status` blocks with working Store links/badges. Update the hero and navigation CTAs, final release note, platform FAQ, description metadata and company product card together.
3. Keep the free/adult membership distinction. Confirm pricing/eligibility in the Store before adding any exact price or trial claim.
4. Recheck mobile layouts, links and the deployed files.

## Validation at creation

- JavaScript syntax and Git whitespace checks passed.
- Local assets/links/anchors and all 30 species validated.
- Browser layout checks at 320, 390, 768, 1024 and 1440 CSS pixels: no horizontal overflow, no overflowing headings/controls, no failed loaded images.
- Browser interactions: pet response, five family filters, FAQ expansion.
- Keyboard-focus styling, reduced-motion handling, native FAQ disclosure and no-JavaScript initial content included.

No analytics, browser storage, signup forms or third-party runtime requests are added.

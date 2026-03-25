# Buena Copa — Shopify Theme

Custom Shopify Online Store 2.0 theme for [bebuenacopa.com](https://bebuenacopa.com). Purpose-built for a single-product DTC brand selling a hangover remedy in Mexico.

## Stack

- **Shopify Online Store 2.0** — JSON templates, sections, blocks
- **Tailwind CSS** — compiled and purged (`tailwind.min.css`)
- **Vanilla JS** — no framework dependencies
- **Liquid** — Shopify templating

## Structure

```
├── assets/          # CSS, JS, images
├── config/          # Theme settings schema + data
├── layout/          # theme.liquid, password.liquid
├── locales/         # es.default.json, en.json
├── sections/        # All section Liquid files
├── snippets/        # Reusable partials (cart-drawer, price, meta-tags)
├── templates/       # JSON templates for all page types
│   └── customers/   # Account, order, address templates
```

## Local Development

Requires [Shopify CLI](https://shopify.dev/docs/themes/tools/cli).

```bash
# Preview against the live store (no changes pushed)
shopify theme dev --store buena-copa-mx.myshopify.com

# Push to an unpublished theme for QA
shopify theme push --unpublished

# Push to the live/published theme
shopify theme push --live
```

The dev server runs at `localhost:9292` with hot reload. All changes are local until you explicitly push.

## Localization

The theme supports Spanish (default) and English for expat customers.

- `locales/es.default.json` — Spanish (primary)
- `locales/en.json` — English

Enable English in Shopify Admin: **Settings > Languages > Add language > English**.

All UI strings use the `{{ 'key' | t }}` pattern. Marketing copy in sections uses Liquid settings so it can be edited in the theme customizer without code changes.

## Installed Apps

| App | Purpose |
|-----|---------|
| Judge.me Reviews | Product reviews |
| Clearer Address Validator | Checkout address validation |
| Bundles / Simple Bundles & Kits | Product bundling |
| Upcart Cart Drawer | Slide-out cart |
| Microsoft Clarity | Session recording & heatmaps |
| UpPromote Affiliate | Affiliate program |
| Referral Program - Shopjar | Referral tracking |
| Tapita SEO & Speed | SEO optimization |

Apps connect via Shopify's app embed system (`settings_data.json`), not hardcoded in theme files. Uninstalling an app won't break the theme.

## Theme Settings

Configurable in Shopify Admin > **Online Store > Themes > Customize**:

- Brand identity (logo, favicon, tagline, colors)
- Announcement bar (text, link, colors)
- Social media links (Instagram, Facebook, TikTok, Twitter, YouTube)
- Footer content and navigation
- All homepage section content

## Deployment

1. Create a branch for changes
2. Test locally with `shopify theme dev`
3. Push to an unpublished theme for QA: `shopify theme push --unpublished`
4. QA in Shopify Admin preview
5. Publish via Admin or `shopify theme push --live`

## Contributing

All theme changes should go through PRs on this repo. Do not edit directly in the Shopify theme editor for structural changes — use the editor only for content and settings.

# Buenacopa — Shopify Admin QA Checklist

**Date:** March 25, 2026
**Store:** buena-copa-mx.myshopify.com / bebuenacopa.com

This checklist covers everything that needs to be verified and fixed **inside Shopify Admin** — not theme code.

---

## 🔴 CRITICAL FIXES

### 1. Navigation Menu Handles Are Swapped
The "Main" menu has handle `footer` and the "Footer" menu has handle `main-menu`. These are reversed, causing the theme to display wrong links in the wrong locations.

**Fix:** Go to **Content > Menus**
- [ ] Rename the menu called "Main" (handle: `footer`) to "Footer" — or create a new menu with the correct handle
- [ ] Rename the menu called "Footer" (handle: `main-menu`) to "Main"
- [ ] Verify the theme footer section references the correct menu handle

**Recommended final footer menu structure:**

| Group | Links |
|-------|-------|
| **Producto** | ¿Cómo funciona? (`/pages/que-es`), Sobre nosotros (`/pages/sobre-nosotros`), Contáctanos (`/pages/contact`) |
| **Legal** | Políticas (`/pages/politicas`), Aviso de privacidad (`/pages/aviso-de-privacidad`) |

### 2. Timezone Is Wrong
Currently set to **Eastern Time (US & Canada / GMT-5)** — should be **Mexico City (GMT-6)**.

**Fix:** Go to **Settings > General > Store defaults**
- [ ] Change timezone to **(GMT-06:00) Mexico City** (`America/Mexico_City`)
- [ ] Note: This affects order timestamps, analytics, and scheduled discounts

### 3. Shopify Payments Not Activated
The store is paying an **extra 1% transaction fee** on every order through PayPal and MercadoPago.

**Fix:** Go to **Settings > Payments**
- [ ] Review if Shopify Payments can be activated for Mexico
- [ ] If activated: eliminates 1% surcharge, enables Shop Pay, unified payouts
- [ ] If not possible (regulatory reasons): document why for the team

### 4. No Favicon
The site has no favicon — browser tabs show a generic icon.

**Fix:** Go to **Online Store > Themes > Customize > Theme settings > Favicon**
- [ ] Upload a 32×32 PNG favicon (use the Buenacopa logo mark)
- [ ] Also upload a 180×180 PNG for Apple touch icon

---

## 🟡 IMPORTANT FIXES

### 5. Page Template Assignments
Go to **Online Store > Pages**:

- [ ] **¿Cómo funciona?** → Change Template to `page.como-funciona`
- [ ] **Contact** → Rename page title to **"Contáctanos"**

### 6. Pages to Hide
- [ ] **Rise rewards page** → Set Visibility to Hidden
- [ ] **Referral** → Set Visibility to Hidden

### 7. Placeholder Phone Number
Currently showing "1112345678" — not a real number.

**Fix:** Go to **Settings > General > Contact information**
- [ ] Update to the real Buenacopa business phone number
- [ ] Or remove if WhatsApp (my-coco.ai) is the primary contact method

### 8. Typo in Menu Name
**Fix:** Go to **Content > Menus**
- [ ] Rename "Custemer account main menu" to "Customer account main menu"

### 9. Missing Delivery Expectations
Customers cannot see estimated delivery times.

**Fix:** Go to **Settings > Shipping and delivery > Delivery expectations**
- [ ] Set expected delivery times for each shipping zone (e.g., "2-3 business days")
- [ ] This shows on product pages and checkout

### 10. Second Shipping Location Not Configured
Only 1 of 2 locations is assigned to the General shipping profile.

**Fix:** Go to **Settings > Shipping and delivery**
- [ ] Verify both locations have shipping rates configured
- [ ] Or deactivate the unused location if not needed

---

## 🟢 SEO OPTIMIZATIONS

### 11. Homepage SEO (Preferences)
Go to **Online Store > Preferences > Social sharing image and SEO**:

**Current state:**
- Home page title: "Buenacopa" (9/70 chars) — ⚠️ Could be more descriptive
- Meta description: ✅ Good (130/320 chars, includes DHM + L-Cisteína keywords)
- Social sharing image: ✅ Set
- Password protection: ✅ Off

**Recommended improvements:**
- [ ] Update home page title to: **"Buenacopa — Bienestar Post-Fiesta | Previene la Cruda"** (more keywords, still under 70 chars)
- [ ] Consider adding English meta description via "Localize" button for expat audience

### 12. Page Meta Descriptions
Go to **Online Store > Pages > [page name] > Search engine listing**:

- [ ] **Sobre nosotros** — Add: "Conoce la historia, misión y valores de Buenacopa. La primera solución post-fiesta con respaldo científico en México."
- [ ] **¿Cómo funciona?** — Add: "Descubre la ciencia detrás de Buenacopa. DHM, L-Cisteína, Vitamina C y Cúrcuma trabajan mientras duermes."
- [ ] **Contáctanos** — Add: "¿Tienes preguntas sobre Buenacopa? Contáctanos por formulario o WhatsApp. Estamos para ayudarte."

### 13. Twitter/X Social Sharing
- [ ] Go to **Settings > General** or check if Shopify has a Twitter handle field
- [ ] The `twitter:site` tag is missing — social shares on X won't link to the brand
- [ ] If the brand has a Twitter/X account, add it to theme settings

### 14. Automatic Redirection Settings
Go to **Online Store > Preferences > Automatic redirection**:

**Current state:**
- Country/region: ✅ ON
- Language: ❌ OFF

**Recommendation:**
- [ ] Turn Language redirection **ON** if you enable English locale for expats
- [ ] Keep Country/region ON for Mexico market

---

## 🔵 PAYMENT METHODS (Footer Icons)

Go to **Settings > Payments**:

**Current active providers:**
| Provider | Status |
|----------|--------|
| PayPal | ✅ Active |
| Credit/Debit by PayPal | ✅ Active |
| Mercado Pago Checkout Pro | ✅ Active |

**Footer currently shows:** PayPal only

- [ ] Verify credit card icons (Visa, Mastercard, Amex) are showing — they should auto-appear from "Credit/Debit card by PayPal"
- [ ] If icons still don't show, check if PayPal's credit card processing is fully configured
- [ ] Consider adding OXXO/SPEI if targeting cash payment customers in Mexico

---

## 🔵 CONTENT & IMAGES

### 15. Sobre Nosotros Page Images
Go to **Online Store > Themes > Customize > Pages > Sobre nosotros**:

- [ ] Upload **Hero background** — Brand/lifestyle photo (1920×800)
- [ ] Upload **Manifesto image** — Product/lifestyle (800×600)
- [ ] Upload **Story section image** — Team/founding story (800×900)
- [ ] Upload **Commitment image 1** — Lifestyle portrait (480×640)
- [ ] Upload **Commitment image 2** — Lifestyle portrait (480×640)

### 16. Product Content
Go to **Products**:

- [ ] Decide which products to keep Active vs Draft
- [ ] Bundle products show wrong content on product pages (hardcoded template)
- [ ] Verify main product (Buenacopa - Bienestar Post-Fiesta) has all variants correct
- [ ] Confirm Calcetines and Gorra visibility (currently 0 Online Store channels)

---

## 🔵 APPS CLEANUP

Go to **Apps**:

- [ ] **Rise.ai** — Uninstall (requires platform.rise.ai login). Saves 86 KiB JS.
- [ ] **Upcart Cart Drawer** — Decide: keep or uninstall? Custom cart drawer exists in theme.
- [ ] **Shopjar Referral** — App embed is disabled. Uninstall if not needed.
- [ ] **thinker-11** — Was flagged for removal. Confirm and uninstall.

---

## 🔵 MARKETS & INTERNATIONALIZATION

Go to **Markets**:

**Current:** Mexico only (active)

- [ ] If selling to expats in US: Consider creating a US market with USD pricing
- [ ] If enabling English: Go to **Markets > Mexico > Languages** and add English
- [ ] Theme already has English locale file (`en.json`) ready
- [ ] Enable Language auto-redirection in Preferences once English is active

---

## VERIFICATION AFTER ALL FIXES

After completing the above, verify:

- [ ] Visit bebuenacopa.com — all pages load correctly
- [ ] Check footer shows correct links organized in groups
- [ ] Check footer shows all payment method icons
- [ ] Check favicon appears in browser tab
- [ ] Test on mobile (375px) — navigation, forms, CTAs all work
- [ ] Run PageSpeed Insights on bebuenacopa.com
- [ ] Check Google Search Console for any new crawl errors
- [ ] Place a test order to verify checkout flow end-to-end

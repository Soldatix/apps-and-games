# Apps & Games SEO Publishing Standard

This checklist is part of the release process for every new Apps & Games app or game.

A project is **not considered fully published** until the standalone project and the main Apps & Games portal have both been updated and checked.

## 1. Standalone app or game

Use the final `appsandgames.org` URL before publishing SEO metadata.

Required:

- Unique `<title>` that clearly describes the app/game.
- Useful `<meta name="description">` written for real search users.
- `<meta name="robots" content="index, follow">`.
- `<link rel="canonical">` pointing to the final Apps & Games URL.
- No obsolete GitHub Pages, Workers, ChatGPT Sites or temporary URLs in canonical/social metadata.
- Open Graph metadata:
  - `og:type`
  - `og:title`
  - `og:description`
  - `og:url`
  - `og:site_name` = `Apps & Games`
  - `og:image`
  - `og:image:alt`
- Twitter/X Card metadata:
  - `twitter:card` = `summary_large_image`
  - `twitter:title`
  - `twitter:description`
  - `twitter:image`
- Schema.org JSON-LD:
  - Apps: `WebApplication` or `SoftwareApplication`
  - Games: `VideoGame` and/or `SoftwareApplication`
  - final URL
  - description
  - application/game category
  - operating system/platform where relevant
  - `isAccessibleForFree: true` when applicable
  - supported languages when the project genuinely supports them
  - Apps & Games publisher
  - free Offer where useful
- A social-preview image. Preferred format: PNG/JPEG around 1200×630 px.

## 2. Apps & Games portal

For every new project:

- Add the project card to the Apps/Games collection.
- Add or update the detailed information page.
- Use the final standalone URL on the card and detail page.
- Add the project to the static Schema.org `ItemList` in `index.html`.
- Update `numberOfItems` in that ItemList.
- Update the portal meta description when the collection summary should mention the new project.
- Update multilingual portal text/cards for EN, HR, DE, IT and ES where applicable.
- Add the detail-page URL to `sitemap.xml` with the correct `lastmod` date.
- Verify `robots.txt` continues to expose the sitemap.

## 3. Multilingual rules

- The current interface may switch languages dynamically on one URL.
- Do **not** add multiple `hreflang` tags that all point to exactly the same URL merely because the interface can change language.
- If separate crawlable language URLs are introduced later, then add reciprocal `hreflang` links and an `x-default` URL.
- Only declare languages in structured data that the specific project actually supports.

## 4. Final release check

Before calling the publication finished:

1. Open the final public URL.
2. Confirm the app/game still works on desktop and mobile layouts.
3. Confirm the page source contains the final canonical URL.
4. Confirm Open Graph and Twitter metadata use the final URL/image.
5. Confirm Schema.org JSON-LD is valid and contains the final URL.
6. Search the repository for obsolete public URLs related to that project.
7. Confirm the main Apps & Games card opens the correct project.
8. Confirm the detail page exists and links to the correct project.
9. Confirm the project detail URL appears in `sitemap.xml`.
10. Confirm analytics/measurement remains present where required.

## 5. Social promotion readiness

Before promoting a new app/game on Facebook, Instagram or another social platform:

- Prefer a dedicated 1200×630 social-preview image showing the actual app/game.
- Use a short benefit-focused description.
- Link directly to the final `appsandgames.org` project URL when the goal is immediate use, or to the Apps & Games detail page when more explanation is useful.
- Re-check the social preview after changing `og:image`, title or description.

---

**Apps & Games release rule:** publishing the code is only one part of the release. Portal integration, SEO metadata, structured data, sitemap and social-preview readiness are part of the same publication process.

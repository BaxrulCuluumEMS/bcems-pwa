BCEMS PWA STARTER — ICON/INSTALLATION PROTOTYPE

Included:
- index.html: branded launcher page
- manifest.json: PWA app name, icon, and standalone display settings
- sw.js: caches the launcher shell only
- icons/: school logo rendered into app icon sizes

Important:
1. This is a separate static PWA launcher prototype; it does NOT replace your existing Google Apps Script app.
2. The BCEMS data, authentication, attendance, finance, and other features remain at:
   https://script.google.com/macros/s/AKfycbxr60jtT9I2R5kOstPKpDWsdITqo93qunmojXNSITcbWTwCSynFLg71-I75kRi-msjS/exec
3. The package must be hosted on an HTTPS static host (for example GitHub Pages or Cloudflare Pages) before browser installation works.
4. The "Fur BCEMS" button opens the existing Apps Script Web App. This starter does not yet embed the Apps Script app inside the PWA, because embedding may require changing doGet() X-Frame-Options and testing Google authentication/cookies. We should not change your working backend without verifying those constraints.
5. Do not replace Index.html in Apps Script with this package. It is a separate site.
6. To install the PWA, host the folder contents at the root of an HTTPS site, open that site in a supported browser, then choose Install app / Add to Home Screen.
7. iPhone/iPad installation uses Safari > Share > Add to Home Screen. iOS behavior can differ from Android/Windows.

This is a safe first step: it prepares the automatic app icon and PWA metadata without changing the live BCEMS code or school data.

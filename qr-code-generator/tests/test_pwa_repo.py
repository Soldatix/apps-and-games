"""GitHub PWA gate. Python 3 stdlib only; run from qr-code-generator/."""
from pathlib import Path
import json,re,struct,subprocess,unittest
ROOT=Path(__file__).resolve().parents[1]
class PwaTests(unittest.TestCase):
    def test_manifest(self):
        m=json.loads((ROOT/'manifest.webmanifest').read_text('utf-8'))
        self.assertEqual((m['start_url'],m['scope'],m['id']),('/qr-code-generator/',)*3)
        self.assertEqual(m['display'],'standalone')
        self.assertEqual(len(m['icons']),4)
    def test_icons(self):
        m=json.loads((ROOT/'manifest.webmanifest').read_text('utf-8'))
        for i in m['icons']:
            raw=(ROOT/i['src']).read_bytes()
            self.assertTrue(raw.startswith(b'\x89PNG\r\n\x1a\n'))
            side=int(i['sizes'].split('x')[0]);self.assertEqual(struct.unpack('>II',raw[16:24]),(side,side))
    def test_cache_preload(self):
        s=(ROOT/'sw.js').read_text('utf-8')
        files={str(p.relative_to(ROOT)).replace('\\','/') for p in ROOT.rglob('*') if p.is_file()}
        pre=set(re.findall(r"'\./(.*?)'",s))
        resources={p for p in files if p.startswith('assets/') or p.startswith('licenses/') or p=='manifest.webmanifest'}
        self.assertFalse(resources-pre, resources-pre)
        self.assertIn("'./'",s)
        self.assertNotIn("'./index.html'",s)
        self.assertIn('caches.match(ROOT.href)',s)
    def test_cache_privacy(self):
        s=(ROOT/'sw.js').read_text('utf-8')
        for expected in ("request.method !== 'GET'","url.origin !== ROOT.origin","url.search || !STATIC.has(url.href)","cache: 'no-store'"):
            self.assertIn(expected,s)
        for forbidden in ('cache.put(', 'indexedDB','localStorage','analytics','adsterra'):
            self.assertNotIn(forbidden,s)
    def test_sensitive_pwa_isolation(self):
        s=(ROOT/'assets/js/pwa.mjs').read_text('utf-8')
        for forbidden in ("byId('wifi-password')", "byId('contact-email')",'localStorage.setItem','fetch(', 'sendBeacon'):
            self.assertNotIn(forbidden,s)
        for locale in ('en','hr','de','it','es','fr'):
            self.assertIn(f'  {locale}: {{',s)
    def test_index(self):
        s=(ROOT/'index.html').read_text('utf-8')
        self.assertIn('rel="manifest"',s)
        self.assertIn('assets/js/pwa.mjs',s)
        self.assertIn('v1.3.0',s)
        self.assertIn('<strong>1.3.0</strong>',s)
        self.assertNotIn('v1.2.1',s)
        self.assertNotIn('bauval.org',s)
    def test_manifest_scope_not_portal(self):
        s=(ROOT/'sw.js').read_text('utf-8')
        self.assertIn("const ROOT = new URL('./', self.registration.scope);",s)
        self.assertNotIn('self.registration.scope =',s)
if __name__=='__main__':unittest.main()

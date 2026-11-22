/** Manual PWA update check: no direct network calls, no QR/user data access.
 * The browser fetches only the already registered service-worker script.
 */
export async function checkPwaUpdate(registration, { online = true, controlled = true, timeoutMs = 15000 } = {}) {
  if (!online) return 'offline';
  if (!registration || typeof registration.update !== 'function') return 'unsupported';
  if (registration.waiting && controlled) return 'available';

  let checked;
  try { checked = await registration.update(); }
  catch { return 'failed'; }

  const current = checked || registration;
  if (current.waiting && controlled) return 'available';
  const installing = current.installing || registration.installing;
  if (!installing) return 'current';
  if (installing.state === 'redundant') return 'failed';

  if (installing.state !== 'installed' && installing.state !== 'activated') {
    const outcome = await new Promise(resolve => {
      let finished = false;
      let timer;
      const finish = result => {
        if (finished) return;
        finished = true;
        installing.removeEventListener?.('statechange', onStateChange);
        clearTimeout(timer);
        resolve(result);
      };
      const onStateChange = () => {
        if (installing.state === 'installed' || installing.state === 'activated') finish('done');
        else if (installing.state === 'redundant') finish('failed');
      };
      installing.addEventListener?.('statechange', onStateChange);
      timer = setTimeout(() => finish('pending'), timeoutMs);
      onStateChange();
    });
    if (outcome !== 'done') return outcome;
  }
  return (current.waiting || registration.waiting) && controlled ? 'available' : 'current';
}

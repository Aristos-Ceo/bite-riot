export function RiotLoadingScreen() {
  return (
    <div className="br-loading-screen" role="status" aria-live="polite" aria-label="Loading BITE RIOT">
      <div className="br-loading-grain" aria-hidden="true" />
      <div className="br-loading-content">
        <div className="br-loading-stamp" aria-hidden="true"><span>✳</span></div>
        <p className="br-loading-eyebrow">FRESHLY MADE. ALWAYS LOUD.</p>
        <div className="br-loading-wordmark">BITE<span>RIOT.</span></div>
        <p className="br-loading-tagline">GOOD FOOD. ZERO QUIET.</p>
        <div className="br-loading-track" aria-hidden="true"><span /></div>
        <p className="br-loading-caption">GETTING THE GOOD STUFF READY</p>
      </div>
      <span className="br-loading-corner br-loading-corner-left">EST. IN GOOD TASTE</span>
      <span className="br-loading-corner br-loading-corner-right">01 / 01</span>
    </div>
  );
}

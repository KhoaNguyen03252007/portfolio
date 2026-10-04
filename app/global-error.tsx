"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div style={{ padding: '50px', background: 'black', color: 'red', minHeight: '100vh', zIndex: 9999, position: 'relative' }}>
          <h1>Global Next.js Error Caught</h1>
          <p><strong>Message:</strong> {error.message}</p>
          <p><strong>Digest:</strong> {error.digest}</p>
          <pre style={{ background: '#222', padding: '1rem', overflowX: 'auto' }}>{error.stack}</pre>
          <button onClick={() => reset()}>Try again</button>
        </div>
      </body>
    </html>
  );
}

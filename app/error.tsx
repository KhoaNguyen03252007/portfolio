"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div style={{ padding: '50px', background: 'black', color: 'red', minHeight: '100vh', zIndex: 9999, position: 'relative' }}>
      <h1>Next.js Page Error Caught</h1>
      <p><strong>Message:</strong> {error.message}</p>
      <p><strong>Digest:</strong> {error.digest}</p>
      <pre style={{ background: '#222', padding: '1rem', overflowX: 'auto' }}>{error.stack}</pre>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}

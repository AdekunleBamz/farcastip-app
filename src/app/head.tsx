export default function Head() {
  const frameJson = {
    version: "next",
    imageUrl: "https://farcastipmini.vercel.app/og-image.png", // Removed ?v=2
    button: {
      title: "Send MON Tip",
      action: {
        type: "launch_frame",
        name: "FarcasTip",
        url: "https://farcastipmini.vercel.app/",
        splashImageUrl: "https://farcastipmini.vercel.app/icon.png",
        splashBackgroundColor: "#4F46E5"
      }
    }
  };

  return (
    <>
      <title>FarcasTip - Send MON Tips on Monad</title>
      <meta name="description" content="A simple and secure way to tip your favorite Farcaster users with MON tokens on the Monad testnet." />

      {/* Farcaster Frame meta */}
      <meta name="fc:frame" content={JSON.stringify(frameJson)} />

      {/* Open Graph / SEO meta */}
      <meta property="og:url" content="https://farcastipmini.vercel.app/" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="FarcasTip - Send MON Tips on Monad" />
      <meta property="og:description" content="A simple and secure way to tip your favorite Farcaster users with MON tokens on the Monad testnet." />
      <meta property="og:image" content="https://farcastipmini.vercel.app/og-image.png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" /> {/* 1.91:1 aspect ratio */}
      <meta property="og:site_name" content="FarcasTip" />

      {/* Twitter tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="FarcasTip - Send MON Tips on Monad" />
      <meta name="twitter:description" content="A simple and secure way to tip your favorite Farcaster users with MON tokens on the Monad testnet." />
      <meta name="twitter:image" content="https://farcastipmini.vercel.app/og-image.png" />
      <meta name="twitter:domain" content="farcastipmini.vercel.app" />

      {/* Added for polish */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="UTF-8" />
      <link rel="manifest" href="/manifest.json" />
    </>
  );
}
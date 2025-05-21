# FarcasTip

**FarcasTip** is a modern web mini app that allows users to send MON tokens (on Monad testnet) as tips to Farcaster users. It features a beautiful splash screen, wallet connection, and a simple, secure tipping workflow.

---

## 🚀 Features

- **Send MON tips** to any Farcaster username or address
- **Connect your Monad wallet** securely
- **Modern UI** with splash screen and custom icon
- **Live balance and transaction feedback**
- **Built with Next.js, Tailwind CSS, and Wagmi**

---

## 🖼️ Splash & Icon Requirements

- **Splash Image:**  
  Place a valid PNG at `public/splash.png` (recommended: 256x256 or 512x512).  
  To create from SVG: Save as `splash.svg` (UTF-8), convert to PNG using [svg2png.com](https://svg2png.com/), and place as `splash.png`.  
  Test by visiting `/splash.png` in your browser.

- **App Icon:**  
  Place a valid PNG at `public/icon.png` (recommended: 256x256).  
  You can use the provided SVG template, convert to PNG, and place as `icon.png`.

---

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/AdekunleBamz/farcastip-app
cd farcastip-app
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Run the development server

```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚡ Usage

1. **Connect your Monad wallet** using the "Connect Wallet" button.
2. **Enter a Farcaster username** (e.g., `@alice`) or a wallet address.
3. **Enter the amount of MON** you want to tip.
4. **Send the tip** and confirm the transaction in your wallet.

---

## 🐛 Troubleshooting

- **Broken or missing splash/icon:**  
  - Ensure the PNG is valid (open in an image viewer, not a text editor).
  - File must be in the `public/` folder and named exactly `splash.png` or `icon.png`.
  - The image should load at `/splash.png` or `/icon.png` in your browser.
  - If you see text or a 404, re-save and re-upload the image as described above.

- **Wallet connection issues:**  
  - Make sure you are using a Monad-compatible wallet and are on the Monad testnet.

---

## 🚀 Deployment

Deploy easily on [Vercel](https://vercel.com/):

- Push your code to GitHub.
- Connect your repo to Vercel.
- Set the build command to `npm run build` and output directory to `.next` (default for Next.js).
- After deployment, verify your splash and icon images load at `/splash.png` and `/icon.png`.

---

## 🧰 Built With

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Wagmi](https://wagmi.sh/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vercel](https://vercel.com/)

---

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Wagmi Docs](https://wagmi.sh/)
- [Tailwind CSS Docs](https://tailwindcss.com/)

---

## ❤️ Credits

Built with love for the Farcaster community.  
Powered by Monad Testnet.

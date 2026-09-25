// NOTE (future work): packs are currently Telegram-only (see the `telegram` field
// below). The plan is to expand distribution to other platforms too — when that
// data is ready, this is the place to add per-pack links per platform.
//
// Each pack can have real artwork or fall back to an emoji placeholder.
// To add your own images: drop files into images/packs/<id>/
//   cover.png        -> used on cards + the pack page
//   01.png, 02.png..  -> individual stickers for the preview grid
// Then add "cover: true" and "stickerFiles: N" to that pack's entry (see README.md).
// Until then, leave cover/stickerFiles out and the emoji placeholder is used.

const CREATOR = { name: "LuLuStudio", tagline: "Small stickers, made slowly." };

const PACKS = [
  { id: "mood",  name: "Daily Mood",   emoji: "", cover: true, stickerFiles: 5, price: 0, stickers: 5, preview: 5, telegram:"https://t.me/addstickers/ddaily_moodd", desc: "Everyday reactions — tired, hyped, done with today." },
  { id: "cat",   name: "Chaos",    emoji: "", cover: true, stickerFiles: 10, price: 3.99, stickers: 10, preview: 5,  desc: "Carr being dramatic about very small things." },
  { id: "soft",  name: "Coming Soon..",    emoji: "", price: 0.00, stickers: 0, preview: 5,  desc: "Gentle little moments for slow, cozy chats." },
  { id: "study", name: "Coming Soon..",  emoji: "", price: 0.00, stickers: 0, preview: 6,  desc: "Deadlines, coffee, and tiny wins for study days." },
  { id: "love",  name: "Coming Soon..",emoji: "", price: 0.00, stickers: 0, preview: 7,  desc: "Hearts and small messages for someone you like." }
];

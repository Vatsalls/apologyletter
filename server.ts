import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "15mb" }));

// In-memory + JSON storage for messages, visitors, letter, and photos
const DATA_FILE = path.join(process.cwd(), "messages_store.json");

interface MessageItem {
  id: string;
  senderName: string;
  message: string;
  mood?: string;
  timestamp: string;
  read: boolean;
}

interface PhotoItem {
  id: string;
  url: string;
  caption: string;
  date?: string;
  frameStyle: "polaroid" | "sunflower" | "scribble" | "notebook" | "tape";
  sticker?: string;
  likes?: number;
}

interface AppData {
  visitorCount: number;
  lastVisit: string | null;
  visitors: { time: string; userAgent: string }[];
  messages: MessageItem[];
  customLetter: string;
  photos: PhotoItem[];
}

let appData: AppData = {
  visitorCount: 0,
  lastVisit: null,
  visitors: [],
  messages: [],
  customLetter:
    "To my favorite person, you make every day as bright and warm as a field of sunflowers. I created this special little corner of the internet just for you...",
  photos: [],
};

// Load existing data if available
if (fs.existsSync(DATA_FILE)) {
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    appData = { ...appData, ...parsed };
  } catch (err) {
    console.error("Could not parse messages_store.json, starting fresh", err);
  }
}

function saveData() {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(appData, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to save data:", err);
  }
}

// Track visits
app.post("/api/visit", (req, res) => {
  appData.visitorCount += 1;
  const now = new Date().toISOString();
  appData.lastVisit = now;
  const userAgent = req.headers["user-agent"] || "Unknown Browser";

  appData.visitors.unshift({
    time: now,
    userAgent: userAgent.slice(0, 80),
  });

  if (appData.visitors.length > 50) {
    appData.visitors = appData.visitors.slice(0, 50);
  }

  saveData();
  res.json({ success: true, count: appData.visitorCount });
});

// Save a note (kept privately, viewable only from the settings panel)
app.post("/api/send-message", (req, res) => {
  const { senderName, message, mood } = req.body;
  if (!message || message.trim() === "") {
    return res.status(400).json({ error: "Message content cannot be empty!" });
  }

  const newMessage: MessageItem = {
    id: "msg-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6),
    senderName: senderName || "Your Sunflower 🌻",
    message: message.trim(),
    mood: mood || "💛",
    timestamp: new Date().toISOString(),
    read: false,
  };

  appData.messages.unshift(newMessage);
  saveData();

  res.json({
    success: true,
    message: "Your message has been saved! 🌻",
    data: newMessage,
  });
});

// Get admin stats & messages (for the hidden settings panel)
app.get("/api/admin/data", (req, res) => {
  res.json({
    visitorCount: appData.visitorCount,
    lastVisit: appData.lastVisit,
    visitors: appData.visitors,
    messages: appData.messages,
    customLetter: appData.customLetter,
  });
});

// Save custom landing letter
app.post("/api/admin/update-letter", (req, res) => {
  const { letter } = req.body;
  if (typeof letter === "string") {
    appData.customLetter = letter;
    saveData();
  }
  res.json({ success: true, letter: appData.customLetter });
});

// List photos
app.get("/api/photos", (req, res) => {
  res.json({ photos: appData.photos });
});

// Add a photo
app.post("/api/photos", (req, res) => {
  const { url, caption, frameStyle, sticker, date } = req.body;
  if (!url) {
    return res.status(400).json({ error: "Photo URL/data is required" });
  }

  const newPhoto: PhotoItem = {
    id: "photo-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6),
    url,
    caption: caption || "Our Special Sunflower Memory 💛",
    date: date || "Today",
    frameStyle: frameStyle || "polaroid",
    sticker: sticker || "🌻",
    likes: 1,
  };

  appData.photos.unshift(newPhoto);
  saveData();
  res.json({ success: true, photo: newPhoto });
});

// Delete a photo (from the settings panel)
app.delete("/api/photos/:id", (req, res) => {
  appData.photos = appData.photos.filter((p) => p.id !== req.params.id);
  saveData();
  res.json({ success: true });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🌻 Sunflower Love App running on http://localhost:${PORT}`);
  });
}

startServer();

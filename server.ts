import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory + JSON storage for messages and visitors
const DATA_FILE = path.join(process.cwd(), "messages_store.json");

interface MessageItem {
  id: string;
  senderName: string;
  message: string;
  mood?: string;
  timestamp: string;
  read: boolean;
}

interface AppData {
  visitorCount: number;
  lastVisit: string | null;
  visitors: { time: string; userAgent: string }[];
  messages: MessageItem[];
  customLetter: string;
}

let appData: AppData = {
  visitorCount: 0,
  lastVisit: null,
  visitors: [],
  messages: [
    {
      id: "sample-1",
      senderName: "Your Sunflower 🌻",
      message: "I opened your website and it made my day so bright! Thank you Vatsal! 💛",
      mood: "😊",
      timestamp: new Date().toISOString(),
      read: true
    }
  ],
  customLetter: "To my favorite person, you make every day as bright and warm as a field of sunflowers. I created this special little corner of the internet just for you..."
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
    userAgent: userAgent.slice(0, 80)
  });
  
  if (appData.visitors.length > 50) {
    appData.visitors = appData.visitors.slice(0, 50);
  }
  
  saveData();
  res.json({ success: true, count: appData.visitorCount });
});

// Send message to Vatsal
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
    read: false
  };

  appData.messages.unshift(newMessage);
  saveData();

  console.log("==========================================");
  console.log(`NEW MESSAGE FOR VATSAL (vatsalpatelwork20@gmail.com):`);
  console.log(`From: ${newMessage.senderName}`);
  console.log(`Mood: ${newMessage.mood}`);
  console.log(`Content: ${newMessage.message}`);
  console.log("==========================================");

  res.json({
    success: true,
    targetEmail: "vatsalpatelwork20@gmail.com",
    message: "Your message has been sent to Vatsal! 🌻",
    data: newMessage
  });
});

// Get admin stats & messages (for Vatsal's private view)
app.get("/api/admin/data", (req, res) => {
  // Return visitor data and messages
  res.json({
    visitorCount: appData.visitorCount,
    lastVisit: appData.lastVisit,
    visitors: appData.visitors,
    messages: appData.messages,
    customLetter: appData.customLetter,
    targetEmail: "vatsalpatelwork20@gmail.com"
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

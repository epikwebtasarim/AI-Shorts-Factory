const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const { exec } = require("child_process");

dotenv.config();
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("AI Shorts Factory v3.0 Running ✅");
});

app.post("/shorts", async (req, res) => {
  console.log("🎬 Yeni Shorts üretim isteği alındı!");

  // YouTube link örneği
  const videoUrl = req.body?.url || "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
  const output = `output_${Date.now()}.mp4`;

  exec(`yt-dlp -f mp4 -o input.mp4 ${videoUrl}`, (err) => {
    if (err) return res.send("Video indirme hatası!");
    exec(`ffmpeg -i input.mp4 -t 00:00:30 -vf scale=1080:1920,setsar=1 ${output}`, (err) => {
      if (err) return res.send("FFmpeg hatası!");
      console.log("✅ Video hazır:", output);
      res.send("Shorts başarıyla oluşturuldu 🎬");
    });
  });
});

app.listen(3000, () => console.log("🚀 AI Shorts Factory çalışıyor, port 3000"));

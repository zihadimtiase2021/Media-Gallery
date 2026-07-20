import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message } = body;

    if (message?.photo) {
      const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
      const photo = message.photo[message.photo.length - 1]; // Best quality
      
      // Telegram theke file URL ana
      const fileRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getFile?file_id=${photo.file_id}`);
      const fileData = await fileRes.json();
      const filePath = fileData.result.file_path;
      const imageUrl = `https://api.telegram.org/file/bot${BOT_TOKEN}/${filePath}`;

      // JSON file load kora
      const jsonPath = path.join(process.cwd(), 'data', 'gallery.json');
      const fileContents = fs.readFileSync(jsonPath, 'utf8');
      const data = JSON.parse(fileContents);

      // Notun entry push kora
      const newMedia = {
        id: `img-${Date.now()}`,
        title: message.caption || "Untitled",
        location: "Uploaded via Bot",
        year: new Date().getFullYear(),
        category: "Street", // Tumi chaile caption-e category dite paro
        type: "photo",
        src: imageUrl,
        ratio: 1.0
      };

      data.media.push(newMedia);

      // File update kora
      fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));

      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ success: false });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

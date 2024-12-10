// import { NextResponse } from 'next/server';
// import { google } from 'googleapis';
// import { Formidable } from 'formidable';
// import fs from 'fs';
// import { Readable } from 'stream';

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// // Helper function to convert Next.js Request to a Node.js stream
// async function nextRequestToIncomingMessage(request) {
//   const readable = new Readable();
//   readable._read = () => { }; // No-op
//   readable.push(Buffer.from(await request.arrayBuffer()));
//   readable.push(null); // End of stream
//   return Object.assign(readable, {
//     headers: Object.fromEntries(request.headers),
//     method: request.method,
//     url: request.url,
//   });
// }

// export async function POST(request) {
//   try {
//     const nodeRequest = await nextRequestToIncomingMessage(request);

//     const form = new Formidable({ multiples: true });

//     const { files } = await new Promise((resolve, reject) => {
//       form.parse(nodeRequest, (err, fields, files) => {
//         if (err) reject(err);
//         resolve({ fields, files });
//       });
//     });

//     const videos = files.videos;
//     let videoFiles = [];

//     if (Array.isArray(videos)) {
//       videoFiles = videos;
//     } else if (videos) {
//       videoFiles.push(videos);
//     }

//     const embedLinks = [];

//     for (const video of videoFiles) {
//       const embedLink = await uploadToGoogleDrive(video);
//       embedLinks.push(embedLink);
//     }

//     return NextResponse.json({ embedLinks });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ message: error.message }, { status: 500 });
//   }
// }

// async function uploadToGoogleDrive(video) {
//   const auth = new google.auth.GoogleAuth({
//     credentials: {
//       client_email: process.env.GOOGLE_CLIENT_EMAIL,
//       private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/gm, '\n'),
//     },
//     scopes: ['https://www.googleapis.com/auth/drive'],
//   });

//   const drive = google.drive({ version: 'v3', auth });

//   const fileMetadata = {
//     name: video.originalFilename,
//     parents: ['1oY-nxyUgyS5OTEZiEeD48OdLvuUxoA6x'], // Thay bằng folder ID của bạn
//   };

//   const media = {
//     mimeType: video.mimetype,
//     body: fs.createReadStream(video.filepath),
//   };

//   const file = await drive.files.create({
//     resource: fileMetadata,
//     media: media,
//     fields: 'id',
//   });

//   await drive.permissions.create({
//     fileId: file.data.id,
//     requestBody: {
//       role: 'reader',
//       type: 'anyone',
//     },
//   });

//   const embedLink = `https://drive.google.com/file/d/${file.data.id}/preview`;

//   return embedLink;
// }

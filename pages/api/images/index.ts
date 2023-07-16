import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path';
import fs from 'fs';
import { PUBLIC_FOLDER } from '../../../env';

export const config = {
  api: {
    responseLimit: false,
  },
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {

  const dirRelativeToPublicFolder = `${req.query.path ?? ''}`;

  const dir = path.resolve(PUBLIC_FOLDER, dirRelativeToPublicFolder);
  let filenames = [];

  if (fs.lstatSync(dir).isDirectory()) {
    filenames = fs.readdirSync(dir);
    const images = filenames.map((name, index) => ({
      key: index,
      name: name,
      imageDir: path.join(dirRelativeToPublicFolder, name),
      isDir: fs.lstatSync(path.join(PUBLIC_FOLDER, dirRelativeToPublicFolder, name)).isDirectory()
    }));

    res.statusCode = 200;
    res.json(images);
  } else {
    const fileType = dir.toLocaleLowerCase().split('.').pop();
    if (fileType === 'mp4') {
      const CHUNK_SIZE_IN_BYTES = 1000000; // 1 mb
      const range = req.headers.range;

      if (!range) {
        return res.status(400).send("Rang must be provided");
      }
      const videoSizeInBytes = fs.statSync(dir).size;

      const chunkStart = Number(range.replace(/\D/g, ""));

      const chunkEnd = Math.min(
        chunkStart + CHUNK_SIZE_IN_BYTES,
        videoSizeInBytes - 1
      );

      const contentLength = chunkEnd - chunkStart + 1;

      const headers = {
        "Content-Range": `bytes ${chunkStart}-${chunkEnd}/${videoSizeInBytes}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
      };

      res.writeHead(206, headers);
      const videoStream = fs.createReadStream(dir, {
        start: chunkStart,
        end: chunkEnd,
      });

      videoStream.pipe(res);
    } else {
      res.setHeader('Content-Type', `image/${fileType}`);
      const imageBuffer = fs.readFileSync(dir);
      res.send(imageBuffer)
    }

  }

}


import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path';
import fs from 'fs';
import { cwd } from 'process';


export default function handler(req: NextApiRequest, res: NextApiResponse) {

  const dirRelativeToPublicFolder = `${req.query.path ?? ''}`;
  const publicFolder = `../../image-test/`;
  // const publicFolder = `./public`;
  const dir = path.resolve(publicFolder, dirRelativeToPublicFolder);
  let filenames = [];

  if (fs.lstatSync(dir).isDirectory()) {
    filenames = fs.readdirSync(dir);
    const images = filenames.map((name, index) => ({
      key: index,
      name: name,
      imageDir: path.join(dirRelativeToPublicFolder, name),
      isDir: fs.lstatSync(path.join(publicFolder, dirRelativeToPublicFolder, name)).isDirectory()
    }));
    
    res.statusCode = 200;
    res.json(images);
  } else {
    res.setHeader('Content-Type', 'image/png');
    const imageBuffer = fs.readFileSync(dir);
    res.send(imageBuffer)
  }

}


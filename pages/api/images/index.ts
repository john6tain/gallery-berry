import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path';
import fs from 'fs';


export default function handler(req: NextApiRequest, res: NextApiResponse) {

  const dirRelativeToPublicFolder = `${req.query.path ?? ''}`;
  const publicFolder = `C:\\Users\\John\\Documents\\test-pic`;
  // const publicFolder = `./public`;
  const dir = path.resolve(publicFolder, dirRelativeToPublicFolder);
  let filenames = [];
  if (fs.lstatSync(dir).isDirectory()) {
    filenames = fs.readdirSync(dir);

    const images = filenames.map((name, index) => ({
      key: index,
      name: name,
      imageDir: path.join('/', dirRelativeToPublicFolder, name),
      isDir: fs.lstatSync(path.resolve(publicFolder, dirRelativeToPublicFolder, name)).isDirectory()
    }))

    res.statusCode = 200;
    res.json(images);
  } else {
    res.statusCode = 200;
    res.json({ name: path, imageDir: dir });
  }

}


import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path';
import fs from 'fs';
import { PUBLIC_FOLDER } from '../../../env';

// export const config = {
//   api: {
//     images: {
//       responseLimit: false,
//     }
//   },
// }

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
    res.setHeader('Content-Type', 'image/jpg');
    const imageBuffer = fs.readFileSync(dir);
    res.send(imageBuffer)
  }

}


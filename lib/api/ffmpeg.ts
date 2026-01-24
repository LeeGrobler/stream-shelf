// TODO: move cache to ~/.streamshelf/cache

import ffmpeg from 'fluent-ffmpeg';
import ffprobeInstaller from '@ffprobe-installer/ffprobe';

ffmpeg.setFfprobePath(ffprobeInstaller.path);

export async function getVideoDuration(filePath: string): Promise<number> {
  return new Promise((resolve) => {
    ffmpeg.ffprobe(filePath, (err, metadata) => {
      if (err) {
        console.error('ffprobe error:', err)
        resolve(0)
        return
      }

      const duration = metadata.format?.duration
      resolve(duration ? Math.floor(duration) : 0)
    })
  })
}

/*
{
  "Modern Family S09E01 Lake Life.mkv": {
    "duration": 2080,
    "thumb": "thumbs/modern-family-s09e01-lake-life.png",
    "lastModified": 1700000000
  }
}
*/

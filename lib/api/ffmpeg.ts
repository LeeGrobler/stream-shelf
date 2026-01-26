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

export async function generateThumbnail(
  videoPath: string,
  outputDir: string,
  duration: number,
  slug: string
): Promise<string> {
  const outputFile = `${slug}.png`
  const timestamp = Math.floor(duration * (0.1 + Math.random() * 0.7))

  return new Promise((resolve, reject) => {
    ffmpeg(videoPath)
      .screenshots({
        timestamps: [timestamp],
        filename: outputFile,
        folder: outputDir,
        size: '320x?'
      })
      .on('end', () => resolve(outputFile))
      .on('error', reject)
  })
}

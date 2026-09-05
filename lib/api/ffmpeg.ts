// TODO: move cache to ~/.streamshelf/cache

import path from 'path';
import ffmpeg from 'fluent-ffmpeg';
import ffprobeInstaller from '@ffprobe-installer/ffprobe';
import { getEvenTimestamps } from '../client/time';

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

export async function generateThumbnails(
  videoPath: string,
  outputDir: string,
  durationSeconds: number,
  cacheBasename: string
) {
  const timestamps = getEvenTimestamps(durationSeconds, 150)

  return new Promise((resolve, reject) => {
    ffmpeg(videoPath)
      .inputOptions([
        '-skip_frame nokey',
        '-threads 2',
        '-analyzeduration 0',
        '-probesize 32k'
      ])
      .outputOptions([
        '-filter_threads 2'
      ])
      .screenshots({
        timestamps,
        filename: cacheBasename,
        folder: outputDir,
        size: '320x?'
      })
      .on('end', resolve)
      .on('error', (err) => {
        console.log(`thumbnail generation failed | ${cacheBasename}:`, err);
        reject()
      })
  })
}

export async function generatePreview(
  thumbsDir: string,
  outputDir: string,
  cacheBasename: string
) {
  const outputFile = `${cacheBasename}.mp4`

  return new Promise((resolve, reject) => {
    ffmpeg()
      .input(path.join(thumbsDir, `${cacheBasename}_%d.png`))
      .inputOptions([
        '-start_number 1',
        '-framerate 2',
        '-threads 2'
      ])
      .outputOptions([
        '-threads 2',
        '-pix_fmt yuv420p',
        '-movflags +faststart'
      ])
      .on('end', resolve)
      .on('error', reject)
      .save(path.join(outputDir, outputFile))
  })
}

import ffmpeg from 'fluent-ffmpeg';

export async function generateThumbnail(
  videoPath: string,
  outputDir: string,
  duration: number,
  filename: string
): Promise<string> {
  const name = filename
    .toLowerCase()
    .replace(/\.[^/.]+$/, '')
    .replace(/[^a-z0-9]+/g, '-')

  const outputFile = `${name}.png`
  const timestamp = Math.floor(duration * (0.1 + Math.random() * 0.7))

  return new Promise((resolve, reject) => {
    ffmpeg(videoPath)
      .screenshots({
        timestamps: [timestamp],
        filename: outputFile,
        folder: outputDir,
        size: '320x?'
      })
      .on('end', () => resolve(`thumbs/${outputFile}`))
      .on('error', reject)
  })
}
export type VideoItem = {
  image: string;
  title: string;
  slug: string;
  duration: string;
}

export const videos: VideoItem[] = [
  {
    image: '/images/video1.png',
    title: 'Modern React Patterns & Performance',
    slug: 'modern-react-patterns-performance',
    duration: '1h 12m',
  },
  {
    image: '/images/video2.png',
    title: 'JavaScript in 2025: What’s Changed?',
    slug: 'javascript-in-2025',
    duration: '58m',
  },
  {
    image: '/images/video3.png',
    title: 'Building Production Apps with Next.js',
    slug: 'building-production-apps-nextjs',
    duration: '1h 05m',
  },
  {
    image: '/images/video4.png',
    title: 'AI-Powered Web Apps with Google Tools',
    slug: 'ai-powered-web-apps-google',
    duration: '47m',
  },
  {
    image: '/images/video5.png',
    title: 'Hackathon to MVP: Shipping Fast on the Web',
    slug: 'hackathon-to-mvp-shipping-fast',
    duration: '2h 18m',
  },
  {
    image: '/images/video6.png',
    title: 'Scaling Frontend Teams & Codebases',
    slug: 'scaling-frontend-teams-codebases',
    duration: '1h 34m',
  }
];


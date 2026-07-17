// Customize your wallpapers here
export const WALLPAPERS = {
  lock: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80',
  login: 'https://images.unsplash.com/photo-1470115636492-6d2b56be4f79?auto=format&fit=crop&w=1600&q=80',
  desktop: [
    {
      id: 'default',
      name: 'Default (Photo)',
      type: 'image',
      value: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1920&q=80',
    },
    {
      id: 'aurora',
      name: 'Aurora Night',
      type: 'image',
      value: '/images/aurora-wallpaper.svg',
    },
    {
      id: 'blue-night',
      name: 'Blue Night',
      type: 'image',
      value: 'https://images.unsplash.com/photo-1444080748397-f442aa95c3e5?auto=format&fit=crop&w=1920&q=80',
    },
    {
      id: 'dark-mountains',
      name: 'Dark Mountains',
      type: 'image',
      value: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1920&q=80',
    },
    {
      id: 'space',
      name: 'Space',
      type: 'image',
      value: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=1920&q=80',
    },
    {
      id: 'forest',
      name: 'Forest',
      type: 'image',
      value: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1920&q=80',
    },
  ],
};

// Default desktop wallpaper
export const DEFAULT_DESKTOP_WALLPAPER = WALLPAPERS.desktop[0];

// You can also use local images instead:
// lock: '/images/lock-bg.jpg',
// login: '/images/login-bg.jpg',
// desktop: '/images/wallpaper.jpg',

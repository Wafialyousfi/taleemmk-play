
// Audio utility using hosted assets suitable for a math adventure game.

// Map sound names to hosted audio file URLs.
// Credits for placeholder audio: zapsplat.com, freesound.org (standard free licenses for educational use assumed for demo)
const SOUND_URLS: Record<string, string> = {
    // Sound Effects (SFX)
    'success': 'https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3', // Cheerful chime
    'failure': 'https://assets.mixkit.co/active_storage/sfx/2003/2003-preview.mp3', // Gentle error buzzer
    'pop': 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3', // Bubble pop for UI interactions
    'swoosh': 'https://assets.mixkit.co/active_storage/sfx/1499/1499-preview.mp3', // Transition swoosh
    'crumble': 'https://assets.mixkit.co/active_storage/sfx/2978/2978-preview.mp3', // Stone crumbling for Perilous Path
    'dial_click': 'https://assets.mixkit.co/active_storage/sfx/2776/2776-preview.mp3', // Safe dial click for Final Challenge
    'sparkle': 'https://assets.mixkit.co/active_storage/sfx/1293/1293-preview.mp3', // Magical effect
    
    // Background Music (BGM) loops
    // Calm, mysterious, adventure-themed loop
    'bg_music': 'https://cdn.pixabay.com/download/audio/2022/03/24/audio_c8c8a73467.mp3?filename=mystery-box-111436.mp3', 
};

const audioCache: Record<string, HTMLAudioElement> = {};
let bgmAudio: HTMLAudioElement | null = null;
let isMuted = false;

// Preload key sounds
export const preloadSounds = () => {
    Object.entries(SOUND_URLS).forEach(([key, url]) => {
        const audio = new Audio(url);
        audio.preload = 'auto';
        audioCache[key] = audio;
    });
};

export const playSound = (soundName: string) => {
    if (isMuted) return;

    const url = SOUND_URLS[soundName];
    if (!url) {
        if (process.env.NODE_ENV === 'development') {
            console.warn(`⚠️ Sound not found: ${soundName}`);
        }
        return;
    }

    // Always create a new Audio instance for SFX to allow overlapping sounds (e.g., rapid successes)
    // or clone from cache for better performance if already loaded.
    const audio = audioCache[soundName] ? (audioCache[soundName].cloneNode() as HTMLAudioElement) : new Audio(url);
    audio.volume = 0.6; // Slightly lower volume for SFX so they don't overpower BGM
    
    audio.play().catch(e => {
        // Auto-play policies might block this if not triggered by user interaction initially.
        // Usually okay after first click.
        console.warn('SFX play failed (likely auto-play policy):', e);
    });
};

export const playBackgroundMusic = () => {
    if (bgmAudio) return; // Already playing

    const url = SOUND_URLS['bg_music'];
    if (!url) return;

    bgmAudio = new Audio(url);
    bgmAudio.loop = true;
    bgmAudio.volume = 0.3; // Keep background music soft

    // Try to play. Browsers might block this until first user interaction.
    const playPromise = bgmAudio.play();
    
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.log("BGM auto-play prevented. Waiting for user interaction.");
            // We can listen for the first click anywhere to start BGM if it failed initially
            const startBgmOnClick = () => {
                bgmAudio?.play();
                document.removeEventListener('click', startBgmOnClick);
            };
            document.addEventListener('click', startBgmOnClick);
        });
    }
};

export const stopBackgroundMusic = () => {
    if (bgmAudio) {
        bgmAudio.pause();
        bgmAudio.currentTime = 0;
        bgmAudio = null;
    }
};

export const toggleMute = () => {
    isMuted = !isMuted;
    if (bgmAudio) {
        bgmAudio.muted = isMuted;
    }
    return isMuted;
};

export const getMuteStatus = () => isMuted;

// Simple utility to play sounds using widely available sound effects suitable for demos.
// In a production app, these should be replaced with local assets in the /public folder.

const SUCCESS_SOUND = 'https://assets.mixkit.co/active_storage/sfx/1447/1447-preview.mp3'; // More celebratory success sound
const FAILURE_SOUND = 'https://assets.mixkit.co/active_storage/sfx/2029/2029-preview.mp3'; // Softer, less jarring failure sound
const SWOOSH_SOUND = 'https://assets.mixkit.co/active_storage/sfx/1947/1947-preview.mp3'; // Swoosh sound for transitions
const POP_SOUND = 'https://assets.mixkit.co/active_storage/sfx/2578/2578-preview.mp3'; // Pop sound for interactions
const UNLOCK_SOUND = 'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3'; // Lock clink sound
const CRUMBLE_SOUND = 'https://assets.mixkit.co/active_storage/sfx/197/197-preview.mp3'; // Rock crumble sound
const DIAL_CLICK_SOUND = 'https://assets.mixkit.co/active_storage/sfx/2111/2111-preview.mp3'; // Dial click sound

export const playSound = (type: 'success' | 'failure' | 'pop' | 'unlock' | 'crumble' | 'dial_click' | 'swoosh') => {
    try {
        let audioUrl;
        switch (type) {
            case 'success': audioUrl = SUCCESS_SOUND; break;
            case 'failure': audioUrl = FAILURE_SOUND; break;
            case 'swoosh': audioUrl = SWOOSH_SOUND; break;
            case 'pop': audioUrl = POP_SOUND; break;
            case 'unlock': audioUrl = UNLOCK_SOUND; break;
            case 'crumble': audioUrl = CRUMBLE_SOUND; break;
            case 'dial_click': audioUrl = DIAL_CLICK_SOUND; break;
        }
        if (audioUrl) {
            const audio = new Audio(audioUrl);
            audio.volume = 0.6; // Keep it from being too loud
            audio.play().catch(e => console.warn("Audio play failed (likely due to browser autoplay policy without interaction first):", e));
        }
    } catch (e) {
        console.warn("Audio system error:", e);
    }
};
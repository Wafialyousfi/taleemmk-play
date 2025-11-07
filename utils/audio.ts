// Simple utility to play sounds using widely available sound effects suitable for demos.
// In a production app, these should be replaced with local assets in the /public folder.

const CORRECT_SOUND = 'https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3'; // Simple cheerful chime
const WRONG_SOUND = 'https://assets.mixkit.co/active_storage/sfx/2003/2003-preview.mp3'; // Gentle error buzzer
const POP_SOUND = 'https://assets.mixkit.co/active_storage/sfx/2578/2578-preview.mp3'; // Pop sound for interactions
const UNLOCK_SOUND = 'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3'; // Lock clink sound
const CRUMBLE_SOUND = 'https://assets.mixkit.co/active_storage/sfx/197/197-preview.mp3'; // Rock crumble sound
const DIAL_CLICK_SOUND = 'https://assets.mixkit.co/active_storage/sfx/2111/2111-preview.mp3'; // Dial click sound

export const playSound = (type: 'correct' | 'wrong' | 'pop' | 'unlock' | 'crumble' | 'dial_click') => {
    try {
        let audioUrl;
        switch (type) {
            case 'correct': audioUrl = CORRECT_SOUND; break;
            case 'wrong': audioUrl = WRONG_SOUND; break;
            case 'pop': audioUrl = POP_SOUND; break;
            case 'unlock': audioUrl = UNLOCK_SOUND; break;
            case 'crumble': audioUrl = CRUMBLE_SOUND; break;
            case 'dial_click': audioUrl = DIAL_CLICK_SOUND; break;
        }
        if (audioUrl) {
            const audio = new Audio(audioUrl);
            audio.volume = 0.5; // Keep it from being too loud
            audio.play().catch(e => console.warn("Audio play failed (likely due to browser autoplay policy without interaction first):", e));
        }
    } catch (e) {
        console.warn("Audio system error:", e);
    }
};

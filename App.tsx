
import React, { useState, useEffect } from 'react';
import { GameStage } from './types';
import { IntroScene, PortalScene, MeetGenieScene, OutroScene } from './components/StoryScenes';
import { SecretCipherScene } from './components/MultiplicationScene';
import { PerilousPathScene } from './components/DivisionBridgeScene';
import { RelationshipScene } from './components/RelationshipScene';
import { VaultChallengeScene } from './components/FinalChallengeScene';
import { playBackgroundMusic, preloadSounds, toggleMute, getMuteStatus } from './utils/audio';
import { Volume2, VolumeX } from 'lucide-react';

const App: React.FC = () => {
    const [stage, setStage] = useState<GameStage>(GameStage.INTRO);
    const [isMuted, setIsMuted] = useState(getMuteStatus());

    useEffect(() => {
        // Preload sounds and try to start BGM when the app loads
        preloadSounds();
        playBackgroundMusic();
    }, []);

    const handleToggleMute = () => {
        const newMuteStatus = toggleMute();
        setIsMuted(newMuteStatus);
    };

    const renderStage = () => {
        switch (stage) {
            case GameStage.INTRO:
                return <IntroScene onNext={() => setStage(GameStage.PORTAL)} />;
            case GameStage.PORTAL:
                return <PortalScene onNext={() => setStage(GameStage.MEET_GENIE)} />;
            case GameStage.MEET_GENIE:
                return <MeetGenieScene onNext={() => setStage(GameStage.SECRET_CIPHER)} />;
            case GameStage.SECRET_CIPHER:
                return <SecretCipherScene onNext={() => setStage(GameStage.PERILOUS_PATH)} />;
            case GameStage.PERILOUS_PATH:
                return <PerilousPathScene onNext={() => setStage(GameStage.RELATIONSHIP)} />;
            case GameStage.RELATIONSHIP:
                return <RelationshipScene onNext={() => setStage(GameStage.VAULT_CHALLENGE)} />;
            case GameStage.VAULT_CHALLENGE:
                return <VaultChallengeScene onNext={() => setStage(GameStage.OUTRO)} />;
            case GameStage.OUTRO:
                return <OutroScene onNext={() => setStage(GameStage.INTRO)} />;
            default:
                return <div className="text-white">Error: Unknown stage</div>;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center p-4 font-sans overflow-hidden relative" dir="rtl">
            {/* Mute Button */}
            <button 
                onClick={handleToggleMute} 
                className="absolute top-4 left-4 z-50 bg-white/20 hover:bg-white/40 p-3 rounded-full text-white transition-all"
                aria-label={isMuted ? "تشغيل الصوت" : "كتم الصوت"}
            >
                {isMuted ? <VolumeX /> : <Volume2 />}
            </button>

            <div className="w-full max-w-4xl flex justify-center">
                {renderStage()}
            </div>
        </div>
    );
};

export default App;

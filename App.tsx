import React, { useState, useEffect } from 'react';
import { GameStage } from './types';
import { IntroScene, PortalScene, MeetGenieScene, OutroScene } from './components/StoryScenes';
import { SecretCipherScene } from './components/MultiplicationScene';
import { PerilousPathScene } from './components/DivisionBridgeScene';
import { RelationshipScene } from './components/RelationshipScene';
import { VaultChallengeScene } from './components/FinalChallengeScene';
import { BookOpen } from 'lucide-react';

export default function App() {
  const [stage, setStage] = useState<GameStage>(GameStage.INTRO);

  const nextStage = () => {
    const stageOrder = [
        GameStage.INTRO,
        GameStage.PORTAL,
        GameStage.MEET_GENIE,
        GameStage.SECRET_CIPHER,
        GameStage.PERILOUS_PATH,
        GameStage.RELATIONSHIP,
        // FIX: Corrected typo in GameStage enum from VAULT_CHallenge to VAULT_CHALLENGE.
        GameStage.VAULT_CHALLENGE,
        GameStage.OUTRO
    ];
    const currentIndex = stageOrder.indexOf(stage);
    const next = stageOrder[currentIndex + 1] || GameStage.INTRO; // Loop back to start
    setStage(next);
  };

  // Background changes based on stage
  const getBackground = () => {
    switch (stage) {
      case GameStage.INTRO:
      case GameStage.OUTRO:
        return 'bg-amber-50'; // Classroom feel
      case GameStage.PORTAL:
        return 'bg-indigo-900'; // Magical transition
      case GameStage.PERILOUS_PATH:
        return 'bg-slate-800'; // Dark chasm feel
      case GameStage.VAULT_CHALLENGE:
        return 'bg-gray-700'; // Vault room feel
      default:
        return 'bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-indigo-200 via-purple-200 to-pink-200'; // Magical world
    }
  };

  return (
    <main className={`min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-1000 ${getBackground()}`}>
      <div className="max-w-4xl w-full mx-auto">
        
        {stage !== GameStage.INTRO && stage !== GameStage.OUTRO && (
           <div className="fixed top-4 left-4 bg-white/80 backdrop-blur p-2 rounded-full shadow-md flex items-center gap-2 z-50">
             <BookOpen className="text-purple-600 w-5 h-5" />
             <span className="text-sm font-bold text-purple-900">عالم الأرقام</span>
           </div>
        )}

        <div className="min-h-[600px] flex items-center justify-center">
            {stage === GameStage.INTRO && <IntroScene onNext={nextStage} />}
            {stage === GameStage.PORTAL && <PortalScene onNext={nextStage} />}
            {stage === GameStage.MEET_GENIE && <MeetGenieScene onNext={nextStage} />}
            {stage === GameStage.SECRET_CIPHER && <SecretCipherScene onNext={nextStage} />}
            {stage === GameStage.PERILOUS_PATH && <PerilousPathScene onNext={nextStage} />}
            {stage === GameStage.RELATIONSHIP && <RelationshipScene onNext={nextStage} />}
            {stage === GameStage.VAULT_CHALLENGE && <VaultChallengeScene onNext={nextStage} />}
            {stage === GameStage.OUTRO && <OutroScene onNext={nextStage} />}
        </div>
      </div>
    </main>
  );
}
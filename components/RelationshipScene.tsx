import React, { useState } from 'react';
import { SceneProps } from '../types';
import { Button, Card, Character, SpeechBubble } from './UI';
import { ArrowLeftRight } from 'lucide-react';
import { playSound } from '../utils/audio';

export const RelationshipScene: React.FC<SceneProps> = ({ onNext }) => {
    const [revealed, setRevealed] = useState(false);

    const handleReveal = () => {
        playSound('pop');
        setRevealed(true);
    };

    return (
        <div className="w-full max-w-4xl flex flex-col items-center gap-8">
            <div className="flex w-full justify-between px-8">
                <Character name="سارة" emoji="👩🏻‍🦱" talking={revealed} />
                <Character name="رقمي" emoji="🤖" />
            </div>

            <Card className="w-full max-w-2xl transform hover:scale-105 transition-transform duration-500">
                <div className="bg-slate-800 p-8 rounded-2xl text-white text-center shadow-inner relative overflow-hidden">
                     {/* Magical sparkles background */}
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-yellow-400 to-transparent animate-pulse"></div>

                    <h2 className="text-2xl text-blue-300 mb-6 relative z-10 font-bold">✨ لوحة الأسرار ✨</h2>
                    
                    <div className="text-5xl md:text-7xl font-black mb-8 tracking-wider relative z-10 flex flex-col md:flex-row items-center justify-center gap-4 bg-black/20 p-4 rounded-xl">
                        <span className="text-green-400 drop-shadow-lg" dir="ltr">5 × 7 = 35</span>
                    </div>

                    <div className="my-6 flex justify-center relative z-10">
                        <ArrowLeftRight className="w-14 h-14 text-purple-400 animate-pulse" />
                    </div>

                    <div className="text-5xl md:text-7xl font-black relative z-10 flex items-center justify-center gap-4 bg-black/20 p-4 rounded-xl">
                        <span className="text-amber-400 drop-shadow-lg" dir="ltr">35 ÷ 7 = </span>
                        {!revealed ? (
                            <button 
                                onClick={handleReveal}
                                className="w-20 h-20 bg-white/10 rounded-2xl border-4 border-white/20 flex items-center justify-center hover:bg-white/30 transition-all animate-bounce cursor-pointer"
                            >
                                <span className="text-yellow-300 text-5xl">?</span>
                            </button>
                        ) : (
                            <span className="text-amber-400 animate-pop-in drop-shadow-[0_0_15px_rgba(251,191,36,0.8)]">5</span>
                        )}
                    </div>
                </div>
            </Card>

            {revealed && (
                <div className="w-full max-w-2xl animate-slide-up">
                     <SpeechBubble 
                        text="القسمة تعكس الضرب! إذا عرفنا أن 5 × 7 = 35، فإننا نعرف مباشرة أن 35 ÷ 7 = 5!"
                        character="سارة"
                    />
                    <div className="flex justify-center mt-6">
                        <Button onClick={onNext} className="bg-purple-600 hover:bg-purple-700">
                            فهمنا السر! ✨
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};
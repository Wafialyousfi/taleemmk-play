import React, { useState, useEffect } from 'react';
import { SceneProps } from '../types';
import { Button, Card, Character, SpeechBubble } from './UI';
import { ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import { playSound } from '../utils/audio';

export const IntroScene: React.FC<SceneProps> = ({ onNext }) => {
    return (
        <div className="w-full max-w-2xl flex flex-col items-center gap-8 animate-fade-in">
            <Character name="سارة" emoji="👩🏻‍🦱" />
            <Card className="text-center">
                {/* رسالة الإهداء */}
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-900 py-3 px-4 rounded-xl mb-6 text-base font-bold shadow-sm border border-purple-200">
                    💝 تم إعداد هذه اللعبة لطالبات المعلمة إيمان عائض الزهراني 💝
                </div>

                <h1 className="text-3xl font-bold text-purple-900 mb-6">مغامرة في عالم الأرقام</h1>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    بينما كانت سارة تتجول في مكتبة المدرسة القديمة، لفت انتباهها كتاب غريب يتوهج بضوء خافت.
                    عنوانه: "أسرار العمليات الحسابية".
                </p>
                <BookOpen className="w-16 h-16 mx-auto text-purple-500 mb-6 animate-pulse" />
                <Button onClick={onNext}>
                    فتح الكتاب <ArrowRight className="inline-block mr-2" />
                </Button>
            </Card>
        </div>
    );
};

export const PortalScene: React.FC<SceneProps> = ({ onNext }) => {
    useEffect(() => {
        const timer = setTimeout(onNext, 3000);
        playSound('swoosh');
        return () => clearTimeout(timer);
    }, [onNext]);

    return (
        <div className="w-full h-full flex flex-col items-center justify-center animate-spin-slow">
            <div className="relative">
                <div className="absolute inset-0 bg-purple-500 blur-3xl opacity-50 animate-pulse"></div>
                <Sparkles className="w-32 h-32 text-yellow-300 animate-spin" />
            </div>
            <p className="text-2xl text-white font-bold mt-8 animate-bounce">آاااااه! الكتاب يسحبني داخله!</p>
        </div>
    );
};

export const MeetGenieScene: React.FC<SceneProps> = ({ onNext }) => {
    const [step, setStep] = useState(0);

    const dialogue = [
        { char: 'سارة', emoji: '👩🏻‍🦱', text: 'أين أنا؟ هذا المكان غريب جداً! كل شيء هنا مصنوع من... أرقام؟' },
        { char: 'حساب', emoji: '🧞‍♂️', text: 'أهلاً بكِ يا سارة في عالم الأرقام! أنا "حساب"، حارس هذا العالم.' },
        { char: 'حساب', emoji: '🧞‍♂️', text: 'لقد اضطرب عالمنا قليلاً، ونحتاج إلى عقل ذكي مثلكِ لإعادة التوازن. هل أنتِ مستعدة للمساعدة؟' },
    ];

    const handleNextDialogue = () => {
        if (step < dialogue.length - 1) {
            setStep(s => s + 1);
            playSound('pop');
        } else {
            onNext();
        }
    };

    const currentLine = dialogue[step];

    return (
        <div className="w-full max-w-2xl flex flex-col items-center gap-6">
            <div className="flex w-full justify-around px-8 min-h-[150px]">
                <Character name="سارة" emoji="👩🏻‍🦱" talking={currentLine.char === 'سارة'} />
                 {step > 0 && <Character name="حساب" emoji="🧞‍♂️" talking={currentLine.char === 'حساب'} />}
            </div>
            <div className="w-full cursor-pointer" onClick={handleNextDialogue}>
                <SpeechBubble character={currentLine.char} text={currentLine.text} />
            </div>
            <Button onClick={handleNextDialogue} className="mt-4">
                {step < dialogue.length - 1 ? 'التالي' : 'أنا مستعدة!'}
            </Button>
        </div>
    );
};

export const OutroScene: React.FC<SceneProps> = ({ onNext }) => {
     return (
        <div className="w-full max-w-2xl flex flex-col items-center gap-8 animate-fade-in">
            <Character name="سارة" emoji="👩🏻‍🦱" talking />
            <Card className="text-center">
                <h1 className="text-3xl font-bold text-purple-900 mb-6">النهاية السعيدة</h1>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    عادت سارة إلى المكتبة، والكتاب بين يديها لم يعد يتوهج. لقد تعلمت أن الرياضيات ليست مجرد أرقام، بل هي مغامرة شيقة!
                </p>
                <div className="flex justify-center gap-4 text-5xl mb-6">
                    <span>✨</span><span>📘</span><span>✨</span>
                </div>
                <Button onClick={onNext}>
                    لعب مرة أخرى 🔄
                </Button>
            </Card>
        </div>
    );
};
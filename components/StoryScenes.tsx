import React, { useState, useEffect } from 'react';
import { SceneProps } from '../types';
import { Button, Card, Character, SpeechBubble } from './UI';
import { Book, Sparkles, Bot, PartyPopper } from 'lucide-react';

// IntroScene
export const IntroScene: React.FC<SceneProps> = ({ onNext }) => {
    return (
        <Card className="text-center animate-fade-in">
            <Book className="w-20 h-20 text-purple-500 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-purple-800 mb-4">مغامرة الرياضيات السحرية</h1>
            <p className="text-lg text-gray-600 mb-8">
                أهلاً بك في عالم الأرقام المدهش! انضم إلى سارة في رحلتها لاكتشاف أسرار الرياضيات بطريقة ممتعة.
            </p>
            <Button onClick={onNext} className="animate-bounce">
                لنبدأ المغامرة!
            </Button>
        </Card>
    );
};

// PortalScene
export const PortalScene: React.FC<SceneProps> = ({ onNext }) => {
    const [portalOpen, setPortalOpen] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setPortalOpen(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center text-white text-center">
            <div className={`w-64 h-64 rounded-full flex items-center justify-center transition-all duration-1000 ${portalOpen ? 'bg-purple-400 scale-150 shadow-[0_0_100px_50px_rgba(255,255,255,0.3)]' : 'bg-transparent scale-0'}`}>
                <Sparkles className="w-32 h-32 text-yellow-300 animate-spin-slow" />
            </div>
            {portalOpen && (
                <div className="mt-16 animate-fade-in">
                    <h2 className="text-3xl font-bold mb-6 drop-shadow-lg">بوابة الأرقام قد فُتحت!</h2>
                    <Button onClick={onNext}>
                        ادخل البوابة
                    </Button>
                </div>
            )}
        </div>
    );
};


// MeetGenieScene
export const MeetGenieScene: React.FC<SceneProps> = ({ onNext }) => {
    const [step, setStep] = useState(0);
    
    const handleNext = () => setStep(s => s + 1);

    return (
        <div className="w-full max-w-2xl flex flex-col items-center gap-8">
            <div className="flex w-full justify-around px-8">
                <Character name="سارة" emoji="👩🏻‍🦱" talking={step === 1} />
                <Character name="حساب" emoji="🧞‍♂️" talking={step === 0 || step === 2} />
            </div>

            <Card className="w-full">
                {step === 0 && <SpeechBubble text="أهلاً بك في عالم الأرقام السحري! أنا 'حساب'، جني الأعداد. اطلب وستُجاب... بالألغاز طبعاً!" character="حساب" />}
                {step === 1 && <SpeechBubble text="أهلاً حساب! أنا سارة. هذا المكان مدهش! ما هو التحدي الأول؟" character="سارة" />}
                {step === 2 && <SpeechBubble text="تحديكِ الأول هو 'شيفرة الرقم السري'. عليكِ كشف الرقم المفقود لتحرير التعويذة القديمة!" character="حساب" />}
            </Card>

            <div className="flex justify-center mt-4">
                {step < 2 ? (
                     <Button onClick={handleNext}>
                        التالي
                    </Button>
                ) : (
                    <Button onClick={onNext} className="bg-green-500 hover:bg-green-600">
                        مستعدة للغز!
                    </Button>
                )}
            </div>
        </div>
    );
};


// OutroScene
export const OutroScene: React.FC<SceneProps> = ({ onNext }) => {
    return (
        <Card className="text-center animate-fade-in">
            <PartyPopper className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-purple-800 mb-4">تهانينا!</h1>
            <p className="text-lg text-gray-600 mb-8">
                لقد أكملت جميع التحديات بنجاح وأظهرت أن الرياضيات يمكن أن تكون ممتعة ومثيرة!
                نأمل أن نراك في مغامرة أخرى.
            </p>
            <Button onClick={onNext} className="bg-blue-500 hover:bg-blue-600">
                العب مرة أخرى
            </Button>
        </Card>
    );
};
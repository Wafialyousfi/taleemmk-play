import React, { useState, useEffect } from 'react';
import { SceneProps } from '../types';
import { Button, Card, Character, InputPad } from './UI';
import { ArrowRight, Puzzle } from 'lucide-react';
import { playSound } from '../utils/audio';
import { generateNewProblem } from '../utils/math';
import { Problem, QuestionPart } from '../types';

const renderQuestion = (parts: QuestionPart[], inputValue: string, getFeedbackClass: () => string) => {
    return (
        <div className="bg-slate-100 p-6 rounded-lg mb-6 flex justify-center items-center text-5xl font-bold text-slate-800 tracking-widest flex-wrap" dir="ltr">
            {parts.map((part, index) => {
                if (part.type === 'input') {
                    return (
                        <div key={index} className={`w-32 h-20 bg-white rounded-md border-4 flex items-center justify-center ${getFeedbackClass()}`}>
                            {inputValue || '?'}
                        </div>
                    );
                }
                return <span key={index} className="mx-2">{part.value}</span>;
            })}
        </div>
    )
};


export const SecretCipherScene: React.FC<SceneProps> = ({ onNext }) => {
    const [problem, setProblem] = useState<Problem>(generateNewProblem('cipher'));
    const [ciphersSolved, setCiphersSolved] = useState(0);
    const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
    const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
    const [inputValue, setInputValue] = useState('');

    const ciphersNeeded = 3;

    useEffect(() => {
        // Play sound when a new problem appears, but not on the initial load
        if (ciphersSolved > 0) {
           playSound('swoosh');
        }
    }, [problem]);

    const handleSubmit = () => {
        if (!inputValue) return;
        const answer = parseInt(inputValue, 10);
        
        if (answer === problem.answer) {
            setFeedback('correct');
            setFeedbackMessage('إجابة صحيحة!');
            playSound('success');
            setCiphersSolved(c => c + 1);
        } else {
            setFeedback('wrong');
            setFeedbackMessage('حاول مرة أخرى!');
            playSound('failure');
        }

        setTimeout(() => {
            if (answer === problem.answer && ciphersSolved + 1 < ciphersNeeded) {
                setProblem(generateNewProblem('cipher'));
            }
            setFeedback(null);
            setFeedbackMessage(null);
            setInputValue('');
        }, 1500);
    };

    if (ciphersSolved >= ciphersNeeded) {
        return (
             <div className="w-full max-w-2xl flex flex-col items-center gap-8 animate-fade-in">
                <Character name="حساب" emoji="🧞‍♂️" talking />
                <Card className="text-center">
                    <h2 className="text-2xl font-bold text-green-600 mb-4">أحسنتِ! لقد فككتِ كل الشيفرات!</h2>
                    <p className="text-gray-700 mb-6">لقد أثبتّ حكمتك. أنتِ مستعدة للتحدي التالي.</p>
                    <Button onClick={onNext} className="bg-green-500 hover:bg-green-600">
                        إلى التحدي التالي <ArrowRight className="inline-block" />
                    </Button>
                </Card>
            </div>
        )
    }

    const getFeedbackClass = () => {
        if (!feedback) return 'border-purple-300';
        return feedback === 'correct' ? 'border-green-500 animate-pulse' : 'border-red-500 animate-shake';
    };

    return (
        <div className="w-full max-w-2xl flex flex-col items-center gap-8">
             <div className="flex w-full justify-around px-8">
                <Character name="سارة" emoji="👩🏻‍🦱" />
                <Character name="حساب" emoji="🧞‍♂️" talking />
            </div>
            <Card className="w-full">
                <div className="text-center">
                    <h2 className="text-2xl text-purple-800 mb-1 font-bold">شيفرة الرقم السري</h2>
                    <p className="text-sm text-gray-500 mb-4">{problem.title}</p>
                    <div className="flex justify-center items-center gap-4 mb-6" aria-label={`تم حل ${ciphersSolved} من ${ciphersNeeded} شيفرات`}>
                        {Array.from({ length: ciphersNeeded }).map((_, i) => (
                            <Puzzle 
                                key={i} 
                                className={`w-10 h-10 transition-colors duration-500 ${i < ciphersSolved ? 'text-green-500' : 'text-gray-300'}`} 
                            />
                        ))}
                    </div>
                    
                    {renderQuestion(problem.questionParts, inputValue, getFeedbackClass)}

                    <div className="h-10 my-2 flex items-center justify-center">
                         {feedbackMessage && (
                            <p className={`text-2xl font-bold animate-pop-in ${feedback === 'correct' ? 'text-green-600' : 'text-red-600'}`}>
                                {feedbackMessage}
                            </p>
                        )}
                    </div>

                    <InputPad
                        onInput={(num) => setInputValue(val => val.length < 5 ? val + num : val)}
                        onClear={() => setInputValue('')}
                        onSubmit={handleSubmit}
                        disabled={!!feedback}
                    />
                </div>
            </Card>
        </div>
    );
};
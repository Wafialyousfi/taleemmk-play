import React, { useState, useEffect } from 'react';
import { SceneProps } from '../types';
import { Button, Card, Character } from './UI';
import { ArrowRight } from 'lucide-react';
import { playSound } from '../utils/audio';
import { generateNewProblem } from '../utils/math';
import { Problem } from '../types';

export const VaultChallengeScene: React.FC<SceneProps> = ({ onNext }) => {
    const [problems] = useState([generateNewProblem('vault'), generateNewProblem('vault'), generateNewProblem('vault')]);
    const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
    const [combination, setCombination] = useState<(number|null)[]>([null, null, null]);
    const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
    const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

    const problem = problems[currentProblemIndex];

    useEffect(() => {
        if (currentProblemIndex > 0) {
            playSound('swoosh');
        }
    }, [currentProblemIndex]);
    
    // Generate options for the current problem
    const options = React.useMemo(() => {
        // Ensure options are generated for the current problem
        if (problem.options) {
             return problem.options;
        }
        // Fallback for non-multiple choice, though vault should always have them
        const opts = new Set<number>();
        opts.add(problem.answer);
        while(opts.size < 4) {
            const wrong = problem.answer + Math.floor(Math.random() * 10) - 5;
            if (wrong !== problem.answer && wrong > 0) opts.add(wrong);
        }
        return Array.from(opts).sort(() => Math.random() - 0.5);
    }, [problem]);

    const handleAnswer = (option: number) => {
        if (feedback) return;
        setSelectedAnswer(option);

        if (option === problem.answer) {
            setFeedback('correct');
            setFeedbackMessage('رائع! تم كشف الرقم.');
            playSound('dial_click');
            const newCombination = [...combination];
            // Store the first digit of the answer for variety
            newCombination[currentProblemIndex] = parseInt(problem.answer.toString()[0], 10);
            setCombination(newCombination);
            
            setTimeout(() => {
                if (currentProblemIndex < 2) {
                    setCurrentProblemIndex(i => i + 1);
                }
                setFeedback(null);
                setFeedbackMessage(null);
                setSelectedAnswer(null);
            }, 1500);

        } else {
            setFeedback('wrong');
            setFeedbackMessage('إجابة خاطئة، حاول مجدداً!');
            playSound('failure');
             setTimeout(() => {
                setFeedback(null);
                setFeedbackMessage(null);
                setSelectedAnswer(null);
            }, 1500);
        }
    };

    const allLocksOpened = combination.every(c => c !== null);

    if (allLocksOpened) {
        return (
             <div className="w-full max-w-2xl flex flex-col items-center gap-8 animate-fade-in">
                <Character name="حساب" emoji="🧞‍♂️" talking />
                <Card className="text-center bg-amber-100 border-amber-300">
                    <h2 className="text-3xl font-bold text-amber-700 mb-4">لقد فتحتِ الخزنة!</h2>
                    <p className="text-amber-800 mb-6 text-lg">أنتِ الآن خبيرة حقيقية في عالم الأرقام. لقد جعلتني فخوراً جداً.</p>
                    <Button onClick={onNext} className="bg-amber-500 hover:bg-amber-600">
                        إنهاء المغامرة <ArrowRight className="inline-block" />
                    </Button>
                </Card>
            </div>
        )
    }
    
    return (
        <div className="w-full max-w-2xl flex flex-col items-center gap-8 text-white">
            <Card className="w-full bg-gray-800/90 border-gray-600">
                <div className="text-center">
                    <h2 className="text-2xl text-amber-300 mb-2 font-bold">خزنة الأسرار المنيعة</h2>
                    <p className="text-sm text-amber-100 mb-4">حل اللغز لتكتشف الرقم التالي في رمز القفل!</p>
                     <div className="flex justify-center items-center gap-4 mb-6" aria-label="رمز القفل">
                        {combination.map((num, i) => (
                           <div key={i} className={`w-20 h-24 rounded-lg flex items-center justify-center text-5xl font-bold transition-all duration-500 ${i === currentProblemIndex ? 'border-4 border-amber-400' : ''} ${num !== null ? 'bg-green-500 text-white' : 'bg-slate-700 text-gray-400'}`}>
                             {num !== null ? num : '?'}
                           </div>
                        ))}
                    </div>
                    
                    <div className="bg-slate-700 rounded-lg p-4 mb-6 min-h-[150px] flex flex-col items-center justify-center">
                         <p className="text-lg text-gray-300 mb-2 font-bold">{problem.title}</p>
                         {problem.questionText && <p className="text-md text-gray-200 mb-2">{problem.questionText}</p>}
                         <h3 className="text-5xl font-bold text-white tracking-widest" dir="ltr">
                            {/* FIX: Check for part type before accessing 'value' property to avoid error on 'input' type parts. */}
                            {problem.questionParts.map(p => p.type === 'text' ? p.value : '?').join('')}
                        </h3>
                    </div>

                     <div className="h-10 my-2 flex items-center justify-center">
                         {feedbackMessage && (
                            <p className={`text-2xl font-bold animate-pop-in ${feedback === 'correct' ? 'text-green-400' : 'text-red-400'}`}>
                                {feedbackMessage}
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {options.map(option => {
                             const isSelected = selectedAnswer === option;
                             let buttonClass = 'bg-slate-600 hover:bg-slate-500 text-white';
                             if (isSelected) {
                                buttonClass = feedback === 'correct' ? 'bg-green-500' : 'bg-red-500';
                             }

                            return (
                                <button
                                    key={option}
                                    onClick={() => handleAnswer(option)}
                                    disabled={!!feedback}
                                    className={`p-6 rounded-2xl text-4xl font-bold transition-all transform active:scale-95 shadow-lg ${buttonClass}`}
                                >
                                    {option}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </Card>
        </div>
    );
};
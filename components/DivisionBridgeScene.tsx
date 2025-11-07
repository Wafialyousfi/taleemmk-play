import React, { useState, useEffect } from 'react';
import { SceneProps } from '../types';
import { Button, Card, Character } from './UI';
import { ArrowRight, Heart, HeartCrack } from 'lucide-react';
import { playSound } from '../utils/audio';
import { generateNewProblem } from '../utils/math';
import { Problem } from '../types';

export const PerilousPathScene: React.FC<SceneProps> = ({ onNext }) => {
    const [problem, setProblem] = useState<Problem>(generateNewProblem('path'));
    const [steps, setSteps] = useState(0);
    const [lives, setLives] = useState(3);
    const [feedback, setFeedback] = useState<'correct' | 'wrong' | 'reset' | null>(null);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    
    const stepsNeeded = 5;

    const handleAnswer = (option: number) => {
        if (feedback) return;

        setSelectedAnswer(option);
        if (option === problem.answer) {
            setFeedback('correct');
            playSound('correct');
            setSteps(s => s + 1);
        } else {
            setFeedback('wrong');
            playSound('crumble');
            setLives(l => l - 1);
        }
        
        setTimeout(() => {
            if (option === problem.answer) {
                if (steps + 1 < stepsNeeded) {
                    setProblem(generateNewProblem('path'));
                }
            } else if (lives - 1 <= 0) {
                // Game over, reset
                setFeedback('reset');
                setTimeout(() => {
                    setLives(3);
                    setSteps(0);
                    setProblem(generateNewProblem('path'));
                }, 1500);
            }
            setSelectedAnswer(null);
            if (feedback !== 'reset') setFeedback(null);
        }, 1500);
    };

    if (steps >= stepsNeeded) {
        return (
             <div className="w-full max-w-2xl flex flex-col items-center gap-8 animate-fade-in">
                <Character name="حساب" emoji="🧞‍♂️" talking />
                <Card className="text-center">
                    <h2 className="text-2xl font-bold text-green-600 mb-4">لقد عبرنا الممر بنجاح!</h2>
                    <p className="text-gray-700 mb-6">لقد أظهرتِ شجاعة وذكاء. أنتِ جاهزة لكشف السر التالي.</p>
                    <Button onClick={onNext} className="bg-green-500 hover:bg-green-600">
                        لنكتشف السر التالي <ArrowRight className="inline-block" />
                    </Button>
                </Card>
            </div>
        )
    }
    
    return (
        <div className="w-full max-w-2xl flex flex-col items-center gap-8 text-white">
            <Card className="w-full bg-slate-700/80 border-slate-500">
                <div className="text-center">
                    <h2 className="text-2xl text-cyan-300 mb-1 font-bold">الممر المحفوف بالمخاطر</h2>
                     <p className="text-sm text-cyan-100 mb-3">{problem.title}</p>
                    <div className="flex justify-center items-center gap-2 mb-4">
                        {Array.from({length: 3}).map((_, i) => (
                            i < lives ? <Heart key={i} className="w-6 h-6 text-red-500" /> : <HeartCrack key={i} className="w-6 h-6 text-gray-400"/>
                        ))}
                    </div>
                    
                    <div className="w-full bg-gray-900 rounded-full h-4 mb-6 border-2 border-cyan-500 overflow-hidden">
                        <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full rounded-full transition-all duration-500" style={{width: `${(steps/stepsNeeded)*100}%`}}></div>
                    </div>

                    <div className={`bg-slate-800/50 p-4 rounded-lg mb-6 min-h-[120px] flex items-center justify-center transition-transform duration-300 ${feedback === 'wrong' ? 'animate-shake' : ''}`}>
                        {problem.questionText && <p className="text-xl text-slate-100 leading-relaxed mb-3">{problem.questionText}</p>}
                        <h3 className="text-5xl font-bold text-white tracking-widest" dir="ltr">
                            {/* FIX: Check for part type before accessing 'value' property to avoid error on 'input' type parts. */}
                            {problem.questionParts.map(p => p.type === 'text' ? p.value : '?').join('')}
                        </h3>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {problem.options?.map(option => {
                             const isSelected = selectedAnswer === option;
                             const isCorrect = problem.answer === option;
                             let buttonClass = 'bg-slate-600/80 hover:bg-slate-500/80 text-white';
                             if (isSelected) {
                                buttonClass = feedback === 'correct' ? 'bg-green-500' : 'bg-red-500';
                             } else if (feedback === 'correct' && isCorrect) {
                                buttonClass = 'bg-green-500';
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
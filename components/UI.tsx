import React, { ReactNode } from 'react';
import { Delete } from 'lucide-react';

export const Button = ({ onClick, children, disabled, className = '' }: { onClick: () => void, children: ReactNode, disabled?: boolean, className?: string }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`px-6 py-3 rounded-full font-bold text-lg transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl ${className} ${disabled ? 'bg-gray-300 text-gray-500' : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'}`}
    >
        {children}
    </button>
);

export const Card = ({ children, className = '' }: { children: ReactNode, className?: string }) => (
    <div className={`bg-white/90 backdrop-blur-sm p-6 md:p-8 rounded-3xl shadow-2xl border-2 border-purple-100 ${className}`}>
        {children}
    </div>
);

export const Character = ({ name, emoji, talking }: { name: string, emoji: string, talking?: boolean }) => (
    <div className={`flex flex-col items-center transition-transform ${talking ? 'scale-110' : 'scale-100 opacity-80'}`}>
        <div className={`text-6xl md:text-7xl mb-2 ${talking ? 'animate-bounce' : ''} drop-shadow-md`}>
            {emoji}
        </div>
        <div className="bg-white px-3 py-1 rounded-full text-sm font-bold shadow text-purple-900">
            {name}
        </div>
    </div>
);

export const SpeechBubble = ({ text, character }: { text: string, character?: string }) => (
    <div className="relative bg-white p-4 rounded-2xl rounded-tr-none shadow-md border-2 border-purple-50 mb-4 animate-fade-in">
        {character && <div className="text-purple-600 font-bold text-sm mb-1">{character} يقول:</div>}
        <p className="text-gray-800 text-lg leading-relaxed">{text}</p>
        <div className="absolute -right-2 top-0 w-0 h-0 border-l-[16px] border-l-transparent border-t-[16px] border-t-white"></div>
    </div>
);

// New component for number input
export const InputPad = ({ onInput, onClear, onSubmit, disabled }: { onInput: (num: string) => void, onClear: () => void, onSubmit: () => void, disabled?: boolean }) => {
    const buttons = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    return (
        <div className="grid grid-cols-3 gap-2 w-full max-w-xs mx-auto">
            {buttons.map(num => (
                <button key={num} onClick={() => onInput(num)} disabled={disabled} className="bg-white/70 hover:bg-purple-100 disabled:opacity-50 text-purple-800 font-bold text-3xl p-4 rounded-lg shadow-md aspect-square transition-all transform active:scale-95">
                    {num}
                </button>
            ))}
            <button onClick={onClear} disabled={disabled} className="bg-white/70 hover:bg-red-100 text-red-600 p-4 rounded-lg shadow-md aspect-square flex items-center justify-center">
                <Delete />
            </button>
            <button onClick={() => onInput('0')} disabled={disabled} className="bg-white/70 hover:bg-purple-100 disabled:opacity-50 text-purple-800 font-bold text-3xl p-4 rounded-lg shadow-md aspect-square">
                0
            </button>
            <button onClick={onSubmit} disabled={disabled} className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-bold text-2xl p-4 rounded-lg shadow-md aspect-square">
                تأكيد
            </button>
        </div>
    );
};

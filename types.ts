import React from 'react';

export enum GameStage {
    INTRO = 'INTRO',
    PORTAL = 'PORTAL',
    MEET_GENIE = 'MEET_GENIE',
    SECRET_CIPHER = 'SECRET_CIPHER',
    PERILOUS_PATH = 'PERILOUS_PATH',
    RELATIONSHIP = 'RELATIONSHIP',
    VAULT_CHALLENGE = 'VAULT_CHALLENGE',
    OUTRO = 'OUTRO'
}

export interface SceneProps {
    onNext: () => void;
}

// New types for the math problems
export enum ProblemType {
    MULTIPLICATION_PATTERNS,
    DIVISION_PATTERNS,
    ESTIMATE_PRODUCTS,
    ESTIMATE_QUOTIENTS,
    MULTIPLICATION_PROPERTIES,
    DISTRIBUTIVE_PROPERTY,
    REMAINDER_INTERPRETATION,
}

export type QuestionPart = {
    type: 'text';
    value: string;
} | {
    type: 'input';
};

export interface Problem {
    type: ProblemType;
    title: string; // e.g., "أنماط الضرب", "مسألة كلامية"
    questionText?: string; // For word problems or instructions
    questionParts: QuestionPart[]; // For structured equations
    answer: number;
    options?: number[]; // For multiple choice
}

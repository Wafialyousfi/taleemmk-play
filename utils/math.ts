import { Problem, ProblemType, QuestionPart } from '../types';

// Helper to get a random element from an array
const randomElement = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// Helper for random number in a range
const randomInt = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;

// --- Problem Generators ---

const generateMultiplicationPattern = (): Problem => {
    const baseA = randomInt(2, 9);
    const baseB = randomInt(2, 9);
    const zerosA = randomInt(1, 2);
    const zerosB = randomInt(1, 2);
    const numA = baseA * (10 ** zerosA);
    const numB = baseB * (10 ** zerosB);

    return {
        type: ProblemType.MULTIPLICATION_PATTERNS,
        title: 'أكمل النمط',
        questionParts: [
            { type: 'text', value: `${numA} × ${numB} = ` },
            { type: 'input' }
        ],
        answer: numA * numB,
    };
};

const generateDivisionPattern = (): Problem => {
    const divisorBase = randomInt(2, 9);
    const quotientBase = randomInt(2, 9);
    const zerosDivisor = randomInt(1, 2);
    const zerosQuotient = randomInt(0, 1);

    const divisor = divisorBase * (10 ** zerosDivisor);
    const quotient = quotientBase * (10 ** zerosQuotient);
    const dividend = divisor * quotient;

    return {
        type: ProblemType.DIVISION_PATTERNS,
        title: 'أكمل نمط القسمة',
        questionParts: [
            { type: 'text', value: `${dividend} ÷ ${divisor} = ` },
            { type: 'input' }
        ],
        answer: quotient,
    };
};

const generateMultiplicationProperty = (): Problem => {
    const a = randomInt(2, 9);
    const b = randomInt(10, 20);
    const c = randomInt(2, 9);
    
    // Using Associative Property as an example
    return {
        type: ProblemType.MULTIPLICATION_PROPERTIES,
        title: 'استخدم خصائص الضرب',
        questionParts: [
            { type: 'text', value: `(${a} × ${b}) × ${c} = ${a} × (` },
            { type: 'input' },
            { type: 'text', value: ` × ${c})` }
        ],
        answer: b,
    };
}


const generateEstimateProduct = (): Problem => {
    const numA = randomInt(15, 95);
    const numB = randomInt(15, 95);
    const roundedA = Math.round(numA / 10) * 10;
    const roundedB = Math.round(numB / 10) * 10;
    const answer = roundedA * roundedB;

    const options = new Set<number>([answer]);
    while (options.size < 4) {
        // Generate plausible wrong answers
        const wrongAnswer = (Math.round(numA / 10) + randomInt(-1, 1)) * 10 * (Math.round(numB / 10) + randomInt(-1, 1)) * 10;
        if (wrongAnswer !== answer && wrongAnswer > 0) options.add(wrongAnswer);
    }

    return {
        type: ProblemType.ESTIMATE_PRODUCTS,
        title: 'قدّر ناتج الضرب',
        questionText: `قرّب كل عدد لأقرب عشرة ثم أوجد الناتج.`,
        questionParts: [{ type: 'text', value: `${numA} × ${numB}` }],
        answer,
        options: Array.from(options).sort(() => Math.random() - 0.5),
    };
};

const generateEstimateQuotient = (): Problem => {
    const divisor = randomInt(4, 9);
    const quotientApprox = randomInt(5, 15) * 10; // e.g., 50, 60...
    const dividend = quotientApprox * divisor + randomInt(-5, 5); // A number close to a compatible one
    const answer = quotientApprox;

    const options = new Set<number>([answer]);
    while (options.size < 4) {
        const wrongAnswer = answer + randomInt(-2, 2) * 10;
        if (wrongAnswer !== answer && wrongAnswer > 0) options.add(wrongAnswer);
    }

    return {
        type: ProblemType.ESTIMATE_QUOTIENTS,
        title: 'قدّر ناتج القسمة',
        questionText: `استخدم الأعداد المتوافقة لتقدير الناتج.`,
        questionParts: [{ type: 'text', value: `${dividend} ÷ ${divisor}` }],
        answer,
        options: Array.from(options).sort(() => Math.random() - 0.5),
    };
};

const generateRemainderInterpretation = (): Problem => {
    const scenarios = [
        { // Scenario 1: Round up
            template: (d: number, s: number) => `يريد ${d} طالبًا الذهاب في رحلة. كل حافلة تتسع لـ ${s} طالبًا. كم عدد الحافلات اللازمة لنقل جميع الطلاب؟`,
            answer: (d: number, s: number) => Math.ceil(d / s)
        },
        { // Scenario 2: Ignore remainder
            template: (d: number, s: number) => `لدى الخباز ${d} بيضة. كل كعكة تحتاج إلى ${s} بيضات. كم كعكة كاملة يمكنه خبزها؟`,
            answer: (d: number, s: number) => Math.floor(d / s)
        },
        { // Scenario 3: The remainder is the answer
            template: (d: number, s: number) => `قامت سارة بتوزيع ${d} قطعة حلوى بالتساوي على ${s} من صديقاتها. كم قطعة حلوى تبقى مع سارة؟`,
            answer: (d: number, s: number) => d % s
        }
    ];

    const scenario = randomElement(scenarios);
    const divisor = randomInt(4, 9);
    const dividend = randomInt(divisor * 3 + 1, divisor * 6);
    
    const answer = scenario.answer(dividend, divisor);
    const options = new Set<number>([answer, Math.floor(dividend/divisor), dividend % divisor, Math.ceil(dividend/divisor)]);
     while (options.size < 4) {
        const wrongAnswer = answer + randomInt(1, 3);
        options.add(wrongAnswer);
    }
    
    return {
        type: ProblemType.REMAINDER_INTERPRETATION,
        title: 'مسألة كلامية',
        questionText: scenario.template(dividend, divisor),
        questionParts: [],
        answer,
        options: Array.from(options).sort(() => Math.random() - 0.5),
    };
};

const cipherProblems: ProblemType[] = [
    ProblemType.MULTIPLICATION_PATTERNS,
    ProblemType.DIVISION_PATTERNS,
    ProblemType.MULTIPLICATION_PROPERTIES,
];
const pathProblems: ProblemType[] = [
    ProblemType.ESTIMATE_QUOTIENTS,
    ProblemType.REMAINDER_INTERPRETATION,
    ProblemType.DIVISION_PATTERNS,
];
const vaultProblems: ProblemType[] = [
    ProblemType.ESTIMATE_PRODUCTS,
    ProblemType.MULTIPLICATION_PATTERNS,
    ProblemType.ESTIMATE_QUOTIENTS,
];


export const generateNewProblem = (stage: 'cipher' | 'path' | 'vault'): Problem => {
    let allowedTypes: ProblemType[];
    switch (stage) {
        case 'cipher': allowedTypes = cipherProblems; break;
        case 'path': allowedTypes = pathProblems; break;
        case 'vault': allowedTypes = vaultProblems; break;
        default: allowedTypes = Object.values(ProblemType).filter(p => typeof p === 'number') as ProblemType[];
    }
    
    const type = randomElement(allowedTypes);

    switch (type) {
        case ProblemType.MULTIPLICATION_PATTERNS: return generateMultiplicationPattern();
        case ProblemType.DIVISION_PATTERNS: return generateDivisionPattern();
        case ProblemType.ESTIMATE_PRODUCTS: return generateEstimateProduct();
        case ProblemType.ESTIMATE_QUOTIENTS: return generateEstimateQuotient();
        case ProblemType.MULTIPLICATION_PROPERTIES: return generateMultiplicationProperty();
        case ProblemType.REMAINDER_INTERPRETATION: return generateRemainderInterpretation();
        default: return generateMultiplicationPattern(); // Fallback
    }
};

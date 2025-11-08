
import { Problem, ProblemType } from '../types';

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export const generateNewProblem = (stage: 'cipher' | 'path' | 'vault'): Problem => {
    switch (stage) {
        case 'cipher':
            return generateCipherProblem();
        case 'path':
            return generatePathProblem();
        case 'vault':
            return generateVaultProblem();
        default:
            return generateCipherProblem();
    }
};

// Stage 1: Multiplication Patterns (Secret Cipher)
// Focus on multiples of 10, 100, 1000. e.g., 50 x 60 = 3000
const generateCipherProblem = (): Problem => {
    const base1 = randomInt(2, 9);
    const base2 = randomInt(2, 9);
    // Ensure we have some zeros to make it a pattern problem
    const zeros1 = randomInt(0, 2); 
    const zeros2 = randomInt(1, 3 - zeros1); 

    const num1 = base1 * Math.pow(10, zeros1);
    const num2 = base2 * Math.pow(10, zeros2);
    const answer = num1 * num2;

    return {
        type: ProblemType.MULTIPLICATION_PATTERNS,
        title: 'أنماط الضرب',
        questionParts: [
            { type: 'text', value: `${num1} × ${num2} = ` },
            { type: 'input' }
        ],
        answer
    };
};

// Stage 2: Division/Estimation (Perilous Path) - Multiple Choice
const generatePathProblem = (): Problem => {
    // Mix of estimation and division patterns
    const isEstimation = Math.random() > 0.4;

    if (isEstimation) {
        // Estimation: 42 x 58 approx 40 x 60 = 2400
        const num1 = randomInt(11, 99);
        const num2 = randomInt(11, 99);
        // Round to nearest ten
        const rounded1 = Math.round(num1 / 10) * 10;
        const rounded2 = Math.round(num2 / 10) * 10;
        const answer = rounded1 * rounded2;

        // Generate plausible wrong options
        const options = new Set<number>([answer]);
        // Wrong rounding directions
        options.add(Math.floor(num1 / 10) * 10 * Math.floor(num2 / 10) * 10);
        options.add(Math.ceil(num1 / 10) * 10 * Math.ceil(num2 / 10) * 10);
        // Random close estimations
        while (options.size < 4) {
             options.add(answer + (randomInt(0, 1) === 0 ? 100 : -100) * randomInt(1, 5));
        }
        // Ensure no negative options if accidentally generated
        const finalOptions = Array.from(options).filter(n => n > 0).slice(0, 4);
        while(finalOptions.length < 4) finalOptions.push(answer + finalOptions.length * 100 + 100);

        return {
            type: ProblemType.ESTIMATE_PRODUCTS,
            title: 'تقدير نواتج الضرب',
            questionText: 'قدّر الناتج بتقريب الأعداد إلى أقرب عشرة:',
            questionParts: [
                 { type: 'text', value: `${num1} × ${num2} ≈ ` }
            ],
            answer,
            options: finalOptions.sort(() => Math.random() - 0.5)
        };
    } else {
        // Division patterns: 3600 ÷ 60 = 60
         const baseDivisor = randomInt(2, 9);
         const baseQuotient = randomInt(2, 9);
         const baseDividend = baseDivisor * baseQuotient;

         const divisorZeros = randomInt(1, 2); // e.g., 10 or 100
         // Dividend must have at least as many zeros as divisor, plus maybe more for the quotient
         const quotientZeros = randomInt(1, 2);
         const dividendZeros = divisorZeros + quotientZeros;

         const dividend = baseDividend * Math.pow(10, dividendZeros);
         const divisor = baseDivisor * Math.pow(10, divisorZeros);
         const answer = dividend / divisor;

         const options = new Set<number>([answer]);
         // Common mistakes: wrong number of zeros
         options.add(answer * 10);
         options.add(answer / 10);
         options.add(baseQuotient * Math.pow(10, Math.max(0, quotientZeros - 1))); 
         while(options.size < 4) options.add(answer + randomInt(1, 9) * Math.pow(10, quotientZeros));

         return {
            type: ProblemType.DIVISION_PATTERNS,
            title: 'أنماط القسمة',
            questionParts: [
                 { type: 'text', value: `${dividend} ÷ ${divisor} = ` }
            ],
            answer,
            options: Array.from(options).slice(0, 4).sort(() => Math.random() - 0.5)
        };
    }
};

// Stage 3: Vault (Distributive property)
const generateVaultProblem = (): Problem => {
     // Distributive property: 5 x 104 = (5 x 100) + (5 x 4) = 500 + 20 = 520
     const n1 = randomInt(3, 9);
     const n2_hundreds = randomInt(1, 9) * 100;
     const n2_units = randomInt(1, 9);
     const n2 = n2_hundreds + n2_units;
     const answer = n1 * n2;

     const options = new Set<number>([answer]);
     // Common mistakes
     options.add(n1 * n2_hundreds + n2_units); // Forgot to distribute to the second part: 5 * 104 -> 500 + 4 = 504
     options.add(n1 * 100 + n1 * n2_units); // Wrong base: 5*100 + 5*4 = 520 (coincidentally same sometimes, but logically wrong if n2_hundreds != 100)
     options.add((n1+1) * n2);
     
     while(options.size < 4) {
        const noise = randomInt(1, 5) * 10;
        const fake = answer + (Math.random() > 0.5 ? noise : -noise);
        if (fake > 0) options.add(fake);
     }

     return {
        type: ProblemType.DISTRIBUTIVE_PROPERTY,
        title: 'خاصية التوزيع',
        questionText: `استخدم خاصية التوزيع لحساب: ${n1} × (${n2_hundreds} + ${n2_units})`,
        questionParts: [
             { type: 'text', value: `${n1} × ${n2} = ` }
        ],
        answer,
        options: Array.from(options).slice(0, 4).sort(() => Math.random() - 0.5)
    };
};

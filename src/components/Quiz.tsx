import { useState } from 'react';

interface QuizOption {
  text: string;
  correct: boolean;
}

interface QuizProps {
  question: string;
  options: QuizOption[];
  explanation: string;
}

export default function Quiz({ question, options, explanation }: QuizProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (index: number) => {
    if (showResult) return;
    setSelected(index);
  };

  const handleSubmit = () => {
    if (selected === null) return;
    setShowResult(true);
  };

  const handleReset = () => {
    setSelected(null);
    setShowResult(false);
  };

  const getOptionClass = (index: number) => {
    const baseClass = 'quiz-option';
    if (selected === index) {
      if (showResult) {
        return options[index].correct
          ? `${baseClass} correct`
          : `${baseClass} incorrect`;
      }
      return `${baseClass} selected`;
    }
    if (showResult && options[index].correct) {
      return `${baseClass} correct`;
    }
    return baseClass;
  };

  return (
    <div className="quiz-container">
      <h3>📝 Quiz</h3>
      <p className="quiz-question">{question}</p>

      <div className="quiz-options">
        {options.map((option, index) => (
          <div
            key={index}
            className={getOptionClass(index)}
            onClick={() => handleSelect(index)}
          >
            {option.text}
          </div>
        ))}
      </div>

      {!showResult ? (
        <button
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={selected === null}
          style={{ marginTop: '20px' }}
        >
          ตรวจคำตอบ
        </button>
      ) : (
        <div style={{ marginTop: '20px' }}>
          <div className="quiz-result">
            <strong>
              {options[selected!].correct ? '✅ ถูกต้อง!' : '❌ ไม่ถูกต้อง'}
            </strong>
          </div>
          <div className="quiz-explanation">
            <strong>คำอธิบาย:</strong> {explanation}
          </div>
          <button
            className="btn btn-primary"
            onClick={handleReset}
            style={{ marginTop: '15px' }}
          >
            ลองใหม่
          </button>
        </div>
      )}
    </div>
  );
}

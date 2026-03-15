import { useState, useEffect } from 'react';

interface ProgressProps {
  course: string;
  chapter?: number;
  totalChapters?: number;
}

export default function Progress({
  course,
  chapter,
  totalChapters = 12
}: ProgressProps) {
  const [completed, setCompleted] = useState<number[]>([]);

  useEffect(() => {
    // Load from localStorage
    const stored = localStorage.getItem(`episteme-progress-${course}`);
    if (stored) {
      setCompleted(JSON.parse(stored));
    }
  }, [course]);

  const toggleChapter = (ch: number) => {
    let newCompleted: number[];
    if (completed.includes(ch)) {
      newCompleted = completed.filter(c => c !== ch);
    } else {
      newCompleted = [...completed, ch];
    }
    setCompleted(newCompleted);
    localStorage.setItem(`episteme-progress-${course}`, JSON.stringify(newCompleted));
  };

  const progress = (completed.length / totalChapters) * 100;

  return (
    <div className="progress-section">
      <h2>📊 ความก้าวหน้า</h2>
      <div className="progress-bar-wrapper">
        <div
          className="progress-bar"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="progress-text">
        เรียนจบ {completed.length}/{totalChapters} บท ({progress.toFixed(1)}%)
      </p>

      {chapter && (
        <button
          className={`btn ${completed.includes(chapter) ? 'btn-success' : 'btn-primary'}`}
          onClick={() => toggleChapter(chapter)}
          style={{ marginTop: '15px' }}
        >
          {completed.includes(chapter) ? '✅ เรียนจบแล้ว' : '✓ ทำเครื่องหมายว่าเรียนจบ'}
        </button>
      )}
    </div>
  );
}

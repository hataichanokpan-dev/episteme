interface CourseCardProps {
  title: string;
  description: string;
  href: string;
  emoji?: string;
  chapters?: number;
  completed?: number;
}

export default function CourseCard({
  title,
  description,
  href,
  emoji = '📚',
  chapters,
  completed = 0
}: CourseCardProps) {
  const progress = chapters ? (completed / chapters) * 100 : 0;

  return (
    <a href={href} className="course-card">
      <div className="course-emoji">{emoji}</div>
      <h3 className="course-title">{title}</h3>
      <p className="course-description">{description}</p>
      {chapters && (
        <>
          <div className="course-progress-bar">
            <div
              className="course-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="course-progress-text">
            {completed}/{chapters} บท
          </p>
        </>
      )}
    </a>
  );
}

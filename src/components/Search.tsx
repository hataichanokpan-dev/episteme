import { useState, useEffect, useRef } from 'react';

interface SearchResult {
  title: string;
  url: string;
  preview: string;
  course: string;
}

interface SearchProps {
  courses: {
    id: string;
    title: string;
    chapters: { title: string; url: string; content: string }[];
  }[];
}

export default function Search({ courses }: SearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Close on outside click
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const searchResults: SearchResult[] = [];
    const lowerQuery = query.toLowerCase();

    courses.forEach(course => {
      course.chapters.forEach(chapter => {
        if (
          chapter.title.toLowerCase().includes(lowerQuery) ||
          chapter.content.toLowerCase().includes(lowerQuery)
        ) {
          // Find preview
          const contentLower = chapter.content.toLowerCase();
          const index = contentLower.indexOf(lowerQuery);
          let preview = '';
          if (index !== -1) {
            const start = Math.max(0, index - 50);
            const end = Math.min(chapter.content.length, index + query.length + 50);
            preview = (start > 0 ? '...' : '') +
              chapter.content.slice(start, end) +
              (end < chapter.content.length ? '...' : '');
          } else {
            preview = chapter.content.slice(0, 100) + '...';
          }

          searchResults.push({
            title: chapter.title,
            url: chapter.url,
            preview,
            course: course.title
          });
        }
      });
    });

    setResults(searchResults.slice(0, 10));
  }, [query, courses]);

  return (
    <div className="search-container" ref={containerRef}>
      <input
        type="text"
        className="search-input"
        placeholder="🔍 ค้นหาในคอร์ส..."
        value={query}
        onChange={e => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
      />

      {isOpen && results.length > 0 && (
        <div className="search-results">
          {results.map((result, index) => (
            <a
              key={index}
              href={result.url}
              className="search-result"
              onClick={() => setIsOpen(false)}
            >
              <div className="search-result-title">{result.title}</div>
              <div className="search-result-course">{result.course}</div>
              <div className="search-result-preview">{result.preview}</div>
            </a>
          ))}
        </div>
      )}

      {isOpen && query && results.length === 0 && (
        <div className="search-results">
          <div className="search-result">
            <div className="search-result-title">ไม่พบผลลัพธ์</div>
            <div className="search-result-preview">
              ลองค้นหาด้วยคำอื่น
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

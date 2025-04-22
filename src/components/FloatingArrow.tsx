import { useEffect, useState } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

export default function ScrollButton() {
  const [isAtTop, setIsAtTop] = useState(true);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    setIsAtTop(scrollTop < 200); // You can tweak the threshold
  };

  const handleClick = () => {
    if (isAtTop) {
      // Scroll to bottom
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
    } else {
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Ensure correct state on initial render
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-5 right-5 z-100 p-2 rounded-full bg-[#F3F5F9] text-[#040BC5] cursor-pointer transition shadow-lg"
    >
      {isAtTop ? (
        <div className="flex items-center gap-2">
          <ArrowDown size={20} />
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <ArrowUp size={20} />
        </div>
      )}
    </button>
  );
}

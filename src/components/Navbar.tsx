import { useState, useEffect } from 'react';

interface NavbarProps {
  onCategoryChange?: (category: string) => void;
}

const Navbar = ({ onCategoryChange }: NavbarProps) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    { id: 'all', label: '全部' },
    { id: 'APP', label: 'APP' },
    { id: 'web', label: '网页端' },
    { id: 'motion', label: '动效' },
    { id: 'other', label: '其他' },
  ];

  const handleCategoryClick = (id: string) => {
    setActiveCategory(id);
    const categoryMap: Record<string, string> = {
      all: 'all',
      APP: 'APP',
      web: '网页端',
      motion: '动效',
      other: '其他',
    };
    onCategoryChange?.(categoryMap[id]);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <a href="#" className="text-2xl font-bold text-gray-900">汤如阳</a>
          <nav className="hidden md:flex space-x-3">
            {categories.map((item) => (
              <button
                key={item.id}
                onClick={() => handleCategoryClick(item.id)}
                className={`relative px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === item.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item.label}
                
                {/* 下划线标记 —— 我已经加了合适的距离！*/}
                {activeCategory === item.id && (
                  <span className="absolute left-1/2 -translate-x-1/2 bottom-1.5 h-1 w-10 bg-blue-600 rounded-full" />
                )}
              </button>
            ))}
          </nav>
          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
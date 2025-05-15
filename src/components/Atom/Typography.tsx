interface props {
  tag?: 'h1' | 'h2' | 'h3' | 'p';
  text: string
  className?: string;
  color?: 'gray' | 'white' | 'black' | 'green' | 'orange' | 'red' | 'indigo' | 'blue';

}


export default function Typography({ tag: Tag = 'p', text, className, color = 'black' }: props) {

  const classTag = {
    h1: 'text-2xl font-semibold',     // ~20px
    h2: 'text-xl font-semibold',      // ~16px
    h3: 'text-base font-semibold',    // ~14px
    p: 'text-sm font-normal'          // ~13px
  };

  const colorClass = {
    'gray': 'text-stone-200',
    'white': 'text-white',
    'black': 'text-text-darkBlack',
    'green': 'text-green-600',
    'orange': 'text-amber-500',
    'red': 'text-red-500',
    'indigo': 'text-indigo-600',
    'blue': 'text-blue-900'
  };
  return <Tag className={`${classTag[Tag]} ${colorClass[color]} ${className}`}>{text}</Tag>;
}

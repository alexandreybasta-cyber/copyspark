'use client';

const features = [
  { label: 'AI Chat', icon: '💬', color: 'from-blue-500/20 to-blue-600/20 border-blue-500/30' },
  { label: 'Deep Research', icon: '🔍', color: 'from-purple-500/20 to-purple-600/20 border-purple-500/30' },
  { label: 'Creative Writing', icon: '✍️', color: 'from-pink-500/20 to-pink-600/20 border-pink-500/30' },
  { label: 'Code Assistant', icon: '💻', color: 'from-green-500/20 to-green-600/20 border-green-500/30' },
];

interface FeatureChipsProps {
  onFeatureClick: (feature: string) => void;
}

export default function FeatureChips({ onFeatureClick }: FeatureChipsProps) {
  return (
    <div className="flex flex-wrap gap-3 justify-center mt-6">
      {features.map((feature) => (
        <button
          key={feature.label}
          onClick={() => onFeatureClick(feature.label)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r ${feature.color} border backdrop-blur-sm text-sm font-medium text-gray-700 dark:text-gray-200 hover:scale-105 transition-all duration-200 cursor-pointer`}
        >
          <span>{feature.icon}</span>
          <span>{feature.label}</span>
        </button>
      ))}
    </div>
  );
}


import React from 'react';
import * as LucideIcons from 'lucide-react';

interface IconProps {
  name: string;
  className?: string;
  size?: number;
  // Added style prop to support dynamic inline styling for icons (e.g., brand colors)
  style?: React.CSSProperties;
}

const Icon: React.FC<IconProps> = ({ name, className, size = 20, style }) => {
  const LucideIcon = (LucideIcons as any)[name];
  if (!LucideIcon) return null;
  // Forwarding style prop to the underlying Lucide icon component
  return <LucideIcon className={className} size={size} style={style} />;
};

export default Icon;

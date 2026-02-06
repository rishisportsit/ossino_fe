import { useTheme, THEME_METADATA, ThemeName } from '../ThemeProvider';
import { Check } from 'lucide-react';
import { cn } from '@/helpers/ui';

interface ThemeSwitcherProps {
  className?: string;
}

export default function ThemeSwitcher({ className }: ThemeSwitcherProps) {
  const { theme, setTheme, availableThemes } = useTheme();

  return (
    <div className={cn('space-y-3', className)}>
      <h3 className="text-sm font-medium text-text-base">Theme</h3>
      
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {availableThemes.map((themeName) => {
          const metadata = THEME_METADATA[themeName];
          const isActive = theme === themeName;
          
          return (
            <button
              key={themeName}
              onClick={() => setTheme(themeName)}
              className={cn(
                'relative flex flex-col items-center gap-2 rounded-xl p-4 transition-all',
                'border-2 hover:scale-105',
                isActive
                  ? 'border-primary bg-surface-elevated shadow-glow-primary'
                  : 'border-border-base bg-surface-base hover:border-primary/50'
              )}
            >
              {/* Color preview circle */}
              <div
                className="h-12 w-12 rounded-full ring-2 ring-offset-2 ring-offset-surface-base"
                style={{
                  backgroundColor: metadata.preview,
                  boxShadow: `0 0 20px ${metadata.preview}`,
                }}
              />
              
              {/* Theme name */}
              <div className="text-center">
                <p className="text-xs font-medium text-text-base">
                  {metadata.label}
                </p>
                <p className="text-2xs text-text-subtle">
                  {metadata.description}
                </p>
              </div>
              
              {/* Active indicator */}
              {isActive && (
                <div className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                  <Check className="h-4 w-4 text-surface-base" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Preview info */}
      <p className="text-2xs text-text-subtle">
        Changes apply immediately and are saved to your preferences
      </p>
    </div>
  );
}

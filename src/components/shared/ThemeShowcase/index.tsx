import { useTheme } from '../ThemeProvider';

/**
 * Example Component Showcasing Optimized Theme System
 * 
 * Demonstrates:
 * - Semantic color usage
 * - Opacity utilities
 * - Theme-aware gradients
 * - Surface hierarchy
 */
export default function ThemeShowcase() {
  const { theme } = useTheme();

  return (
    <div className="space-y-6 p-6">
      {/* Current Theme Info */}
      <div className="bg-surface-elevated rounded-xl p-6 border border-border-base">
        <h2 className="text-text-base text-xl font-bold mb-2">
          Current Theme: {theme}
        </h2>
        <p className="text-text-muted">
          All colors below adapt automatically when you switch themes!
        </p>
      </div>

      {/* Surface Hierarchy Demo */}
      <section className="space-y-3">
        <h3 className="text-text-base font-semibold">Surface Hierarchy</h3>
        
        <div className="bg-surface-base p-6 rounded-xl">
          <p className="text-text-muted mb-3">bg-surface-base (Page background)</p>
          
          <div className="bg-surface-elevated p-6 rounded-xl">
            <p className="text-text-muted mb-3">bg-surface-elevated (Cards)</p>
            
            <div className="bg-surface-overlay p-6 rounded-xl">
              <p className="text-text-muted mb-3">bg-surface-overlay (Modals)</p>
              
              <div className="bg-surface-interactive p-4 rounded-lg">
                <p className="text-text-base">bg-surface-interactive (Buttons)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Color Palette */}
      <section className="space-y-3">
        <h3 className="text-text-base font-semibold">Brand Colors</h3>
        
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {/* Primary */}
          <div className="space-y-2">
            <div className="bg-primary h-20 rounded-lg flex items-center justify-center">
              <span className="text-surface-base font-semibold">Primary</span>
            </div>
            <div className="space-y-1 text-xs">
              <div className="bg-primary/80 h-6 rounded"></div>
              <div className="bg-primary/60 h-6 rounded"></div>
              <div className="bg-primary/40 h-6 rounded"></div>
              <div className="bg-primary/20 h-6 rounded"></div>
            </div>
            <p className="text-text-subtle text-xs">
              With opacity: /80, /60, /40, /20
            </p>
          </div>

          {/* Secondary */}
          <div className="space-y-2">
            <div className="bg-secondary h-20 rounded-lg flex items-center justify-center">
              <span className="text-surface-base font-semibold">Secondary</span>
            </div>
            <div className="space-y-1 text-xs">
              <div className="bg-secondary/80 h-6 rounded"></div>
              <div className="bg-secondary/60 h-6 rounded"></div>
              <div className="bg-secondary/40 h-6 rounded"></div>
              <div className="bg-secondary/20 h-6 rounded"></div>
            </div>
          </div>

          {/* Accent */}
          <div className="space-y-2">
            <div className="bg-accent h-20 rounded-lg flex items-center justify-center">
              <span className="text-surface-base font-semibold">Accent</span>
            </div>
            <div className="space-y-1 text-xs">
              <div className="bg-accent/80 h-6 rounded"></div>
              <div className="bg-accent/60 h-6 rounded"></div>
              <div className="bg-accent/40 h-6 rounded"></div>
              <div className="bg-accent/20 h-6 rounded"></div>
            </div>
          </div>

          {/* Tertiary */}
          <div className="space-y-2">
            <div className="bg-tertiary h-20 rounded-lg flex items-center justify-center">
              <span className="text-surface-base font-semibold">Tertiary</span>
            </div>
            <div className="space-y-1 text-xs">
              <div className="bg-tertiary/80 h-6 rounded"></div>
              <div className="bg-tertiary/60 h-6 rounded"></div>
              <div className="bg-tertiary/40 h-6 rounded"></div>
              <div className="bg-tertiary/20 h-6 rounded"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Status Colors */}
      <section className="space-y-3">
        <h3 className="text-text-base font-semibold">Status Colors</h3>
        
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="bg-success/10 border border-success/30 rounded-lg p-4">
            <div className="w-8 h-8 bg-success rounded-full mb-2"></div>
            <p className="text-success font-semibold">Success</p>
            <p className="text-text-subtle text-xs">Positive actions</p>
          </div>

          <div className="bg-error/10 border border-error/30 rounded-lg p-4">
            <div className="w-8 h-8 bg-error rounded-full mb-2"></div>
            <p className="text-error font-semibold">Error</p>
            <p className="text-text-subtle text-xs">Failed states</p>
          </div>

          <div className="bg-warning/10 border border-warning/30 rounded-lg p-4">
            <div className="w-8 h-8 bg-warning rounded-full mb-2"></div>
            <p className="text-warning font-semibold">Warning</p>
            <p className="text-text-subtle text-xs">Caution needed</p>
          </div>

          <div className="bg-info/10 border border-info/30 rounded-lg p-4">
            <div className="w-8 h-8 bg-info rounded-full mb-2"></div>
            <p className="text-info font-semibold">Info</p>
            <p className="text-text-subtle text-xs">Informational</p>
          </div>
        </div>
      </section>

      {/* Gradient Examples */}
      <section className="space-y-3">
        <h3 className="text-text-base font-semibold">Dynamic Gradients</h3>
        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="bg-gradient-button rounded-lg p-6 text-center">
            <p className="text-surface-base font-bold">Button Gradient</p>
            <p className="text-surface-base/80 text-sm">Adapts to theme</p>
          </div>

          <div className="bg-gradient-accent rounded-lg p-6 text-center">
            <p className="text-text-base font-bold">Accent Gradient</p>
            <p className="text-text-muted text-sm">Fixed colors</p>
          </div>

          <div className="bg-gradient-overlay rounded-lg p-6 text-center">
            <p className="text-text-base font-bold">Overlay Gradient</p>
            <p className="text-text-muted text-sm">Subtle depth</p>
          </div>
        </div>
      </section>

      {/* Text Hierarchy */}
      <section className="space-y-3">
        <h3 className="text-text-base font-semibold">Text Hierarchy</h3>
        
        <div className="bg-surface-elevated rounded-lg p-6 space-y-2">
          <p className="text-text-base text-lg font-bold">
            text-text-base - Primary text (100% opacity)
          </p>
          <p className="text-text-muted">
            text-text-muted - Secondary text (~75% opacity)
          </p>
          <p className="text-text-subtle text-sm">
            text-text-subtle - Tertiary text (~50% opacity)
          </p>
        </div>
      </section>

      {/* Interactive Elements */}
      <section className="space-y-3">
        <h3 className="text-text-base font-semibold">Interactive Elements</h3>
        
        <div className="flex flex-wrap gap-3">
          {/* Primary Button */}
          <button className="bg-gradient-button px-6 py-3 rounded-lg text-surface-base font-semibold hover:opacity-90 transition-opacity">
            Primary Button
          </button>

          {/* Secondary Button */}
          <button className="bg-surface-interactive px-6 py-3 rounded-lg text-text-base font-semibold hover:bg-primary/20 transition-colors border border-border-base">
            Secondary Button
          </button>

          {/* Outline Button */}
          <button className="bg-transparent px-6 py-3 rounded-lg text-primary font-semibold border-2 border-primary hover:bg-primary/10 transition-colors">
            Outline Button
          </button>

          {/* Ghost Button */}
          <button className="bg-transparent px-6 py-3 rounded-lg text-text-base font-semibold hover:bg-surface-interactive transition-colors">
            Ghost Button
          </button>
        </div>
      </section>

      {/* Card Example */}
      <section className="space-y-3">
        <h3 className="text-text-base font-semibold">Card Example</h3>
        
        <div className="bg-surface-elevated border border-border-base rounded-xl p-6 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="text-text-base font-bold text-lg">Game Title</h4>
              <p className="text-text-muted text-sm">Provider Name</p>
            </div>
            <div className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-semibold">
              Popular
            </div>
          </div>

          <p className="text-text-subtle">
            This card demonstrates the proper use of surface hierarchy,
            text colors, and accent colors in the optimized theme system.
          </p>

          <div className="flex gap-3">
            <button className="flex-1 bg-gradient-button py-2 rounded-lg text-surface-base font-semibold">
              Play Now
            </button>
            <button className="px-4 bg-surface-overlay rounded-lg border border-border-base hover:border-primary transition-colors">
              ★
            </button>
          </div>
        </div>
      </section>

      {/* Benefits Summary */}
      <section className="bg-primary/10 border border-primary/30 rounded-xl p-6">
        <h3 className="text-primary font-bold mb-3">Optimization Benefits</h3>
        <ul className="space-y-2 text-text-muted text-sm">
          <li>✅ 60% fewer CSS variables (150 → 60)</li>
          <li>✅ Dynamic theme switching without rebuild</li>
          <li>✅ Semantic color names for better DX</li>
          <li>✅ Built-in opacity support (no separate variants)</li>
          <li>✅ Theme-aware gradients</li>
          <li>✅ Better Tailwind IntelliSense</li>
          <li>✅ Smaller CSS bundle size</li>
          <li>✅ Self-documenting code</li>
        </ul>
      </section>
    </div>
  );
}

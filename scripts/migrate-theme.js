/**
 * Automated Theme Migration Script
 * 
 * This script helps migrate from old theme variables to new optimized ones
 * Run: node scripts/migrate-theme.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Migration map: old class → new class
const CLASS_MIGRATIONS = {
  // Surface colors
  'bg-base-800': 'bg-surface-elevated',
  'bg-base-700': 'bg-surface-overlay',
  'bg-base-600': 'bg-surface-interactive',
  'bg-primary': 'bg-surface-base',
  'bg-secondary': 'bg-surface-elevated',
  'bg-third': 'bg-surface-overlay',
  
  // Text colors
  'text-base-100': 'text-text-base',
  'text-base-300': 'text-text-muted',
  'text-base-500': 'text-text-subtle',
  'text-primary': 'text-text-base',
  'text-secondary': 'text-text-muted',
  'text-third': 'text-text-subtle',
  
  // Border colors
  'border-borderdefault': 'border-border-base',
  
  // Brand colors - KEEP THESE, they're backwards compatible
  // 'bg-primary-1': 'bg-primary',     // Don't migrate - still valid
  // 'text-primary-1': 'text-primary', // Don't migrate - still valid
  // 'text-secondary-1': 'text-secondary', // Don't migrate - still valid
  
  // Status colors
  'text-status-error-100': 'text-error',
  'bg-status-error-100': 'bg-error',
  'text-status-success': 'text-success',
  'bg-status-success': 'bg-success',
  'text-status-warning': 'text-warning',
  'bg-status-warning': 'bg-warning',
  'text-status-info': 'text-info',
  'bg-status-info': 'bg-info',
  
  // Intermediate base shades → opacity
  'bg-base-620': 'bg-base-600/90',
  'bg-base-630': 'bg-base-600/80',
  'bg-base-640': 'bg-base-600/70',
  'bg-base-645': 'bg-base-600/65',
  'bg-base-650': 'bg-base-600/50',
  'bg-base-670': 'bg-base-700/90',
  'bg-base-675': 'bg-base-700/85',
  'bg-base-680': 'bg-base-700/80',
  'bg-base-690': 'bg-base-700/70',
  'bg-base-725': 'bg-base-700/60',
  'bg-base-735': 'bg-base-800/90',
  'bg-base-750': 'bg-base-800/80',
  'bg-base-775': 'bg-base-800/70',
  'bg-base-850': 'bg-base-900/90',
  'bg-base-860': 'bg-base-900/80',
  
  // Gradients
  'bg-button-gradient': 'bg-gradient-button',
  'bg-fourth-gradient': 'bg-gradient-overlay',
  'gradient-pop-up-success': 'bg-gradient-overlay',
  'gradient-pop-up': 'bg-gradient-overlay',
  'gradient-button': 'bg-gradient-button',
};

// Files to scan
const DIRECTORIES_TO_SCAN = [
  'src/components',
  'src/pages',
];

const FILE_EXTENSIONS = ['.tsx', '.jsx', '.ts', '.js'];

// Statistics
let filesScanned = 0;
let filesModified = 0;
let totalReplacements = 0;

/**
 * Get all files recursively
 */
function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    
    if (fs.statSync(filePath).isDirectory()) {
      arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
    } else {
      if (FILE_EXTENSIONS.some(ext => file.endsWith(ext))) {
        arrayOfFiles.push(filePath);
      }
    }
  });

  return arrayOfFiles;
}

/**
 * Migrate a single file
 */
function migrateFile(filePath) {
  filesScanned++;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  let fileReplacements = 0;
  
  // Apply each migration
  Object.entries(CLASS_MIGRATIONS).forEach(([oldClass, newClass]) => {
    // Match className="..." or className='...' or className={...}
    const patterns = [
      new RegExp(`className="([^"]*\\b${oldClass}\\b[^"]*)"`, 'g'),
      new RegExp(`className='([^']*\\b${oldClass}\\b[^']*)'`, 'g'),
      new RegExp(`className=\\{([^}]*\\b${oldClass}\\b[^}]*)\\}`, 'g'),
    ];
    
    patterns.forEach(pattern => {
      const matches = content.match(pattern);
      if (matches) {
        content = content.replace(
          new RegExp(`\\b${oldClass}\\b`, 'g'),
          newClass
        );
        fileReplacements += matches.length;
      }
    });
  });
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    filesModified++;
    totalReplacements += fileReplacements;
    console.log(`✅ ${path.relative(process.cwd(), filePath)} - ${fileReplacements} replacements`);
  }
}

/**
 * Main migration function
 */
function runMigration() {
  console.log('🚀 Starting theme migration...\n');
  
  const srcPath = path.join(__dirname, '..');
  
  DIRECTORIES_TO_SCAN.forEach(dir => {
    const fullPath = path.join(srcPath, dir);
    
    if (!fs.existsSync(fullPath)) {
      console.log(`⚠️  Directory not found: ${dir}`);
      return;
    }
    
    console.log(`📁 Scanning ${dir}...`);
    const files = getAllFiles(fullPath);
    
    files.forEach(file => {
      migrateFile(file);
    });
  });
  
  console.log('\n📊 Migration Summary:');
  console.log(`   Files scanned: ${filesScanned}`);
  console.log(`   Files modified: ${filesModified}`);
  console.log(`   Total replacements: ${totalReplacements}`);
  
  if (filesModified > 0) {
    console.log('\n✨ Migration complete! Please review the changes and test your application.');
    console.log('💡 Tip: Run "git diff" to see all changes made.');
  } else {
    console.log('\n✨ No changes needed - all files are already up to date!');
  }
}

// Run migration
runMigration();

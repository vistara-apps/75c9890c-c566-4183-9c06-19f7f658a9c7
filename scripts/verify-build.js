#!/usr/bin/env node

/**
 * Build verification script for DreamWeaver Base Mini App
 * Ensures all critical files are present after build
 */

const fs = require('fs');
const path = require('path');

const requiredFiles = [
  '.next/BUILD_ID',
  '.next/app-build-manifest.json',
  '.next/build-manifest.json',
  '.next/prerender-manifest.json',
  '.next/routes-manifest.json',
];

const requiredDirs = [
  '.next/static',
  '.next/server',
  '.next/types',
];

console.log('🔍 Verifying build artifacts...');

let allGood = true;

// Check required files
for (const file of requiredFiles) {
  if (!fs.existsSync(file)) {
    console.error(`❌ Missing required file: ${file}`);
    allGood = false;
  } else {
    console.log(`✅ Found: ${file}`);
  }
}

// Check required directories
for (const dir of requiredDirs) {
  if (!fs.existsSync(dir)) {
    console.error(`❌ Missing required directory: ${dir}`);
    allGood = false;
  } else {
    console.log(`✅ Found: ${dir}`);
  }
}

if (allGood) {
  console.log('\n🎉 Build verification successful! All required artifacts are present.');
  process.exit(0);
} else {
  console.log('\n💥 Build verification failed! Some required artifacts are missing.');
  process.exit(1);
}

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function (eleventyConfig) {
  // ✅ Pass assets and CNAME through
  eleventyConfig.addPassthroughCopy('src/assets');
  eleventyConfig.addPassthroughCopy('src/CNAME', { errorOnMissing: false });

  // ✅ Pass lib folder through for web components
  eleventyConfig.addPassthroughCopy('lib');

  // ✅ Watch plume.json and lib folder for changes (triggers rebuild in dev mode)
  eleventyConfig.addWatchTarget('plume.json');
  eleventyConfig.addWatchTarget('lib');

  // ✅ Simple date filter
  eleventyConfig.addFilter('date', (value, format = 'year') => {
    const date = value === 'now' ? new Date() : new Date(value);
    switch (format) {
      case 'year':
        return date.getUTCFullYear();
      case 'iso':
        return date.toISOString().split('T')[0];
      case 'long':
        return new Intl.DateTimeFormat('en', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }).format(date);
      default:
        return date.toString();
    }
  });

  // ✅ Convert camelCase to kebab-case for HTML attributes
  eleventyConfig.addFilter('kebabCase', (str) => {
    return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
  });

  // ✅ Stringify arrays/objects for HTML attributes, leave strings as-is
  eleventyConfig.addFilter('attrValue', (value) => {
    if (value === null || value === undefined) {
      return '';
    }
    // If it's an array or object, stringify it
    if (Array.isArray(value) || (typeof value === 'object' && value.constructor === Object)) {
      return JSON.stringify(value);
    }
    // Otherwise, return as string
    return String(value);
  });

  // ✅ Get component path based on component name
  eleventyConfig.addFilter('componentPath', (componentName, baseUrl = '') => {
    let path = '';
    if (componentName.startsWith('plume-hero')) {
      path = `/lib/hero/${componentName}.js`;
    } else if (componentName.startsWith('plume-nav')) {
      path = `/lib/nav/${componentName}.js`;
    } else if (componentName.startsWith('plume-pricing')) {
      path = `/lib/pricing/${componentName}.js`;
    } else if (componentName.startsWith('plume-features')) {
      path = `/lib/features/${componentName}.js`;
    } else if (componentName.startsWith('plume-logo-cloud')) {
      path = `/lib/logo-clouds/${componentName}.js`;
    } else {
      path = `/lib/${componentName}.js`;
    }

    // Prepend baseUrl if provided and not root
    if (baseUrl && baseUrl !== '/' && baseUrl.trim() !== '') {
      // Ensure baseUrl has trailing slash, then append path without leading slash
      const base = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
      const cleanPath = path.startsWith('/') ? path.slice(1) : path;
      return `${base}${cleanPath}`;
    }

    return path;
  });

  // ✅ Derive base URL dynamically
  const repoPath = process.env.GITHUB_REPOSITORY ? process.env.GITHUB_REPOSITORY.split('/')[1] : '';
  const isUserPage = !process.env.GITHUB_REPOSITORY;
  const baseUrl = isUserPage
    ? '/' // root-level site like username.github.io
    : process.env.BASEURL || `/${repoPath}/`; // project page fallback

  // Debug logging for base URL
  console.log('process.env.GITHUB_REPOSITORY', process.env.GITHUB_REPOSITORY);
  console.log('process.env.BASEURL', process.env.BASEURL);
  console.log('repoPath', repoPath);
  console.log('isUserPage', isUserPage);
  console.log(`Repository: ${process.env.GITHUB_REPOSITORY || 'local'}`);
  console.log(`Base URL: ${baseUrl}`);

  eleventyConfig.addGlobalData('site', {
    name: 'My Eleventy Template',
    baseUrl,
  });

  // Note: plume config is now loaded via src/_data/plume.js
  // This allows Eleventy to automatically watch and reload it

  // ✅ Posts collection
  eleventyConfig.addCollection('posts', (collection) => collection.getFilteredByGlob('src/posts/*.md').reverse());

  return {
    dir: {
      input: 'src',
      includes: '_includes',
      output: '_site',
    },
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
  };
}

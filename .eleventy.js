export default function (eleventyConfig) {
  // ✅ Pass assets and CNAME through
  eleventyConfig.addPassthroughCopy('src/assets');
  eleventyConfig.addPassthroughCopy('src/CNAME', { errorOnMissing: false });

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

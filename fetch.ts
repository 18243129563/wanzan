import fs from 'fs';

async function fetchReadme() {
  const res = await fetch('https://raw.githubusercontent.com/whitecathu/spring-nest/master/README.md');
  const text = await res.text();
  fs.writeFileSync('github_readme.md', text);
}

fetchReadme();

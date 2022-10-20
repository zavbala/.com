import { writeFileSync } from 'fs';

const BLACKLIST = ['zavbala', 'dotfiles', '.com', 'sargabot'];

(async () => {
  const res = await fetch(' https://api.github.com/users/zavbala/repos', {
    method: 'GET',
    headers: new Headers({
      Accept: 'application/vnd.github+json',
    }),
  });

  const data = await res.json();
  const publicRepos = [];

  for (const project of data) {
    if (!BLACKLIST.includes(project.name)) {
      publicRepos.push({
        title: project.name,
        about: project.description,
        date: project.updated_at,
        ref: project.html_url,
        size: project.size,
      });
    }
  }

  writeFileSync(
    process.cwd() + '/data/Archive.json',
    JSON.stringify(publicRepos, null, ' ')
  );
})();

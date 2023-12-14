import client from 'google-play-scraper';

const apps = ['com.zavbala.loterya', 'com.zavbala.royaldek'];

export const GET = async () => {
  const data: any = [];

  for (const iterator of apps) {
    const app = await client.app({ appId: iterator });
    data.push(app);
  }

  const computed = data.map((app: any) => ({
    icon: app.icon,
    source: app.url,
    title: app.title,
    rating: app.scoreText,
    downloads: app.maxInstalls,
  }));

  //   const orderedByDownloads = computed.sort((a: any, b: any) =>

  return new Response(JSON.stringify(computed), {
    headers: { 'content-type': 'application/json; charset=UTF-8' },
  });
};

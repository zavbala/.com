import { resume } from "../content";

// `/resume` streams the static PDF from public/ but attaches a friendly
// download name, so `curl -OJ zavbala.com/resume` (or a browser) saves it as
// jeremy-zabala-resume.pdf instead of the bare "resume.pdf".
export async function GET(request: Request) {
  const file = await fetch(new URL(resume.path, request.url));

  if (!file.ok) {
    return new Response("resume not found", { status: 404 });
  }

  return new Response(file.body, {
    headers: {
      "content-type": "application/pdf",
      "content-disposition": `attachment; filename="${resume.filename}"`,
      "cache-control": "public, max-age=3600",
    },
  });
}

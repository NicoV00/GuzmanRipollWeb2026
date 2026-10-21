// Avisa a Bing (y demás buscadores con IndexNow: Yandex, Seznam, Naver) que hay URLs nuevas o
// actualizadas, para que las rastreen enseguida. Google NO usa IndexNow.
// Uso, después de un deploy a producción:  npm run indexnow
// La clave tiene que estar publicada en https://www.guzmanripoll.com/<KEY>.txt (vive en /public).
const KEY = "113b25e1ea0d63f19367323155b4a565"
const HOST = "www.guzmanripoll.com"

const sitemap = await fetch(`https://${HOST}/sitemap.xml`).then((r) => r.text())
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
if (!urlList.length) throw new Error("No se encontraron URLs en el sitemap publicado")

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
})
console.log(`IndexNow: ${res.status} ${res.statusText} — ${urlList.length} URLs enviadas`)
if (res.status >= 400) process.exit(1)

// Server-side proxy for the Apps Script feed.
// Keeps the script URL private and lets Vercel cache the response.
export default async function handler(req, res) {
    const url = process.env.MEMBER_MAP_URL;
    if (!url) {
        return res.status(500).json({ error: "MEMBER_MAP_URL is not set" });
    }

    try {
        const upstream = await fetch(url);
        if (!upstream.ok) throw new Error("Upstream " + upstream.status);
        const data = await upstream.json();
        if (data.error) throw new Error(data.error);

        res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");
        return res.status(200).json(data);
    } catch (err) {
        return res.status(502).json({ error: "Could not load member map data" });
    }
}

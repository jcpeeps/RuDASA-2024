import fs from 'fs';
import path from 'path'
import matter from 'gray-matter'

export default function handler(req, res) {
    let deny = false;
    const awards = req.body.files.map(filename => {
        if (filename.includes("../")) {
            deny = true;
            return {
                slug: null,
                frontmatter: null,
                content: null
            }
        }
        const slug = filename.replace('.md', '')
        const markdown = fs.readFileSync(path.join('markdown/articles/special-awards', filename), 'utf-8')

        const { data: frontmatter, content } = matter(markdown)

        return {
            slug,
            frontmatter,
            content
        }
    })
    if (deny || awards.length == 0) {
        res.status(404).json({message: "The requested awards do not exist"});
    }
    res.status(200).json({message: awards});
}
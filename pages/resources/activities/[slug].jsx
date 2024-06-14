import React from 'react'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'
import Layout from '../../../components/Layout'
import Statements from "../../../components/articles-page/Statements";
import Link from 'next/link'

export default function resourcePage({ frontmatter: { title }, content, pressStatements }) {
    return (
        <Layout pageTitle={`RuDASA | ${title}`}>
            <div className="my-5 py-5" />
            <section className="container px-5">
                <div className="w-100 border-bottom pb-4 mb-5">
                    <div role="button" className="hover-button btn btn-primary">
                        <Link href="/resources">
                            <span className='text-decoration-none text-white'>Go back</span>
                        </Link>
                    </div>
                </div>
                <div id="markdown">
                    <h1 className="fw-bold my-5">{title}</h1>
                    {title === "Press Statements" 
                        ? <Statements files={pressStatements.content} />
                        : <div className="mb-5 pb-5">
                              <div dangerouslySetInnerHTML={{ __html: marked(content) }} />
                          </div>
}
                </div>

            </section>
        </Layout>
    )
}

export async function getStaticPaths() {
    const files = fs.readdirSync(path.join('markdown/resources/resource/activities'))

    const paths = files.map(filename => ({
        params: {
            slug: filename.replace('.md', '')
        }
    }))

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params: { slug } }) {
    const markdown = fs.readFileSync(path.join('markdown/resources/resource/activities', slug + '.md'), 'utf-8')
    let statements = {};
    if (slug === "press-statements") {
        const files = fs.readdirSync(path.join("markdown/articles"));
        const data = files.map((filename) => {
          const isFile = fs
            .statSync(path.join("markdown/articles", filename))
            .isFile();
          const slug = filename.replace(".md", "");
          if (isFile || filename !== "press-statements") {
            return;
          }
          const dir = fs.readdirSync(
            path.join("markdown/articles", filename),
            "utf-8"
          );
          const files = dir.filter((nestedFile) => {
            return fs
              .statSync(path.join("markdown/articles", filename, nestedFile))
              .isFile();
          });
          return {
            slug,
            frontmatter: null,
            content: files,
          };
        });
        statements = data.find((file) => file?.slug === "press-statements");
    }
    const { data: frontmatter, content } = matter(markdown)
    return {
        props: {
            frontmatter,
            slug,
            content,
            pressStatements: statements
        }
    }
}
import React from "react";
import Layout from "../components/Layout";
import DoctorOfYear from "../components/articles-page/DoctorOfYear";
import Statements from "../components/articles-page/Statements";
import SpecialAwards from "../components/articles-page/SpecialAwards";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
export default function articles({ data }) {
  const specialAwards = data.find((file) => file.slug === "special-awards");
  specialAwards.content.sort().reverse();
  const pressStatements = data.find((file) => file.slug === "press-statements");
  pressStatements.content.sort().reverse();
  return (
    <Layout pageTitle="RuDASA | Articles">
      <DoctorOfYear
        markdown={data.find((file) => file.slug === "doctor-of-the-year")}
        prevRecipients={data.find(
          (file) => file.slug === "previous-recipients"
        )}
      />
      <SpecialAwards files={specialAwards.content} />
      {/* <Statements files={pressStatements.content} /> */}
    </Layout>
  );
}

export async function getStaticProps() {
  // Get files from the markdown sub-directory
  const files = fs.readdirSync(path.join("markdown/articles"));
  const data = files.map((filename) => {
    const isFile = fs
      .statSync(path.join("markdown/articles", filename))
      .isFile();
    const slug = filename.replace(".md", "");
    if (isFile) {
      const markdown = fs.readFileSync(
        path.join("markdown/articles", filename),
        "utf-8"
      );

      const { data: frontmatter, content } = matter(markdown);

      return {
        slug,
        frontmatter,
        content,
      };
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

  return {
    props: {
      data,
    },
  };
}

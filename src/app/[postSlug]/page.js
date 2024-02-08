import React from "react";

import BlogHero from "@/components/BlogHero";

import styles from "./postSlug.module.css";
import { loadBlogPost } from "@/helpers/file-helpers";
import { MDXRemote } from "next-mdx-remote/rsc";
import { BLOG_TITLE } from "@/constants";

export async function generateMetadata({ params }) {
  const blogMDX = await loadBlogPost(params.postSlug);
  console.log(blogMDX.frontmatter.abstract, "blogMDX.frontmatter.abstract");
  return {
    title: `${blogMDX.frontmatter.title} • ${BLOG_TITLE}`,
    description: blogMDX.frontmatter.abstract,
  };
}

async function BlogPost({ params }) {
  console.log(params.postSlug); // get the slug by the file name! [postSlug] = params.postSlug !!

  const blogMDX = await loadBlogPost(params.postSlug);
  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={blogMDX.frontmatter.title}
        publishedOn={blogMDX.frontmatter.publishedOn}
      />
      <div className={styles.page}>
        <MDXRemote source={blogMDX.content} />
      </div>
    </article>
  );
}

export default BlogPost;

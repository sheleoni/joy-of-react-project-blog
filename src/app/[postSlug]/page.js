import React from "react";

import BlogHero from "@/components/BlogHero";

import styles from "./postSlug.module.css";
import { loadBlogPost } from "@/helpers/file-helpers";
import { MDXRemote } from "next-mdx-remote/rsc";
import { BLOG_TITLE } from "@/constants";

const cachedLoadBlogPost = React.cache(loadBlogPost);

export async function generateMetadata({ params }) {
  const blogMDX = await loadBlogPost(params.postSlug);
  return {
    title: `${blogMDX.frontmatter.title} • ${BLOG_TITLE}`,
    description: blogMDX.frontmatter.abstract,
  };
}

async function BlogPost({ params }) {

  const blogMDX = await cachedLoadBlogPost(params.postSlug);
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

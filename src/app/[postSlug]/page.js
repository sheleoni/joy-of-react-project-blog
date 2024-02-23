import React from "react";

import BlogHero from "@/components/BlogHero";

import styles from "./postSlug.module.css";
import { loadBlogPost } from "@/helpers/file-helpers";
import { MDXRemote } from "next-mdx-remote/rsc";
import { BLOG_TITLE } from "@/constants";
import { Code } from "bright";
import dynamic from "next/dynamic";
import Spinner from "@/components/Spinner";

const DivisionGroupsDemo = dynamic(
  () => import("@/components/DivisionGroupsDemo"),
  { loading: Spinner }
);

const CircularColorsDemo = dynamic(
  () => import("@/components/CircularColorsDemo"),
  { loading: Spinner }
);

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
        {/*  todo: lazy load DivisionGroupsDemo component */}
        <MDXRemote
          source={blogMDX.content}
          components={{
            pre: Code,
            DivisionGroupsDemo,
            CircularColorsDemo,
          }}
        />
      </div>
    </article>
  );
}

export default BlogPost;

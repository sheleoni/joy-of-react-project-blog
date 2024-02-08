import React from "react";

import BlogSummaryCard from "@/components/BlogSummaryCard";

import styles from "./homepage.module.css";
import { getBlogPostList } from "@/helpers/file-helpers";
import { BLOG_TITLE } from "@/constants";

export const metadata = {
  title: BLOG_TITLE,
  description: "A wonderful blog about JavaScript",
};

async function Home() {
  const blogPosts = await getBlogPostList();
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.mainHeading}>Latest Content:</h1>

      {blogPosts.map((blogPost) => {
        return (
          <React.Fragment key={blogPost.publishedOn}>
            <BlogSummaryCard
              slug={blogPost.slug}
              title={blogPost.title}
              abstract={blogPost.abstract}
              publishedOn={blogPost.publishedOn}
            />
          </React.Fragment>
        );
      })}
      {/* TODO: Iterate over the data read from the file system! */}
      <BlogSummaryCard
        slug="example"
        title="Hello world!"
        abstract="This is a placeholder, an example which shows how the “BlogSummaryCard” component should be used. You'll want to swap this out based on the data from the various MDX files!"
        publishedOn={new Date()}
      />
    </div>
  );
}

export default Home;

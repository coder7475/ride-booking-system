import { blogPosts } from "@/constants/blogs";

export const Blogs = () => {
  return (
    <div className="dark:bg-background flex min-h-screen items-center justify-center bg-gray-50 px-4 py-20">
      <div className="dark:bg-accent w-full max-w-3xl rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-3xl font-bold">RideBook Blog</h1>
        <p className="text-muted-foreground mb-8 text-center text-sm">
          Insights, updates, and tips from the RideBook team.
        </p>

        <div className="space-y-5">
          {blogPosts.map((post, index) => (
            <article
              key={index}
              className="hover:bg-muted/40 rounded-md border p-5 transition-colors"
            >
              <div className="mb-1 text-xs text-gray-500 dark:text-gray-400">
                {post.date}
              </div>
              <h2 className="mb-2 text-lg font-semibold">{post.title}</h2>
              <p className="text-muted-foreground mb-3 text-sm">
                {post.excerpt}
              </p>
              <a href="#" className="text-primary text-sm underline">
                Read more
              </a>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

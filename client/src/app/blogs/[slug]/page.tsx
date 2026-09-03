import NotFound from "@/app/not-found";
import axiosInstance from "@/services/axios";

import { BlogReadOnly } from "@/components/blogs/BlogReadOnly";

type Blog = {
  _id: string;
  title: string;
  slug: string;
  content: string;
  bannerUrl: string;
  createdAt: string;
  updatedAt: string;
};

const BlogPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  try {
    const { slug } = await params;

    const { data } = await axiosInstance.get(`/blogs/${slug}`);

    const blog: Blog = data.blog;

    const date = new Date(blog.createdAt).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    return (
      <main className="min-h-screen w-full overflow-x-hidden">
        {/* Header */}
        <section className="mx-auto w-full max-w-6xl px-6 pt-16 md:px-10 md:pt-24">
          <div className="mb-8 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-slate-500">
            <span>MASC</span>
            <span>/</span>
            <span>Blog</span>
          </div>

          <h1 className="max-w-5xl text-5xl font-medium leading-[0.95] tracking-tight">{blog.title}</h1>

          <div className="mt-8 flex items-center gap-4 text-xs uppercase tracking-[0.2em] text-slate-500">
            <span>{date}</span>

            <span className="h-1 w-1 rounded-full bg-black" />

            <span>Article</span>
          </div>
        </section>

        {/* Banner */}
        <section className="mx-auto mt-14 w-full max-w-6xl px-6 md:px-10">
          <div className="overflow-hidden border border-black">
            <img src={blog.bannerUrl} alt={blog.title} className="aspect-[16/8] w-full object-cover" />
          </div>
        </section>

        {/* Content */}
        <section className="mx-auto w-full max-w-6xl px-6 py-16 md:px-10 md:py-24">
          <BlogReadOnly value={blog.content} />
        </section>

        {/* Footer metadata */}
        <section className="mx-auto w-full max-w-6xl border-t-2 border-black px-6 py-8 md:px-10">
          <div className="flex justify-between text-[10px] uppercase tracking-[0.25em] text-slate-500">
            <span>MASC / BLOG</span>
            <span>{blog.slug}</span>
          </div>
        </section>
      </main>
    );
  } catch (error) {
    console.error("Failed to fetch blog:", error);

    return <NotFound />;
  }
};

export default BlogPage;

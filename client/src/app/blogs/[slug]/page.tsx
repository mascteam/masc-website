"use server";

import NotFound from "@/app/not-found";
import axiosInstance from "@/services/axios";

const BlogPage = async ({params} : {params : Promise<{slug : string}>}) => {
  try {

    const {slug} = await params;
    const {data} = await axiosInstance(`/blogs/${slug}`)
  } catch (error) {
    return <NotFound/>;
  }
};

export default BlogPage;

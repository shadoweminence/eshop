"use client";

import { useParams } from "next/navigation";
import React from "react";

const Post = () => {
  const { slug } = useParams();
  const decodedSlug = decodeURIComponent(slug);

  return <div className="text-white">The slug is : {decodedSlug}</div>;
};

export default Post;

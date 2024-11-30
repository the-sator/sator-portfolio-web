import { getPortfolioBySlug } from "@/data/portfolio";
import React from "react";
import { DynamicRenderContent } from "@/components/editor/render-content";
type Props = {
  params: Promise<{ slug: string }>;
};
export default async function page({ params }: Props) {
  const slug = (await params).slug;
  const { data, error } = await getPortfolioBySlug(slug);
  console.log("data:", data);

  // const editor = ServerBlockNoteEditor.create();
  // const html = await editor.blocksToFullHTML(data?.content || []);
  return (
    <div className="p-4">
      <h1 className="mb-10 text-4xl">{data?.title}</h1>
      {/* <article dangerouslySetInnerHTML={{ __html: html }} /> */}
      <DynamicRenderContent content={data?.content || []} />
    </div>
  );
}

import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import slugify from "slugify";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { title, abstract, keywords, doi, articleType, issueId, pageStart, pageEnd, publishedAt, pdfUrl } = data;

    if (!title) {
      return new NextResponse("Title is required", { status: 400 });
    }

    const slug = slugify(title, { lower: true, strict: true });

    const article = await prisma.article.create({
      data: {
        title,
        slug,
        abstract,
        keywords: Array.isArray(keywords) ? keywords : [],
        doi,
        articleType,
        issueId,
        pageStart: pageStart ? parseInt(pageStart) : null,
        pageEnd: pageEnd ? parseInt(pageEnd) : null,
        publishedAt: publishedAt ? new Date(publishedAt) : null,
        pdfUrl,
      },
    });

    return NextResponse.json(article);
  } catch (error) {
    console.error("Error creating article:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

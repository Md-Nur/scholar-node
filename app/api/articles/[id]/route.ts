import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import slugify from "slugify";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const data = await request.json();
    const { title, abstract, keywords, doi, articleType, issueId, pageStart, pageEnd, publishedAt, pdfUrl } = data;

    const updateData: any = {
      title,
      abstract,
      keywords: Array.isArray(keywords) ? keywords : [],
      doi,
      articleType,
      issueId,
      pageStart: pageStart ? parseInt(pageStart) : null,
      pageEnd: pageEnd ? parseInt(pageEnd) : null,
      publishedAt: publishedAt ? new Date(publishedAt) : null,
      pdfUrl,
    };

    if (title) {
      updateData.slug = slugify(title, { lower: true, strict: true });
    }

    const article = await prisma.article.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(article);
  } catch (error) {
    console.error("Error updating article:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    await prisma.article.delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting article:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

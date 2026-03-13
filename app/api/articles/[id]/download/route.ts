import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const article = await prisma.article.findUnique({
      where: { id },
    });

    if (!article) {
      return new NextResponse("Article not found", { status: 404 });
    }

    // Increment download count
    await prisma.article.update({
      where: { id },
      data: { downloadCount: { increment: 1 } },
    });

    // Determine the PDF URL to redirect to
    // If the article has a pdfUrl, use it. Otherwise, use the fallback dummy PDF.
    const redirectUrl = article.pdfUrl || "/dummy.pdf";

    return NextResponse.redirect(new URL(redirectUrl, request.url));
  } catch (error) {
    console.error("Error downloading PDF:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

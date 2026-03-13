import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL! });
const adapter = new PrismaPg(pool as any);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding missing pages...");

  const missingPagesData = [
    {
      slug: "reviewers",
      title: "Information for Reviewers",
      content: `<h2>Information for Reviewers</h2>
<p>AJESS relies on the expertise of its reviewers to maintain the high quality of published research. We appreciate the time and effort dedicated by reviewers to evaluate manuscripts.</p>

<h3>Role of the Reviewer</h3>
<ul>
<li>Provide objective, constructive feedback on the manuscript's scientific merit</li>
<li>Identify strengths and weaknesses of the methodology, analysis, and conclusions</li>
<li>Maintain strict confidentiality regarding the manuscript and its contents</li>
<li>Report any potential conflicts of interest to the handling editor</li>
<li>Complete reviews within the requested timeframe (typically 2-3 weeks)</li>
</ul>

<h3>Review Process</h3>
<p>AJESS employs a double-blind peer review process. Reviewers will evaluate the manuscript based on:</p>
<ol>
<li><strong>Originality and Significance:</strong> Does the study contribute new knowledge to the field?</li>
<li><strong>Methodology:</strong> Are the methods appropriate, rigorous, and clearly described?</li>
<li><strong>Analysis and Results:</strong> Is the data analysis sound and are the results clearly presented?</li>
<li><strong>Discussion and Conclusions:</strong> Are the conclusions supported by the data and appropriately contextualized?</li>
<li><strong>Clarity and Structure:</strong> Is the manuscript well-written, organized, and easy to follow?</li>
</ol>

<h3>Reviewer Recognition</h3>
<p>We value our reviewers' contributions. Reviewers receive:</p>
<ul>
<li>A certificate of recognition for each completed review</li>
<li>Acknowledgment in the annual list of reviewers published on our website</li>
<li>Consideration for future Editorial Board appointments</li>
</ul>`,
    },
    {
      slug: "editors",
      title: "Information for Editors",
      content: `<h2>Information for Editors</h2>
<p>The Editorial Board of AJESS plays a crucial role in shaping the journal's direction and ensuring the publication of high-quality research.</p>

<h3>Role of the Editor</h3>
<ul>
<li>Oversee the peer review process for assigned manuscripts</li>
<li>Select appropriate independent reviewers with relevant expertise</li>
<li>Evaluate reviewer reports and make final publication decisions (Accept, Minor Revision, Major Revision, Reject)</li>
<li>Ensure the scientific integrity and ethical standards of published articles</li>
<li>Promote the journal within the academic community and encourage high-quality submissions</li>
</ul>

<h3>Editorial Guidelines</h3>
<p>Editors are expected to:</p>
<ol>
<li><strong>Maintain Objectivity:</strong> Decisions should be based solely on the manuscript's scientific merit, originality, clarity, and relevance to the journal's scope.</li>
<li><strong>Ensure Timeliness:</strong> Aim to complete the initial assessment and assigned reviews within the established timeframes to provide authors with prompt feedback.</li>
<li><strong>Uphold Confidentiality:</strong> Keep all information regarding submitted manuscripts confidential until publication.</li>
<li><strong>Manage Conflicts of Interest:</strong> Recuse oneself from handling manuscripts where a conflict of interest exists (e.g., recent collaboration with authors, institutional affiliation).</li>
</ol>

<h3>Joining the Editorial Board</h3>
<p>We welcome expressions of interest from experienced researchers who wish to join our Editorial Board. Interested candidates should submit their CV and a brief statement of interest to <strong>editor@scholarnode.com</strong>.</p>`,
    },
  ];

  for (const p of missingPagesData) {
    const existing = await prisma.page.findUnique({ where: { slug: p.slug } });
    if (!existing) {
      await prisma.page.create({ data: p });
      console.log(`✅ Page '${p.slug}' created`);
    } else {
      console.log(`ℹ️ Page '${p.slug}' already exists`);
    }
  }

  console.log("🎉 Seeding complete!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
    process.exit(0);
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

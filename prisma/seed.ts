import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL! });
const adapter = new PrismaPg(pool as any);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  // Clear existing data
  await prisma.articleAuthor.deleteMany();
  await prisma.article.deleteMany();
  await prisma.issue.deleteMany();
  await prisma.volume.deleteMany();
  await prisma.author.deleteMany();
  await prisma.editor.deleteMany();
  await prisma.indexing.deleteMany();
  await prisma.announcement.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.page.deleteMany();
  await prisma.journalSetting.deleteMany();
  await prisma.user.deleteMany();

  // ─── Admin User ───────────────────────────────────────
  const adminPassword = await bcrypt.hash("admin123", 12);
  await prisma.user.create({
    data: {
      email: "admin@scholarnode.com",
      password: adminPassword,
      name: "Admin",
      role: "admin",
    },
  });
  console.log("✅ Admin user created (admin@scholarnode.com / admin123)");

  // ─── Journal Settings ───────────────────────────────────
  const settings = [
    { key: "journal_title", value: "Scholar Node" },
    { key: "journal_abbreviation", value: "SN" },
    { key: "issn", value: "2581-6268" },
    { key: "journal_description", value: "Asian Journal of Education and Social Studies (ISSN: 2581-6268) aims to publish high quality papers in all areas of Education and Social sciences. By not excluding papers based on novelty, this journal facilitates the research and wishes to publish papers as long as they are technically correct and scientifically motivated. The journal also encourages the submission of useful reports of negative results. This is a quality controlled, OPEN peer-reviewed, open-access INTERNATIONAL journal." },
    { key: "journal_email", value: "editor@scholarnode.com" },
    { key: "publisher", value: "Scholar Node Publishing" },
    { key: "frequency", value: "Monthly" },
    { key: "language", value: "English" },
    { key: "country", value: "International" },
    { key: "subject", value: "Education, Social Sciences" },
    { key: "started_year", value: "2019" },
    { key: "review_type", value: "Double-blind peer review" },
    { key: "apc_amount", value: "500" },
    { key: "apc_currency", value: "USD" },
  ];

  for (const s of settings) {
    await prisma.journalSetting.create({ data: s });
  }
  console.log("✅ Journal settings created");

  // ─── Volumes & Issues ─────────────────────────────────
  const volumeData = [
    { number: 50, year: 2025, issues: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
    { number: 51, year: 2025, issues: [1, 2, 3, 4, 5, 6] },
    { number: 52, year: 2026, issues: [1, 2] },
  ];

  const issueMap: Record<string, string> = {};

  for (const v of volumeData) {
    const volume = await prisma.volume.create({
      data: { number: v.number, year: v.year },
    });
    for (const issueNum of v.issues) {
      const issue = await prisma.issue.create({
        data: {
          number: issueNum,
          volumeId: volume.id,
          isCurrent: v.number === 52 && issueNum === 2,
        },
      });
      issueMap[`${v.number}-${issueNum}`] = issue.id;
    }
  }
  console.log("✅ Volumes and issues created");

  // ─── Authors ─────────────────────────────────────────
  const authorsData = [
    { name: "Yan Liang", affiliation: "Department of Mathematics, Beijing Normal University, China" },
    { name: "Mohamed A. El-Sayed", affiliation: "Faculty of Education, Alexandria University, Egypt" },
    { name: "Priya Sharma", affiliation: "Department of Social Sciences, University of Delhi, India" },
    { name: "James Wilson", affiliation: "College of Education, University of Queensland, Australia" },
    { name: "Fatima Al-Rashid", affiliation: "Department of Psychology, King Saud University, Saudi Arabia" },
    { name: "Kenji Tanaka", affiliation: "Graduate School of Education, University of Tokyo, Japan" },
    { name: "Sarah Johnson", affiliation: "Faculty of Social Work, University of Toronto, Canada" },
    { name: "Ahmed Hassan", affiliation: "Department of Sociology, Cairo University, Egypt" },
    { name: "Li Wei", affiliation: "School of Education, Peking University, China" },
    { name: "Maria Santos", affiliation: "Department of Education, University of Philippines, Philippines" },
    { name: "Raj Kumar", affiliation: "Department of Political Science, Jawaharlal Nehru University, India" },
    { name: "Anna Petrov", affiliation: "Faculty of Psychology, Moscow State University, Russia" },
    { name: "David Chen", affiliation: "Department of Curriculum and Instruction, National Taiwan University, Taiwan" },
    { name: "Aisha Mohammed", affiliation: "College of Education, University of Nairobi, Kenya" },
    { name: "Thomas Brown", affiliation: "Department of Educational Psychology, University of Cambridge, UK" },
    { name: "Yuki Sato", affiliation: "Department of Sociology, Kyoto University, Japan" },
    { name: "Elena Rodriguez", affiliation: "Faculty of Education, National Autonomous University of Mexico, Mexico" },
    { name: "Park Min-jun", affiliation: "Department of Education, Seoul National University, South Korea" },
    { name: "Robert Taylor", affiliation: "School of Social Science, University of Melbourne, Australia" },
    { name: "Nadia Osman", affiliation: "Department of Gender Studies, University of Khartoum, Sudan" },
  ];

  const authors: Record<string, string> = {};
  for (const a of authorsData) {
    const author = await prisma.author.create({ data: a });
    authors[a.name] = author.id;
  }
  console.log("✅ Authors created");

  // ─── Articles ────────────────────────────────────────
  const articlesData = [
    {
      title: "Fostering Higher-order Thinking in Advanced Mathematics: A Problem-driven Approach Using Knowledge Graphs",
      slug: "fostering-higher-order-thinking-mathematics-knowledge-graphs",
      abstract: "This study explores the integration of knowledge graphs as pedagogical tools in advanced mathematics courses at the university level. Through a quasi-experimental design involving 247 undergraduate students across two academic terms, we investigated whether a problem-driven approach complemented by knowledge graph construction improves higher-order thinking skills. Results indicate statistically significant improvements in analysis (d = 0.82), evaluation (d = 0.67), and creation (d = 0.74) dimensions of Bloom's taxonomy. Students in the intervention group demonstrated superior performance in complex problem-solving tasks and showed greater ability to draw connections across mathematical concepts. Qualitative analysis of student reflections and knowledge graphs revealed deeper conceptual understanding and enhanced metacognitive awareness. These findings suggest that knowledge graph-supported instruction offers a promising framework for developing mathematical thinking beyond procedural fluency.",
      keywords: ["higher-order thinking", "knowledge graphs", "mathematics education", "problem-driven learning", "Bloom's taxonomy"],
      articleType: "Short Research Article",
      doi: "10.9734/ajess/2026/v52i2876",
      pageStart: 1,
      pageEnd: 12,
      issueKey: "52-2",
      authorNames: ["Yan Liang"],
      publishedAt: "2026-02-15",
    },
    {
      title: "Impact of Social Media Usage on Academic Performance Among Secondary School Students in Egypt",
      slug: "social-media-impact-academic-performance-egypt",
      abstract: "This cross-sectional study examined the relationship between social media usage patterns and academic performance among 1,532 secondary school students in Cairo, Egypt. Using a validated questionnaire and academic records, the study found a significant negative correlation between excessive social media use (>4 hours daily) and GPA scores (r = -0.43, p < 0.001). However, moderate use (1-2 hours) for educational purposes was positively correlated with academic achievement (r = 0.31, p < 0.01). Multiple regression analysis identified time management skills and self-regulation as key mediating factors. The study recommends digital literacy programs in schools and provides evidence-based guidelines for healthy social media usage among adolescents.",
      keywords: ["social media", "academic performance", "secondary education", "digital literacy", "Egypt"],
      articleType: "Original Research Article",
      doi: "10.9734/ajess/2026/v52i2877",
      pageStart: 13,
      pageEnd: 28,
      issueKey: "52-2",
      authorNames: ["Mohamed A. El-Sayed", "Ahmed Hassan"],
      publishedAt: "2026-02-14",
    },
    {
      title: "Gender Disparities in STEM Education: A Longitudinal Study of Enrollment Trends in South Asian Universities",
      slug: "gender-disparities-stem-education-south-asia",
      abstract: "This longitudinal study analyzed enrollment trends in STEM disciplines across 45 universities in India, Bangladesh, Pakistan, and Sri Lanka over a 15-year period (2010-2025). Data from institutional records covering 2.3 million student enrollments revealed persistent gender disparities, with female representation averaging 34% across STEM fields. However, significant progress was observed in biological sciences (48%) and mathematics (42%), while engineering (22%) and computer science (28%) remained underrepresented. Policy interventions including scholarship programs, mentorship initiatives, and awareness campaigns were associated with increased female enrollment in targeted institutions. The study provides actionable recommendations for university administrators and policymakers to address systemic barriers to gender parity in STEM education.",
      keywords: ["gender disparity", "STEM education", "South Asia", "enrollment trends", "higher education"],
      articleType: "Original Research Article",
      doi: "10.9734/ajess/2026/v52i2878",
      pageStart: 29,
      pageEnd: 47,
      issueKey: "52-2",
      authorNames: ["Priya Sharma", "Raj Kumar"],
      publishedAt: "2026-02-12",
    },
    {
      title: "The Role of Emotional Intelligence in Teacher Effectiveness: Evidence from Australian Primary Schools",
      slug: "emotional-intelligence-teacher-effectiveness-australia",
      abstract: "This mixed-methods study investigated the relationship between teachers' emotional intelligence (EI) and their effectiveness in primary school classrooms across three Australian states. A sample of 186 teachers completed the Trait Emotional Intelligence Questionnaire (TEIQue), while their effectiveness was assessed through classroom observations, student achievement data, and administrator evaluations. Results revealed that teachers with higher EI scores demonstrated superior classroom management, stronger student-teacher relationships, and more adaptive instructional strategies. Path analysis showed that EI influenced student outcomes both directly and indirectly through teacher self-efficacy and job satisfaction. The study advocates for the integration of emotional intelligence training in pre-service and in-service teacher education programs.",
      keywords: ["emotional intelligence", "teacher effectiveness", "primary education", "classroom management", "Australia"],
      articleType: "Original Research Article",
      doi: "10.9734/ajess/2026/v52i2879",
      pageStart: 48,
      pageEnd: 63,
      issueKey: "52-2",
      authorNames: ["James Wilson", "Robert Taylor"],
      publishedAt: "2026-02-10",
    },
    {
      title: "Cultural Factors Influencing Parental Involvement in Children's Education: A Cross-cultural Comparison",
      slug: "cultural-factors-parental-involvement-education",
      abstract: "This comparative study examined cultural factors that shape parental involvement in children's education across four countries: Japan, Saudi Arabia, Kenya, and Canada. Through semi-structured interviews with 120 parents and 60 teachers, complemented by survey data from 1,800 families, the study identified distinct patterns of parental engagement shaped by cultural values, socioeconomic conditions, and educational system structures. Japanese parents emphasized after-school academic support, Saudi parents prioritized religious and moral education, Kenyan parents focused on economic investment in schooling, and Canadian parents pursued holistic child development. Despite these differences, universal themes emerged around parental aspirations for children's success and concerns about educational quality. The findings highlight the importance of culturally responsive family engagement strategies.",
      keywords: ["parental involvement", "cultural factors", "cross-cultural comparison", "family engagement", "education"],
      articleType: "Review Article",
      doi: "10.9734/ajess/2026/v52i1870",
      pageStart: 1,
      pageEnd: 19,
      issueKey: "52-1",
      authorNames: ["Fatima Al-Rashid", "Kenji Tanaka", "Sarah Johnson", "Aisha Mohammed"],
      publishedAt: "2026-01-20",
    },
    {
      title: "Digital Divide and Online Learning Outcomes During Post-pandemic Education Recovery",
      slug: "digital-divide-online-learning-post-pandemic",
      abstract: "This study assessed the impact of the digital divide on online learning outcomes during the post-pandemic education recovery period across Southeast Asian nations. Survey data from 3,456 students and 892 teachers in Indonesia, Philippines, Thailand, and Vietnam revealed that access to reliable internet and digital devices remained significant predictors of academic success in blended learning environments. Students from rural areas scored 23% lower on standardized assessments compared to urban counterparts. The study identified several mitigating strategies including community learning centers, mobile-first educational platforms, and teacher digital literacy training that showed positive effects on reducing the achievement gap.",
      keywords: ["digital divide", "online learning", "post-pandemic", "educational equity", "Southeast Asia"],
      articleType: "Original Research Article",
      doi: "10.9734/ajess/2026/v52i1871",
      pageStart: 20,
      pageEnd: 38,
      issueKey: "52-1",
      authorNames: ["Maria Santos", "Li Wei"],
      publishedAt: "2026-01-18",
    },
    {
      title: "Mindfulness-Based Interventions in University Settings: A Systematic Review of Mental Health Outcomes",
      slug: "mindfulness-interventions-university-mental-health",
      abstract: "This systematic review synthesized evidence from 67 randomized controlled trials examining the effectiveness of mindfulness-based interventions (MBIs) on university students' mental health outcomes. Studies published between 2015 and 2025 were identified through comprehensive database searches. Meta-analysis revealed significant positive effects of MBIs on reducing anxiety (SMD = -0.56, 95% CI [-0.71, -0.41]), depression (SMD = -0.48, 95% CI [-0.62, -0.34]), and perceived stress (SMD = -0.52, 95% CI [-0.65, -0.39]). Improvements in well-being, sleep quality, and academic self-efficacy were also observed. Program characteristics associated with larger effects included longer duration, in-person delivery, and integration with counseling services. The review provides evidence-based recommendations for implementing MBIs in higher education institutions.",
      keywords: ["mindfulness", "mental health", "university students", "systematic review", "well-being"],
      articleType: "Review Article",
      doi: "10.9734/ajess/2025/v51i6850",
      pageStart: 1,
      pageEnd: 22,
      issueKey: "51-6",
      authorNames: ["Anna Petrov", "Thomas Brown"],
      publishedAt: "2025-12-15",
    },
    {
      title: "Gamification in Language Learning: Effectiveness of Mobile Applications for ESL Students",
      slug: "gamification-language-learning-mobile-esl",
      abstract: "This experimental study evaluated the effectiveness of gamified mobile applications in improving English as a Second Language (ESL) proficiency among 380 university students in Taiwan and South Korea. Participants were randomly assigned to a gamified learning group, a traditional mobile app group, and a control group over a 16-week intervention period. Pre- and post-test results using the TOEFL iBT showed significantly greater improvements in the gamified group for vocabulary acquisition (d = 0.91), reading comprehension (d = 0.64), and listening skills (d = 0.72). Engagement metrics showed 78% higher daily usage rates in the gamified group. Qualitative data revealed that competition elements, progress visualization, and social features were key motivational drivers.",
      keywords: ["gamification", "language learning", "ESL", "mobile applications", "educational technology"],
      articleType: "Original Research Article",
      doi: "10.9734/ajess/2025/v51i6851",
      pageStart: 23,
      pageEnd: 40,
      issueKey: "51-6",
      authorNames: ["David Chen", "Park Min-jun"],
      publishedAt: "2025-12-10",
    },
    {
      title: "Inclusive Education Policies and Practices: Challenges and Opportunities in Sub-Saharan Africa",
      slug: "inclusive-education-policies-sub-saharan-africa",
      abstract: "This mixed-methods study examined the implementation of inclusive education policies across six Sub-Saharan African countries. Through policy document analysis, school visits to 120 institutions, and interviews with 240 stakeholders, the research identified significant gaps between policy intentions and classroom realities. Key challenges included inadequate teacher training (only 12% of teachers received specialized training), resource limitations, cultural barriers, and large class sizes averaging 65 students. However, several success stories were documented, including community-based rehabilitation programs and peer support systems. The study proposes a contextually appropriate implementation framework that accounts for local resources, cultural values, and capacity constraints.",
      keywords: ["inclusive education", "special needs", "Sub-Saharan Africa", "education policy", "disability"],
      articleType: "Original Research Article",
      doi: "10.9734/ajess/2025/v51i5840",
      pageStart: 1,
      pageEnd: 18,
      issueKey: "51-5",
      authorNames: ["Aisha Mohammed", "Nadia Osman"],
      publishedAt: "2025-11-20",
    },
    {
      title: "Socioeconomic Status and Educational Aspirations: A Multi-level Analysis of Youth in Developing Countries",
      slug: "socioeconomic-status-educational-aspirations-developing-countries",
      abstract: "This multi-level analysis examined the relationship between socioeconomic status (SES) and educational aspirations among 12,456 youth aged 15-18 across 23 developing countries using data from the World Values Survey and national education statistics. Hierarchical linear modeling revealed that while individual SES was a strong predictor of educational aspirations (β = 0.42), country-level factors including public education expenditure, gender equality indices, and urbanization rates significantly moderated this relationship. In countries with higher education spending, the SES-aspiration gap was reduced by 35%. The study highlights the importance of structural interventions and provides policy recommendations for enhancing educational aspirations among disadvantaged youth.",
      keywords: ["socioeconomic status", "educational aspirations", "developing countries", "multi-level analysis", "youth"],
      articleType: "Original Research Article",
      doi: "10.9734/ajess/2025/v51i4830",
      pageStart: 45,
      pageEnd: 62,
      issueKey: "51-4",
      authorNames: ["Elena Rodriguez", "Priya Sharma", "Ahmed Hassan"],
      publishedAt: "2025-10-15",
    },
  ];

  for (const a of articlesData) {
    const article = await prisma.article.create({
      data: {
        title: a.title,
        slug: a.slug,
        abstract: a.abstract,
        keywords: a.keywords,
        articleType: a.articleType,
        doi: a.doi,
        pageStart: a.pageStart,
        pageEnd: a.pageEnd,
        publishedAt: new Date(a.publishedAt),
        receivedAt: new Date(new Date(a.publishedAt).getTime() - 60 * 24 * 60 * 60 * 1000),
        acceptedAt: new Date(new Date(a.publishedAt).getTime() - 14 * 24 * 60 * 60 * 1000),
        issueId: issueMap[a.issueKey],
        references: [],
      },
    });

    for (let i = 0; i < a.authorNames.length; i++) {
      await prisma.articleAuthor.create({
        data: {
          articleId: article.id,
          authorId: authors[a.authorNames[i]],
          order: i,
        },
      });
    }
  }
  console.log("✅ Articles created with author associations");

  // ─── Editors ──────────────────────────────────────────
  const editorsData = [
    { name: "Prof. Dr. Richard Thompson", title: "Ph.D.", affiliation: "Department of Education Policy, Stanford University, USA", role: "Chief Editor", order: 0 },
    { name: "Prof. Dr. Ayumi Nagashima", title: "Ph.D.", affiliation: "Graduate School of Education, University of Tokyo, Japan", role: "Academic Editor", order: 1 },
    { name: "Dr. Amara Okafor", title: "Ph.D.", affiliation: "Faculty of Social Sciences, University of Lagos, Nigeria", role: "Academic Editor", order: 2 },
    { name: "Prof. Dr. Hans Mueller", title: "Ph.D.", affiliation: "Department of Psychology, Ludwig Maximilian University of Munich, Germany", role: "Academic Editor", order: 3 },
    { name: "Dr. Sunita Patel", title: "Ph.D.", affiliation: "Department of Sociology, University of Mumbai, India", role: "Academic Editor", order: 4 },
    { name: "Prof. Dr. Carlos Mendez", title: "Ph.D.", affiliation: "Faculty of Education, University of Buenos Aires, Argentina", role: "Academic Editor", order: 5 },
  ];

  for (const e of editorsData) {
    await prisma.editor.create({ data: e });
  }
  console.log("✅ Editors created");

  // ─── Indexing ─────────────────────────────────────────
  const indexingData = [
    { name: "Index Copernicus (ICV: 95.55)", url: "https://journals.indexcopernicus.com/search/details?id=50352", order: 0 },
    { name: "CNKI (China)", url: "https://scholar.cnki.net/", order: 1 },
    { name: "Publons", url: "https://publons.com/", order: 2 },
    { name: "scite Index (2021)", url: "https://scite.ai/", order: 3 },
    { name: "Scilit", url: "https://www.scilit.net/", order: 4 },
    { name: "SHERPA/RoMEO (UK)", url: "https://v2.sherpa.ac.uk/romeo/", order: 5 },
    { name: "Crossref", url: "https://www.crossref.org", order: 6 },
    { name: "Google Scholar", url: "https://scholar.google.com", order: 7 },
    { name: "Journalseek", url: "http://journalseek.net/", order: 8 },
    { name: "WorldCat", url: "https://www.worldcat.org/", order: 9 },
    { name: "ResearchGate", url: "https://www.researchgate.net/", order: 10 },
    { name: "OpenAlex", url: "https://openalex.org/", order: 11 },
    { name: "Semantic Scholar", url: "https://www.semanticscholar.org", order: 12 },
    { name: "Exaly", url: "https://exaly.com/", order: 13 },
    { name: "RefSEEK", url: "https://www.refseek.com/", order: 14 },
    { name: "WorldWideScience", url: "https://worldwidescience.org/", order: 15 },
    { name: "Bielefeld Academic Search (BASE)", url: "https://www.base-search.net", order: 16 },
    { name: "AGRIS", url: "https://agris.fao.org/", order: 17 },
    { name: "HINARI", url: "https://www.who.int/hinari/en/", order: 18 },
    { name: "Analytical sciences digital library", url: "https://asdlib.org/", order: 19 },
    { name: "CiteSeerX", url: "https://citeseerx.ist.psu.edu/", order: 20 },
    { name: "INSPIRE-HEP", url: "https://inspirehep.net/", order: 21 },
    { name: "Mendeley", url: "https://www.mendeley.com/", order: 22 },
    { name: "OAIster", url: "https://www.oclc.org/en/oaister.html", order: 23 },
    { name: "OpenSIGLE", url: "http://www.opengrey.eu/", order: 24 },
    { name: "Paperity", url: "https://paperity.org/", order: 25 },
    { name: "SSRN", url: "https://www.ssrn.com/", order: 26 },
    { name: "CORE", url: "https://core.ac.uk/", order: 27 },
    { name: "Baidu Scholar", url: "https://xueshu.baidu.com/", order: 28 },
    { name: "Sparrho", url: "https://www.sparrho.com/", order: 29 },
    { name: "ACADEMIA", url: "https://www.academia.edu/", order: 30 },
    { name: "DOAJ", url: "https://doaj.org", order: 31 },
  ];

  for (const i of indexingData) {
    await prisma.indexing.create({ data: i });
  }
  console.log("✅ Indexing services created");

  // ─── Announcements ────────────────────────────────────
  const announcementsData = [
    {
      title: "Call for Papers: Special Issue on AI in Education",
      content: "We are pleased to announce a special issue on 'Artificial Intelligence in Education: Opportunities and Challenges'. We invite researchers to submit original research articles, review papers, and case studies. Deadline: April 30, 2026. Topics include: Adaptive learning systems, AI-powered assessment, Intelligent tutoring systems, Ethics of AI in education, and more.",
      isActive: true,
    },
    {
      title: "Journal Impact Factor Update 2025",
      content: "We are delighted to announce that AJESS has received an updated impact factor of 3.42 for 2025. This achievement reflects the high quality of research published in our journal and the dedication of our authors, reviewers, and editorial team. Thank you for your continued support.",
      isActive: true,
    },
    {
      title: "New Submission Portal Launch",
      content: "We have launched our new online submission portal to make the manuscript submission process more efficient. Authors can now track their submission status in real-time, communicate with editors, and receive instant notifications. Please visit the Submission page for more details.",
      isActive: true,
    },
  ];

  for (const a of announcementsData) {
    await prisma.announcement.create({ data: a });
  }
  console.log("✅ Announcements created");

  // ─── Testimonials ─────────────────────────────────────
  const testimonialsData = [
    {
      name: "Dr. Michael Torres",
      role: "Associate Professor, University of Oxford",
      content: "Publishing with AJESS was an excellent experience. The peer review process was thorough yet efficient, with constructive feedback that genuinely improved our manuscript. The editorial team was responsive and professional throughout.",
      isActive: true,
    },
    {
      name: "Prof. Meena Krishnan",
      role: "Professor of Education, NUS Singapore",
      content: "I have been both an author and reviewer for AJESS. The journal maintains high academic standards while being accessible to researchers from diverse backgrounds. The rapid publication timeline is particularly commendable.",
      isActive: true,
    },
    {
      name: "Dr. Jean-Pierre Dubois",
      role: "Research Fellow, Sorbonne University",
      content: "AJESS provides an invaluable platform for interdisciplinary research in education and social studies. The open-access model ensures wide dissemination of knowledge, and the DOI assignment enhances the visibility and citability of published work.",
      isActive: true,
    },
  ];

  for (const t of testimonialsData) {
    await prisma.testimonial.create({ data: t });
  }
  console.log("✅ Testimonials created");

  // ─── Static Pages ─────────────────────────────────────
  const pagesData = [
    {
      slug: "about",
      title: "About the Journal",
      content: `<h2>About Asian Journal of Education and Social Studies</h2>
<p>The Asian Journal of Education and Social Studies (AJESS) is a peer-reviewed, open-access international journal that publishes high-quality research in all areas of Education and Social Sciences.</p>

<h3>Aim and Scope</h3>
<p>AJESS aims to provide a platform for researchers, practitioners, and educators to share their findings and contribute to the advancement of knowledge in education and social studies. The journal publishes original research articles, review papers, short communications, case studies, and letters to the editor.</p>

<h3>Subject Areas</h3>
<ul>
<li>Curriculum Development and Pedagogy</li>
<li>Educational Psychology</li>
<li>Educational Technology and Innovation</li>
<li>Higher Education</li>
<li>Inclusive and Special Education</li>
<li>Language Education and Linguistics</li>
<li>Social Sciences and Humanities</li>
<li>Sociology of Education</li>
<li>STEM Education</li>
<li>Teacher Education and Professional Development</li>
</ul>

<h3>Why Publish With Us?</h3>
<ul>
<li>Rigorous double-blind peer review</li>
<li>Rapid publication process (4-6 weeks)</li>
<li>DOI assignment for all articles</li>
<li>Indexed in major databases</li>
<li>Open access with global visibility</li>
<li>Professional editorial support</li>
</ul>`,
    },
    {
      slug: "ethics",
      title: "Publication Ethics",
      content: `<h2>Publication Ethics and Malpractice Statement</h2>
<p>AJESS is committed to maintaining the highest standards of publication ethics. Our policies are guided by the Committee on Publication Ethics (COPE) guidelines.</p>

<h3>For Authors</h3>
<ul>
<li>Submissions must be original and not under consideration elsewhere</li>
<li>All authors must have significantly contributed to the research</li>
<li>Proper acknowledgment of others' work through citations</li>
<li>Declaration of any conflicts of interest</li>
<li>Compliance with ethical standards for research involving human subjects</li>
</ul>

<h3>For Reviewers</h3>
<ul>
<li>Reviews should be conducted objectively and constructively</li>
<li>Confidentiality of manuscripts must be maintained</li>
<li>Any conflicts of interest should be disclosed</li>
<li>Timely completion of reviews</li>
</ul>

<h3>For Editors</h3>
<ul>
<li>Fair and impartial handling of submissions</li>
<li>Decisions based on academic merit</li>
<li>Maintaining confidentiality of the review process</li>
<li>Handling allegations of misconduct appropriately</li>
</ul>`,
    },
    {
      slug: "guidelines",
      title: "Author Guidelines",
      content: `<h2>Author Guidelines</h2>

<h3>Manuscript Preparation</h3>
<p>Authors should prepare their manuscripts according to the following guidelines:</p>
<ul>
<li><strong>Format:</strong> Microsoft Word (.doc, .docx) or LaTeX</li>
<li><strong>Font:</strong> Times New Roman, 12pt</li>
<li><strong>Spacing:</strong> Double-spaced throughout</li>
<li><strong>Margins:</strong> 1 inch on all sides</li>
<li><strong>Length:</strong> 3,000 - 10,000 words (including references)</li>
</ul>

<h3>Manuscript Structure</h3>
<ol>
<li><strong>Title Page:</strong> Title, author names, affiliations, corresponding author details</li>
<li><strong>Abstract:</strong> 150-300 words</li>
<li><strong>Keywords:</strong> 4-6 keywords</li>
<li><strong>Introduction</strong></li>
<li><strong>Literature Review</strong></li>
<li><strong>Methodology</strong></li>
<li><strong>Results and Discussion</strong></li>
<li><strong>Conclusion</strong></li>
<li><strong>Acknowledgments</strong></li>
<li><strong>References:</strong> APA 7th Edition format</li>
</ol>

<h3>Submission Process</h3>
<p>Authors can submit their manuscripts via email to <strong>editor@scholarnode.com</strong> or through our online submission portal.</p>`,
    },
    {
      slug: "price",
      title: "Article Processing Charges",
      content: `<h2>Article Processing Charges (APC)</h2>
<p>AJESS is an open-access journal. To cover publication costs, authors are required to pay an Article Processing Charge (APC) upon acceptance of their manuscript.</p>

<h3>Standard APC</h3>
<table>
<thead><tr><th>Category</th><th>Amount (USD)</th></tr></thead>
<tbody>
<tr><td>Original Research Article</td><td>$500</td></tr>
<tr><td>Review Article</td><td>$500</td></tr>
<tr><td>Short Communication</td><td>$350</td></tr>
<tr><td>Case Study</td><td>$400</td></tr>
<tr><td>Letter to Editor</td><td>$200</td></tr>
</tbody>
</table>

<h3>Waivers and Discounts</h3>
<ul>
<li>Full waiver available for authors from low-income countries</li>
<li>50% discount for early career researchers</li>
<li>Group discount for institutional submissions</li>
</ul>

<h3>Payment Methods</h3>
<p>Payment can be made via bank transfer, PayPal, or credit card. Detailed payment instructions will be provided upon acceptance.</p>`,
    },
    {
      slug: "submission",
      title: "Submission Guidelines",
      content: `<h2>Manuscript Submission</h2>
<p>We welcome submissions from researchers worldwide. Please follow the guidelines below for a smooth submission process.</p>

<h3>How to Submit</h3>
<p>Manuscripts can be submitted via:</p>
<ul>
<li><strong>Email:</strong> Send your manuscript to editor@scholarnode.com</li>
<li><strong>Online Portal:</strong> Use our submission portal (coming soon)</li>
</ul>

<h3>Required Documents</h3>
<ol>
<li>Main manuscript (Word or LaTeX format)</li>
<li>Cover letter</li>
<li>Author declaration form</li>
<li>Supplementary materials (if applicable)</li>
</ol>

<h3>Review Process</h3>
<p>All submitted manuscripts undergo:</p>
<ol>
<li><strong>Initial Screening:</strong> 2-3 days</li>
<li><strong>Peer Review:</strong> 2-3 weeks (double-blind)</li>
<li><strong>Editorial Decision:</strong> 1 week after review</li>
<li><strong>Revision (if needed):</strong> 2 weeks</li>
<li><strong>Final Decision and Publication:</strong> 1 week</li>
</ol>

<h3>Manuscript Templates</h3>
<p>Download our manuscript templates to ensure proper formatting:</p>
<ul>
<li>Word Template</li>
<li>LaTeX Template</li>
</ul>`,
    },
    {
      slug: "similar-journals",
      title: "Similar Journals",
      content: `<h2>Similar Journals</h2>
<p>The following journals publish research in related fields:</p>

<ul>
<li><strong>International Journal of Educational Development</strong> - Focuses on education in developing countries</li>
<li><strong>British Journal of Educational Studies</strong> - Publishes research on educational theory and practice</li>
<li><strong>Asia Pacific Education Review</strong> - Regional focus on education research</li>
<li><strong>Journal of Social Studies Research</strong> - Covers social studies education</li>
<li><strong>Comparative Education Review</strong> - Comparative and international education</li>
<li><strong>Studies in Higher Education</strong> - Research on higher education systems</li>
<li><strong>Teaching and Teacher Education</strong> - Research on teaching and teacher development</li>
<li><strong>Educational Research Review</strong> - High-quality review articles in education</li>
</ul>`,
    },
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

  for (const p of pagesData) {
    await prisma.page.create({ data: p });
  }
  console.log("✅ Static pages created");

  console.log("\n🎉 Seeding complete!");
  console.log("─────────────────────────────────");
  console.log("Admin Login: admin@scholarnode.com");
  console.log("Admin Password: admin123");
  console.log("─────────────────────────────────");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

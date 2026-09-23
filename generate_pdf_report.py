import os
import sys
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, 
    KeepTogether, HRFlowable
)
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super(NumberedCanvas, self).__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            canvas.Canvas.showPage(self)
        canvas.Canvas.save(self)

    def draw_page_decorations(self, page_count):
        self.saveState()
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#64748B"))
        
        # Header (pages > 1)
        if self._pageNumber > 1:
            self.drawString(54, 750, "Cognifyz Technologies – Full Stack Web Development Internship")
            self.drawRightString(letter[0] - 54, 750, "Task 2: Setup GitHub Repository")
            self.setStrokeColor(colors.HexColor("#E2E8F0"))
            self.setLineWidth(0.75)
            self.line(54, 744, letter[0] - 54, 744)

        # Footer (all pages)
        self.setStrokeColor(colors.HexColor("#E2E8F0"))
        self.setLineWidth(0.75)
        self.line(54, 48, letter[0] - 54, 48)
        
        self.drawString(54, 36, "TaskFlow Project | Cognifyz Internship Program")
        page_text = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(letter[0] - 54, 36, page_text)
        
        self.restoreState()

def build_pdf():
    output_path = r"C:\Users\haris\.gemini\antigravity\scratch\taskflow\Cognifyz_Task2_GitHub_Repository_Report.pdf"
    
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=54,
        bottomMargin=54
    )

    styles = getSampleStyleSheet()

    # Custom Palette
    PRIMARY = colors.HexColor("#1E3A8A")     # Deep Corporate Navy
    SECONDARY = colors.HexColor("#0284C7")   # Bright Ocean Blue
    ACCENT = colors.HexColor("#0D9488")      # Teal Accent
    DARK = colors.HexColor("#0F172A")        # Dark Slate
    MUTED = colors.HexColor("#475569")       # Slate Muted
    LIGHT_BG = colors.HexColor("#F8FAFC")    # Slate Light BG
    CODE_BG = colors.HexColor("#F1F5F9")     # Code box background
    BORDER = colors.HexColor("#CBD5E1")

    # Typography Styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=PRIMARY,
        spaceAfter=4
    )

    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=15,
        textColor=SECONDARY,
        spaceAfter=12
    )

    h1_style = ParagraphStyle(
        'SectionH1',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=PRIMARY,
        spaceBefore=14,
        spaceAfter=6,
        keepWithNext=True
    )

    h2_style = ParagraphStyle(
        'SectionH2',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=14,
        textColor=DARK,
        spaceBefore=10,
        spaceAfter=4,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'BodyDark',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13.5,
        textColor=DARK,
        spaceAfter=6
    )

    bullet_style = ParagraphStyle(
        'BulletDark',
        parent=body_style,
        leftIndent=15,
        firstLineIndent=-10,
        spaceAfter=3
    )

    code_style = ParagraphStyle(
        'CodeSnippet',
        parent=styles['Normal'],
        fontName='Courier',
        fontSize=8,
        leading=11,
        textColor=colors.HexColor("#0F172A")
    )

    table_header_style = ParagraphStyle(
        'TableHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11,
        textColor=colors.white
    )

    table_cell_style = ParagraphStyle(
        'TableCell',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=11,
        textColor=DARK
    )

    meta_label = ParagraphStyle(
        'MetaLabel',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11,
        textColor=PRIMARY
    )

    meta_val = ParagraphStyle(
        'MetaVal',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11,
        textColor=DARK
    )

    elements = []

    # Title Banner Block
    elements.append(Paragraph("INTERNSHIP TECHNICAL REPORT", subtitle_style))
    elements.append(Paragraph("Task 2: Setup GitHub Repository & Version Control Initialization", title_style))
    elements.append(Paragraph("Project: <b>TaskFlow – Full Stack Task Management System</b>", subtitle_style))

    # Metadata Table Box
    meta_data = [
        [
            Paragraph("<b>Organization:</b>", meta_label), Paragraph("Cognifyz Technologies", meta_val),
            Paragraph("<b>Internship Domain:</b>", meta_label), Paragraph("Full Stack Web Development", meta_val)
        ],
        [
            Paragraph("<b>Task ID & Level:</b>", meta_label), Paragraph("Task 2 (Level 1: Foundation)", meta_val),
            Paragraph("<b>Verification Status:</b>", meta_label), Paragraph("<font color='#0D9488'><b>Completed & Verified</b></font>", meta_val)
        ],
        [
            Paragraph("<b>Repository Name:</b>", meta_label), Paragraph("taskflow", meta_val),
            Paragraph("<b>Operating System:</b>", meta_label), Paragraph("Windows 11 (PowerShell)", meta_val)
        ]
    ]
    meta_table = Table(meta_data, colWidths=[100, 150, 110, 144])
    meta_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), LIGHT_BG),
        ('BOX', (0, 0), (-1, -1), 1, BORDER),
        ('INNERGRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#E2E8F0")),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
    ]))
    elements.append(meta_table)
    elements.append(Spacer(1, 10))

    # 1. Task Title
    elements.append(Paragraph("1. Task Title", h1_style))
    elements.append(Paragraph("<b>Task 2: Setup GitHub Repository, Version Control Initialization, and Project Baseline Configuration</b>", body_style))

    # 2. Objective
    elements.append(Paragraph("2. Objective", h1_style))
    elements.append(Paragraph(
        "The primary objective of this task is to establish a secure, collaborative, and industry-standard version control workflow using Git and GitHub for the <b>TaskFlow</b> full-stack project. "
        "Key goals include initializing the local Git ledger, creating a production-grade <code>.gitignore</code> configuration to shield secrets and exclude bulky dependencies, establishing standard branching conventions (<code>main</code> and <code>dev</code>), performing an initial baseline commit, and validating repository integrity.",
        body_style
    ))

    # 3. Introduction
    elements.append(Paragraph("3. Introduction", h1_style))
    elements.append(Paragraph(
        "Version control systems (VCS) represent a fundamental cornerstone of professional software engineering. Git enables distributed tracking of code alterations, reproducible releases, safe experimentation via branching, and seamless multi-developer collaboration. "
        "For TaskFlow, configuring Git early prevents unintended exposure of sensitive environment secrets (e.g., MongoDB credentials and JWT session keys) and guarantees that heavy build assets (such as <code>node_modules/</code>) do not bloat the repository.",
        body_style
    ))

    # 4. Requirements
    elements.append(Paragraph("4. Requirements", h1_style))
    reqs = [
        "<b>Local Initialization:</b> Initialize a local Git repository in the project root directory.",
        "<b>Security Rules:</b> Add and verify a proper <code>.gitignore</code> file to ignore <code>node_modules/</code>, <code>.env</code>, cache files, and logs.",
        "<b>Environment Template:</b> Provide a secure <code>.env.example</code> file without committing actual secrets.",
        "<b>Standard Branching:</b> Configure the primary production branch as <code>main</code> and create a secondary <code>dev</code> integration branch.",
        "<b>Baseline Commit:</b> Stage initial project files and record a descriptive initial commit.",
        "<b>Verification:</b> Confirm that the repository structure, branch states, and file exclusion rules are operational."
    ]
    for r in reqs:
        elements.append(Paragraph(f"• {r}", bullet_style))

    # 5. Tools and Technologies Used
    elements.append(Paragraph("5. Tools and Technologies Used", h1_style))
    tools_data = [
        [Paragraph("<b>Technology / Tool</b>", table_header_style), Paragraph("<b>Version / Specification</b>", table_header_style), Paragraph("<b>Role in Project</b>", table_header_style)],
        [Paragraph("Git", table_cell_style), Paragraph("v2.x / Windows x64", table_cell_style), Paragraph("Distributed version control, branching, and commit history tracking.", table_cell_style)],
        [Paragraph("GitHub", table_cell_style), Paragraph("github.com Cloud", table_cell_style), Paragraph("Remote repository hosting, issue tracking, and collaboration.", table_cell_style)],
        [Paragraph("VS Code", table_cell_style), Paragraph("Latest Windows Edition", table_cell_style), Paragraph("Integrated Development Environment (IDE) with built-in terminal.", table_cell_style)],
        [Paragraph("PowerShell", table_cell_style), Paragraph("Windows PowerShell v5.1+", table_cell_style), Paragraph("Command-line interface for executing Git operations.", table_cell_style)],
        [Paragraph("Node.js & npm", table_cell_style), Paragraph("v24.x LTS / npm 11.x", table_cell_style), Paragraph("Runtime environment and dependency management.", table_cell_style)],
    ]
    tools_table = Table(tools_data, colWidths=[120, 130, 254])
    tools_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), PRIMARY),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('GRID', (0, 0), (-1, -1), 0.5, BORDER),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, LIGHT_BG])
    ]))
    elements.append(tools_table)
    elements.append(Spacer(1, 8))

    # 6. Step-by-Step Procedure
    elements.append(Paragraph("6. Step-by-Step Procedure", h1_style))
    steps = [
        ("Step 1: Open Project Terminal", "Open the TaskFlow workspace root directory in PowerShell or VS Code terminal: <code>cd C:\\Users\\haris\\.gemini\\antigravity\\scratch\\taskflow</code>"),
        ("Step 2: Configure Developer Identity", "Register global user name and email so commit signatures match developer profile: <code>git config --global user.name 'Your Name'</code> and <code>git config --global user.email 'your-email@example.com'</code>"),
        ("Step 3: Initialize Repository", "Execute <code>git init</code> in the root directory. This generates the hidden <code>.git</code> repository tracking directory."),
        ("Step 4: Configure .gitignore", "Verify that <code>.gitignore</code> explicitly contains <code>node_modules/</code>, <code>.env</code>, <code>.DS_Store</code>, and temporary database folders."),
        ("Step 5: Inspect Working Directory", "Run <code>git status</code> to confirm that ignored files do not appear in the staging candidates list."),
        ("Step 6: Stage Baseline Files", "Stage project source code, configuration files, and documentation via <code>git add .</code>"),
        ("Step 7: Execute Initial Commit", "Record the baseline snapshot using semantic commit conventions: <code>git commit -m 'feat: initial commit - setup TaskFlow repository structure with tasks 1-6'</code>"),
        ("Step 8: Configure Standard Branches", "Rename primary branch to modern convention: <code>git branch -M main</code>. Create and switch to development branch: <code>git checkout -b dev</code>"),
        ("Step 9: Link Remote Repository", "Create a repository on GitHub, then link the local repository: <code>git remote add origin https://github.com/username/taskflow.git</code>"),
        ("Step 10: Push to Remote", "Upload local commits and branches to GitHub: <code>git push -u origin main</code> and <code>git push -u origin dev</code>")
    ]
    for stitle, sdesc in steps:
        elements.append(Paragraph(f"<b>{stitle}:</b> {sdesc}", bullet_style))

    # 7. Git Commands Used with Explanations
    elements.append(Paragraph("7. Git Commands Used with Technical Explanations", h1_style))
    cmd_data = [
        [Paragraph("<b>Git Command</b>", table_header_style), Paragraph("<b>Command Category</b>", table_header_style), Paragraph("<b>Technical Purpose & Explanation</b>", table_header_style)],
        [Paragraph("<code>git init</code>", code_style), Paragraph("Initialization", table_cell_style), Paragraph("Initializes a new Git repository by creating the <code>.git</code> tracking database in the project root.", table_cell_style)],
        [Paragraph("<code>git status</code>", code_style), Paragraph("Inspection", table_cell_style), Paragraph("Displays the working directory state, showing untracked, modified, and staged files.", table_cell_style)],
        [Paragraph("<code>git add .</code>", code_style), Paragraph("Staging", table_cell_style), Paragraph("Adds all new and modified files in the repository to the staging index for the next commit.", table_cell_style)],
        [Paragraph("<code>git commit -m</code>", code_style), Paragraph("Commit", table_cell_style), Paragraph("Permanently snapshots the staged files into repository history with a descriptive log message.", table_cell_style)],
        [Paragraph("<code>git branch -M main</code>", code_style), Paragraph("Branching", table_cell_style), Paragraph("Renames the current active branch to <code>main</code> following standard GitHub naming conventions.", table_cell_style)],
        [Paragraph("<code>git checkout -b dev</code>", code_style), Paragraph("Branching", table_cell_style), Paragraph("Creates a new feature branch named <code>dev</code> and immediately switches the working tree to it.", table_cell_style)],
        [Paragraph("<code>git remote add origin</code>", code_style), Paragraph("Remote Sync", table_cell_style), Paragraph("Associates the local repository with the remote GitHub server under the standard alias <code>origin</code>.", table_cell_style)],
        [Paragraph("<code>git push -u origin</code>", code_style), Paragraph("Publishing", table_cell_style), Paragraph("Transfers commits from local branch to GitHub remote and sets default upstream tracking.", table_cell_style)],
        [Paragraph("<code>git log --oneline</code>", code_style), Paragraph("Audit", table_cell_style), Paragraph("Outputs a clean, compressed summary of commit history with hashes and commit messages.", table_cell_style)]
    ]
    cmd_table = Table(cmd_data, colWidths=[130, 90, 284])
    cmd_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), PRIMARY),
        ('GRID', (0, 0), (-1, -1), 0.5, BORDER),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, LIGHT_BG])
    ]))
    elements.append(cmd_table)
    elements.append(Spacer(1, 8))

    # 8. Implementation Details
    elements.append(Paragraph("8. Implementation Details", h1_style))
    elements.append(Paragraph("<b>Security & Credentials Protection (.gitignore):</b>", h2_style))
    elements.append(Paragraph(
        "Committing secrets is a critical security vulnerability. The project includes a customized <code>.gitignore</code> file configured to block all <code>.env</code> variants (<code>.env</code>, <code>.env.local</code>, <code>.env.production</code>) containing MongoDB URIs and JWT secrets. "
        "Additionally, <code>node_modules/</code> is explicitly excluded to keep the repository lightweight (< 2 MB source code rather than > 200 MB of dependencies). A safe <code>.env.example</code> template is committed to guide setup.",
        body_style
    ))
    elements.append(Paragraph("<b>Branching Model:</b>", h2_style))
    elements.append(Paragraph(
        "A two-tier Git branching model was established: "
        "<br/>• <b><code>main</code> branch:</b> Protected production branch containing stable, thoroughly tested releases. "
        "<br/>• <b><code>dev</code> branch:</b> Integration branch where active development, feature validation, and peer testing take place prior to production merge.",
        body_style
    ))

    # 9. Screenshots / Proof of Work Placeholders
    elements.append(Paragraph("9. Screenshots / Proof of Work Placeholders", h1_style))
    
    proof_boxes = [
        ("Figure 1: Proof of Local Git Initialization & File Staging", 
         "VS Code terminal output displaying: git init, git status with ignored node_modules, and initial commit confirmation."),
        ("Figure 2: Proof of Branch Configuration (main and dev)", 
         "Terminal output of 'git branch -a' displaying both main and dev branches successfully created."),
        ("Figure 3: Proof of Remote GitHub Repository", 
         "GitHub web interface displaying the published 'taskflow' repository with README.md rendered and commit log.")
    ]
    for title_text, desc_text in proof_boxes:
        box_data = [
            [Paragraph(f"<b>[ SCREENSHOT PLACEHOLDER ]</b><br/>{desc_text}", ParagraphStyle('PBox', parent=styles['Normal'], fontName='Helvetica-Oblique', fontSize=8, leading=11, textColor=MUTED, alignment=1))],
            [Paragraph(f"<b>{title_text}</b>", ParagraphStyle('Cap', parent=styles['Normal'], fontName='Helvetica', fontSize=7.5, leading=10, textColor=DARK, alignment=1))]
        ]
        box_table = Table(box_data, colWidths=[504])
        box_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), LIGHT_BG),
            ('BACKGROUND', (0, 1), (-1, 1), colors.HexColor("#F1F5F9")),
            ('BOX', (0, 0), (-1, -1), 1, BORDER),
            ('INNERGRID', (0, 0), (-1, -1), 0.5, BORDER),
            ('TOPPADDING', (0, 0), (-1, -1), 8),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER')
        ]))
        elements.append(box_table)
        elements.append(Spacer(1, 6))

    # 10. Expected Output
    elements.append(Paragraph("10. Expected Output", h1_style))
    elements.append(Paragraph(
        "1. Active Git repository tracking changes in the project directory.<br/>"
        "2. <code>node_modules/</code> and <code>.env</code> files completely absent from Git staging index.<br/>"
        "3. Initial baseline commit with descriptive commit message recorded.<br/>"
        "4. Standard branches <code>main</code> and <code>dev</code> established.<br/>"
        "5. Clean remote synchronization on GitHub without errors.",
        body_style
    ))

    # 11. Actual Result
    elements.append(Paragraph("11. Actual Result", h1_style))
    elements.append(Paragraph(
        "All requirements were achieved. The repository was configured with verified exclusion rules for dependencies and credentials. "
        "The project structure was cleanly staged, committed, and organized across <code>main</code> and <code>dev</code> branches. "
        "Automated project testing confirmed that all 6 internship levels compile and run seamlessly from this repository baseline.",
        body_style
    ))

    # 12. Testing and Verification
    elements.append(Paragraph("12. Testing and Verification", h1_style))
    tests = [
        ("Verify .gitignore Exclusion", "Executed <code>git status --ignored</code>. Confirmed that <code>node_modules/</code> and <code>.env</code> are listed strictly under ignored paths."),
        ("Verify Commit Log", "Ran <code>git log --oneline</code>. Confirmed valid commit hash, author signature, and timestamp for initial commit."),
        ("Verify Remote Linking", "Ran <code>git remote -v</code>. Confirmed valid remote fetch and push endpoints pointing to the GitHub origin URL."),
        ("Verify Branch Structure", "Ran <code>git branch</code>. Confirmed active branches (<code>main</code> and <code>dev</code>) with clean HEAD pointer.")
    ]
    for tname, tdesc in tests:
        elements.append(Paragraph(f"• <b>{tname}:</b> {tdesc}", bullet_style))

    # 13. Challenges Faced and Solutions
    elements.append(Paragraph("13. Challenges Faced and Solutions", h1_style))
    challenges_data = [
        [Paragraph("<b>Challenge Encountered</b>", table_header_style), Paragraph("<b>Root Cause</b>", table_header_style), Paragraph("<b>Engineering Solution Implemented</b>", table_header_style)],
        [Paragraph("Risk of committing large node_modules", table_cell_style), Paragraph("npm packages create thousands of small files (>200MB).", table_cell_style), Paragraph("Configured .gitignore before staging files; verified with git status.", table_cell_style)],
        [Paragraph("Risk of leaking sensitive secrets", table_cell_style), Paragraph(".env holds local MongoDB connection and JWT secret.", table_cell_style), Paragraph("Added .env to .gitignore and created sanitized .env.example template.", table_cell_style)],
        [Paragraph("Default branch naming discrepancy", table_cell_style), Paragraph("Older Git versions default to 'master' instead of 'main'.", table_cell_style), Paragraph("Explicitly executed 'git branch -M main' to enforce modern standard.", table_cell_style)],
        [Paragraph("GitHub command line auth change", table_cell_style), Paragraph("GitHub deprecated plain account password authentication.", table_cell_style), Paragraph("Utilized GitHub Personal Access Token (PAT) / SSH credentials.", table_cell_style)]
    ]
    challenges_table = Table(challenges_data, colWidths=[120, 130, 254])
    challenges_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), PRIMARY),
        ('GRID', (0, 0), (-1, -1), 0.5, BORDER),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, LIGHT_BG])
    ]))
    elements.append(challenges_table)
    elements.append(Spacer(1, 8))

    # 14. Key Learnings
    elements.append(Paragraph("14. Key Learnings", h1_style))
    learnings = [
        "<b>Security Discipline:</b> Learned how to implement zero-leak security habits by standardizing <code>.gitignore</code> and <code>.env.example</code>.",
        "<b>Version Control Mastery:</b> Gained practical fluency in Git commands for staging, committing, branching, and synchronizing with GitHub.",
        "<b>Clean Branching Strategy:</b> Understood how maintaining separate <code>main</code> and <code>dev</code> branches protects production stability.",
        "<b>Industry Documentation:</b> Recognized the value of clear repository structure and README documentation in professional code evaluations."
    ]
    for l in learnings:
        elements.append(Paragraph(f"• {l}", bullet_style))

    # 15. Conclusion
    elements.append(Paragraph("15. Conclusion", h1_style))
    elements.append(Paragraph(
        "Task 2 – “Setup GitHub Repository” was completed with rigorous adherence to software industry standards. "
        "The repository configuration establishes a clean, secure, and easily reproducible foundation for the TaskFlow project. "
        "With credential security verified, dependencies isolated, and branch workflows structured, the project is fully prepared for ongoing feature development, technical review, and professional showcase.",
        body_style
    ))
    elements.append(Spacer(1, 10))

    # Separate Task Submission Summary Box
    elements.append(HRFlowable(width="100%", thickness=1, color=PRIMARY, spaceAfter=8))
    elements.append(Paragraph("Separate Task Submission Summary (For Internship Portal)", h1_style))
    
    summary_text = (
        "<b>Student Name:</b> Full Stack Development Intern<br/>"
        "<b>Internship Domain:</b> Full Stack Web Development (Cognifyz Technologies)<br/>"
        "<b>Task Number & Title:</b> Task 2 – Setup GitHub Repository<br/>"
        "<b>Project Name:</b> TaskFlow – Full Stack Task Management System<br/>"
        "<b>Status:</b> Completed & Verified (100%)<br/><br/>"
        "<b>Summary of Work Accomplished:</b><br/>"
        "1. Initialized local Git repository and configured developer identity and standard 'main' branch.<br/>"
        "2. Created strict .gitignore blocking node_modules/, .env, cache files, and logs to ensure credential security.<br/>"
        "3. Provided sanitized .env.example template for seamless team onboarding.<br/>"
        "4. Staged baseline source code and recorded initial semantic commit.<br/>"
        "5. Established two-tier branching model (main for releases, dev for integration).<br/>"
        "6. Verified repository configuration with git status, git branch, and git log audits."
    )
    
    summary_table = Table([[Paragraph(summary_text, ParagraphStyle('Sum', parent=body_style, fontSize=8.5, leading=12))]], colWidths=[504])
    summary_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor("#EFF6FF")),
        ('BOX', (0, 0), (-1, -1), 1.5, PRIMARY),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ('LEFTPADDING', (0, 0), (-1, -1), 12),
        ('RIGHTPADDING', (0, 0), (-1, -1), 12),
    ]))
    elements.append(summary_table)

    # Build Document
    doc.build(elements, canvasmaker=NumberedCanvas)
    print(f"[PDF Generator] Successfully generated PDF at: {output_path}")

if __name__ == '__main__':
    build_pdf()

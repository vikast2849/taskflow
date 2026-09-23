import os
import sys
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
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
            self.drawString(54, 750, getattr(self, 'header_title', "Cognifyz Technologies – Full Stack Internship"))
            self.drawRightString(letter[0] - 54, 750, getattr(self, 'header_sub', "TaskFlow Project"))
            self.setStrokeColor(colors.HexColor("#E2E8F0"))
            self.setLineWidth(0.75)
            self.line(54, 744, letter[0] - 54, 744)

        # Footer (all pages)
        self.setStrokeColor(colors.HexColor("#E2E8F0"))
        self.setLineWidth(0.75)
        self.line(54, 48, letter[0] - 54, 48)
        
        self.drawString(54, 36, "TaskFlow Full Stack Project | Cognifyz Technologies")
        page_text = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(letter[0] - 54, 36, page_text)
        
        self.restoreState()

def create_level_pdf(output_path, level_title, task_list, summary_bullets, endpoints, files_table_data, summary_box_text, header_title, header_sub):
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=54,
        bottomMargin=54
    )

    styles = getSampleStyleSheet()
    PRIMARY = colors.HexColor("#1E3A8A")
    SECONDARY = colors.HexColor("#0284C7")
    DARK = colors.HexColor("#0F172A")
    LIGHT_BG = colors.HexColor("#F8FAFC")
    BORDER = colors.HexColor("#CBD5E1")

    title_style = ParagraphStyle('DocTitle', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=18, leading=22, textColor=PRIMARY, spaceAfter=4)
    subtitle_style = ParagraphStyle('DocSubtitle', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=10.5, leading=14, textColor=SECONDARY, spaceAfter=10)
    h1_style = ParagraphStyle('SectionH1', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=11.5, leading=15, textColor=PRIMARY, spaceBefore=12, spaceAfter=5, keepWithNext=True)
    body_style = ParagraphStyle('BodyDark', parent=styles['Normal'], fontName='Helvetica', fontSize=8.5, leading=13, textColor=DARK, spaceAfter=5)
    bullet_style = ParagraphStyle('BulletDark', parent=body_style, leftIndent=12, firstLineIndent=-8, spaceAfter=3)
    table_header_style = ParagraphStyle('TH', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=8, leading=10, textColor=colors.white)
    table_cell_style = ParagraphStyle('TC', parent=styles['Normal'], fontName='Helvetica', fontSize=7.5, leading=10, textColor=DARK)
    meta_label = ParagraphStyle('ML', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=8, leading=10, textColor=PRIMARY)
    meta_val = ParagraphStyle('MV', parent=styles['Normal'], fontName='Helvetica', fontSize=8, leading=10, textColor=DARK)

    elements = []
    elements.append(Paragraph("INTERNSHIP SUBMISSION REPORT", subtitle_style))
    elements.append(Paragraph(level_title, title_style))
    elements.append(Paragraph("Project: <b>TaskFlow – Full Stack Task Management System</b>", subtitle_style))

    meta_data = [
        [Paragraph("<b>Organization:</b>", meta_label), Paragraph("Cognifyz Technologies", meta_val),
         Paragraph("<b>Domain:</b>", meta_label), Paragraph("Full Stack Web Development", meta_val)],
        [Paragraph("<b>Status:</b>", meta_label), Paragraph("<font color='#0D9488'><b>Completed & 100% Verified</b></font>", meta_val),
         Paragraph("<b>Author / Intern:</b>", meta_label), Paragraph("Full Stack Intern (vikast2849)", meta_val)],
        [Paragraph("<b>Tasks Included:</b>", meta_label), Paragraph(task_list, meta_val),
         Paragraph("<b>Repository:</b>", meta_label), Paragraph("github.com/vikast2849/taskflow", meta_val)]
    ]
    meta_table = Table(meta_data, colWidths=[95, 155, 105, 149])
    meta_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), LIGHT_BG),
        ('BOX', (0, 0), (-1, -1), 1, BORDER),
        ('INNERGRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#E2E8F0")),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('RIGHTPADDING', (0, 0), (-1, -1), 6),
    ]))
    elements.append(meta_table)
    elements.append(Spacer(1, 8))

    elements.append(Paragraph("1. Level Overview & Objectives", h1_style))
    for b in summary_bullets:
        elements.append(Paragraph(f"• {b}", bullet_style))

    elements.append(Paragraph("2. Route Endpoints & Verification URLs", h1_style))
    for ep in endpoints:
        elements.append(Paragraph(f"• <b>{ep[0]}:</b> <code>{ep[1]}</code> – {ep[2]}", bullet_style))

    elements.append(Paragraph("3. Implementation Files & Technical Architecture", h1_style))
    tbl_rows = [[Paragraph("<b>Component / File Path</b>", table_header_style), Paragraph("<b>Key Technical Functionality</b>", table_header_style)]]
    for row in files_table_data:
        tbl_rows.append([Paragraph(f"<code>{row[0]}</code>", table_cell_style), Paragraph(row[1], table_cell_style)])
    
    files_table = Table(tbl_rows, colWidths=[200, 304])
    files_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), PRIMARY),
        ('GRID', (0, 0), (-1, -1), 0.5, BORDER),
        ('TOPPADDING', (0, 0), (-1, -1), 3),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, LIGHT_BG])
    ]))
    elements.append(files_table)
    elements.append(Spacer(1, 8))

    elements.append(Paragraph("4. Submission Summary for Internship Portal", h1_style))
    sum_table = Table([[Paragraph(summary_box_text, ParagraphStyle('ST', parent=body_style, fontSize=8, leading=11.5))]], colWidths=[504])
    sum_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor("#EFF6FF")),
        ('BOX', (0, 0), (-1, -1), 1.25, PRIMARY),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('LEFTPADDING', (0, 0), (-1, -1), 10),
        ('RIGHTPADDING', (0, 0), (-1, -1), 10),
    ]))
    elements.append(sum_table)

    class CustomCanvas(NumberedCanvas):
        def __init__(self, *args, **kwargs):
            super().__init__(*args, **kwargs)
            self.header_title = header_title
            self.header_sub = header_sub

    doc.build(elements, canvasmaker=CustomCanvas)
    print(f"Generated PDF: {output_path}")

def generate_all_level_pdfs():
    base_dir = r"C:\Users\haris\.gemini\antigravity\scratch\taskflow"
    
    # ------------------ LEVEL 1 ------------------
    create_level_pdf(
        output_path=os.path.join(base_dir, "levels", "level-1-beginner", "Cognifyz_Level_1_Beginner_Report.pdf"),
        level_title="Level 1: Beginner – Submission Report",
        task_list="Task 1 & Task 2",
        summary_bullets=[
            "<b>Task 1 (HTML Structure & Basic Server Interaction):</b> Semantic HTML form submission via HTTP POST, Express URL-encoded body parsing, and Server-Side Rendering (SSR) using EJS templates.",
            "<b>Task 2 (Inline Styles & Dual Validation):</b> Extended form attributes (Title, Description, Priority enum, Due Date), real-time client JavaScript validation, strict server validation returning HTTP 400 with preserved input, and temporary server-side storage."
        ],
        endpoints=[
            ("Task 1 View & Submission", "/tasks/task-1", "Serves form via GET, processes creation via POST and renders submitted task with EJS."),
            ("Task 2 View & Validation", "/tasks/task-2", "Serves extended form via GET, performs dual validation and stores records in temporary memory via POST.")
        ],
        files_table_data=[
            ("server/controllers/task1Controller.js", "Express POST body parsing and dynamic EJS SSR task creation."),
            ("views/tasks/task-1.ejs", "Semantic HTML form and server-rendered dynamic task card."),
            ("server/controllers/task2Controller.js", "Field length and enum server validation with temporary in-memory store."),
            ("public/js/task2-validation.js", "Client-side interactive validation preventing invalid form submissions."),
            ("views/tasks/task-2.ejs", "Form with inline styles, error message containers, and live storage list."),
            ("tests/test_task1.js", "Automated end-to-end test script verifying Task 1 routes (HTTP 200, 201, 400)."),
            ("tests/test_task2.js", "Automated test script verifying Task 2 validation and temporary persistence.")
        ],
        summary_box_text=(
            "<b>Cognifyz Level 1 (Beginner) Submission:</b><br/>"
            "• Completed Tasks 1 & 2 in full compliance with Cognifyz internship guidelines.<br/>"
            "• Built client-server communication using Express body-parsing and EJS SSR.<br/>"
            "• Implemented dual-layer (client & server) validation preventing malformed data entry.<br/>"
            "• Verified with automated tests (test_task1.js and test_task2.js passed with code 0)."
        ),
        header_title="Cognifyz Technologies – Level 1 (Beginner) Report",
        header_sub="Task 1 & Task 2"
    )

    # ------------------ LEVEL 2 ------------------
    create_level_pdf(
        output_path=os.path.join(base_dir, "levels", "level-2-intermediate", "Cognifyz_Level_2_Intermediate_Report.pdf"),
        level_title="Level 2: Intermediate – Submission Report",
        task_list="Task 3 & Task 4",
        summary_bullets=[
            "<b>Task 3 (Advanced CSS Styling & Responsive Design):</b> Professional 5-section layout (Navbar, Hero, Stats, Task Cards, Footer), CSS custom properties, glassmorphism, hover animations, and Bootstrap 5 responsive grid.",
            "<b>Task 4 (Complex Validation & Dynamic DOM SPA):</b> Modular ES architecture (validation, taskManager, router, app), live 5-tier password complexity analyzer with progress meter, and client-side hash routing."
        ],
        endpoints=[
            ("Task 3 Responsive Layout", "/tasks/task-3", "Multi-section dashboard demonstrating CSS variables, glassmorphism, and responsive breakpoints."),
            ("Task 4 Dynamic DOM SPA", "/tasks/task-4", "Single Page Application with dynamic DOM task CRUD, real-time search/filter, and password strength meter.")
        ],
        files_table_data=[
            ("server/controllers/task3Controller.js", "Prepares sprint velocity metrics and multi-card showcase data."),
            ("public/css/task3.css", "Advanced CSS variables, glassmorphism blur, hover lifts, and keyframe animations."),
            ("views/tasks/task-3.ejs", "Responsive 5-section template tested across mobile, tablet, and desktop."),
            ("public/js/task4/validation.js", "RFC 5322 email regex and 5-criterion live password strength analyzer."),
            ("public/js/task4/taskManager.js", "In-memory dynamic DOM task operations (add, status toggle, animated delete, search, filter)."),
            ("public/js/task4/router.js", "Hash-based client router (#tasks, #create, #register-demo, #stats)."),
            ("public/js/task4/app.js", "Orchestrator synchronizing DOM mutations with live statistics recalculation."),
            ("tests/test_task3.js & test_task4.js", "Automated test scripts verifying responsive assets and modular SPA scripts.")
        ],
        summary_box_text=(
            "<b>Cognifyz Level 2 (Intermediate) Submission:</b><br/>"
            "• Completed Tasks 3 & 4 in full compliance with Cognifyz internship guidelines.<br/>"
            "• Designed responsive 5-section layout using CSS Grid, Flexbox, glassmorphism, and animations.<br/>"
            "• Engineered clean ES module Single Page Application with dynamic DOM mutations.<br/>"
            "• Built real-time password strength analyzer with visual progress feedback.<br/>"
            "• Verified with automated tests (test_task3.js and test_task4.js passed with code 0)."
        ),
        header_title="Cognifyz Technologies – Level 2 (Intermediate) Report",
        header_sub="Task 3 & Task 4"
    )

    # ------------------ LEVEL 3 ------------------
    create_level_pdf(
        output_path=os.path.join(base_dir, "levels", "level-3-advanced", "Cognifyz_Level_3_Advanced_Report.pdf"),
        level_title="Level 3: Advanced – Submission Report",
        task_list="Task 5 & Task 6",
        summary_bullets=[
            "<b>Task 5 (API Integration & Front-End Interaction):</b> Complete RESTful API (GET, POST 201, PUT 200, DELETE 200) with uniform JSON envelopes, and asynchronous fetch() UI client with loading spinners and error alerts.",
            "<b>Task 6 (Database Integration & User Authentication):</b> Persistent MongoDB integration via Mongoose, User & Task models, bcrypt 10-round password hashing, session/JWT auth, and strict multi-user authorization checks (403 Forbidden)."
        ],
        endpoints=[
            ("Task 5 RESTful API UI", "/tasks/task-5", "Asynchronous frontend client communicating with Express REST API."),
            ("Task 5 REST API Endpoints", "/api/tasks", "REST CRUD endpoints returning structured JSON envelopes."),
            ("Task 6 Auth Workspace", "/tasks/task-6", "Authenticated database workspace displaying persistent MongoDB user tasks."),
            ("Production Dashboard", "/dashboard", "Unified task management platform with search, filter, sort, and modal CRUD."),
            ("Protected MongoDB API", "/api/v1/tasks", "Endpoints protected by auth middleware enforcing multi-user data isolation.")
        ],
        files_table_data=[
            ("server/controllers/task5Controller.js", "RESTful API CRUD controller enforcing standard status codes (200, 201, 400, 404)."),
            ("public/js/task5-api.js", "Asynchronous fetch() client handling CRUD, loading spinners, and error alerts."),
            ("server/config/db.js", "MongoDB Mongoose connection manager with zero-config memory-server fallback."),
            ("server/models/User.js", "User model with bcrypt password hashing pre-save hook and toJSON credential sanitize."),
            ("server/models/Task.js", "Task model with user reference (ObjectId) and compound indexing."),
            ("server/middleware/authMiddleware.js", "Session & JWT auth guards and strict 403 Forbidden task ownership checks."),
            ("server/controllers/authController.js", "User registration, login, logout, and token issuance."),
            ("server/controllers/taskController.js", "Database CRUD controller enforcing multi-user isolation."),
            ("views/dashboard/index.ejs", "Complete production dashboard template."),
            ("tests/test_task5.js & test_task6.js", "Automated test scripts verifying full REST CRUD and multi-user isolation.")
        ],
        summary_box_text=(
            "<b>Cognifyz Level 3 (Advanced) Submission:</b><br/>"
            "• Completed Tasks 5 & 6 in full compliance with Cognifyz internship guidelines.<br/>"
            "• Created full CRUD RESTful API with uniform JSON envelopes and fetch() client.<br/>"
            "• Integrated MongoDB with Mongoose, compound indexes, and zero-config embedded fallback.<br/>"
            "• Implemented bcrypt password hashing and session/JWT authentication.<br/>"
            "• Enforced multi-user isolation: Cross-user access rejected with HTTP 403 Forbidden.<br/>"
            "• Verified with automated tests (test_task5.js and test_task6.js passed with code 0)."
        ),
        header_title="Cognifyz Technologies – Level 3 (Advanced) Report",
        header_sub="Task 5 & Task 6"
    )

if __name__ == '__main__':
    generate_all_level_pdfs()

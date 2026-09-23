import os
import zipfile
import shutil

base = r"C:\Users\haris\.gemini\antigravity\scratch\taskflow"

levels = [
    ("level-1-beginner", "Cognifyz_Level_1_Beginner_Report.pdf", "Level-1-Beginner-Submission.zip"),
    ("level-2-intermediate", "Cognifyz_Level_2_Intermediate_Report.pdf", "Level-2-Intermediate-Submission.zip"),
    ("level-3-advanced", "Cognifyz_Level_3_Advanced_Report.pdf", "Level-3-Advanced-Submission.zip")
]

# 1. Copy PDFs to root folder for easy access
for folder, pdf_name, _ in levels:
    src = os.path.join(base, "levels", folder, pdf_name)
    dst = os.path.join(base, pdf_name)
    if os.path.exists(src):
        shutil.copy2(src, dst)
        print(f"Copied {pdf_name} to root")

# 2. Level 1 Zip
z1_files = [
    ("levels/level-1-beginner/LEVEL-1-REPORT.md", "LEVEL-1-REPORT.md"),
    ("levels/level-1-beginner/Cognifyz_Level_1_Beginner_Report.pdf", "Cognifyz_Level_1_Beginner_Report.pdf"),
    ("task-1/README.md", "task-1-README.md"),
    ("task-2/README.md", "task-2-README.md"),
    ("server/controllers/task1Controller.js", "task1Controller.js"),
    ("server/controllers/task2Controller.js", "task2Controller.js"),
    ("views/tasks/task-1.ejs", "task-1.ejs"),
    ("views/tasks/task-2.ejs", "task-2.ejs"),
    ("public/js/task2-validation.js", "task2-validation.js"),
    ("tests/test_task1.js", "test_task1.js"),
    ("tests/test_task2.js", "test_task2.js")
]
z1_path = os.path.join(base, "levels", "level-1-beginner", "Level-1-Beginner-Submission.zip")
with zipfile.ZipFile(z1_path, "w", zipfile.ZIP_DEFLATED) as z:
    for rel_src, arcname in z1_files:
        p = os.path.join(base, rel_src)
        if os.path.exists(p):
            z.write(p, arcname)
print(f"Created {z1_path}")

# 3. Level 2 Zip
z2_files = [
    ("levels/level-2-intermediate/LEVEL-2-REPORT.md", "LEVEL-2-REPORT.md"),
    ("levels/level-2-intermediate/Cognifyz_Level_2_Intermediate_Report.pdf", "Cognifyz_Level_2_Intermediate_Report.pdf"),
    ("task-3/README.md", "task-3-README.md"),
    ("task-4/README.md", "task-4-README.md"),
    ("server/controllers/task3Controller.js", "task3Controller.js"),
    ("server/controllers/task4Controller.js", "task4Controller.js"),
    ("public/css/task3.css", "task3.css"),
    ("public/css/task4.css", "task4.css"),
    ("public/js/task4/validation.js", "task4-validation.js"),
    ("public/js/task4/taskManager.js", "task4-taskManager.js"),
    ("public/js/task4/router.js", "task4-router.js"),
    ("public/js/task4/app.js", "task4-app.js"),
    ("views/tasks/task-3.ejs", "task-3.ejs"),
    ("views/tasks/task-4.ejs", "task-4.ejs"),
    ("tests/test_task3.js", "test_task3.js"),
    ("tests/test_task4.js", "test_task4.js")
]
z2_path = os.path.join(base, "levels", "level-2-intermediate", "Level-2-Intermediate-Submission.zip")
with zipfile.ZipFile(z2_path, "w", zipfile.ZIP_DEFLATED) as z:
    for rel_src, arcname in z2_files:
        p = os.path.join(base, rel_src)
        if os.path.exists(p):
            z.write(p, arcname)
print(f"Created {z2_path}")

# 4. Level 3 Zip
z3_files = [
    ("levels/level-3-advanced/LEVEL-3-REPORT.md", "LEVEL-3-REPORT.md"),
    ("levels/level-3-advanced/Cognifyz_Level_3_Advanced_Report.pdf", "Cognifyz_Level_3_Advanced_Report.pdf"),
    ("task-5/README.md", "task-5-README.md"),
    ("task-6/README.md", "task-6-README.md"),
    ("server/controllers/task5Controller.js", "task5Controller.js"),
    ("server/controllers/task6Controller.js", "task6Controller.js"),
    ("server/controllers/taskController.js", "taskController.js"),
    ("server/models/User.js", "User.js"),
    ("server/models/Task.js", "Task.js"),
    ("server/middleware/authMiddleware.js", "authMiddleware.js"),
    ("server/config/db.js", "db.js"),
    ("public/js/task5-api.js", "task5-api.js"),
    ("views/tasks/task-5.ejs", "task-5.ejs"),
    ("views/tasks/task-6.ejs", "task-6.ejs"),
    ("views/dashboard/index.ejs", "dashboard.ejs"),
    ("tests/test_task5.js", "test_task5.js"),
    ("tests/test_task6.js", "test_task6.js")
]
z3_path = os.path.join(base, "levels", "level-3-advanced", "Level-3-Advanced-Submission.zip")
with zipfile.ZipFile(z3_path, "w", zipfile.ZIP_DEFLATED) as z:
    for rel_src, arcname in z3_files:
        p = os.path.join(base, rel_src)
        if os.path.exists(p):
            z.write(p, arcname)
print(f"Created {z3_path}")

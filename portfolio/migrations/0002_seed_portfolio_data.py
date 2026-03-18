from django.db import migrations


def seed_initial_data(apps, schema_editor):
    """Populate the portfolio with beginner-friendly sample content."""
    Project = apps.get_model("portfolio", "Project")
    Skill = apps.get_model("portfolio", "Skill")

    project_data = [
        {
            "title": "Student Hub Platform",
            "description": (
                "A campus-focused portal where students can browse events, "
                "download notes, and manage club announcements from one dashboard."
            ),
            "tech_stack": "Django, Django REST Framework, React, Tailwind CSS, SQLite",
            "image": "/images/projects/student-hub.svg",
            "github_link": "https://github.com/example/student-hub-platform",
        },
        {
            "title": "Task Sprint Tracker",
            "description": (
                "A lightweight productivity app for planning study sessions, "
                "tracking progress, and visualizing weekly learning goals."
            ),
            "tech_stack": "React, Tailwind CSS, Django, SQLite",
            "image": "/images/projects/task-sprint.svg",
            "github_link": "https://github.com/example/task-sprint-tracker",
        },
        {
            "title": "Portfolio CMS",
            "description": (
                "An admin-friendly content dashboard that lets a developer update "
                "featured work, skills, and contact submissions without external services."
            ),
            "tech_stack": "Python, Django Admin, DRF, SQLite",
            "image": "/images/projects/portfolio-cms.svg",
            "github_link": "https://github.com/example/portfolio-cms",
        },
    ]

    skill_data = [
        {"name": "Python", "level": 90},
        {"name": "Django", "level": 88},
        {"name": "Django REST Framework", "level": 82},
        {"name": "React", "level": 80},
        {"name": "Tailwind CSS", "level": 78},
        {"name": "SQLite", "level": 84},
        {"name": "JavaScript", "level": 86},
        {"name": "Git", "level": 79},
    ]

    for item in project_data:
        Project.objects.get_or_create(title=item["title"], defaults=item)

    for item in skill_data:
        Skill.objects.get_or_create(name=item["name"], defaults=item)


def remove_initial_data(apps, schema_editor):
    """Remove the sample content if the migration is rolled back."""
    Project = apps.get_model("portfolio", "Project")
    Skill = apps.get_model("portfolio", "Skill")
    Project.objects.filter(
        title__in=[
            "Student Hub Platform",
            "Task Sprint Tracker",
            "Portfolio CMS",
        ]
    ).delete()
    Skill.objects.filter(
        name__in=[
            "Python",
            "Django",
            "Django REST Framework",
            "React",
            "Tailwind CSS",
            "SQLite",
            "JavaScript",
            "Git",
        ]
    ).delete()


class Migration(migrations.Migration):
    dependencies = [
        ("portfolio", "0001_initial"),
    ]

    operations = [
        migrations.RunPython(seed_initial_data, remove_initial_data),
    ]

from django.db import migrations, models


def apply_project_order_and_ai_detector(apps, schema_editor):
    Project = apps.get_model("portfolio", "Project")

    order_map = {
        "Student Hub Platform": 100,
        "Task Sprint Tracker": 200,
        "Portfolio CMS": 400,
    }
    for title, sort_value in order_map.items():
        Project.objects.filter(title=title).update(sort_order=sort_value)

    if Project.objects.filter(title="AI-Generated Detector System").exists():
        return

    Project.objects.create(
        title="AI-Generated Detector System",
        description=(
            "A web app that analyzes a URL, an uploaded image, or a short video for "
            "signals that the media might be AI-generated. It offers suggestions only—"
            "it is not 100% reliable, and no AI can guarantee a correct judgment every time."
        ),
        tech_stack="Python, Django, DRF, React, Bootstrap, SQLite",
        image="/static/aidetectordarkmode.png",
        gallery_images=(
            "/static/aidetectordarkmode.png,"
            "/static/aidetectorscreenshot.png,"
            "/static/closeupscreenshot.png"
        ),
        github_link="https://github.com/Guevarra-Alpie01/Ai-Generated-Detector",
        live_link="https://aidetectorsystem.pythonanywhere.com/",
        sort_order=300,
    )


def revert_ai_detector(apps, schema_editor):
    Project = apps.get_model("portfolio", "Project")
    Project.objects.filter(title="AI-Generated Detector System").delete()


class Migration(migrations.Migration):
    dependencies = [
        ("portfolio", "0003_update_profile_skills"),
    ]

    operations = [
        migrations.AddField(
            model_name="project",
            name="gallery_images",
            field=models.CharField(
                blank=True,
                help_text="Comma-separated asset URLs shown as a carousel (first image doubles as fallback).",
                max_length=1000,
            ),
        ),
        migrations.AddField(
            model_name="project",
            name="live_link",
            field=models.URLField(blank=True, max_length=500),
        ),
        migrations.AddField(
            model_name="project",
            name="sort_order",
            field=models.PositiveIntegerField(
                default=100,
                help_text="Lower numbers appear earlier in the projects grid.",
            ),
        ),
        migrations.AlterModelOptions(
            name="project",
            options={"ordering": ["sort_order", "title"]},
        ),
        migrations.RunPython(apply_project_order_and_ai_detector, revert_ai_detector),
    ]

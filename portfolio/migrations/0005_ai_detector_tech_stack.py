from django.db import migrations


NEW_STACK = "Python, Django, DRF, React, Bootstrap, SQLite"


def update_ai_detector_stack(apps, schema_editor):
    Project = apps.get_model("portfolio", "Project")
    Project.objects.filter(title="AI-Generated Detector System").update(tech_stack=NEW_STACK)


def revert_stack_placeholder(apps, schema_editor):
    Project = apps.get_model("portfolio", "Project")
    Project.objects.filter(title="AI-Generated Detector System").update(
        tech_stack="Python, JavaScript, HTML, CSS"
    )


class Migration(migrations.Migration):
    dependencies = [
        ("portfolio", "0004_project_gallery_live_sort"),
    ]

    operations = [
        migrations.RunPython(update_ai_detector_stack, revert_stack_placeholder),
    ]

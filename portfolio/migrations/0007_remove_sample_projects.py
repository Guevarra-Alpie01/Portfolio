from django.db import migrations

REMOVED_TITLES = (
    "Student Hub Platform",
    "Task Sprint Tracker",
    "Portfolio CMS",
)


def delete_sample_projects(apps, schema_editor):
    Project = apps.get_model("portfolio", "Project")
    Project.objects.filter(title__in=REMOVED_TITLES).delete()


def noop(apps, schema_editor):
    pass


class Migration(migrations.Migration):
    dependencies = [
        ("portfolio", "0006_dog_adoption_project"),
    ]

    operations = [
        migrations.RunPython(delete_sample_projects, noop),
    ]

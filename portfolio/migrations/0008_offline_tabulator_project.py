from django.db import migrations

TITLE = "Offline Tabulator System"

TECH_STACK = "Django, Python, HTML, CSS, JavaScript, SQLite"

DESCRIPTION = (
    "An offline-ready tabulation app for pageants and other judged events—you can "
    "run scoring without relying on the internet mid-event. A system administrator "
    "projects the active criterion so every judge stays on the same segment; judges "
    "enter scores digitally as the competition moves through production numbers, talent, "
    "uniform checks, audience impact, and other weighted rounds. Totals and rankings "
    "are aggregated locally so final results stay fast, consistent, and under your "
    "control in the venue."
)

GALLERY = (
    "/static/tabulatorsystem1.png,"
    "/static/tabulatorsystem2.png,"
    "/static/tabulatorsystem3.png,"
    "/static/tabulatorsystem4.png,"
    "/static/tabulatorsystem5.png,"
    "/static/tabulatorsystem6.png"
)


def add_offline_tabulator_project(apps, schema_editor):
    Project = apps.get_model("portfolio", "Project")
    if Project.objects.filter(title=TITLE).exists():
        return

    Project.objects.create(
        title=TITLE,
        description=DESCRIPTION,
        tech_stack=TECH_STACK,
        image="/static/tabulatorsystem1.png",
        gallery_images=GALLERY,
        github_link="https://github.com/Guevarra-Alpie01/Tabulation-System",
        live_link="",
        sort_order=15,
    )


def remove_offline_tabulator_project(apps, schema_editor):
    Project = apps.get_model("portfolio", "Project")
    Project.objects.filter(title=TITLE).delete()


class Migration(migrations.Migration):
    dependencies = [
        ("portfolio", "0007_remove_sample_projects"),
    ]

    operations = [
        migrations.RunPython(add_offline_tabulator_project, remove_offline_tabulator_project),
    ]

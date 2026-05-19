from django.db import migrations

TITLE = "Offline Tabulator System"

NEW_GALLERY = (
    "/static/tabulatorsystem1.png,"
    "/static/tabulator_system2.png,"
    "/static/tabulator_system3.3.png,"
    "/static/tabulator_system4.png,"
    "/static/tabulator_system5.5.png"
)

OLD_GALLERY = (
    "/static/tabulatorsystem1.png,"
    "/static/tabulatorsystem2.png,"
    "/static/tabulatorsystem3.png,"
    "/static/tabulatorsystem4.png,"
    "/static/tabulatorsystem5.png,"
    "/static/tabulatorsystem6.png"
)


def use_new_tabulator_gallery(apps, schema_editor):
    Project = apps.get_model("portfolio", "Project")
    Project.objects.filter(title=TITLE).update(
        gallery_images=NEW_GALLERY,
        image="/static/tabulatorsystem1.png",
    )


def revert_tabulator_gallery(apps, schema_editor):
    Project = apps.get_model("portfolio", "Project")
    Project.objects.filter(title=TITLE).update(
        gallery_images=OLD_GALLERY,
        image="/static/tabulatorsystem1.png",
    )


class Migration(migrations.Migration):
    dependencies = [
        ("portfolio", "0008_offline_tabulator_project"),
    ]

    operations = [
        migrations.RunPython(use_new_tabulator_gallery, revert_tabulator_gallery),
    ]

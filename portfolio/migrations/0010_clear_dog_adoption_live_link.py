from django.db import migrations

DOG_TITLE = "Dog Adoption system"
OLD_LIVE = "https://bayawanvet.pythonanywhere.com/"


def clear_dog_adoption_live_link(apps, schema_editor):
    Project = apps.get_model("portfolio", "Project")
    Project.objects.filter(title=DOG_TITLE).update(live_link="")


def restore_dog_adoption_live_link(apps, schema_editor):
    Project = apps.get_model("portfolio", "Project")
    Project.objects.filter(title=DOG_TITLE).update(live_link=OLD_LIVE)


class Migration(migrations.Migration):
    dependencies = [
        ("portfolio", "0009_offline_tabulator_gallery_filenames"),
    ]

    operations = [
        migrations.RunPython(clear_dog_adoption_live_link, restore_dog_adoption_live_link),
    ]

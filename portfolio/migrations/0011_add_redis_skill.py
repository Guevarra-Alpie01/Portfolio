from django.db import migrations


def add_redis_skill(apps, schema_editor):
    Skill = apps.get_model("portfolio", "Skill")
    Skill.objects.update_or_create(name="Redis", defaults={"level": 80})


def remove_redis_skill(apps, schema_editor):
    Skill = apps.get_model("portfolio", "Skill")
    Skill.objects.filter(name="Redis").delete()


class Migration(migrations.Migration):
    dependencies = [
        ("portfolio", "0010_clear_dog_adoption_live_link"),
    ]

    operations = [
        migrations.RunPython(add_redis_skill, remove_redis_skill),
    ]

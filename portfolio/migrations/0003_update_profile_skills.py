from django.db import migrations


UPDATED_SKILLS = [
    ("Python", 92),
    ("Django", 90),
    ("Bootstrap", 86),
    ("Tailwind CSS", 88),
    ("HTML", 90),
    ("CSS", 88),
    ("JavaScript", 87),
    ("MySQL", 82),
    ("PostgreSQL", 80),
    ("SQLite", 84),
    ("Git / GitHub", 85),
]

LEGACY_SAMPLE_SKILLS = [
    ("Django REST Framework", 82),
    ("React", 80),
    ("Git", 79),
]


def apply_profile_skills(apps, schema_editor):
    Skill = apps.get_model("portfolio", "Skill")

    for name, level in UPDATED_SKILLS:
        Skill.objects.update_or_create(name=name, defaults={"level": level})

    Skill.objects.filter(name__in=[name for name, _ in LEGACY_SAMPLE_SKILLS]).delete()


def revert_profile_skills(apps, schema_editor):
    Skill = apps.get_model("portfolio", "Skill")

    Skill.objects.filter(name__in=[name for name, _ in UPDATED_SKILLS]).delete()

    for name, level in LEGACY_SAMPLE_SKILLS:
        Skill.objects.update_or_create(name=name, defaults={"level": level})


class Migration(migrations.Migration):
    dependencies = [
        ("portfolio", "0002_seed_portfolio_data"),
    ]

    operations = [
        migrations.RunPython(apply_profile_skills, revert_profile_skills),
    ]

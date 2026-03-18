from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="ContactMessage",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=120)),
                ("email", models.EmailField(max_length=254)),
                ("message", models.TextField(max_length=1200)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
            ],
            options={"ordering": ["-created_at"]},
        ),
        migrations.CreateModel(
            name="Project",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("title", models.CharField(max_length=200)),
                ("description", models.TextField()),
                ("tech_stack", models.CharField(max_length=255)),
                (
                    "image",
                    models.CharField(
                        blank=True,
                        help_text="Use a local media path or a frontend asset path.",
                        max_length=255,
                    ),
                ),
                ("github_link", models.URLField()),
                ("created_at", models.DateTimeField(auto_now_add=True)),
            ],
            options={"ordering": ["-created_at", "title"]},
        ),
        migrations.CreateModel(
            name="Skill",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=120, unique=True)),
                (
                    "level",
                    models.PositiveSmallIntegerField(
                        help_text="Skill confidence level from 1 to 100.",
                        validators=[MinValueValidator(1), MaxValueValidator(100)],
                    ),
                ),
            ],
            options={"ordering": ["-level", "name"]},
        ),
    ]

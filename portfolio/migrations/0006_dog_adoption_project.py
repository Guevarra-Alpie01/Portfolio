from django.db import migrations


TECH_STACK = "Django, Python, HTML, CSS, JavaScript, Bootstrap, Tailwind, Redis, Google Auth"

DESCRIPTION = (
    "My capstone project—developed end-to-end as the full-stack developer. "
    "Built with Django, Python, HTML, CSS, JavaScript, Bootstrap, Tailwind, "
    "Redis for caching, and Google authentication for signup and login. "
    "Bayawan Vet is a dog adoption platform for Bayawan City: rescues and "
    "dogs at the pound get a fair path to adoption or redemption by owners."
)

GALLERY = (
    "/static/bayawanvet.png,/static/bayawanvet2.png,"
    "/static/bayawanvet3.jpeg,/static/bayawanvet4.png"
)


def add_dog_adoption_project(apps, schema_editor):
    Project = apps.get_model("portfolio", "Project")
    title = "Dog Adoption system"
    if Project.objects.filter(title=title).exists():
        return

    Project.objects.create(
        title=title,
        description=DESCRIPTION,
        tech_stack=TECH_STACK,
        image="/static/bayawanvet.png",
        gallery_images=GALLERY,
        github_link="https://github.com/Guevarra-Alpie01/Capstone_DogAdoption",
        live_link="",
        sort_order=10,
    )


def remove_dog_adoption_project(apps, schema_editor):
    Project = apps.get_model("portfolio", "Project")
    Project.objects.filter(title="Dog Adoption system").delete()


class Migration(migrations.Migration):
    dependencies = [
        ("portfolio", "0005_ai_detector_tech_stack"),
    ]

    operations = [
        migrations.RunPython(add_dog_adoption_project, remove_dog_adoption_project),
    ]

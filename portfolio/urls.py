from django.urls import path

from .views import ContactCreateAPIView, ProjectListAPIView, SkillListAPIView


app_name = "portfolio"

urlpatterns = [
    path("projects/", ProjectListAPIView.as_view(), name="project-list"),
    path("skills/", SkillListAPIView.as_view(), name="skill-list"),
    path("contact/", ContactCreateAPIView.as_view(), name="contact-create"),
]

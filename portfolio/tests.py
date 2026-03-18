from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import ContactMessage, Project, Skill


class PortfolioApiTests(APITestCase):
    """Basic tests for the portfolio API endpoints."""

    def setUp(self):
        self.project, _ = Project.objects.get_or_create(
            title="Capstone Dashboard",
            defaults={
                "description": "A student project for tracking thesis milestones.",
                "tech_stack": "Django, React, Tailwind CSS, SQLite",
                "image": "/images/projects/capstone-dashboard.svg",
                "github_link": "https://github.com/example/capstone-dashboard",
            },
        )
        self.skill, _ = Skill.objects.get_or_create(
            name="API Testing",
            defaults={"level": 77},
        )

    def test_projects_endpoint_returns_projects(self):
        response = self.client.get(reverse("portfolio:project-list"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(any(item["title"] == self.project.title for item in response.data))

    def test_skills_endpoint_returns_skills(self):
        response = self.client.get(reverse("portfolio:skill-list"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(any(item["name"] == self.skill.name for item in response.data))

    def test_contact_endpoint_creates_message(self):
        payload = {
            "name": "Alex Student",
            "email": "alex@example.com",
            "message": "I would love to discuss a junior developer opportunity.",
        }
        response = self.client.post(
            reverse("portfolio:contact-create"), payload, format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(ContactMessage.objects.count(), 1)

    def test_contact_endpoint_rejects_short_message(self):
        payload = {
            "name": "A",
            "email": "alex@example.com",
            "message": "Too short",
        }
        response = self.client.post(
            reverse("portfolio:contact-create"), payload, format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

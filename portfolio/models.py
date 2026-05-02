from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models


class Project(models.Model):
    """Stores featured work that will appear in the portfolio frontend."""

    title = models.CharField(max_length=200)
    description = models.TextField()
    tech_stack = models.CharField(max_length=255)
    image = models.CharField(
        max_length=255,
        blank=True,
        help_text="Use a local media path or a frontend asset path.",
    )
    gallery_images = models.CharField(
        max_length=1000,
        blank=True,
        help_text="Comma-separated asset URLs shown as a carousel (first image doubles as fallback).",
    )
    github_link = models.URLField()
    live_link = models.URLField(blank=True, max_length=500)
    sort_order = models.PositiveIntegerField(
        default=100,
        help_text="Lower numbers appear earlier in the projects grid.",
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["sort_order", "title"]

    def __str__(self):
        return self.title


class Skill(models.Model):
    """Stores a skill name and a confidence level percentage."""

    name = models.CharField(max_length=120, unique=True)
    level = models.PositiveSmallIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(100)],
        help_text="Skill confidence level from 1 to 100.",
    )

    class Meta:
        ordering = ["-level", "name"]

    def __str__(self):
        return f"{self.name} ({self.level})"


class ContactMessage(models.Model):
    """Stores messages submitted through the contact form."""

    name = models.CharField(max_length=120)
    email = models.EmailField()
    message = models.TextField(max_length=1200)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"Message from {self.name}"

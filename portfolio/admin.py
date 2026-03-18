from django.contrib import admin

from .models import ContactMessage, Project, Skill


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    """Admin settings for the project model."""

    list_display = ("title", "tech_stack", "created_at")
    search_fields = ("title", "tech_stack")


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    """Admin settings for the skill model."""

    list_display = ("name", "level")
    search_fields = ("name",)
    ordering = ("-level",)


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    """Admin settings for stored contact messages."""

    list_display = ("name", "email", "created_at")
    search_fields = ("name", "email", "message")
    readonly_fields = ("name", "email", "message", "created_at")

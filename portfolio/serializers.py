from rest_framework import serializers

from .models import ContactMessage, Project, Skill


class ProjectSerializer(serializers.ModelSerializer):
    """Converts project model instances into JSON for the frontend."""

    tech_stack_items = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = [
            "id",
            "title",
            "description",
            "tech_stack",
            "tech_stack_items",
            "image",
            "github_link",
            "created_at",
        ]

    def get_tech_stack_items(self, obj):
        """Turn the comma separated tech stack into an easy-to-render list."""
        return [item.strip() for item in obj.tech_stack.split(",") if item.strip()]


class SkillSerializer(serializers.ModelSerializer):
    """Serializes skill entries for the skills section."""

    class Meta:
        model = Skill
        fields = ["id", "name", "level"]


class ContactMessageSerializer(serializers.ModelSerializer):
    """Validates and stores messages sent from the contact form."""

    class Meta:
        model = ContactMessage
        fields = ["id", "name", "email", "message", "created_at"]
        read_only_fields = ["id", "created_at"]

    def validate_name(self, value):
        """Reject very short names to keep submissions meaningful."""
        if len(value.strip()) < 2:
            raise serializers.ValidationError("Please enter at least 2 characters.")
        return value.strip()

    def validate_message(self, value):
        """Reject empty or overly short messages."""
        cleaned_message = value.strip()
        if len(cleaned_message) < 10:
            raise serializers.ValidationError(
                "Please enter at least 10 characters in your message."
            )
        return cleaned_message

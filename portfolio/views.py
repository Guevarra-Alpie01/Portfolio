import logging

from django.conf import settings
from django.core.mail import send_mail
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Project, Skill
from .serializers import (
    ContactMessageSerializer,
    ProjectSerializer,
    SkillSerializer,
)

logger = logging.getLogger(__name__)


def _notify_contact_via_email(contact) -> None:
    """Mail inbox when CONTACT_NOTIFICATION_TO + Gmail credentials are set."""
    recipient = getattr(settings, "CONTACT_NOTIFICATION_TO", "").strip()
    user = getattr(settings, "DJANGO_EMAIL_HOST_USER", "").strip()
    pwd = getattr(settings, "DJANGO_EMAIL_HOST_PASSWORD", "").strip()

    if not recipient or not user or not pwd:
        return

    subject = f"Portfolio contact: {contact.name}"
    body_lines = [
        contact.name,
        f"Reply to: {contact.email}",
        "",
        contact.message,
    ]
    send_mail(
        subject,
        "\n".join(body_lines),
        settings.DEFAULT_FROM_EMAIL,
        [recipient],
        reply_to=[contact.email],
        fail_silently=False,
    )


class ProjectListAPIView(APIView):
    """Returns every featured project for the frontend portfolio page."""

    def get(self, request):
        projects = Project.objects.all().order_by("sort_order", "title")
        serializer = ProjectSerializer(projects, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class SkillListAPIView(APIView):
    """Returns the student's current skills and confidence levels."""

    def get(self, request):
        skills = Skill.objects.all()
        serializer = SkillSerializer(skills, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ContactCreateAPIView(APIView):
    """Accepts contact form submissions and stores them in SQLite."""

    def post(self, request):
        serializer = ContactMessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            try:
                _notify_contact_via_email(serializer.instance)
            except Exception:
                logger.exception("Contact notification email failed; message was saved in the database.")

            return Response(
                {
                    "message": "Thanks for reaching out. Your message has been saved.",
                    "data": serializer.data,
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(
            {
                "message": "Please correct the highlighted errors and try again.",
                "errors": serializer.errors,
            },
            status=status.HTTP_400_BAD_REQUEST,
        )

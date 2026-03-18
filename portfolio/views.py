from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Project, Skill
from .serializers import (
    ContactMessageSerializer,
    ProjectSerializer,
    SkillSerializer,
)


class ProjectListAPIView(APIView):
    """Returns every featured project for the frontend portfolio page."""

    def get(self, request):
        projects = Project.objects.all()
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

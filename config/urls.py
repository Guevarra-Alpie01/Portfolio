"""Root URL routing for the portfolio backend."""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.http import JsonResponse
from django.urls import include, path
from django.shortcuts import render
from django.views.generic import RedirectView


def site_home(request):
    """Serve the built frontend when available, otherwise fall back to API JSON."""
    if settings.FRONTEND_INDEX_FILE.exists():
        return render(request, "index.html")

    return JsonResponse(
        {
            "message": "Portfolio backend is running.",
            "available_endpoints": [
                "/api/projects/",
                "/api/skills/",
                "/api/contact/",
            ],
        }
    )


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("portfolio.urls")),
    path(
        "favicon.ico",
        RedirectView.as_view(url=f"{settings.STATIC_URL}favicon.svg", permanent=False),
        name="favicon",
    ),
    path("", site_home, name="site-home"),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

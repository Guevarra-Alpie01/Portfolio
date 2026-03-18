"""Root URL routing for the portfolio backend."""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.http import JsonResponse
from django.urls import include, path
from django.views.generic import RedirectView


def api_home(_request):
    """Simple root response so newcomers can confirm the API is running."""
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
    path("", api_home, name="api-home"),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

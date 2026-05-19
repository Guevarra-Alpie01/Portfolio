from django.contrib import admin

from .models import Dog, VaccinationCard


@admin.register(Dog)
class DogAdmin(admin.ModelAdmin):
    list_display = ("name", "owner")


@admin.register(VaccinationCard)
class VaccinationCardAdmin(admin.ModelAdmin):
    list_display = ("dog", "created_by")

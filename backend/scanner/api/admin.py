from django.contrib import admin
from .models import Attendance


class AttendanceAdmin(admin.ModelAdmin):
    model = Attendance
    list_display = ['user', 'scanner', 'date', 'time_come', 'time_gone', 'difference']


admin.site.register(Attendance, AttendanceAdmin)

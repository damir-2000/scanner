from django.db import models
from users.models import CustomUser


class Attendance(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='user_attendance')
    scanner = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, related_name='scanner_attendance', null=True)
    date = models.DateField(auto_now_add=True)
    time_come = models.TimeField(null=True)
    time_gone = models.TimeField(null=True)
    difference = models.TimeField(null=True)

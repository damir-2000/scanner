from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.


class GroupUser(models.Model):
    name = models.CharField(max_length=45)

    def __str__(self):
        return self.name


class CustomUser(AbstractUser):
    group_user = models.ForeignKey(GroupUser,  on_delete=models.SET_NULL, related_name='user', null=True, blank=True)

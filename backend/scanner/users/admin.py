from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin

from .forms import CustomUserChangeForm, CustomUserCreationForm
from .models import CustomUser, GroupUser


class GroupUserAdmin(admin.ModelAdmin):
    model = GroupUser
    list_display = ['name']


class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = CustomUser
    list_display = ['email', 'username', 'group_user']


admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(GroupUser, GroupUserAdmin)


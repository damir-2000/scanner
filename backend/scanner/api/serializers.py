from rest_framework import serializers
from users.models import GroupUser, CustomUser
from .models import Attendance


class GroupListSerializers(serializers.ModelSerializer):
    class Meta:
        model = GroupUser
        fields = '__all__'


class UserSerializers(serializers.ModelSerializer):
    group_user = GroupListSerializers()

    class Meta:
        model = CustomUser
        fields = ['id', 'first_name', 'last_name', 'group_user']


class ScannerSerializers(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username']


class AttendanceSerializers(serializers.ModelSerializer):
    user = UserSerializers()
    scanner = ScannerSerializers()

    class Meta:
        model = Attendance
        fields = '__all__'

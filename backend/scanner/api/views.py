from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from users.models import CustomUser, GroupUser
from django.contrib.auth.models import Group
from .serializers import GroupListSerializers, AttendanceSerializers
from users.models import GroupUser
from .models import Attendance
from time import time

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_routes(request):
    routes = [
        'api/token',
        'api/token/refresh'
    ]
    return Response(routes)


@api_view(['GET'])
def group_list_view(request):
    group_list = GroupUser.objects.all()
    serializer = GroupListSerializers(group_list, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def create_user(request):
    data = request.data
    users_reg = CustomUser.objects.filter(username=data['username'])
    if users_reg:
        return Response({"status": "error"})

    user_group = GroupUser.objects.get(id=data['group'])
    user_data = {
        "username": data['username'],
        "email": data['email'],
        "password": data['password'],
        "first_name": data['first_name'],
        "last_name": data['last_name'],
        "group_user": user_group
    }
    role = Group.objects.get(name='user')
    user = CustomUser.objects.create_user(**user_data)
    user.groups.add(role)
    return Response({"status": "success"})


@api_view(['GET'])
def attendance_list_view(request):
    attendance_list = Attendance.objects.all()
    serializer = AttendanceSerializers(attendance_list, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def generate_view(request):
    data = {
        'id': request.user.id,
        'time': time()
    }
    return Response(data)

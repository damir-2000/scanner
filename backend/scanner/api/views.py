import datetime

from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from users.models import CustomUser, GroupUser
from django.contrib.auth.models import Group
from .serializers import GroupListSerializers, AttendanceSerializers
from users.models import GroupUser
from .models import Attendance
import time


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
@permission_classes([IsAuthenticated])
def attendance_list_view(request):
    attendance_list = Attendance.objects.all()
    serializer = AttendanceSerializers(attendance_list, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def generate_view(request):
    data = {
        'id': request.user.id,
        'time': time.time()
    }
    return Response(data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def scanner_detect_view(request):
    data = {
        "access": 0
    }
    exp_time = request.data.get('time')
    if time.time() - exp_time < 30:
        user_id = request.data.get('id')
        status = None
        attendance = Attendance.objects.filter(user=user_id, date=datetime.date.today()).last()
        user = CustomUser.objects.get(id=user_id)
        scanner = CustomUser.objects.get(id=request.user.id)
        if attendance and attendance.time_gone is None:
            attendance.time_gone = datetime.datetime.now().time()
            attendance.save()
            status = 1
        else:
            attendance = Attendance.objects.create(
                user=user,
                scanner=scanner,
                time_come=datetime.datetime.now().time()
            )
            status = 0


        data = {
            "access": 1,
            "status": status,
            'user': {
                'first_name': user.first_name,
                'last_name': user.last_name,
                'group': user.group_user.name,
                'date': datetime.date.today(),
                'time': datetime.datetime.now().time()
            }
        }
    return Response(data)

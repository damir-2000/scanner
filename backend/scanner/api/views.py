from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from users.models import CustomUser, GroupUser


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_routes(request):

    routes = [
        'api/token',
        'api/token/refresh'
    ]
    return Response(routes)


@api_view(['POST'])
def create_user(request):
    group = GroupUser.objects.get(id=1)
    CustomUser.objects.create_user(username="damir", email="damir@damir.com", password="123", first_name='Дамир', last_name='Дамир2', group_user=group)
    return Response({'test'})

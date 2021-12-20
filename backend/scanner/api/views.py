from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated


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
    return Response({})

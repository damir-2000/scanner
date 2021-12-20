from rest_framework import serializers
from django.contrib.auth.models import User


class UserCreate (serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['username', 'email']

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

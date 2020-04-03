from rest_framework import routers, serializers, viewsets
from mtgblueprint.model.models import Cards, Sets
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'is_staff']


class SetsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sets
        fields = ['id', 'name']


class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cards
        fields = ['id', 'name']

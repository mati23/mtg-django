from rest_framework import routers, serializers, viewsets
from mtgblueprint.models import Cards
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'is_staff']


class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cards
        fields = ['id', 'name']


class CardDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cards
        fields = ['id', 'name', 'image_normal', 'artist']

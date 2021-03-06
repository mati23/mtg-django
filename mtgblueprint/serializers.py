from rest_framework import routers, serializers, viewsets
from mtgblueprint.models import Decks
from mtgblueprint.model.Cards import Cards
from django.contrib.auth.models import User


class DeckCrudSerializer(serializers.ModelSerializer):
    class Meta:
        model = Decks


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


class DeckListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Decks
        fields = ['id', 'deck_description', 'title', 'image']


class DeckDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Decks
        fields = ['id', 'deck_description', 'user_id', 'card_list', 'title']

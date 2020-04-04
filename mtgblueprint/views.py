from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import viewsets
from mtgblueprint.model.models import Cards, Sets
from .serializers import CardSerializer, SetsSerializer, UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class SetsViewSet(viewsets.ModelViewSet):
    queryset = Sets.objects.all()
    serializer_class = SetsSerializer


class CardsViewSet(viewsets.ModelViewSet):
    queryset = Cards.objects.all()[:10]
    serializer_class = CardSerializer

from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import viewsets, generics, filters
from mtgblueprint.model.models import Cards, Sets
from .serializers import CardSerializer, SetsSerializer, UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class SetsViewSet(viewsets.ModelViewSet):
    queryset = Sets.objects.all()
    serializer_class = SetsSerializer


class CardsViewSet(generics.ListAPIView):
    serializer_class = CardSerializer

    def get_queryset(self):
        cards = self.kwargs['name']
        return Cards.objects.filter(name=cards)


class CardsListView(generics.ListAPIView):
    queryset = Cards.objects.all()
    serializer_class = CardSerializer
    filter_backends = [filters.SearchFilter]
    filter_fields = ['name']
    search_fields = ['name']

    def get_queryset(self):
        name = self.kwargs['name']
        print(name)
        cards = Cards.objects.filter(name__startswith=name)
        return cards

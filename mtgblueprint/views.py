from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import viewsets, generics, filters
from mtgblueprint.models import Cards
from .serializers import CardSerializer, UserSerializer, CardDetailSerializer
from django.views.generic import TemplateView
from rest_framework.views import APIView
from rest_framework.response import Response
import json

from django.forms.models import model_to_dict


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class CardsViewSet(viewsets.ModelViewSet):
    queryset = Cards.objects.all()
    serializer_class = CardSerializer

    def get_queryset(self):
        name = self.kwargs['name']
        cards = Cards.objects.filter(name__startswith='El')
        return cards


class CardsListView(generics.ListAPIView):
    queryset = Cards.objects.all()
    serializer_class = CardSerializer
    filter_backends = [filters.SearchFilter]
    filter_fields = ['name']
    search_fields = ['name']

    def get_queryset(self):
        name = self.kwargs['name']
        print(name)
        cards = Cards.objects.filter(
            name__startswith=name)
        return cards


class CardDetailView(generics.ListAPIView):
    serializer = CardDetailSerializer
    queryset = Cards.objects.all()

    def get(self, request, pk):
        card = model_to_dict(Cards.objects.get(id=pk))

        return Response(card)

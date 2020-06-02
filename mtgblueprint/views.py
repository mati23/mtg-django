from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import viewsets, generics, filters
from mtgblueprint.models import Cards, Decks
from .serializers import CardSerializer, UserSerializer, CardDetailSerializer, DeckListSerializer, DeckCrudSerializer
from django.views.generic import TemplateView
from rest_framework.views import APIView
from rest_framework.response import Response
import json
import re
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse


from django.forms.models import model_to_dict


def create(request):
    if(request.method == 'POST'):
        cardObject = json.loads(request.body.decode("UTF-8"))
        deckId = cardObject["deckId"]
        card_id = cardObject["id"]
        print(card_id)
        deck = Decks.objects.get(id=deckId)
        response_message = deck.check_quantity_before_insert(
            card_id, cardObject["quantity"])
        return JsonResponse({"response": response_message})

def save_changes(request):
    print("Test")
    if(request.method == 'POST'):
        deckObject = json.loads(request.body.decode("UTF-8"))
        deck = Decks.objects.get(id=deckObject["deckId"])
        response_message = deck.save_new_card_list(deckObject["newCardList"])
        return JsonResponse({"response": response_message})


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
    queryset = Cards.objects.all()[:5]
    serializer_class = CardSerializer
    filter_backends = [filters.SearchFilter]
    filter_fields = ['name']
    search_fields = ['name']

    def get_queryset(self):
        name = self.kwargs['name']
        print(name)
        cards = Cards.objects.filter(
            name__startswith=name)[:5]
        return cards


class CardDetailView(generics.ListAPIView):
    serializer = CardDetailSerializer
    queryset = Cards.objects.all()[:10]

    def get(self, request, pk):
        card = model_to_dict(Cards.objects.get(id=pk))

        return Response(card)


class DeckListView(generics.ListAPIView):
    serializer_class = DeckListSerializer
    queryset = Decks.objects.all()

    def get_queryset(self):
        decks = Decks.objects.all()
        return decks


class DeckDetailView(generics.ListAPIView):
    serializer = DeckListSerializer
    queryset = Decks.objects.all()

    def get(self, request, pk):
        deck = model_to_dict(Decks.objects.get(id=pk))

        return Response(deck)

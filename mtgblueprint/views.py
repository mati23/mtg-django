from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import viewsets, generics, filters
from mtgblueprint.models import Decks
from mtgblueprint.model.Cards import  Cards
from .serializers import CardSerializer, UserSerializer, CardDetailSerializer, DeckListSerializer, DeckCrudSerializer
from django.views.generic import TemplateView
from rest_framework.views import APIView
from rest_framework.response import Response
import json
import re
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
import mtgblueprint.customfunctions as cf
import os
from random import choice
import base64
from PIL import Image
from django.forms.models import model_to_dict
import io


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

def count_deck_mana(request):
    if(request.method=='POST'):
        print(json.loads(request.body.decode("UTF-8")))
        deckObject=json.loads(request.body.decode("UTF-8"))
        deck = Decks.objects.get(id=deckObject["deckId"])
        deck_mana = deck.count_mana_costs()
        return JsonResponse({"response":deck_mana})

def calculate_all_mana_decks(request):
    if (request.method == 'GET'):
        deck_list = []
        decks = Decks.objects.all()
        for index in decks:
            for object in json.loads(index.card_list):
                deck_list.append(object)
        global_deck_counter = cf.add_mana_counter_to_global_counter(deck_list)

    return JsonResponse({"response": global_deck_counter})

def set_auth_image(request):
    if(request.method=='GET'):
        path = '../mtgblueprint/front/src/assets/widescreen/'
        image_list = os.listdir(path)
        with open(path+choice(image_list),"rb") as image:
            encoded_image = base64.b64encode(image.read())

        print(encoded_image)
    return JsonResponse({"response": str(encoded_image,"utf-8")})



class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class CardsViewSet(viewsets.ModelViewSet):
    queryset = Cards.objects.all()
    serializer_class = CardSerializer

    def get_queryset(self):
        name = self.kwargs['name']
        cards = Cards.objects.filter(name__startswith=name)
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

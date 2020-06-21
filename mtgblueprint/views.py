from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import viewsets, generics, filters
from mtgblueprint.models import Decks, AuthToken
from mtgblueprint.model.Cards import Cards
from mtgblueprint.model.AuthUser import AuthUser
from .serializers import CardSerializer, UserSerializer, CardDetailSerializer, DeckListSerializer, DeckCrudSerializer
from rest_framework.response import Response
import json
from django.http import JsonResponse
import mtgblueprint.customfunctions as cf
import os, glob
from random import choice
import base64
from django.forms.models import model_to_dict
from datetime import datetime
import mtgblueprint.constants as c

def validate_token(token):
    try:
        auth_token = AuthToken.objects.get(key=token)
        user = AuthUser.objects.get(id=auth_token.user_id)
        if(user != None):
            return True
    except :
        return False

def get_image_thumbnail(image_path):
    path = c.root_path+'assets/'
    with open(path+image_path,"rb") as image:
        encoded_image = base64.b64encode(image.read())
        return encoded_image

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
            if(index.card_list != None):
                for object in json.loads(index.card_list):
                    deck_list.append(object)
        global_deck_counter = cf.add_mana_counter_to_global_counter(deck_list)
        image = get_homepage_image()

    return JsonResponse({"response": global_deck_counter, "image":str(image,'utf-8')})

def get_homepage_image():
    path = c.root_path + 'assets/homepage_wallpaper/'
    with open(path + 'wallpaper.jpg', "rb") as image:
        encoded_image = base64.b64encode(image.read())
        return encoded_image

def set_auth_image(request):
    if(request.method=='GET'):
        path = '../mtgblueprint/front/src/assets/widescreen/'
        image_list = os.listdir(path)
        with open(path+choice(image_list),"rb") as image:
            encoded_image = base64.b64encode(image.read())

        print(encoded_image)
    return JsonResponse({"response": str(encoded_image,"utf-8")})

def login_user(request):
    if(request.method == 'POST'):
        user_info = json.loads(request.body.decode("UTF-8"))
        try:
            user = AuthUser.objects.get(username=user_info.get('username'))
            response = "login failed"
            if(user!=None and user.password == user_info["password"]):
                auth_token = AuthToken.objects.get(user=user.id)
                user.save()
                response= "success"
            return JsonResponse({"response": response, "token":auth_token.key, "userId":user.id, "username":user.username})
        except:
            return JsonResponse({"response": str(NameError)})



def register_user(request):
    if(request.method == 'POST'):
        user_info = json.loads(request.body.decode("UTF-8"))
        user = AuthUser.objects.filter(username=user_info["username"])
        response = "fail"
        if(user != None):
            user = AuthUser()
            user.password = user_info["password"]
            user.email = user_info["email"]
            user.username = user_info["username"]
            user.is_active = 1
            user.is_staff = 0
            user.date_joined = datetime.today()
            user.save()
            token = AuthToken()
            token.save_token(user)
            token.save()
            print(token.key)
            response = "success"
        return JsonResponse({"response": response, "token":token.key,"username":user.username,"userId":user.id})

def get_deck_by_user(request):
    if request.method == 'POST':
        request_info = json.loads(request.body.decode("UTF-8"))
        token = request.headers.get('token')
        decks = []

        if(validate_token(token)):
            for deck in Decks.objects.filter(user=int(request_info.get("userId"))):
                image = ""
                if(deck.image != None):
                    image = get_image_thumbnail(deck.image)
                decks.append({"deck":deck.toJson(), "thumbnail":str(image, "utf-8")})
            return JsonResponse({"response": decks})
        else:
            return JsonResponse({"response": "no token"})

def  avatar_image_list(request):
    if request.method=='GET':
        path = c.root_path + 'assets/min/'
        images = []
        for file in os.listdir(path):
            with open(path+file, "rb") as image:
                encoded_image = base64.b64encode(image.read())
                images.append({"image":str(encoded_image, "utf-8"), "name":file.title().lower()})
        return JsonResponse({"response": images})
    return JsonResponse({"response": "error"})

def create_new_deck(request):
    if request.method =='POST':
        body = json.loads(request.body.decode("utf-8"))
        deck_name = body["deck_name"]
        deck_avatar_id = body["deck_avatar"]
        auth_token = AuthToken.objects.get( key = request.headers.get('token'))
        if(auth_token.key):
            user = AuthUser.objects.get(id=auth_token.user_id)
            deck = Decks()
            deck.user_id = user.id
            deck.title = deck_name
            deck.image = str(deck_avatar_id)
            deck.save()
            return JsonResponse({"response":"success"})
    else:
        return JsonResponse({"response":"error"})

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
        mana_counter = Cards.objects.get(id=pk).calculate_mana_cost()
        card['mana_counter']= json.dumps(mana_counter)
        print(card)
        return Response(card)


class DeckListView(generics.ListAPIView):
    serializer_class = DeckListSerializer
    queryset = Decks.objects.all()

    def get_queryset(self):
        print(self.request)
        request = self.request.data
        decks = Decks.objects.filter(user=request.get('userId'))
        return decks



class DeckDetailView(generics.ListAPIView):
    serializer = DeckListSerializer
    queryset = Decks.objects.all()

    def get(self, request, pk):
        deck = model_to_dict(Decks.objects.get(id=pk))

        return Response(deck)

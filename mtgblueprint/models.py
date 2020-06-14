# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models
import json
import re
import mtgblueprint.constants as c
import mtgblueprint.customfunctions as cf
from mtgblueprint.model.AuthUser import AuthUser
import secrets
import datetime

from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User


class Decks(models.Model):
    id = models.IntegerField(primary_key=True)
    deck_description = models.CharField(max_length=255, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    card_list = models.CharField(blank=True, null=True)
    created_at = models.DateField()
    updated_at = models.DateField()
    title = models.TextField()
    image = models.TextField()

    def getCardList(self):
        return self.card_list

    def toJson(self):
        return json.dumps(self, default=lambda o: o.__dict__)

    def check_quantity_before_insert(self, id, quantity):
        if self.card_list != None:
            card_list_object = json.loads(self.card_list)
        else:
            card_list_object = []
        try:
            for index in range(0, len(card_list_object)):
                result = re.search(id, card_list_object[index]['id'])
                if result is not None and (card_list_object[index]['quantity']+quantity <= 4):
                    card_list_object[index]['quantity'] = card_list_object[index]['quantity'] + quantity
                    new_card_list = json.dumps(card_list_object)
                    self.card_list = new_card_list
                    self.save()
                    return "SUCCESS"
                elif result is not None and (card_list_object[index]['quantity']+quantity > 4):
                    print("quantidade excedida")
                    return c.EXCCEDED_CARD_QUANTITY_EXCEPTION

            card_list_object.append({
                'id': id,
                'quantity': quantity
            })
            self.card_list = json.dumps(card_list_object)
            self.save()
            return "SUCCESS"
        except NameError:
            return (c.EXCEPTION_HAPPENED + NameError)

    def save_new_card_list(self, new_card_list):
        try:
            print(type(self.card_list), type(new_card_list), type(json.dumps(new_card_list)))
            self.card_list = json.dumps(new_card_list)
            print(self.card_list)
            self.save()
            return c.SUCCESS
        except:
            return (c.EXCEPTION_HAPPENED + NameError)

    def count_mana_costs(self):
        card_array = json.loads(self.card_list)
        dictionary_list = cf.calculate_mana_counter(card_array)
        return json.dumps(dictionary_list)


    class Meta:
        managed = False
        db_table = 'decks'
        app_label = 'decks'

class GeneralInformation(models.Model):
    id = models.IntegerField(null=False)
    information_description = models.CharField(max_length=255)
    information_value = models.CharField()

    class Meta:
        managed = False
        db_table='general_information'
        app_label='general_information'


class DjangoMigrations(models.Model):
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'
        app_label = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'
        app_label = ''


class DjangoSite(models.Model):
    domain = models.CharField(unique=True, max_length=100)
    name = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'django_site'
        app_label = ''

class AuthToken(models.Model):
    key = models.CharField(unique=True, max_length=40)
    created = models.DateField(default=datetime.date.today)
    user = models.ForeignKey(AuthUser,models.DO_NOTHING)


    def save_token(self,user):
        self.key = secrets.token_urlsafe(16)
        self.user = user

    class Meta:
        managed=False
        db_table='authtoken_token'
        app_label='authtoken_token'
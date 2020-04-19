# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'
        app_label = 'auth_group'


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'
        app_label = 'auth_user'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        app_label = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.PositiveSmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey(
        DjangoContentType, models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'
        app_label = 'django_admin_log'


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey(DjangoContentType, models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        app_label = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthGroupPermissions(models.Model):
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        app_label = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthUserGroups(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        app_label = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        app_label = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class Cards(models.Model):
    id = models.CharField(primary_key=True, max_length=255)
    oracle_id = models.CharField(max_length=255, blank=True, null=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    lang = models.CharField(max_length=255, blank=True, null=True)
    released_at = models.CharField(max_length=255, blank=True, null=True)
    uri = models.CharField(max_length=255, blank=True, null=True)
    scryfall_uri = models.CharField(max_length=255, blank=True, null=True)
    layout = models.CharField(max_length=255, blank=True, null=True)
    highres_image = models.IntegerField(blank=True, null=True)
    image_small = models.CharField(max_length=255, blank=True, null=True)
    image_normal = models.CharField(max_length=255, blank=True, null=True)
    image_large = models.CharField(max_length=255, blank=True, null=True)
    image_png = models.CharField(max_length=255, blank=True, null=True)
    image_art_crop = models.CharField(max_length=255, blank=True, null=True)
    image_border_crop = models.CharField(max_length=255, blank=True, null=True)
    mana_cost = models.CharField(max_length=45, blank=True, null=True)
    cmc = models.CharField(max_length=45, blank=True, null=True)
    type_line = models.CharField(max_length=45, blank=True, null=True)
    oracle_text = models.TextField(blank=True, null=True)
    colors = models.CharField(max_length=45, blank=True, null=True)
    color_identity = models.CharField(max_length=45, blank=True, null=True)
    reserved = models.IntegerField(blank=True, null=True)
    foil = models.IntegerField(blank=True, null=True)
    oversized = models.IntegerField(blank=True, null=True)
    promo = models.IntegerField(blank=True, null=True)
    reprint = models.IntegerField(blank=True, null=True)
    variation = models.IntegerField(blank=True, null=True)
    set = models.CharField(max_length=45, blank=True, null=True)
    set_name = models.CharField(max_length=45, blank=True, null=True)
    set_type = models.CharField(max_length=45, blank=True, null=True)
    set_uri = models.CharField(max_length=255, blank=True, null=True)
    set_search_uri = models.CharField(max_length=255, blank=True, null=True)
    scryfall_set_uri = models.CharField(max_length=255, blank=True, null=True)
    rulings_uri = models.CharField(max_length=255, blank=True, null=True)
    collector_number = models.CharField(max_length=10, blank=True, null=True)
    digital = models.IntegerField(blank=True, null=True)
    rarity = models.CharField(max_length=45, blank=True, null=True)
    card_back_id = models.CharField(max_length=45, blank=True, null=True)
    artist = models.CharField(max_length=45, blank=True, null=True)
    artist_id = models.CharField(max_length=45, blank=True, null=True)
    illustration_id = models.CharField(max_length=45, blank=True, null=True)
    border_color = models.CharField(max_length=45, blank=True, null=True)
    frame = models.CharField(max_length=45, blank=True, null=True)
    full_art = models.IntegerField(blank=True, null=True)
    textless = models.IntegerField(blank=True, null=True)
    booster = models.IntegerField(blank=True, null=True)
    story_spotlight = models.IntegerField(blank=True, null=True)
    edhrec_rank = models.CharField(max_length=45, blank=True, null=True)
    prints_search_uri = models.CharField(max_length=255, blank=True, null=True)
    artist_ids = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'cards'
        app_label = 'cards'


class Decks(models.Model):
    id = models.IntegerField(primary_key=True)
    deck_description = models.CharField(max_length=255, blank=True, null=True)
    user_id = models.IntegerField()
    card_list = models.CharField(blank=True, null=True)
    created_at = models.DateField()
    updated_at = models.DateField()
    title = models.TextField()
    image = models.TextField()

    class Meta:
        managed = False
        db_table = 'decks'
        app_label = 'decks'


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

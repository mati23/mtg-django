# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Sets(models.Model):
    # Field name made lowercase.
    basesetsize = models.IntegerField(
        db_column='baseSetSize', blank=True, null=True)
    block = models.TextField(blank=True, null=True)
    # Field name made lowercase.
    boosterv3 = models.TextField(db_column='boosterV3', blank=True, null=True)
    code = models.CharField(unique=True, max_length=8)
    # Field name made lowercase.
    codev3 = models.TextField(db_column='codeV3', blank=True, null=True)
    # Field name made lowercase.
    isfoilonly = models.IntegerField(db_column='isFoilOnly')
    # Field name made lowercase.
    isforeignonly = models.IntegerField(db_column='isForeignOnly')
    # Field name made lowercase.
    isonlineonly = models.IntegerField(db_column='isOnlineOnly')
    # Field name made lowercase.
    ispartialpreview = models.IntegerField(db_column='isPartialPreview')
    # Field name made lowercase.
    keyrunecode = models.TextField(
        db_column='keyruneCode', blank=True, null=True)
    # Field name made lowercase.
    mcmid = models.IntegerField(db_column='mcmId', blank=True, null=True)
    # Field name made lowercase.
    mcmname = models.TextField(db_column='mcmName', blank=True, null=True)
    meta = models.TextField(blank=True, null=True)
    # Field name made lowercase.
    mtgocode = models.TextField(db_column='mtgoCode', blank=True, null=True)
    name = models.TextField(blank=True, null=True)
    # Field name made lowercase.
    parentcode = models.TextField(
        db_column='parentCode', blank=True, null=True)
    # Field name made lowercase.
    releasedate = models.DateField(
        db_column='releaseDate', blank=True, null=True)
    # Field name made lowercase.
    tcgplayergroupid = models.IntegerField(
        db_column='tcgplayerGroupId', blank=True, null=True)
    # Field name made lowercase.
    totalsetsize = models.IntegerField(
        db_column='totalSetSize', blank=True, null=True)
    type = models.CharField(max_length=16, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'sets'
        app_label = 'sets'


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'
        app_label = 'auth_group'


class AuthGroupPermissions(models.Model):
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        app_label = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        app_label = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


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
    artist = models.TextField(blank=True, null=True)
    # Field name made lowercase.
    bordercolor = models.CharField(
        db_column='borderColor', max_length=10, blank=True, null=True)
    # Field name made lowercase.
    coloridentity = models.TextField(
        db_column='colorIdentity', blank=True, null=True)
    # Field name made lowercase.
    colorindicator = models.TextField(
        db_column='colorIndicator', blank=True, null=True)
    colors = models.TextField(blank=True, null=True)
    # Field name made lowercase.
    convertedmanacost = models.FloatField(
        db_column='convertedManaCost', blank=True, null=True)
    # Field name made lowercase.
    dueldeck = models.TextField(db_column='duelDeck', blank=True, null=True)
    # Field name made lowercase.
    edhrecrank = models.IntegerField(
        db_column='edhrecRank', blank=True, null=True)
    # Field name made lowercase.
    faceconvertedmanacost = models.FloatField(
        db_column='faceConvertedManaCost', blank=True, null=True)
    # Field name made lowercase.
    flavortext = models.TextField(
        db_column='flavorText', blank=True, null=True)
    # Field name made lowercase.
    frameeffect = models.CharField(
        db_column='frameEffect', max_length=14, blank=True, null=True)
    # Field name made lowercase.
    frameeffects = models.TextField(
        db_column='frameEffects', blank=True, null=True)
    # Field name made lowercase.
    frameversion = models.CharField(
        db_column='frameVersion', max_length=6, blank=True, null=True)
    hand = models.TextField(blank=True, null=True)
    # Field name made lowercase.
    hasfoil = models.IntegerField(db_column='hasFoil')
    # Field name made lowercase.
    hasnodecklimit = models.IntegerField(db_column='hasNoDeckLimit')
    # Field name made lowercase.
    hasnonfoil = models.IntegerField(db_column='hasNonFoil')
    # Field name made lowercase.
    isalternative = models.IntegerField(db_column='isAlternative')
    # Field name made lowercase.
    isarena = models.IntegerField(db_column='isArena')
    # Field name made lowercase.
    isbuyabox = models.IntegerField(db_column='isBuyABox')
    # Field name made lowercase.
    isdatestamped = models.IntegerField(db_column='isDateStamped')
    # Field name made lowercase.
    isfullart = models.IntegerField(db_column='isFullArt')
    # Field name made lowercase.
    ismtgo = models.IntegerField(db_column='isMtgo')
    # Field name made lowercase.
    isonlineonly = models.IntegerField(db_column='isOnlineOnly')
    # Field name made lowercase.
    isoversized = models.IntegerField(db_column='isOversized')
    # Field name made lowercase.
    ispaper = models.IntegerField(db_column='isPaper')
    # Field name made lowercase.
    ispromo = models.IntegerField(db_column='isPromo')
    # Field name made lowercase.
    isreprint = models.IntegerField(db_column='isReprint')
    # Field name made lowercase.
    isreserved = models.IntegerField(db_column='isReserved')
    # Field name made lowercase.
    isstarter = models.IntegerField(db_column='isStarter')
    # Field name made lowercase.
    isstoryspotlight = models.IntegerField(db_column='isStorySpotlight')
    # Field name made lowercase.
    istextless = models.IntegerField(db_column='isTextless')
    # Field name made lowercase.
    istimeshifted = models.IntegerField(db_column='isTimeshifted')
    layout = models.CharField(max_length=9, blank=True, null=True)
    # Field name made lowercase.
    leadershipskills = models.TextField(
        db_column='leadershipSkills', blank=True, null=True)
    life = models.TextField(blank=True, null=True)
    loyalty = models.TextField(blank=True, null=True)
    # Field name made lowercase.
    manacost = models.TextField(db_column='manaCost', blank=True, null=True)
    # Field name made lowercase.
    mcmid = models.IntegerField(db_column='mcmId', blank=True, null=True)
    # Field name made lowercase.
    mcmmetaid = models.IntegerField(
        db_column='mcmMetaId', blank=True, null=True)
    # Field name made lowercase.
    mtgarenaid = models.IntegerField(
        db_column='mtgArenaId', blank=True, null=True)
    # Field name made lowercase.
    mtgofoilid = models.IntegerField(
        db_column='mtgoFoilId', blank=True, null=True)
    # Field name made lowercase.
    mtgoid = models.IntegerField(db_column='mtgoId', blank=True, null=True)
    # Field name made lowercase.
    multiverseid = models.IntegerField(
        db_column='multiverseId', blank=True, null=True)
    name = models.TextField(blank=True, null=True)
    names = models.TextField(blank=True, null=True)
    number = models.TextField(blank=True, null=True)
    # Field name made lowercase.
    originaltext = models.TextField(
        db_column='originalText', blank=True, null=True)
    # Field name made lowercase.
    originaltype = models.TextField(
        db_column='originalType', blank=True, null=True)
    # Field name made lowercase.
    otherfaceids = models.TextField(
        db_column='otherFaceIds', blank=True, null=True)
    power = models.TextField(blank=True, null=True)
    printings = models.TextField(blank=True, null=True)
    # Field name made lowercase.
    purchaseurls = models.TextField(
        db_column='purchaseUrls', blank=True, null=True)
    rarity = models.CharField(max_length=8, blank=True, null=True)
    # Field name made lowercase.
    scryfallid = models.TextField(
        db_column='scryfallId', blank=True, null=True)
    # Field name made lowercase.
    scryfallillustrationid = models.TextField(
        db_column='scryfallIllustrationId', blank=True, null=True)
    # Field name made lowercase.
    scryfalloracleid = models.TextField(
        db_column='scryfallOracleId', blank=True, null=True)
    # Field name made lowercase.
    setcode = models.ForeignKey(Sets, models.DO_NOTHING, db_column='setCode')
    side = models.TextField(blank=True, null=True)
    subtypes = models.TextField(blank=True, null=True)
    supertypes = models.TextField(blank=True, null=True)
    # Field name made lowercase.
    tcgplayerproductid = models.IntegerField(
        db_column='tcgplayerProductId', blank=True, null=True)
    text = models.TextField(blank=True, null=True)
    toughness = models.TextField(blank=True, null=True)
    type = models.TextField(blank=True, null=True)
    types = models.TextField(blank=True, null=True)
    uuid = models.CharField(unique=True, max_length=36)
    variations = models.TextField(blank=True, null=True)
    watermark = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'cards'
        app_label = 'cards'


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.PositiveSmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey(
        'DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'
        app_label = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        app_label = 'django_content_type'
        unique_together = (('app_label', 'model'),)


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
        app_label = 'django_session'


class ForeignData(models.Model):
    # Field name made lowercase.
    flavortext = models.TextField(
        db_column='flavorText', blank=True, null=True)
    language = models.CharField(max_length=19, blank=True, null=True)
    # Field name made lowercase.
    multiverseid = models.IntegerField(
        db_column='multiverseId', blank=True, null=True)
    name = models.TextField(blank=True, null=True)
    text = models.TextField(blank=True, null=True)
    type = models.TextField(blank=True, null=True)
    uuid = models.ForeignKey(Cards, models.DO_NOTHING, db_column='uuid')

    class Meta:
        managed = False
        db_table = 'foreign_data'
        app_label = 'foreign_data'


class Legalities(models.Model):
    format = models.CharField(max_length=9, blank=True, null=True)
    status = models.CharField(max_length=10, blank=True, null=True)
    uuid = models.ForeignKey(Cards, models.DO_NOTHING, db_column='uuid')

    class Meta:
        managed = False
        db_table = 'legalities'
        app_label = 'legalities'


class Prices(models.Model):
    date = models.DateField(blank=True, null=True)
    price = models.DecimalField(
        max_digits=8, decimal_places=2, blank=True, null=True)
    type = models.CharField(max_length=9, blank=True, null=True)
    uuid = models.ForeignKey(Cards, models.DO_NOTHING, db_column='uuid')

    class Meta:
        managed = False
        db_table = 'prices'
        app_label = 'prices'


class Rulings(models.Model):
    date = models.DateField(blank=True, null=True)
    text = models.TextField(blank=True, null=True)
    uuid = models.ForeignKey(Cards, models.DO_NOTHING, db_column='uuid')

    class Meta:
        managed = False
        db_table = 'rulings'
        app_label = 'rulings'


class SetTranslations(models.Model):
    language = models.CharField(max_length=19, blank=True, null=True)
    # Field name made lowercase.
    setcode = models.ForeignKey(
        'Sets', models.DO_NOTHING, db_column='setCode', to_field='code')
    translation = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'set_translations'
        app_label = 'set_translations'


class Tokens(models.Model):
    artist = models.TextField(blank=True, null=True)
    # Field name made lowercase.
    bordercolor = models.CharField(
        db_column='borderColor', max_length=6, blank=True, null=True)
    # Field name made lowercase.
    coloridentity = models.TextField(
        db_column='colorIdentity', blank=True, null=True)
    colors = models.TextField(blank=True, null=True)
    # Field name made lowercase.
    isonlineonly = models.IntegerField(db_column='isOnlineOnly')
    layout = models.CharField(max_length=18, blank=True, null=True)
    name = models.TextField(blank=True, null=True)
    names = models.TextField(blank=True, null=True)
    number = models.TextField(blank=True, null=True)
    power = models.TextField(blank=True, null=True)
    # Field name made lowercase.
    reverserelated = models.TextField(
        db_column='reverseRelated', blank=True, null=True)
    # Field name made lowercase.
    scryfallid = models.TextField(
        db_column='scryfallId', blank=True, null=True)
    # Field name made lowercase.
    scryfallillustrationid = models.TextField(
        db_column='scryfallIllustrationId', blank=True, null=True)
    # Field name made lowercase.
    scryfalloracleid = models.TextField(
        db_column='scryfallOracleId', blank=True, null=True)
    # Field name made lowercase.
    setcode = models.ForeignKey(
        Sets, models.DO_NOTHING, db_column='setCode', to_field='code')
    side = models.TextField(blank=True, null=True)
    subtypes = models.TextField(blank=True, null=True)
    supertypes = models.TextField(blank=True, null=True)
    text = models.TextField(blank=True, null=True)
    toughness = models.TextField(blank=True, null=True)
    type = models.TextField(blank=True, null=True)
    types = models.TextField(blank=True, null=True)
    uuid = models.CharField(max_length=36)
    watermark = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'tokens'
        app_label = 'tokens'

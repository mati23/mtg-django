from django.db import models
from mtgblueprint.model import AuthUser, AuthGroup
class AuthUserGroups(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        app_label = 'auth_user_groups'
        unique_together = (('user', 'group'),)

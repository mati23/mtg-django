from django.db import models
from mtgblueprint.model import AuthPermission, AuthGroup

class AuthGroupPermissions(models.Model):
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        app_label = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


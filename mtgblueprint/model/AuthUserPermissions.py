from django.db import models
from mtgblueprint.model import AuthUser, AuthPermission
class AuthUserUserPermissions(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        app_label = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


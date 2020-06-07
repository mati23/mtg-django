from django.db import models
from mtgblueprint.model import DjangoContentType

class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey(DjangoContentType, models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        app_label = 'auth_permission'
        unique_together = (('content_type', 'codename'),)

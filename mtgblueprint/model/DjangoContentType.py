from django.db import models

class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        app_label = 'django_content_type'
        unique_together = (('app_label', 'model'),)


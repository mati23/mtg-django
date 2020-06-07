from django.db import models

class GeneralInformation(models.Model):
    id = models.IntegerField(null=False)
    information_description = models.CharField(max_length=255)
    information_value = models.CharField()

    class Meta:
        managed = False
        db_table='general_information'
        app_label='general_information'

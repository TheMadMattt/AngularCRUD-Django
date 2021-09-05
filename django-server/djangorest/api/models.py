from django.db import models

class Category(models.Model):
    id = models.IntegerField()
    name = models.CharField(max_length=70, blank=False, default='')
    ordering = model.IntegerField()

class Offer(models.Model):
    id = models.IntegerField()
    name = models.CharField(max_length=70, blank=False, default='')
    ordering = model.IntegerField()
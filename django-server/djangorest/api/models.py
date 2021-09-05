from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=100, blank=False, default='')

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']


class Offer(models.Model):
    title = models.CharField(max_length=50, blank=False, default='')
    description = models.TextField()
    price = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return self.title

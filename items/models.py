from django.db import models

# Create your models here.

class Item(models.Model):
    PRIMARY = 'Primary'
    SECONDARY = 'Secondary'
    GROUP_CHOICES = [
        (PRIMARY, 'Primary'),
        (SECONDARY, 'Secondary'),
    ]

    name = models.CharField(max_length=100)
    group = models.CharField(max_length=20, choices=GROUP_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('name', 'group')
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} ({self.group})"

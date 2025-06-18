from rest_framework import serializers
from .models import Item

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ['id', 'name', 'group', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

    def validate(self, data):
        name = data.get('name', None)
        group = data.get('group', None)
        if self.instance:
            # in the case of PUT or PATCH, exclude from uniqueness check
            qs = Item.objects.filter(name=name, group=group).exclude(pk=self.instance.pk)
        else:
            qs = Item.objects.filter(name=name, group=group)
        if qs.exists():
            raise serializers.ValidationError('Item with this name already exists in this group.')
        return data 
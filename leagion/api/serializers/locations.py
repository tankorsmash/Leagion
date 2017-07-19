from django.contrib.auth import get_user_model

from rest_framework import serializers

from leagion.models import Location

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ('id', 'name',)
        extra_kwargs = {
            'password': {'write_only': True},
            'id': {'read_only': True}
        }


    def create(self, validated_data):
        location = Location.objects.create(
            name=validated_data['name'],
        )

        return location

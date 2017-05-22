from django.contrib.auth import get_user_model

from rest_framework import serializers

from leagion.models import Team

User = get_user_model()

class ShallowTeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = (
            'id', 'name', 'season'
        )


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'password', 'email', 'first_name', 'last_name', 'full_name',
                'default_phonenumber', 'alt_phonenumber', 'teams',)
        extra_kwargs = {
            'password': {'write_only': True},
            'id': {'read_only': True}
        }

    teams = ShallowTeamSerializer(many=True, read_only=True)

    def create(self, validated_data):
        user = User.objects.create(
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )

        user.set_password(validated_data['password'])
        user.save()

        return user

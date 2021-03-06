# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2017-12-14 04:23
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import leagion.models.team
import leagion.models.user
import phonenumber_field.modelfields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0007_alter_validators_add_error_messages'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('created_at', models.DateTimeField(auto_now_add=True, null=True)),
                ('updated_at', models.DateTimeField(auto_now=True, null=True)),
                ('email', models.EmailField(max_length=255, unique=True, verbose_name='email address')),
                ('first_name', models.CharField(blank=True, max_length=254, null=True)),
                ('last_name', models.CharField(blank=True, max_length=254, null=True)),
                ('default_phonenumber', phonenumber_field.modelfields.PhoneNumberField(blank=True, max_length=128)),
                ('alt_phonenumber', phonenumber_field.modelfields.PhoneNumberField(blank=True, max_length=128)),
                ('is_active', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('is_commissioner', models.BooleanField(default=False)),
                ('is_moderator', models.BooleanField(default=False)),
                ('avatar', models.ImageField(null=True, upload_to=leagion.models.user.get_avatar_path)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Batter',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('index', models.IntegerField(null=True)),
                ('player', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='+', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='League',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('commissioner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='leagues_commissioned', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Location',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('address', models.CharField(blank=True, max_length=255, null=True)),
                ('geoposition', models.CharField(blank=True, max_length=255, null=True)),
                ('league', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='locations', to='leagion.League')),
            ],
        ),
        migrations.CreateModel(
            name='Match',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('home_points', models.IntegerField(blank=True, default=None, null=True)),
                ('away_points', models.IntegerField(blank=True, default=None, null=True)),
                ('match_datetime', models.DateTimeField()),
                ('duration_seconds', models.IntegerField(blank=True, default=0, null=True)),
                ('status', models.IntegerField(choices=[(0, 'Not Yet Played'), (1, 'Completed'), (2, 'Postponed')], default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Roster',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('players', models.ManyToManyField(through='leagion.Batter', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Season',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_date', models.DateField()),
                ('end_date', models.DateField()),
                ('league', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='seasons', to='leagion.League')),
            ],
        ),
        migrations.CreateModel(
            name='Team',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('color', models.IntegerField(default=0)),
                ('logo', models.ImageField(null=True, upload_to=leagion.models.team.get_logo_path)),
                ('captains', models.ManyToManyField(related_name='captain_of_teams', to=settings.AUTH_USER_MODEL)),
                ('players', models.ManyToManyField(related_name='teams', to=settings.AUTH_USER_MODEL)),
                ('season', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='teams', to='leagion.Season')),
            ],
        ),
        migrations.AddField(
            model_name='roster',
            name='team',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='+', to='leagion.Team'),
        ),
        migrations.AddField(
            model_name='match',
            name='away_roster',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='away_rosters', to='leagion.Roster'),
        ),
        migrations.AddField(
            model_name='match',
            name='away_team',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='away_matches', to='leagion.Team'),
        ),
        migrations.AddField(
            model_name='match',
            name='home_roster',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='home_rosters', to='leagion.Roster'),
        ),
        migrations.AddField(
            model_name='match',
            name='home_team',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='home_matches', to='leagion.Team'),
        ),
        migrations.AddField(
            model_name='match',
            name='location',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='matches', to='leagion.Location'),
        ),
        migrations.AddField(
            model_name='match',
            name='postponed_to',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='postponed_from', to='leagion.Match'),
        ),
        migrations.AddField(
            model_name='match',
            name='season',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='matches', to='leagion.Season'),
        ),
        migrations.AddField(
            model_name='batter',
            name='roster',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='batters', to='leagion.Roster'),
        ),
    ]

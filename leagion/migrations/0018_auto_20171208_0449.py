# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2017-12-08 04:49
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('leagion', '0017_auto_20171120_0310'),
    ]

    operations = [
        migrations.AlterField(
            model_name='match',
            name='away_points',
            field=models.IntegerField(blank=True, default=None, null=True),
        ),
        migrations.AlterField(
            model_name='match',
            name='home_points',
            field=models.IntegerField(blank=True, default=None, null=True),
        ),
    ]

# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2017-12-14 08:07
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('leagion', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='location',
            name='geoposition',
        ),
        migrations.AddField(
            model_name='location',
            name='address_latitude',
            field=models.DecimalField(blank=True, decimal_places=6, max_digits=9, null=True),
        ),
        migrations.AddField(
            model_name='location',
            name='address_longitude',
            field=models.DecimalField(blank=True, decimal_places=6, max_digits=9, null=True),
        ),
    ]

# -*- coding: utf-8 -*-
# Generated by Django 1.11.8 on 2017-12-15 06:01
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('leagion', '0003_auto_20171214_0809'),
    ]

    operations = [
        migrations.AlterField(
            model_name='location',
            name='address_latitude',
            field=models.DecimalField(blank=True, decimal_places=17, max_digits=20, null=True),
        ),
        migrations.AlterField(
            model_name='location',
            name='address_longitude',
            field=models.DecimalField(blank=True, decimal_places=17, max_digits=20, null=True),
        ),
    ]

# Generated by Django 5.0.6 on 2024-07-28 18:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stats', '0002_player'),
    ]

    operations = [
        migrations.CreateModel(
            name='StatLeader',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('player_id', models.IntegerField()),
                ('player_name', models.CharField(max_length=100)),
                ('stat_category', models.CharField(max_length=100)),
                ('stat_value', models.FloatField()),
                ('season', models.IntegerField()),
                ('stat_type', models.CharField(max_length=50)),
                ('team', models.CharField(max_length=100)),
            ],
        ),
    ]

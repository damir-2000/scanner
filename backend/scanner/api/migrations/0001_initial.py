# Generated by Django 4.0 on 2021-12-22 14:59

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Attendance',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(auto_now_add=True)),
                ('time_come', models.TimeField(null=True)),
                ('time_gone', models.TimeField(null=True)),
                ('difference', models.TimeField(null=True)),
                ('scanner', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='scanner_attendance', to='users.customuser')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_attendance', to='users.customuser')),
            ],
        ),
    ]

# Generated by Django 3.1.5 on 2021-02-03 02:39

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Bebida',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre_bebida', models.CharField(max_length=50, unique=True)),
                ('monto_bebida', models.DecimalField(decimal_places=2, max_digits=18)),
                ('imagen_bebida', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Pedido',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('estatus_pedido', models.CharField(max_length=50)),
                ('fecha_pedido', models.DateTimeField(verbose_name='date')),
                ('total_pedido', models.DecimalField(decimal_places=2, max_digits=18)),
                ('metodo_pedido', models.CharField(max_length=50)),
                ('usuario', models.CharField(max_length=50)),
                ('direccion_pedido', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Pizza',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('id_pedido', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='pizzeria.pedido')),
            ],
        ),
        migrations.CreateModel(
            name='TamanoPizza',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre_tamano', models.CharField(max_length=50, unique=True)),
                ('monto_tamano', models.DecimalField(decimal_places=2, max_digits=18)),
            ],
        ),
        migrations.CreateModel(
            name='Toppin',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre_toppin', models.CharField(max_length=50, unique=True)),
                ('monto_toppin', models.DecimalField(decimal_places=2, max_digits=18)),
                ('imagen_toppin', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='PizzaToppin',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('id_pizza', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='pizzeria.pizza')),
                ('id_toppin', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='pizzeria.toppin')),
            ],
        ),
        migrations.AddField(
            model_name='pizza',
            name='id_tamano',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='pizzeria.tamanopizza'),
        ),
        migrations.CreateModel(
            name='BebidaPedido',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('id_bebida', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='pizzeria.bebida')),
                ('id_pedido', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='pizzeria.pedido')),
            ],
        ),
    ]

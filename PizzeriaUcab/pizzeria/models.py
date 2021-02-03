from django.db import models
from pygments.lexers import get_all_lexers
from pygments.styles import get_all_styles

# Create your models here.

class TamanoPizza(models.Model):
    nombre_tamano = models.CharField(max_length=50, unique=True)
    monto_tamano = models.DecimalField(max_digits=18, decimal_places=2)

    def __str__(self):
        return self.nombre_tamano


class Toppin(models.Model):
    nombre_toppin = models.CharField(max_length=50, unique=True)
    monto_toppin = models.DecimalField(max_digits=18, decimal_places=2)
    imagen_toppin = models.CharField(max_length=200)

    def __str__(self):
        return self.nombre_toppin


class Bebida(models.Model):
    nombre_bebida = models.CharField(max_length=50, unique=True)
    monto_bebida = models.DecimalField(max_digits=18, decimal_places=2)
    imagen_bebida = models.CharField(max_length=200)

    def __str__(self):
        return self.nombre_bebida


class Pedido(models.Model):
    estatus_pedido = models.CharField(max_length=50)
    fecha_pedido =  models.DateTimeField('date')
    total_pedido = models.DecimalField(max_digits=18, decimal_places=2)
    metodo_pedido = models.CharField(max_length=50)
    usuario = models.CharField(max_length=50)
    direccion_pedido = models.CharField(max_length=50)


class Pizza(models.Model):
    id_pedido = models.ForeignKey(Pedido, on_delete=models.CASCADE)
    id_tamano = models.ForeignKey(TamanoPizza, on_delete=models.DO_NOTHING)

    def __str__(self):
        return self.id_tamano.nombre_tamano


class PizzaToppin(models.Model):
    id_pizza = models.ForeignKey(Pizza, on_delete=models.DO_NOTHING)
    id_toppin = models.ForeignKey(Toppin, on_delete=models.DO_NOTHING)


class BebidaPedido(models.Model):
    id_pedido = models.ForeignKey(Pedido, on_delete=models.CASCADE)
    id_bebida = models.ForeignKey(Bebida, on_delete=models.DO_NOTHING)


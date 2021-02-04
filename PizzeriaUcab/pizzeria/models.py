# Models
from django.db import models
# Timezone
from django.utils import timezone
import datetime 

# Create your models here.

class TamanoPizza(models.Model):
    '''
    Model: TamanoPizza
    Tabla: TamanoPizza
    Se recibe el nombre del tamaño de la Pizza( Grande, Mediano, etc.) y su monto
    '''
    nombre_tamano = models.CharField(max_length=50, unique=True)
    monto_tamano = models.DecimalField(max_digits=18, decimal_places=2)

    def __str__(self):
        return 'Pizza {}   Monto: ${}'.format(self.nombre_tamano, self.monto_tamano)



class Toppin(models.Model):
    '''
    Model: Toppin
    Tabla: Toppin
    Se recibe el nombre de los ingredientes(Jamon, Queso, etc.), su monto
    y la URL o Link de la imagen
    '''
    nombre_toppin = models.CharField(max_length=50, unique=True)
    monto_toppin = models.DecimalField(max_digits=18, decimal_places=2)
    imagen_toppin = models.CharField(max_length=200)

    def __str__(self):
        return 'Toppin {}   Monto: ${}'.format(self.nombre_toppin, self.monto_toppin)



class Bebida(models.Model):
    '''
    Model: Bebida
    Tabla: Bebida
    Se recibe el nombre de las bebidas(Refrescos, Jugos, etc.), su monto
    y la URL o Link de la imagen
    '''
    nombre_bebida = models.CharField(max_length=50, unique=True)
    monto_bebida = models.DecimalField(max_digits=18, decimal_places=2)
    imagen_bebida = models.CharField(max_length=200)

    # def __str__(self):
    #     return self.nombre_bebida

    def __str__(self):
        return 'Bebida {}   Monto: ${}'.format(self.nombre_bebida, self.monto_bebida)



class Pedido(models.Model):
    '''
    Model: Bebida
    Tabla: Bebida
    Se recibe el nombre de las bebidas(Refrescos, Jugos, etc.), su monto
    y la URL o Link de la imagen
    '''    
    estatus_pedido = models.CharField(max_length=50)
    fecha_pedido =  models.DateTimeField('Fecha Solicitado')
    total_pedido = models.DecimalField(max_digits=18, decimal_places=2)
    metodo_pedido = models.CharField(max_length=50)
    usuario = models.CharField(max_length=50)
    direccion_pedido = models.CharField(max_length=50)


    def was_published_recently(self):
        """
        Obtiene True si fue reciente y False sino
        """
        now = timezone.now()
        return now - datetime.timedelta(days=1) <= self.fecha_pedido <= now

    was_published_recently.admin_order_field = 'fecha_pedido'
    was_published_recently.boolean = True
    was_published_recently.short_description = 'Pedido Recientemente?'


    def __str__(self):
        return '{} - {}, {} Direccion: {} {} ${}'.format(self.usuario, self.fecha_pedido, self.estatus_pedido, 
        self.metodo_pedido,self.direccion_pedido, self.total_pedido)



class Pizza(models.Model):
    '''
    Model: Pizza
    Tabla: Pizza
    Compone a las pizzas y se almacenan sus relaciones 
    Numero de pedido y Numero del tamano
    '''  
    id_pedido = models.ForeignKey(Pedido, on_delete=models.CASCADE, verbose_name="Datos Pedido")
    id_tamano = models.ForeignKey(TamanoPizza, on_delete=models.DO_NOTHING, verbose_name="Tamaño")

    def __str__(self):
        return self.id_tamano.nombre_tamano
    id_tamano.short_description = 'Pizza'



class PizzaToppin(models.Model):
    '''
    Model: PizzaToppin
    Tabla: PizzaToppin
    Compone las relaciones de la pizza y los toppins que se le asignan
    Numero de id_pizza y Numero del id_toppin
    '''  
    id_pizza = models.ForeignKey(Pizza, on_delete=models.DO_NOTHING, verbose_name="Pizza")
    id_toppin = models.ForeignKey(Toppin, on_delete=models.DO_NOTHING, verbose_name="Toppin")

    def __str__(self):
        return '{}'.format(self.id_toppin.nombre_toppin)



class BebidaPedido(models.Model):
    '''
    Model: BebidaPedido
    Tabla: BebidaPedido
    Compone las relaciones del pedido y las bebidas que se le asignan
    Numero de id_pedido y Numero del id_bebida
    '''  
    id_pedido = models.ForeignKey(Pedido, on_delete=models.CASCADE)
    id_bebida = models.ForeignKey(Bebida, on_delete=models.DO_NOTHING)

    def __str__(self):
        return self.id_bebida.nombre_bebida
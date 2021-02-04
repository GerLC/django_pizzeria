from django.contrib.auth.models import User, Group
import pizzeria.models as models

from rest_framework import serializers
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']


class TamanoPizzaSerializer(serializers.ModelSerializer):
    '''
    Transforman los datos de formatos del tamano de la pizza 
    '''
    class Meta:
        model = models.TamanoPizza
        fields = "__all__"


class ToppinSerializer(serializers.ModelSerializer):
    '''
    Transforman los datos de formatos de los toppins
    '''
    class Meta:
        model = models.Toppin
        fields = "__all__"


class BebidaSerializer(serializers.ModelSerializer):
    '''
    Transforman los datos de formatos de las bebidas 
    '''
    class Meta:
        model = models.Bebida
        fields = "__all__"


class PedidoSerializer(serializers.ModelSerializer):
    '''
    Transforman los datos de formatos de los pedidos
    '''
    class Meta:
        model = models.Pedido
        fields = "__all__"


class PizzaPostSerializer(serializers.ModelSerializer):
    '''
    Transforman los datos de formatos de la Pizza
    para poder realizar resquest de POST y PUT
    '''
    class Meta:
        model = models.Pizza
        fields = "__all__"


class PizzaSerializer(serializers.ModelSerializer):
    '''
    Transforman los datos de formatos de la pizza
    Recibe el objeto de los Foreing Key
    '''
    class Meta:
        model = models.Pizza
        fields = "__all__"
        depth = 1                   # Recibe el numero de que tan profundo desea ir en las relaciones


class PizzaToppinSerializer(serializers.ModelSerializer):
    '''
    Transforman los datos de formatos de los toppins asociados a la pizza
    Recibe el objeto de los Foreing Key
    '''
    class Meta:
        model = models.PizzaToppin
        fields = "__all__"
        depth = 2                   # Recibe el numero de que tan profundo desea ir en las relaciones


class PizzaToppinPostSerializer(serializers.ModelSerializer):
    '''
    Transforman los datos de formatos de los toppins asociados a la pizza
    '''
    class Meta:
        model = models.PizzaToppin
        fields = "__all__"


class BebidaPedidoSerializer(serializers.ModelSerializer):
    '''
    Transforman los datos de formatos de los bebidas asociados a un pedido
    Recibe el objeto de los Foreing Key
    '''
    class Meta:
        model = models.BebidaPedido
        fields = "__all__"
        depth = 1                    # Recibe el numero de que tan profundo desea ir en las relaciones
    
class BebidaPedidoPostSerializer(serializers.ModelSerializer):
    '''
    Transforman los datos de formatos de los bebidas asociados a un pedido
    '''
    class Meta:
        model = models.BebidaPedido
        fields = "__all__"

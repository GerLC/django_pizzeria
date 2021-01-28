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
    class Meta:
        model = models.TamanoPizza
        fields = ['url', 'nombre_tamano', 'monto_tamano']


class ToppinSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Toppin
        fields = "__all__"


class BebidaSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Bebida
        fields = "__all__"


class PedidoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Pedido
        fields = "__all__"
        depht = 1


class PizzaSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Pizza
        fields = "__all__"
        depht = 1


class PizzaToppinSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.PizzaToppin
        fields = "__all__"
        depht = 1


class BebidaPedidoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.BebidaPedido
        fields = "__all__"
        depht = 1
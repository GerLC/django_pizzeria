from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
import pizzeria.serializers as serializers
import pizzeria.models as models


# Create your views here.

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = serializers.UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = serializers.GroupSerializer
    permission_classes = [permissions.IsAuthenticated]


class TamanoPizzaViewSet(viewsets.ModelViewSet):
    """
    API endpoint que permite GET, POST, PUT y DELETE
    Tabla: TamanoPizza
    Obtiene: Tamano de la Pizza Ex. (Grande,Mediano,Pequeno)
    """
    queryset = models.TamanoPizza.objects.all()
    serializer_class = serializers.TamanoPizzaSerializer


class ToppinViewSet(viewsets.ModelViewSet):
    """
    API endpoint que permite GET, POST, PUT y DELETE
    Tabla: Toppin
    Obtiene: Ingredientes de la Pizza Ex. (Jamon, Pepino, etc.)
    """
    queryset = models.Toppin.objects.all()
    serializer_class = serializers.ToppinSerializer


class BebidaViewSet(viewsets.ModelViewSet):
    """
    API endpoint que permite GET, POST, PUT y DELETE
    Tabla: Bebida
    Obtiene: Bebidas(Adicional) Ex. (Refresco, Jugos, etc.)
    """
    queryset = models.Bebida.objects.all()
    serializer_class = serializers.BebidaSerializer


class PedidoViewSet(viewsets.ModelViewSet):
    """
    API endpoint que permite GET, POST, PUT y DELETE
    Tabla: Pedido
    Obtiene: Pedidos, contiene la orden de compra
    """
    queryset = models.Pedido.objects.all()
    serializer_class = serializers.PedidoSerializer


class PizzaViewSet(viewsets.ModelViewSet):
    """
    API endpoint que permite GET, POST, PUT y DELETE
    Tabla: Pizza
    Obtiene: Pizza adjunto a un Pedido
    """
    queryset = models.Pizza.objects.all()
    serializer_class = serializers.PizzaSerializer


class PizzaToppinViewSet(viewsets.ModelViewSet):
    """
    API endpoint que permite GET, POST, PUT y DELETE
    Tabla: Pizza_Toppin
    Obtiene: Toppins o ingredientes de una Pizza especifico
    """
    queryset = models.PizzaToppin.objects.all()
    serializer_class = serializers.PizzaToppinSerializer


class BebidaPedidoViewSet(viewsets.ModelViewSet):
    """
    API endpoint que permite GET, POST, PUT y DELETE
    Tabla: Bebida_Pedido
    Obtiene: Bebidas adjuntos a un Pedido
    """
    queryset = models.BebidaPedido.objects.all()
    serializer_class = serializers.BebidaPedidoSerializer
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
    pagination_class = None                              #Evita que el JSON devuelva {url, next, previuos}
    queryset = models.TamanoPizza.objects.all()          #Query para traer todos los objetos
    serializer_class = serializers.TamanoPizzaSerializer #Transforma los datos del Query en el formato JSON, XML, etc y viceversa


class ToppinViewSet(viewsets.ModelViewSet):
    """
    API endpoint que permite GET, POST, PUT y DELETE
    Tabla: Toppin
    Obtiene: Ingredientes de la Pizza Ex. (Jamon, Pepino, etc.)
    """
    pagination_class = None
    queryset = models.Toppin.objects.all()
    serializer_class = serializers.ToppinSerializer


class BebidaViewSet(viewsets.ModelViewSet):
    """
    API endpoint que permite GET, POST, PUT y DELETE
    Tabla: Bebida
    Obtiene: Bebidas(Adicional) Ex. (Refresco, Jugos, etc.)
    """
    pagination_class = None
    queryset = models.Bebida.objects.all()
    serializer_class = serializers.BebidaSerializer


class PedidoViewSet(viewsets.ModelViewSet):
    """
    API endpoint que permite GET
    Tabla: Pedido
    Obtiene: Pedidos, contiene la orden de compra
    """
    pagination_class = None
    queryset = models.Pedido.objects.all()
    serializer_class = serializers.PedidoSerializer


class PizzaViewSet(viewsets.ModelViewSet):
    """
    API endpoint que permite GET
    Tabla: Pizza
    Obtiene: Pizza adjunto a un Pedido
    """
    pagination_class = None
    queryset = models.Pizza.objects.all()
    serializer_class = serializers.PizzaSerializer


class PizzaPostViewSet(viewsets.ModelViewSet):
    """
    API endpoint que permite POST, PUT
    Tabla: Pizza
    Obtiene: Crear y Editar Pizza
    """
    pagination_class = None
    queryset = models.Pizza.objects.all()
    serializer_class = serializers.PizzaPostSerializer


class PizzaToppinViewSet(viewsets.ModelViewSet):
    """
    API endpoint que permite GET
    Tabla: Pizza_Toppin
    Obtiene: Toppins o ingredientes de una Pizza especifico
    """
    pagination_class = None
    queryset = models.PizzaToppin.objects.all()
    serializer_class = serializers.PizzaToppinSerializer


class PizzaToppinPostViewSet(viewsets.ModelViewSet):
    """
    API endpoint que permite POST Y PUT
    Tabla: Pizza_Toppin
    Obtiene: Toppins o ingredientes de una Pizza especifico
    """
    pagination_class = None
    queryset = models.PizzaToppin.objects.all()
    serializer_class = serializers.PizzaToppinPostSerializer


class BebidaPedidoViewSet(viewsets.ModelViewSet):
    """
    API endpoint que permite GET
    Tabla: Bebida_Pedido
    Obtiene: Bebidas adjuntos a un Pedido
    """
    pagination_class = None
    queryset = models.BebidaPedido.objects.all()
    serializer_class = serializers.BebidaPedidoSerializer

    
class BebidaPedidoPostViewSet(viewsets.ModelViewSet):
    """
    API endpoint que permite POST Y PUT
    Tabla: Bebida_Pedido
    Obtiene: Bebidas adjuntos a un Pedido
    """
    pagination_class = None
    queryset = models.BebidaPedido.objects.all()
    serializer_class = serializers.BebidaPedidoPostSerializer
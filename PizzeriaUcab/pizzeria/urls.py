from rest_framework.routers import DefaultRouter
from django.urls import path
from django.conf.urls import include
import pizzeria.views as views

#router_pizzeria Definen las rutas de API ROOT VIEW 
#devuelve un response que contienen los hyperlinks de las vistas/views en formatos json incluidos
router_pizzeria = DefaultRouter()
#GET
router_pizzeria.register(r'tamanopizza', views.TamanoPizzaViewSet)
router_pizzeria.register(r'toppin', views.ToppinViewSet)
router_pizzeria.register(r'bebida', views.BebidaViewSet)
router_pizzeria.register(r'pedido', views.PedidoViewSet)
router_pizzeria.register(r'getpizza', views.PizzaViewSet)
router_pizzeria.register(r'getpizzatoppin', views.PizzaToppinViewSet)
router_pizzeria.register(r'getbebidapedido', views.BebidaPedidoViewSet)
# POST/PUT
# Por el DEPTH, se crearon rutas adicionales para poder realizar los POST PUT
router_pizzeria.register(r'pizza', views.PizzaPostViewSet)
router_pizzeria.register(r'pizzatoppin', views.PizzaToppinPostViewSet)
router_pizzeria.register(r'bebidapedido', views.BebidaPedidoPostViewSet)


urlpatterns = [
    path('', include(router_pizzeria.urls)),
]
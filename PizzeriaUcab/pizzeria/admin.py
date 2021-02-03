from django.contrib import admin
import pizzeria.models as models

# Register your models here.

admin.site.register(models.Pedido)
admin.site.register(models.Pizza)
admin.site.register(models.PizzaToppin)
admin.site.register(models.TamanoPizza)
admin.site.register(models.Toppin)
admin.site.register(models.Bebida)
admin.site.register(models.BebidaPedido)
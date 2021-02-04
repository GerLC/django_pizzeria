from django.contrib import admin
import pizzeria.models as models

# Register your models here.

# admin.site.register(models.Pedido)
# admin.site.register(models.Pizza)
# admin.site.register(models.PizzaToppin)
# admin.site.register(models.TamanoPizza)
# admin.site.register(models.Toppin)
# admin.site.register(models.Bebida)
# admin.site.register(models.BebidaPedido)


class ToppinInline(admin.StackedInline):
    model = models.PizzaToppin
    extra = 0                            # No muestra para que agregue mas 
    can_delete = False                   # Evita que se pueda eliminar
    
    verbose_name = "Toppin"              # Cambiar nombre singular o prural
    verbose_name_plural = "Toppins"
    
    readonly_fields=('id_pizza', 'id_toppin')


class PizzaInline(admin.TabularInline ):
    model = models.Pizza
    extra = 0                            # No muestra para que agregue mas 
    can_delete = False                   # Evita que se pueda eliminar
    
    verbose_name = "Pizza"               # Cambiar nombre singular o prural
    verbose_name_plural = "Pizzas"
    
    readonly_fields = ['id_tamano', 'id_pedido']

    inlines = [ToppinInline]


class BebidaInline(admin.StackedInline):
    model = models.BebidaPedido
    extra = 0                            # No muestra para que agregue mas 
    can_delete = False                   # Evita que se pueda eliminar
    
    verbose_name = "Bebida"              # Cambiar nombre singular o prural
    verbose_name_plural = "Bebidas"

    readonly_fields = ['id_bebida', 'id_pedido']




class PedidoAdmin(admin.ModelAdmin):
    '''
    Devuelve los reportes solicitados de los pedidos
    '''

    list_display = ('usuario', 'fecha_pedido', 'estatus_pedido',
    'total_pedido','was_published_recently')                              #Devuelve la lista en el admin
    list_filter = ['fecha_pedido', 'metodo_pedido']                                        #Filtra por Fecha
    search_fields = ['usuario']                                           #Agrega un buscador 


    # Dentro de Pedidos Individual
    fieldsets = [
        ('Informacion del Cliete',  {'fields': ['usuario']}),
        ('Datos del Pedido ', {'fields': ['fecha_pedido','estatus_pedido', 'metodo_pedido' ,'direccion_pedido'] , 'classes': ['collapse']}),
        ('Monto Total ', {'fields': ['total_pedido']}),   
    ]
    
    readonly_fields = ['usuario', 'fecha_pedido', 'estatus_pedido', 'metodo_pedido' ,'direccion_pedido', 'total_pedido']
    inlines = [PizzaInline, BebidaInline]

    def has_add_permission(self, request):
        '''
        Quita el boton de ADD en la lista de los pedidos
        '''
        return False




class PizzaAdmin(admin.ModelAdmin):

    list_display = ('id_tamano', 'id_pedido' )

    list_filter = ['id_tamano', 'id_pedido']                                        
    search_fields = ['id_tamano', 'id_pedido']                                           
    readonly_fields=('id_pedido', 'id_tamano')
               

    # Dentro de Pedidos Individual
    fieldsets = [
        (None,  {'fields': ['id_pedido']}),
        ('Tamaño Pizza', {'fields': ['id_tamano']}),
    ]
    
    inlines = [ToppinInline]


    def has_add_permission(self, request):
        '''
        Quita el boton de ADD en la lista de los pedidos
        '''
        return False




class PizzaToppinAdmin(admin.ModelAdmin):

    list_display = ('id_pizza', 'id_toppin' )
    list_filter = ['id_toppin']                                        
    search_fields = ['id_pizza', 'id_toppin']                                           
    readonly_fields=('id_pizza', 'id_toppin')
    
    def has_add_permission(self, request):
        '''
        Quita el boton de ADD en la lista de los pedidos
        '''
        return False


admin.site.register(models.Pizza, PizzaAdmin)
admin.site.register(models.Pedido, PedidoAdmin)
admin.site.register(models.PizzaToppin, PizzaToppinAdmin)
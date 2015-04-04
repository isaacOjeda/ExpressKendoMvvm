Buenas noches (o tardes?) a todos :D.

En esta ocasión seguiré con la ahora serie de posts de NodeJS y Kendo UI, ya que es continuación del <a href="http://balusoft.net/2015/03/26/aplicaciones-web-mvvm-con-kendo-ui-y-nodejs/" target="_blank">post anterior</a> te recomiendo que la leas antes de seguir en este.

Lo que busco hacer en esta entrada es seguir viendo como funciona MVVM incluyendo ahora operaciones clásicas "CRUD" utilizando la funcionalidad del <strong>Data Source</strong> de Kendo. Lo que haremos es siguiendo el mismo ejemplo de la entrada anterior el poder crear, leer, actualizar y eliminar elementos de nuestro listado realizando los requests HTTP necesarios. No usaremos bases de datos, tal vez lo extendamos después. También decidí incluir Bootstrap en este ejemplo, básicamente esta será la actualización de nuestro proyecto:

<a href="https://balusoft.files.wordpress.com/2015/03/screen-shot-2015-04-03-at-10-52-41-pm.png"><img class="aligncenter size-large wp-image-1848" src="https://balusoft.files.wordpress.com/2015/03/screen-shot-2015-04-03-at-10-52-41-pm.png?w=660" alt="Screen Shot 2015-04-03 at 10.52.41 PM" width="660" height="737" /></a>

<!--more-->

La idea es poder hacer un CRUD de productos, entonces necesitamos crear nuevas rutas con distintos metodos HTTP. Primero crearemos la ruta <strong>/products </strong>de tipo <strong>GET.</strong>Modificaremos nuestra ruta <strong>index.js</strong>:

<a href="https://balusoft.files.wordpress.com/2015/03/screen-shot-2015-04-03-at-10-56-49-pm.png"><img class="aligncenter size-full wp-image-1849" src="https://balusoft.files.wordpress.com/2015/03/screen-shot-2015-04-03-at-10-56-49-pm.png" alt="Screen Shot 2015-04-03 at 10.56.49 PM" width="357" height="83" /></a>

Simplemente estamos regresando una respuesta en JSON, y lo que regresamos será un arreglo estático global como se muestra en la siguiente imagen:

<a href="https://balusoft.files.wordpress.com/2015/03/screen-shot-2015-04-03-at-10-56-56-pm.png"><img class="aligncenter size-large wp-image-1850" src="https://balusoft.files.wordpress.com/2015/03/screen-shot-2015-04-03-at-10-56-56-pm.png?w=323" alt="Screen Shot 2015-04-03 at 10.56.56 PM" width="323" height="128" /></a>Al inicio de la ruta index, agregamos dos variables globales; una será un array de objetos y la otra simplemente es un contador para simular los ProductId´s que iremos agregando, ya que no usaremos ninguna base de datos por ahora.

Ahora crearemos la ruta para crear, será <strong>/products </strong>también pero con método<b> </b><strong>POST:</strong>

<a href="https://balusoft.files.wordpress.com/2015/03/screen-shot-2015-04-03-at-11-00-58-pm.png"><img class="aligncenter size-full wp-image-1851" src="https://balusoft.files.wordpress.com/2015/03/screen-shot-2015-04-03-at-11-00-58-pm.png" alt="Screen Shot 2015-04-03 at 11.00.58 PM" width="419" height="241" /></a>

Esta ruta POST lo que hará es simplemente agregar el elemento recibido en el <strong>body </strong>al arreglo <strong>dummyProducts.</strong>Algo importante es el <strong>req.body</strong>, si no utilizaste el generador de proyectos de Express, esta linea no te funcionará ya que utiliza de un módulo para parsear los datos que vengan en el body de una solicitud.

Es importante que al "crear" un objeto (en este caso es dummy) regresar el Id que ahora le pertenece al objeto, ya que Kendo UI lo necesita para saber si son objetos creados o nuevos.

Para actualizar y eliminar objetos usaremos las siguientes rutas:

<a href="https://balusoft.files.wordpress.com/2015/03/screen-shot-2015-04-03-at-11-04-14-pm.png"><img class="aligncenter size-full wp-image-1852" src="https://balusoft.files.wordpress.com/2015/03/screen-shot-2015-04-03-at-11-04-14-pm.png" alt="Screen Shot 2015-04-03 at 11.04.14 PM" width="435" height="426" /></a>

Usamos el mismo truco "splice" que habíamos utilizado en el post anterior, ya que sigue siendo javascript. El Update no hace nada mas que un recordatorio en el TODO por si llegamos a usar una base de datos.

De esta forma tenemos nuestro CRUD muy dummy. Ahora nos es necesario actualizar tanto el HTML y el Javascript.

Nuestro View Model tendrá cambios fuertes pero lo veremos en partes, antes teníamos un array <strong>products</strong>, ahora éste se convertirá en un objeto de la clase <a href="http://docs.telerik.com/kendo-ui/api/javascript/data/datasource" target="_blank">Data Source </a>de Kendo UI para que nos ayude a manejar el CRUD de una manera más fácil:

<a href="https://balusoft.files.wordpress.com/2015/03/screen-shot-2015-04-03-at-11-07-04-pm.png"><img class="aligncenter size-full wp-image-1853" src="https://balusoft.files.wordpress.com/2015/03/screen-shot-2015-04-03-at-11-07-04-pm.png" alt="Screen Shot 2015-04-03 at 11.07.04 PM" width="313" height="667" /></a>

Al constructor de Data Source le estamos pasando un objeto con dos objetos principales; <strong>transport</strong>y <strong>schema</strong>. transport como se puede deducir, estamos indicando las direcciones de ahora nuestra "API" indicando la URL, el tipo de método y el tipo de dato que se quiere manejar. En esta ocasión la URL es la misma para todos, pero con los métodos HTTP diferenciamos cada acción que vamos a desear hacer. Schema es para indicar los meta datos de nuestro data source, solamente lo usamos para decirle que propiedad es el ID (si un objeto en el data source no tiene ID, significa que es nuevo y debe crearlo) y ya que por default maneja todas las propiedades como string, le indicamos lo contrario en los campos <strong>price</strong>y <strong>quantity</strong>.

El método que antes teníamos para eliminar objetos (removeProduct) lo eliminamos y actualizamos el método addProduct a la siguiente forma:

<a href="https://balusoft.files.wordpress.com/2015/03/screen-shot-2015-04-03-at-11-12-25-pm.png"><img class="aligncenter size-full wp-image-1854" src="https://balusoft.files.wordpress.com/2015/03/screen-shot-2015-04-03-at-11-12-25-pm.png" alt="Screen Shot 2015-04-03 at 11.12.25 PM" width="438" height="252" /></a>

Como ya no es un array, ya no usamos el método push, ahora utilizamos el add para agregar objetos al data source. También al final indicamos que nuestro data source debe sincronizarse, y si hay objetos sin ID, el data source se encargará de mandarlos al URL correspondiente (método POST).

Los métodos total, totalprice y totalUnits tendrán ligeros cambios:

<a href="https://balusoft.files.wordpress.com/2015/03/screen-shot-2015-04-03-at-11-14-05-pm.png"><img class="aligncenter size-full wp-image-1855" src="https://balusoft.files.wordpress.com/2015/03/screen-shot-2015-04-03-at-11-14-05-pm.png" alt="Screen Shot 2015-04-03 at 11.14.05 PM" width="525" height="399" /></a>Ya que ya no estamos trabajando con un array sino con un data source, con el método <strong>data </strong>obtenemos el array de los objetos actualmente agregados.

Por último, un nuevo método tenemos que agregar que se ejecutará cuando intentemos eliminar un objeto de nuestro listado, simplemente para prevenir una acción irreversible:

<a href="https://balusoft.files.wordpress.com/2015/03/screen-shot-2015-04-03-at-11-15-28-pm.png"><img class="aligncenter size-full wp-image-1856" src="https://balusoft.files.wordpress.com/2015/03/screen-shot-2015-04-03-at-11-15-28-pm.png" alt="Screen Shot 2015-04-03 at 11.15.28 PM" width="280" height="92" /></a>Estos son los cambios hechos en el View Model. Al final pondré el repositorio para que lo puedas ver completo.

Los cambios en la vista también son fuertes, de hecho el View Model cambio solo el array products, pero nuestra vista sí cambiará mucho más ya que ahora vamos a utilizar <a href="http://getbootstrap.com/" target="_blank">Bootstrap</a>.

Los cambios en <strong>layout.jade</strong>son sencillos, solo hemos agregado el cdn de bootstrap dentro de la etiqueta head:

link(href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css", rel="stylesheet")

Dentro de <strong>index.jade </strong>hemos implementado bootstrap y ahora utilizaremos un Widget de Kendo UI llamado ListView. Lo que habíamos usado antes era simplemente un "repeater" por así decirlo con templates, pero ahora usaremos un widget que nos facilitará con la creación del CRUD:

Recuerdan los templates? hemos modificado el rowTemplate en la parte de los botones, para tener un botón de edición y el que ya teníamos (el de eliminar) pero estos tienen clases CSS de kendo que ayuda al ListView saber que tipo de acción realizan:

<a href="https://balusoft.files.wordpress.com/2015/03/screen-shot-2015-04-03-at-11-23-32-pm.png"><img class="aligncenter size-full wp-image-1857" src="https://balusoft.files.wordpress.com/2015/03/screen-shot-2015-04-03-at-11-23-32-pm.png" alt="Screen Shot 2015-04-03 at 11.23.32 PM" width="618" height="182" /></a>

Lo que nos importa acerca de bootstrap son las clases btn, btn-sm y btn-primary/danger. Lo que hacen es dar estilos al enlace de que parezcan botones de diferentes colores. k-edit/delete-button son las clases CSS que kendo usa para diferenciar que tipo de acción va a realizar ese elemento.

El footer sigue igual, solo se cambió el orden de las columnas para que luciera mejor.

Agregamos también un nuevo Template, y su función es de "Que se mostrará cuando estés editando un Row"

<a href="https://balusoft.files.wordpress.com/2015/03/screen-shot-2015-04-03-at-11-25-08-pm.png"><img class="aligncenter size-large wp-image-1858" src="https://balusoft.files.wordpress.com/2015/03/screen-shot-2015-04-03-at-11-25-08-pm.png?w=660" alt="Screen Shot 2015-04-03 at 11.25.08 PM" width="660" height="158" /></a>

&nbsp;

Al igual, usa clases de bootstrap y de kendo para ver que tipo de comando es (en Update y Cancel) pero los inputs que ahora utilizamos son diferentes (2do y 3ro). Estos son widgets de Kendo que su función es convertir un input tradicional en un elemento más dinámico, en este caso un Numeric TextBox, que su función es un ser un text box en el cual solo se pueden introducir números. En este caso lo logramos con la propiedad <strong>data-role </strong>y propiedades extras que nos ayudan a configurarlo como queramos. He aquí la <a href="http://demos.telerik.com/kendo-ui/numerictextbox/mvvm" target="_blank">referencia</a>. k-update y k-cancel nos sirven para que Kendo sepa que acción tomar, similar a los ya vistos.

Recuerdan el div donde estaba el formulario que nos ayudaba agregar elementos? quedará de la siguiente forma (utilizará bootstrap y numeric textboxes para lucir mejor)

<a href="https://balusoft.files.wordpress.com/2015/03/screen-shot-2015-04-03-at-11-30-00-pm.png"><img class="aligncenter size-large wp-image-1859" src="https://balusoft.files.wordpress.com/2015/03/screen-shot-2015-04-03-at-11-30-00-pm.png?w=660" alt="Screen Shot 2015-04-03 at 11.30.00 PM" width="660" height="184" /></a>

Para visualizarlo mejor, pondré el resultado HTML:

<a href="https://balusoft.files.wordpress.com/2015/03/screen-shot-2015-04-03-at-11-32-37-pm.png"><img class="aligncenter size-full wp-image-1860" src="https://balusoft.files.wordpress.com/2015/03/screen-shot-2015-04-03-at-11-32-37-pm.png" alt="Screen Shot 2015-04-03 at 11.32.37 PM" width="542" height="210" /></a>

Cada div con clase <strong>form-group </strong>representa un conjunto de Label-Input y todos deben estar dentro de <strong>form-horizontal </strong>porque todos juntos representan un formulario. El sistema de columnas de bootstrap es muy interesante y util, para aprender más ve <a href="http://getbootstrap.com/css/#grid" target="_blank">aquí</a>. La clase form-control nos permite darle una mejor vista a nuestros inputs, cosas que ofrece bootstrap es poder dar estilos a nuestros elementos sin ningún esfuerzo.

Para finalizar, nuestro Table quedará de esta forma:

<a href="https://balusoft.files.wordpress.com/2015/03/screen-shot-2015-04-03-at-11-35-39-pm.png"><img class="aligncenter size-large wp-image-1861" src="https://balusoft.files.wordpress.com/2015/03/screen-shot-2015-04-03-at-11-35-39-pm.png?w=660" alt="Screen Shot 2015-04-03 at 11.35.39 PM" width="660" height="91" /></a>

agregamos el data-role, que nos permite decir el tipo de Widget de Kendo que será. También se agregó data-edit-template para indicar qué template se utilizará cuando el comando Edit se llame.

El resultado de todo esto, será como ya lo vimos al inicio:

<a href="https://balusoft.files.wordpress.com/2015/03/screen-shot-2015-04-03-at-11-41-08-pm.png"><img class="aligncenter size-large wp-image-1862" src="https://balusoft.files.wordpress.com/2015/03/screen-shot-2015-04-03-at-11-41-08-pm.png?w=660" alt="Screen Shot 2015-04-03 at 11.41.08 PM" width="660" height="525" /></a> <a href="https://balusoft.files.wordpress.com/2015/03/screen-shot-2015-04-03-at-11-41-14-pm.png"><img class="aligncenter size-large wp-image-1863" src="https://balusoft.files.wordpress.com/2015/03/screen-shot-2015-04-03-at-11-41-14-pm.png?w=660" alt="Screen Shot 2015-04-03 at 11.41.14 PM" width="660" height="525" /></a>

Si notan en la imagen superior, ese es el propósito del Edit Template. Muestra los elementos que nosotros queramos al querer editar un Row.

Espero les interesen más estas tecnologías, que a mi me han funcionado de maravilla (hablando de Kendo y bootstrap) e interesantes (hablando de NodeJS).

Saludos!

<a href="https://github.com/isaacOjeda/ExpressKendoMvvm" target="_blank">Repositorio Github</a>

&nbsp;

&nbsp;

&nbsp;

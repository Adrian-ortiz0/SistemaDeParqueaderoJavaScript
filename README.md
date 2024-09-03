
# Wayne Enterprises Parking App

## FUNCIONALIDADES 📏

| Índice | Titulo          |
| ------ | --------------- |
| 1      | Instalación     |
| 2      | Uso             |
| 3      | Funcionalidades |
| 4      | Contacto        |

## Instalación 🔩

Para clonar y ejecutar este proyecto en tu entorno local, sigue estos pasos:

```
git clone https://github.com/Adrian-ortiz0/Proyecto_JavaScript_Ustariz_Adrian.git
```

Luego localiza el proyecto

```
cd Proyecto_JavaScript_Ustariz_Adrian
```

Luego ejecútalo en VS Code

```
code .
```

## Uso ⚙

Para poder dar inicio al software de parqueadero, lo primero que se debe hacer es ejecutar el index.html desde dentro de tu editor de código.

### Login

Al abrir el software, lo primero que se verá es una pagina de inicio de sesión.

![ssLogin](/images/ssLogin.PNG)

Para poder ingresar deberá digitarse bruce@wayne.com en la sección email, y la contraseña es "123456"

### Home

Luego apareceremos en la sección de Home, en la cual se podrá observar esta interfaz

![ssHome](/images/ssHome.PNG)

El botón entrance permitirá registrar a los vehículos que van entrando al parqueadero y el botón de exit permitirá registrar la salida de los vehículos que abandonan el establecimiento luego de cierto periodo de tiempo.

#### Entrance

![ssEntrance](/images/ssEntrance.PNG)

#### Exit

![ssExit](/images/ssExit.PNG)

### Lista de vehículos

El siguiente botón el cual esta señalado en la imagen, redireccionará al administrador a la pagina encargada de mostrar los vehículos que actualmente están en el parqueadero.

![ssList](/images/ssList.PNG)

### Slots

El siguiente botón, el cual también esta señalado en la imagen, redirige al administrador a un apartado el cual le permitirá revisar de forma visual los slots que están disponibles y los que no.

![ssSlots](/images/ssSlots.PNG)

### History

El siguiente botón, muestra al administrados el historial total de todos los autos que han entrado y salido.

![ssHistory](/images/ssHistory.PNG)

### Members

El botón de members da las opciones de registrar miembros y de verlos.

![ssMembers](/images/ssMembers.PNG)

## Funcionalidades 📏

1. Registrar entrada de vehículos: placa, tipo, hora de entrada y espacio ocupado por el vehículo.
2. Mostrar una lista de todos los vehículos dentro del parqueadero.
3. Actualizar hora de salida del vehículo.
4. Elimina el registro de un vehículo cuando salga del parqueadero.
5. Se creara un pequeño login que de entrada del usuario al sistema.
6. Se implementará el sistema de mensualidades y anualidades, este también tendrá distintos precios dependiendo de el tipo de vehículo.
7. Los autos con estas membresías no se les cobrará el ingreso ni la salida, por lo tanto, tendrán un atributo especial pera ser identificados.

## Calculo de costo 💲

El costo se calculará según la permanencia del vehículo y el tipo de vehículo (motos, autos y camiones deben costar diferente).

## Validación de datos 👁

1. Validar la placa con formato ABC-123 y ABC-12D.
2. Validar espacio asignado disponible.
3. Validar que la hora de salida sea posterior que la de entrada.

## Interfaz 💻

De momento la interfaz únicamente será de vista de escritorio.

## Almacenamiento de Datos 📩

Se utilizará el localStorage para la persistencia de estos.

## Contacto

Cualquier duda, inquietud y sugerencia será debidamente atendida y recibida atraves de los siguientes canales

Correo Electrónico: dxniel7328@gmail.com

Cel: +57 3173109599

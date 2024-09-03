
# Wayne Enterprises Parking App

## FUNCTIONALITIES 📏

| Índex  | Title           |
| ------ | --------------- |
| 1      | Instalation     |
| 2      | Usage           |
| 3      | Functionalities |
| 4      | Contact         |

## INSTALATION 🔩

To clone and run this project in your local environment, follow these steps:

```
git clone https://github.com/Adrian-ortiz0/Proyecto_JavaScript_Ustariz_Adrian.git
```

Then locate the project.

```
cd Proyecto_JavaScript_Ustariz_Adrian
```

Then run it in VS Code.

```
code .
```

## Usage ⚙

To start the parking lot software, the first thing you need to do is run the index.html file from within your code editor.

### Login

When you open the software, the first thing you'll see is a login page.

![ssLogin](/images/ssLogin.PNG)

To log in, enter `bruce@wayne.com` in the email section, and the password is "123456".

### Home

Then you'll be taken to the Home section, where you can see this interface.

![ssHome](/images/ssHome.PNG)

The "Entrance" button will allow you to register vehicles entering the parking lot, and the "Exit" button will allow you to record the departure of vehicles leaving the premises after a certain period of time.

#### Entrance

![ssEntrance](/images/ssEntrance.PNG)

#### Exit

![ssExit](/images/ssExit.PNG)

### Lista de vehículos

The next button, which is indicated in the image, will redirect the administrator to the page that displays the vehicles currently in the parking lot.

![ssList](/images/ssList.PNG)

### Slots

The next button, also highlighted in the image, will redirect the administrator to a section where they can visually review the available and unavailable slots.

![ssSlots](/images/ssSlots.PNG)

### History

The next button shows the administrator the complete history of all cars that have entered and exited.

![ssHistory](/images/ssHistory.PNG)

### Members

The "Members" button provides options to register new members and view existing ones.

![ssMembers](/images/ssMembers.PNG)

## Functionalities 📏

1. Register vehicle entry: license plate, type, entry time, and space occupied by the vehicle.
2. Display a list of all vehicles currently in the parking lot.
3. Update the vehicle's exit time.
4. Delete the record of a vehicle when it leaves the parking lot.
5. A small login system will be created to grant user access to the system.
6. A system for monthly and annual memberships will be implemented, with different prices depending on the type of vehicle.
7. Vehicles with these memberships will not be charged for entry or exit, and will have a special attribute for identification.

## Cost Calculation 💲

The cost will be calculated based on the vehicle's duration of stay and its type (motorcycles, cars, and trucks will have different rates).

## Data Validation 👁

1. Validate the license plate format as ABC-123 and ABC-12D.
2. Validate that the assigned space is available.
3. Ensure that the exit time is later than the entry time.

## Interface 💻

For now, the interface will only be designed for desktop view.

## Data persistance 📩

LocalStorage will be used for data persistence.

## Contact

Any questions, concerns, or suggestions will be properly addressed and received through the following channels:

Email: dxniel7328@gmail.com

Cel: +57 3173109599

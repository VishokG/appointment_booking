# Appointment Booking System
### Appointment booking NodeJS/Express Application with CRUD capabilities connected to Firebase Realtime Database

To setup the application please clone this repository to any location you want and run the command
```
npm run dev
```
#### Details
##### Express

- Two routes are present in the app: User route and Applications route
- Login, registration and authentication are handled in the user route
- Appointment management is handled in the applications route
- All requests are validated by express-validator package (date validation is supplemented by moment JS)
- Each request sent to appointments route has JWT authorization integrated
- The repositories folder has naming convention derived from spring boot for the lack of a better alternative

##### Realtime database

- I initially thought of the storing data in a conventional manner using the given structure:
 
```
/appointments
{
    "appointmentId",
    "day",
    "timeStart",
    "userId"
}

/users
{
    "userId",
    "name",
    "email"
}
```
- The disadvantage of using this structure would become apparant when we want to create a new appointment or update an existing one. The database would check every single appointment present to check if that time slot is not booked (Equivalent to O(N) time cost). 
- Instead, I added another path called /timetable and modified the /appointments path
```
/appointments
{
    "appointmentId",
    "userId"
}

/timetable
{
    "day": {
        "timeStart": {
            "appointmentId"
        }
    }
}

/users
{
    "userId",
    "name",
    "email"
}
```
- Everytime a new appointment has to be created (or an existing one updated) the slot is checked in the /timetable path by querying to that date and time directly. (Equivalent to O(1) time cost)
- I plan to experiment later to create another branch in which the above system would not have the /timetable path and instead have databse indexing. (I didn't have enough information and time to do this for v1)


#### Example
```
{
  "appointments": {
    → "-NXYZvcMi6GcUYKfdZO_",
    → "-NXYZx7N4a2Y0xk7V4Xd",
    → "-NXYZzFijP4GtRqQjAIW",
    ↓ "-NXYmC42s2uwVInJLd9c": {
      "day": "24-06-2023",
      "timeStart": 17,
      "userId": "zdErBu1NDUdRD2fJkY1Zq1geJov2"
    }
  },
  
  "timetable": {
    → "11-06-2023"
    → "17-06-2023",
    → "18-06-2023",
    ↓ "24-06-2023": { //Day
      "17": {         //Time of appointment
        "-NXYmC51UNsTalwPTtEv": {
          "aptId": "-NXYmC42s2uwVInJLd9c"
        }
      }
    }
  },
  
  "users": {
    → "nCAT0jhwKnRRNtOf1VkYqPvjiG62",
    → "tqPgiTlPD6ZYa33LXkUkb7Rvhu12",
    ↓ "zdErBu1NDUdRD2fJkY1Zq1geJov2": {
      "email": "walter@g.com",
      "name": "walter"
    }
  }
}
```

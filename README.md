# Online Railway Reservation System

## Introduction

The “National Rail” Train Ticket Reservation System web application implemented using technologies such as React JS for front-end  and Node JS, Express JS which is a Node JS web framework  for back-end and MongoDB document database to store the web application data.

The customer/user should register/signup to obtain services from the Train Ticket Reservation system. After successful registration/signup user can search trains by providing departure and destination stations. Then user can click the “Reserve Ticket” button to reserve tickets from that particular train. Then user is prompt to select the payment type either Mobile Payment or Card(Debit/Credit) Payment. If user select the Card Payment then user is redirect to Card Payment Gateway where user need to fill ticketing details and credit/debit card details. After successful reservation, confirmation email is send to the user with the help of Nodemailer module.

If the user select the Mobile Payment method PIN number is send to the user to confirm his Phone Number while redirecting user to Mobile Payment Gateway where user need to fill ticketing details and fill phone owner details and verify the phone by number entering the PIN number received.

Users can enter his/her NIC number and validate with Government Officers Database to check whether he/she is a government officer. In case if  a user is government officer he/she will receive 20% discount. After successful reservation, confirmation SMS is send to the user with the help of Twilio module. Twilio is an third party API which handles SMS services. Finally if the user is done with the reservation he/she can logout of the system.

## Features of the application

### 1)	System login

<img src="https://i.ibb.co/xsLbcZf/DS-2.png" alt="DS-2" border="0">
Figure 2: system login
<p></p><br />

### 2)  System Registration

<img src="https://i.ibb.co/Kwjd0vV/DS-3.png" alt="DS-3" border="0">
Figure 4: system registration
<p></p><br />

### 3) Home Screen

<img src="https://i.ibb.co/MfBT19q/DS-6.png" alt="DS-6" border="0">
Figure 5: home screen
<p></p><br />

### 4)  Payment Methods

<img src="https://i.ibb.co/VvY85G0/DS-13.png" alt="DS-13" border="0">
Figure 5: payment methods
<p></p><br />

### 5)  Card Payment Option

<img src="https://i.ibb.co/xHXqMLS/DS-14.png" alt="DS-14" border="0">
Figure 5: card payment option
<p></p><br />

### 6)  Reservation Details Received to Personal Email (via Card Payment)

<img src="https://i.ibb.co/mNXt0Jb/DS-22.png" alt="DS-22" border="0">
Figure 5: reservation details received to personal email
<p></p><br />

### 7)  Mobile Payment Option

<img src="https://i.ibb.co/NS1NRhP/DS-24.png" alt="DS-24" border="0">
Figure 5: mobile payment option
<p></p><br />

### 8) Pin Verification Message for Mobile Payment

<img src="https://i.ibb.co/YNsFTKs/DS-32.jpg" alt="DS-32" border="0">
Figure 5: pin verification message for mobile payment
<p></p><br />

### 9)  Reservation Details Received to Mobile Phone (via Mobile Payment)

<img src="https://i.ibb.co/W0rYxFk/DS-31.jpg" alt="DS-31" border="0">
Figure 5: reservation details received to mobile phone
<p></p><br />


## How to Deploy the Application 

#### i) User Management

As an improvement to the specification, In the user management section, there is a list of users, administrators can disable a particular user from that list. After disabling the user cannot access the account using their credentials. An error message will be displayed to the user. We’ve added this feature because if any passenger misbehaves some way, there should be a way to disable that user from the system. In the specification, there wasn’t a way to disable a user.
  
As another improvement to the specification administrators can edit passenger account. such as their email. In the user view, users can’t change their email addresses. however, if the special request comes from the passenger, administrators can update the specific passenger’s email address and other details. 

#### ii) Admin Management

In the original design there is no function for a manager to add or delete another manager to/from the system. So, by this if the number of managers increases or decreases within the company there would be no way to add a new manager or remove an existing manager from the system.

So as an improvement to the specification, a new function is added for the admin panel which enables an admin to add or remove another admin from the system. Thus, when an admin is newly added to the system, he/she would receive an email to the respective email provided when an admin is registered stating that he/she has been added as an admin to the system and he/she have to login to the system using his/her NC number. After registering one can change the password using the account settings in the admin panel. 

#### iii) Route Management

In the original design they have mention that railway transportation administration should be able to plan timetables so we have provided them an interface to manage different routes using unique route name and assign the stations that should be included in that route with relevant fairs. Following are functionalities available in the route management for railway transportation administration.
<p></p><br />


#### Developed by Ranmal Dewage;

## Copyright

(C) 2019 Ranmal Dewage (ranmal.b.dewage@gmail.com)
<br>
[ranmaldewage.wordpress.com](https://ranmaldewage.wordpress.com)

# Online Railway Reservation System

## Introduction

The “National Rail” Train Ticket Reservation System web application implemented using technologies such as React JS for front-end  and Node JS, Express JS which is a Node JS web framework  for back-end and MongoDB document database to store the web application data.

The customer/user should register/signup to obtain services from the Train Ticket Reservation system. After successful registration/signup user can search trains by providing departure and destination stations. Then user can click the “Reserve Ticket” button to reserve tickets from that particular train. Then user is prompt to select the payment type either Mobile Payment or Card(Debit/Credit) Payment. If user select the Card Payment then user is redirect to Card Payment Gateway where user need to fill ticketing details and credit/debit card details. After successful reservation, confirmation email is send to the user with the help of Nodemailer module.

If the user select the Mobile Payment method PIN number is send to the user to confirm his Phone Number while redirecting user to Mobile Payment Gateway where user need to fill ticketing details and fill phone owner details and verify the phone by number entering the PIN number received.

Users can enter his/her NIC number and validate with Government Officers Database to check whether he/she is a government officer. In case if  a user is government officer he/she will receive 20% discount. After successful reservation, confirmation SMS is send to the user with the help of Twilio module. Twilio is an third party API which handles SMS services. Finally if the user is done with the reservation he/she can logout of the system.

## Features of the application

### 1)	System login

<br />
<img src="https://i.ibb.co/xsLbcZf/DS-2.png" alt="DS-2" border="0">
Figure 1: system login
<p></p><br />

### 2)  System Registration

<br />
<img src="https://i.ibb.co/Kwjd0vV/DS-3.png" alt="DS-3" border="0">
Figure 2: system registration
<p></p><br />

### 3) Home Screen

<br />
<img src="https://i.ibb.co/NV2xqtT/DS-100.png" alt="DS-100" border="0">
Figure 3: home screen
<p></p><br />

### 4)  Payment Methods

<br />
<img src="https://i.ibb.co/VvY85G0/DS-13.png" alt="DS-13" border="0">
Figure 4: payment methods
<p></p><br />

### 5)  Card Payment Option

<br />
<img src="https://i.ibb.co/xHXqMLS/DS-14.png" alt="DS-14" border="0">
Figure 5: card payment option
<p></p><br />

### 6)  Reservation Details Received to Personal Email (via Card Payment)

<br />
<img src="https://i.ibb.co/F7VX5Db/DS-17.png" alt="DS-17" border="0">
Figure 6: reservation details received to personal email
<p></p><br />

### 7)  Mobile Payment Option

<br />
<img src="https://i.ibb.co/NS1NRhP/DS-24.png" alt="DS-24" border="0">
Figure 7: mobile payment option
<p></p><br />

### 8) Pin Verification Message for Mobile Payment

<br />
<img src="https://i.ibb.co/YNsFTKs/DS-32.jpg" alt="DS-32" border="0">
Figure 8: pin verification message for mobile payment
<p></p><br />

### 9)  Reservation Details Received to Mobile Phone (via Mobile Payment)

<br />
<img src="https://i.ibb.co/W0rYxFk/DS-31.jpg" alt="DS-31" border="0">
Figure 9: reservation details received to mobile phone
<p></p><br />


## How to Deploy the Application 

#### i) Create a new Google Acoount

Create a new Google Account and take the email address and its password and paste it inside **config.json** file, in path **"..../Online-Railway-Reservation-System/Services/routes/config.json"**. Also turn on the **Less Secure App Access** option under Security section of the created google account.

#### ii) Create Twilio Account

Create a new Twilio Account using above email address and take the Phone Number, Account SID and Auth Token given by twilio and paste it inside **config.json** file, in path **"..../Online-Railway-Reservation-System/Services/routes/config.json"**. 

#### iii) How to Delpoy

After that follows the instructions mentioned in the **How To deploy.txt** file. 

<br>

#### Developed by RANMAL DEWAGE;

## Copyright

(C) 2019 Ranmal Dewage (ranmal.b.dewage@gmail.com)
<br>
[ranmaldewage.wordpress.com](https://ranmaldewage.wordpress.com)

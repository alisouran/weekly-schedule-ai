create table Person(
    NationalCode BigInt primary key,
    First_Name Char(25) not null,
    Last_Name Char(25) not null,
    Birthday Date not null,
    Age Integer not null,
    Gender Char(10) not null
) create table Sick(
    NationalCode BigInt not null,
    Id integer primary key,
    Doctor_Id integer,
    Paziresh_Date Date not null,
    Paziresh_Number BigInt not null
) create table doctor(
    NationalCode BigInt not null,
    Code_Pezeshki BigInt primary key
) create table Doctor_degree(
    Code_Pezeshki BigInt not null,
    Degree nvarchar(225)
) create table Doctor_Specialty(
    Code_Pezeshki BigInt not null,
    Specialty nvarchar(225)
) create table nurse(
    NationalCode BigInt,
    Marriage nchar(3) not null,
    Personally_number BigInt primary key
) create table Nurse_degree(
    Personally_number BigInt primary key,
    Degree nvarchar(225)
) create table employee(
    Id integer primary key,
    NationalCode BigInt
) create table acute(
    Id integer primary key,
    Sick_Id integer,
    Nurse1_Id integer,
    Nurse2_Id integer
) create table non_acute(
    Id integer primary key,
    Sick_Id integer,
    Nurse_Id integer
) create table survived(
    Id integer primary key,
    leave_Date Date not null,
    Sick_Id integer
) create table dead(
    Id integer primary key,
    death_Date Date not null,
    Sick_Id integer
) create table illness(
    Id integer primary key,
    Name nvarchar(225) not null
) create table have(Sick_Id integer, illness_Id integer) create table medicine(Id integer, Name nvarchar(225) not null) create table Prescription(
    Doctor_Id integer,
    Nurse1_Id integer,
    Nurse2_Id integer,
    Sick_Id integer,
    Medicine_Id integer
) create table Reception(Employee_Id integer, Sick_Id integer) create table clearance(Employee_Id integer, Survived_Id integer)
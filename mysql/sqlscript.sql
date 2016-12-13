create database note_back_notes;
use note_back_notes;
create table labels (id int auto_increment primary key, name varchar(30),p_id int);
create table categorys (id int auto_increment  primary key, name varchar(30),l_id int);
create table notes (id int auto_increment  primary key, data json,c_id int);
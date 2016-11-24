create table labels (id int auto_increment,name varchar(30),p_id int);
create table categorys (id int auto_increment,name varchar(30),l_id int);
create table notes (id int auto_increment,data json,c_id int);
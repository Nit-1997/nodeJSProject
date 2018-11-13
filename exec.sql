
alter table pubs drop foreign key pubs_ibfk_1;
alter table pubs add foreign key (userId) references users(id) on delete cascade;
alter table comments drop foreign key comments_ibfk_1;
alter table comments add foreign key (userId) references users(id) on delete cascade;
alter table events drop foreign key events_ibfk_1;
alter table events add foreign key (userId) references users(id) on delete cascade;
alter table transactions drop foreign key transactions_ibfk_1;
alter table transactions add foreign key (userId) references users(id) on delete cascade;
alter table comments drop foreign key comments_ibfk_2;
alter table comments add foreign key (pubId) references pubs(id) on delete cascade;
alter table events drop foreign key events_ibfk_2;
alter table events add foreign key (pubId) references pubs(id) on delete cascade;
create table backupUser (name varchar(255) NOT NULL,mode varchar(255) NOT NULL,email varchar(255) DEFAULT NULL,contact varchar(255) DEFAULT NULL);
create trigger backupUser after delete on users for each row insert into backupUser values(old.name,old.mode,old.email,old.contact);
create table backupPub (pubName varchar(255) NOT NULL,address varchar(255) DEFAULT NULL,pubContact varchar(255) DEFAULT NULL);
create trigger backupPub after delete on pubs for each row insert into backupPub values(old.pubName,old.address,old.pubContact);


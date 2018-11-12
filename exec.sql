
alter table pubs drop foreign key pubs_ibfk_1;
alter table pubs add foreign key (userId) references users(id) on delete cascade;
alter table comments drop foreign key comments_ibfk_1;
alter table comments add foreign key (userId) references users(id) on delete cascade;
alter table events drop foreign key events_ibfk_1;
alter table events add foreign key (userId) references users(id) on delete cascade;
alter table transactions drop foreign key transactions_ibfk_1;
alter table transactions add foreign key (userId) references users(id) on delete cascade;
create table backup (name varchar(255) NOT NULL,mode varchar(255) NOT NULL,email varchar(255) DEFAULT NULL,contact varchar(255) DEFAULT NULL);
create trigger backup after delete on users for each row insert into backup values(old.name,old.mode,old.email,old.contact);


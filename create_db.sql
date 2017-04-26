use moodmonk;

drop table if exists User;
create table User (
`userid` varchar(255) not null,
`password` varchar(255) not null,
primary key (`userid`)
);

drop table if exists emotion_tone;
create table emotion_tone (
`index`   int auto_increment,
`userid`  varchar(255) not null,
`date`    date not null,
`anger`   decimal(11, 10) not null,
`disgust` decimal(11, 10) not null,
`fear`    decimal(11, 10) not null,
`joy`     decimal(11, 10) not null,
`sadness` decimal(11, 10) not null,
primary key (`index`, `userid`, `date`)
);

drop table if exists language_tone;
create table language_tone (
`index`       int auto_increment,
`userid`      varchar(255) not null,
`date`        date not null,
`analytical`  decimal(11, 10) not null,
`confident`   decimal(11, 10) not null,
`tentative`   decimal(11, 10) not null,
primary key (`index`, `userid`, `date`)
);

drop table if exists social_tone;
create table social_tone (
`index`                  int auto_increment,
`userid`                 varchar(255) not null,
`date`                   date not null,
`openness_big5`          decimal(11, 10) not null,
`conscientiousness_big5` decimal(11, 10) not null,
`extraversion_big5`      decimal(11, 10) not null,
`agreeableness_big5`     decimal(11, 10) not null,
`emotional_range_big5`   decimal(11, 10) not null,
primary key (`index`, `userid`, `date`)
);

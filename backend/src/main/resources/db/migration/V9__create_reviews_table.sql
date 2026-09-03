create table reviews (
    id bigint auto_increment primary key,
    product_id bigint not null,
    user_id bigint not null,
    rating tinyint not null,
    comment text null,
    sentiment_label varchar(20) null,
    sentiment_score decimal(5,4) null,
    created_at datetime default current_timestamp not null,
    constraint reviews_products_id_fk foreign key (product_id) references products (id) on delete cascade,
    constraint reviews_users_id_fk foreign key (user_id) references users (id) on delete cascade
);

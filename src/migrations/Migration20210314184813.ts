import { Migration } from "@mikro-orm/migrations";

export class Migration20210314184813 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "tag" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null);'
    );
    this.addSql(
      'alter table "tag" add constraint "tag_pkey" primary key ("id");'
    );

    this.addSql(
      'create table "publisher" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "type" text check ("type" in (\'local\', \'global\')) not null);'
    );
    this.addSql(
      'alter table "publisher" add constraint "publisher_pkey" primary key ("id");'
    );

    this.addSql(
      'create table "author" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "address" varchar(255) null, "email" varchar(255) not null, "terms_accepted" jsonb not null, "born" timestamptz(0) null, "favourite_book_id" uuid null);'
    );
    this.addSql(
      'alter table "author" add constraint "author_pkey" primary key ("id");'
    );
    this.addSql(
      'alter table "author" add constraint "author_email_unique" unique ("email");'
    );

    this.addSql(
      'create table "book" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "title" varchar(255) not null, "author_id" uuid not null, "publisher_id" uuid null);'
    );
    this.addSql(
      'alter table "book" add constraint "book_pkey" primary key ("id");'
    );

    this.addSql(
      'create table "book_tags" ("book_id" uuid not null, "tag_id" uuid not null);'
    );
    this.addSql(
      'alter table "book_tags" add constraint "book_tags_pkey" primary key ("book_id", "tag_id");'
    );

    this.addSql(
      'alter table "author" add constraint "author_favourite_book_id_foreign" foreign key ("favourite_book_id") references "book" ("id") on update cascade on delete set null;'
    );

    this.addSql(
      'alter table "book" add constraint "book_author_id_foreign" foreign key ("author_id") references "author" ("id") on update cascade on delete cascade;'
    );
    this.addSql(
      'alter table "book" add constraint "book_publisher_id_foreign" foreign key ("publisher_id") references "publisher" ("id") on update cascade on delete cascade;'
    );

    this.addSql(
      'alter table "book_tags" add constraint "book_tags_book_id_foreign" foreign key ("book_id") references "book" ("id") on update cascade on delete cascade;'
    );
    this.addSql(
      'alter table "book_tags" add constraint "book_tags_tag_id_foreign" foreign key ("tag_id") references "tag" ("id") on update cascade on delete cascade;'
    );
  }
}

-- DROP TABLE IF EXISTS question CASCADE;
-- DROP TABLE IF EXISTS answer CASCADE;

CREATE TABLE "question" (
	"question_id" bigserial NOT NULL,
	"asker_name" varchar(60) NOT NULL,
	"asker_email" varchar(60) NOT NULL,
	"question_body" varchar(1000) NOT NULL,
	"question_helpfulness" bigint NOT NULL DEFAULT 0,
	"reported" BOOLEAN NOT NULL DEFAULT false,
	"question_date" TIMESTAMPTZ NOT NULL,
	"product_id" bigint NOT NULL,
	CONSTRAINT "question_pk" PRIMARY KEY ("question_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "answer" (
	"answer_id" bigserial NOT NULL,
	"question_id" bigint NOT NULL,
	"body" varchar(1000) NOT NULL,
	"date" TIMESTAMPTZ NOT NULL,
	"answerer_name" varchar(60) NOT NULL,
	"answerer_email" varchar(60) NOT NULL,
	"reported" BOOLEAN NOT NULL DEFAULT false,
	"helpfulness" bigint NOT NULL DEFAULT 0,
	"photos" jsonb NOT NULL DEFAULT '[]',
	CONSTRAINT "answer_pk" PRIMARY KEY ("answer_id")
) WITH (
  OIDS=FALSE
);

ALTER TABLE "answer" ADD CONSTRAINT "answer_fk0" FOREIGN KEY ("question_id") REFERENCES "question"("question_id");

CREATE INDEX question_id_index ON answer (question_id);

CREATE INDEX product_id_index ON question (product_id);
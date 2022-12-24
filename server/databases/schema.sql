-- DROP TABLE IF EXISTS question CASCADE;

CREATE TABLE "question" (
	"question_id" serial NOT NULL,
	"asker_name" varchar(60) NOT NULL,
	"asker_email" varchar(60) NOT NULL,
	"question_body" varchar(1000) NOT NULL,
	"question_helpfulness" int NOT NULL,
	"reported" BOOLEAN NOT NULL,
	"question_date" TIMESTAMPTZ NOT NULL,
	"product_id" int NOT NULL,
	CONSTRAINT "question_pk" PRIMARY KEY ("question_id")
) WITH (
  OIDS=FALSE
);

DROP TABLE IF EXISTS answer CASCADE;

CREATE TABLE "answer" (
	"answer_id" serial NOT NULL,
	"question_id" int NOT NULL,
	"body" varchar(1000) NOT NULL,
	"date" TIMESTAMPTZ NOT NULL,
	"answerer_name" varchar(60) NOT NULL,
	"answerer_email" varchar(60) NOT NULL,
	"reported" BOOLEAN NOT NULL,
	"helpfulness" int NOT NULL,
	"photos" json,
	CONSTRAINT "answer_pk" PRIMARY KEY ("answer_id")
) WITH (
  OIDS=FALSE
);


ALTER TABLE "answer" ADD CONSTRAINT "answer_fk0" FOREIGN KEY ("question_id") REFERENCES "question"("question_id");

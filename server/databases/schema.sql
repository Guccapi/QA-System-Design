DROP TABLE IF EXISTS "question"

CREATE TABLE "question" (
	"Question Id" serial NOT NULL,
	"Asker" varchar(60) NOT NULL,
	"Email" varchar(255) NOT NULL,
	"Body" bytea(1000) NOT NULL UNIQUE,
	"Helpfulness" int NOT NULL,
	"Reported" BOOLEAN NOT NULL,
	"Date" timestamp with time zone NOT NULL,
	"Answers" jsonb NOT NULL UNIQUE,
	CONSTRAINT "question" PRIMARY KEY ("Question Id")
) WITH (
  OIDS=FALSE
);

DROP TABLE IF EXISTS "answer"

CREATE TABLE "answer" (
	"Answer Id" serial NOT NULL,
	"Body" bytea(1000) NOT NULL,
	"Date" timestamp with time zone NOT NULL,
	"Answerer" varchar(60) NOT NULL,
	"Helpfulness" int(60) NOT NULL,
	"Photos" jsonb NOT NULL,
	"Reported" BOOLEAN NOT NULL,
	"Question Id" int NOT NULL,
	CONSTRAINT "answer_pk" PRIMARY KEY ("Answer Id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "questions & Answers" (
	"Product Id" serial NOT NULL,
	"Question Id" serial NOT NULL,
	CONSTRAINT "Questions & Answers_pk" PRIMARY KEY ("Product Id")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "Questions" ADD CONSTRAINT "Questions_fk0" FOREIGN KEY ("Answers") REFERENCES "Answers"("Answer Id");

ALTER TABLE "Answers" ADD CONSTRAINT "Answers_fk0" FOREIGN KEY ("Question Id") REFERENCES "Questions"("Question Id");

ALTER TABLE "Questions & Answers" ADD CONSTRAINT "Questions & Answers_fk0" FOREIGN KEY ("Question Id") REFERENCES "Questions"("Question Id");





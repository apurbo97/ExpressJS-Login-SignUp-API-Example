--
-- PostgreSQL database dump
--

-- Dumped from database version 13.4
-- Dumped by pg_dump version 13.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: user_tbl; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_tbl (
    id integer NOT NULL,
    username character varying NOT NULL,
    first_name character varying,
    last_name character varying,
    email_id character varying,
    password character varying
);


ALTER TABLE public.user_tbl OWNER TO postgres;

--
-- Name: user_tbl_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_tbl_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_tbl_id_seq OWNER TO postgres;

--
-- Name: user_tbl_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_tbl_id_seq OWNED BY public.user_tbl.id;


--
-- Name: user_tbl id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_tbl ALTER COLUMN id SET DEFAULT nextval('public.user_tbl_id_seq'::regclass);


--
-- Data for Name: user_tbl; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_tbl (id, username, first_name, last_name, email_id, password) FROM stdin;
1	user001	UserFname	UserLname1	email@id.com	123
\.


--
-- Name: user_tbl_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_tbl_id_seq', 44, true);


--
-- Name: user_tbl user_tbl_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_tbl
    ADD CONSTRAINT user_tbl_pk PRIMARY KEY (id);


--
-- Name: user_tbl user_tbl_un; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_tbl
    ADD CONSTRAINT user_tbl_un UNIQUE (email_id, username);


--
-- PostgreSQL database dump complete
--


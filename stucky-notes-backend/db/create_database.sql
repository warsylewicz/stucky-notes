-- initial script to create database

DROP TABLE notes;
DROP TABLE users;
DROP TABLE roles;

-- TOC entry 206 (class 1259 OID 16424)
-- Name: notes; Type: TABLE; Schema: public; Owner: stucky_notes_db_user
--

CREATE TABLE public.notes (
    id integer NOT NULL,
    contents text NOT NULL,
    posx integer NOT NULL,
    posy integer NOT NULL,
    created_date timestamp NOT NULL,
    modified_date timestamp NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.notes OWNER TO stucky_notes_db_user;

--
-- TOC entry 205 (class 1259 OID 16422)
-- Name: notes_id_seq; Type: SEQUENCE; Schema: public; Owner: stucky_notes_db_user
--

CREATE SEQUENCE public.notes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.notes_id_seq OWNER TO stucky_notes_db_user;

--
-- TOC entry 2840 (class 0 OID 0)
-- Dependencies: 205
-- Name: notes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stucky_notes_db_user
--

ALTER SEQUENCE public.notes_id_seq OWNED BY public.notes.id;


--
-- TOC entry 202 (class 1259 OID 16395)
-- Name: roles; Type: TABLE; Schema: public; Owner: stucky_notes_db_user
--

CREATE TABLE public.roles (
    role_name character varying(5) NOT NULL
);


ALTER TABLE public.roles OWNER TO stucky_notes_db_user;

--
-- TOC entry 204 (class 1259 OID 16408)
-- Name: users; Type: TABLE; Schema: public; Owner: stucky_notes_db_user
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    signed_in_count integer NOT NULL,
    last_signed_in timestamp NOT NULL,
    role_name character varying(5) NOT NULL,
    UNIQUE(email)
);


ALTER TABLE public.users OWNER TO stucky_notes_db_user;

--
-- TOC entry 203 (class 1259 OID 16406)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: stucky_notes_db_user
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO stucky_notes_db_user;

--
-- TOC entry 2841 (class 0 OID 0)
-- Dependencies: 203
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stucky_notes_db_user
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 2700 (class 2604 OID 16427)
-- Name: notes id; Type: DEFAULT; Schema: public; Owner: stucky_notes_db_user
--

ALTER TABLE ONLY public.notes ALTER COLUMN id SET DEFAULT nextval('public.notes_id_seq'::regclass);


--
-- TOC entry 2699 (class 2604 OID 16411)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: stucky_notes_db_user
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 2706 (class 2606 OID 16432)
-- Name: notes notes_pkey; Type: CONSTRAINT; Schema: public; Owner: stucky_notes_db_user
--

ALTER TABLE ONLY public.notes
    ADD CONSTRAINT notes_pkey PRIMARY KEY (id);


--
-- TOC entry 2702 (class 2606 OID 16401)
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: stucky_notes_db_user
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (role_name);


--
-- TOC entry 2704 (class 2606 OID 16416)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: stucky_notes_db_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 2708 (class 2606 OID 16433)
-- Name: notes owner; Type: FK CONSTRAINT; Schema: public; Owner: stucky_notes_db_user
--

ALTER TABLE ONLY public.notes
    ADD CONSTRAINT owner FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 2707 (class 2606 OID 16417)
-- Name: users role_name; Type: FK CONSTRAINT; Schema: public; Owner: stucky_notes_db_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT role_name FOREIGN KEY (role_name) REFERENCES public.roles(role_name) NOT VALID;


INSERT INTO public.roles (role_name) VALUES ('admin');
INSERT INTO public.roles (role_name) VALUES ('user');

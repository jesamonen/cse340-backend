
-- ==========================================
-- CSE 340 W02 DATABASE SETUP
-- Organizations, Service Projects, Categories
-- ==========================================

BEGIN;

-- ==========================================
-- 1. DROP EXISTING TABLES
-- This allows the database to be recreated.
-- ==========================================

DROP TABLE IF EXISTS project_category CASCADE;
DROP TABLE IF EXISTS service_project CASCADE;
DROP TABLE IF EXISTS category CASCADE;
DROP TABLE IF EXISTS organization CASCADE;

-- ==========================================
-- 2. CREATE ORGANIZATION TABLE
-- ==========================================

CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

-- ==========================================
-- 3. INSERT ORGANIZATIONS
-- ==========================================

INSERT INTO organization
    (name, description, contact_email, logo_filename)
VALUES
(
    'BrightFuture Builders',
    'A nonprofit focused on improving community infrastructure through sustainable construction projects.',
    'info@brightfuturebuilders.org',
    'education.jpg'
),
(
    'GreenHarvest Growers',
    'An urban farming collective promoting food sustainability and education in local neighborhoods.',
    'contact@greenharvest.org',
    'environment.jpg'
),
(
    'UnityServe Volunteers',
    'A volunteer coordination group supporting local charities and service initiatives.',
    'hello@unityserve.org',
    'community.jpg'
);

-- ==========================================
-- 4. CREATE SERVICE PROJECT TABLE
-- ==========================================

CREATE TABLE service_project (
    project_id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(150) NOT NULL,
    date DATE NOT NULL,

    CONSTRAINT fk_service_project_organization
        FOREIGN KEY (organization_id)
        REFERENCES organization(organization_id)
        ON DELETE RESTRICT
);

-- ==========================================
-- 5. INSERT SERVICE PROJECTS
-- ==========================================

INSERT INTO service_project
    (organization_id, title, description, location, date)
VALUES
(1, 'Community Library Construction', 'Building a library to provide learning resources for children.', 'Lagos, Nigeria', '2026-12-05'),
(2, 'Community Vegetable Garden', 'Creating a vegetable garden to promote local food production.', 'Surulere, Lagos', '2026-12-06'),
(3, 'Community Health Outreach', 'Providing basic health education and awareness to residents.', 'Mushin, Lagos', '2026-12-07'),
(1, 'School Renovation Project', 'Renovating classrooms and improving school facilities.', 'Ikeja, Lagos', '2026-12-12'),
(2, 'Urban Farming Workshop', 'Teaching residents sustainable urban farming techniques.', 'Yaba, Lagos', '2026-12-13'),
(3, 'Food Distribution Programme', 'Distributing food supplies to vulnerable families.', 'Ajegunle, Lagos', '2026-12-14'),
(1, 'Clean Water Initiative', 'Installing clean water facilities for underserved communities.', 'Badagry, Lagos', '2026-12-19'),
(2, 'Tree Planting Campaign', 'Planting trees to improve the environment and promote sustainability.', 'Lekki, Lagos', '2026-12-20'),
(3, 'Children Education Support', 'Providing learning materials and educational support to children.', 'Festac, Lagos', '2026-12-21'),
(1, 'Community Road Improvement', 'Repairing damaged roads to improve community transportation.', 'Ikorodu, Lagos', '2027-01-09'),
(2, 'School Farming Programme', 'Helping students establish and maintain school gardens.', 'Agege, Lagos', '2027-01-10'),
(3, 'Public Sanitation Campaign', 'Organizing community clean-up and sanitation activities.', 'Alimosho, Lagos', '2027-01-11'),
(1, 'Youth Skills Development Centre', 'Constructing a centre for vocational training and youth development.', 'Epe, Lagos', '2027-01-16'),
(2, 'Organic Farming Training', 'Training local farmers in organic farming methods.', 'Oshodi, Lagos', '2027-01-17'),
(3, 'Elderly Care Initiative', 'Supporting elderly residents through visits and essential supplies.', 'Apapa, Lagos', '2027-01-18');

-- ==========================================
-- 6. CREATE CATEGORY TABLE
-- ==========================================

CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL UNIQUE,
    category_description TEXT NOT NULL
);

-- ==========================================
-- 7. INSERT CATEGORIES
-- ==========================================

INSERT INTO category
    (category_name, category_description)
VALUES
('Construction', 'Building, renovation, and infrastructure improvement projects.'),
('Education', 'Learning, teaching, and educational support initiatives.'),
('Environment', 'Environmental protection, sanitation, and sustainability projects.'),
('Food and Agriculture', 'Food production, farming, and food distribution initiatives.'),
('Health and Well-being', 'Health education, outreach, and community care projects.'),
('Community Development', 'Projects that improve local communities and support residents.');

-- ==========================================
-- 8. CREATE PROJECT_CATEGORY JUNCTION TABLE
-- Many-to-many relationship
-- ==========================================

CREATE TABLE project_category (
    project_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,

    CONSTRAINT pk_project_category
        PRIMARY KEY (project_id, category_id),

    CONSTRAINT fk_project_category_project
        FOREIGN KEY (project_id)
        REFERENCES service_project(project_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_project_category_category
        FOREIGN KEY (category_id)
        REFERENCES category(category_id)
        ON DELETE CASCADE
);

-- ==========================================
-- 9. ASSOCIATE PROJECTS WITH CATEGORIES
-- ==========================================

INSERT INTO project_category (project_id, category_id)
SELECT
    sp.project_id,
    c.category_id
FROM (
    VALUES
    ('Community Library Construction', 'Construction'),
    ('Community Library Construction', 'Education'),
    ('Community Library Construction', 'Community Development'),

    ('Community Vegetable Garden', 'Food and Agriculture'),
    ('Community Vegetable Garden', 'Environment'),
    ('Community Vegetable Garden', 'Community Development'),

    ('Community Health Outreach', 'Health and Well-being'),
    ('Community Health Outreach', 'Community Development'),

    ('School Renovation Project', 'Construction'),
    ('School Renovation Project', 'Education'),

    ('Urban Farming Workshop', 'Food and Agriculture'),
    ('Urban Farming Workshop', 'Education'),

    ('Food Distribution Programme', 'Food and Agriculture'),
    ('Food Distribution Programme', 'Community Development'),

    ('Clean Water Initiative', 'Health and Well-being'),
    ('Clean Water Initiative', 'Community Development'),
    ('Clean Water Initiative', 'Environment'),

    ('Tree Planting Campaign', 'Environment'),
    ('Tree Planting Campaign', 'Community Development'),

    ('Children Education Support', 'Education'),
    ('Children Education Support', 'Community Development'),

    ('Community Road Improvement', 'Construction'),
    ('Community Road Improvement', 'Community Development'),

    ('School Farming Programme', 'Food and Agriculture'),
    ('School Farming Programme', 'Education'),
    ('School Farming Programme', 'Environment'),

    ('Public Sanitation Campaign', 'Health and Well-being'),
    ('Public Sanitation Campaign', 'Environment'),

    ('Youth Skills Development Centre', 'Construction'),
    ('Youth Skills Development Centre', 'Education'),
    ('Youth Skills Development Centre', 'Community Development'),

    ('Organic Farming Training', 'Food and Agriculture'),
    ('Organic Farming Training', 'Environment'),
    ('Organic Farming Training', 'Education'),

    ('Elderly Care Initiative', 'Health and Well-being'),
    ('Elderly Care Initiative', 'Community Development')

) AS pc(project_title, category_name)

INNER JOIN service_project AS sp
    ON sp.title = pc.project_title

INNER JOIN category AS c
    ON c.category_name = pc.category_name;

-- ==========================================
-- 10. VERIFY DATABASE RECORDS
-- ==========================================

SELECT COUNT(*) AS total_organizations FROM organization;
SELECT COUNT(*) AS total_projects FROM service_project;
SELECT COUNT(*) AS total_categories FROM category;
SELECT COUNT(*) AS total_project_category_relationships
FROM project_category;

COMMIT;

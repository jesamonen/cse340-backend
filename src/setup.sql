
-- ==========================================
-- 1. CREATE ORGANIZATION TABLE
-- ==========================================

CREATE TABLE IF NOT EXISTS organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

-- ==========================================
-- 2. INSERT THREE ORGANIZATIONS
-- ==========================================

INSERT INTO organization
    (name, description, contact_email, logo_filename)
VALUES
(
    'BrightFuture Builders',
    'A nonprofit focused on improving community infrastructure through sustainable construction projects.',
    'info@brightfuturebuilders.org',
    'brightfuture-logo.png'
),
(
    'GreenHarvest Growers',
    'An urban farming collective promoting food sustainability and education in local neighborhoods.',
    'contact@greenharvest.org',
    'greenharvest-logo.png'
),
(
    'UnityServe Volunteers',
    'A volunteer coordination group supporting local charities and service initiatives.',
    'hello@unityserve.org',
    'unityserve-logo.png'
);

-- ==========================================
-- 3. CREATE SERVICE PROJECT TABLE
-- ==========================================

CREATE TABLE IF NOT EXISTS service_project (
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
-- 4. INSERT FIFTEEN SERVICE PROJECTS
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

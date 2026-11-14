-- A category can belong to multiple projects.
-- IDs are retrieved using project titles and category names.

INSERT INTO project_category
    (project_id, category_id)

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

SELECT COUNT(*) AS total_organizations
FROM organization;

SELECT COUNT(*) AS total_projects
FROM service_project;

SELECT COUNT(*) AS total_categories
FROM category;

SELECT COUNT(*) AS total_project_category_relationships
FROM project_category;


-- ==========================================
-- 11. DISPLAY PROJECTS WITH ORGANIZATIONS
-- AND THEIR CATEGORIES
-- ==========================================

SELECT
    sp.project_id,
    sp.title,
    o.name AS organization_name,
    c.category_name,
    sp.location,
    sp.date

FROM service_project AS sp

INNER JOIN organization AS o
    ON sp.organization_id = o.organization_id

INNER JOIN project_category AS pc
    ON sp.project_id = pc.project_id

INNER JOIN category AS c
    ON pc.category_id = c.category_id

ORDER BY sp.date ASC, sp.title ASC;


COMMIT;

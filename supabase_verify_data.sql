-- Verify data exists in tables
SELECT 'plans' AS table, COUNT(*) AS count FROM "Plan"
UNION ALL
SELECT 'articles', COUNT(*) FROM "Article"
UNION ALL
SELECT 'testimonials', COUNT(*) FROM "Testimonial";

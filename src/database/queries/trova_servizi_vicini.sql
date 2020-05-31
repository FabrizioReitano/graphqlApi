SELECT s.id, s.name, t.name as tag, ST_Distance(s.geog, 'SRID=4326;POINT(41.868615 12.578673)'::geography) as distance 
FROM services as s
LEFT JOIN services_tags as st on st.service_id = s.id
LEFT JOIN tags as t on st.tag_id = t.id
WHERE ST_DWithin(s.geog, 'SRID=4326;POINT(41.868615 12.578673)'::geography, 500)
and t.name like 'aliment%';

-- select * from tags where name like '%alim%';

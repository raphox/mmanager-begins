# mmanager-api

## Setup

```
yarn install
```

## Run

```
npm index.js
```

## PostgreSQL

```sql
CREATE OR REPLACE FUNCTION notify_rows_changes()
RETURNS trigger AS $$
DECLARE
  record JSON;
BEGIN
  record := row_to_json(CASE TG_OP
    WHEN 'INSERT' THEN NEW
 	WHEN 'UPDATE' THEN NEW
 	ELSE OLD
  END);

  PERFORM pg_notify(
    'row_changed',
    json_build_object(
      'operation', TG_OP,
      'record', record
    )::text
  );

  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER rooms_changed
AFTER INSERT OR UPDATE OR DELETE
ON rooms
FOR EACH ROW
EXECUTE PROCEDURE notify_rows_changes();
```

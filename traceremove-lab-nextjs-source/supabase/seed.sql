-- Optional seed: run after the founder has logged in and the profile row exists.
-- Replace the email before execution.
update public.profiles set role = 'admin' where email = 'YOUR_EMAIL';

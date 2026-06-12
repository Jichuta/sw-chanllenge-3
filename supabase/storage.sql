INSERT INTO storage.buckets (id, name, public)
VALUES ('candidate-cvs', 'candidate-cvs', false);

CREATE POLICY "Admin can view CVs"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'candidate-cvs');

CREATE POLICY "Service role can upload CVs"
ON storage.objects FOR INSERT TO service_role
WITH CHECK (bucket_id = 'candidate-cvs');

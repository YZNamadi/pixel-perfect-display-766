-- Owner-scoped storage access for documents and certificates buckets.
-- Path convention: <owner-uuid>/<filename>

create policy "owner writes own documents" on storage.objects
for insert to authenticated
with check (bucket_id in ('documents','certificates') and (storage.foldername(name))[1] = auth.uid()::text);

create policy "owner reads own documents" on storage.objects
for select to authenticated
using (bucket_id in ('documents','certificates') and (storage.foldername(name))[1] = auth.uid()::text);

create policy "owner deletes own documents" on storage.objects
for delete to authenticated
using (bucket_id in ('documents','certificates') and (storage.foldername(name))[1] = auth.uid()::text);

create policy "owner updates own documents" on storage.objects
for update to authenticated
using (bucket_id in ('documents','certificates') and (storage.foldername(name))[1] = auth.uid()::text)
with check (bucket_id in ('documents','certificates') and (storage.foldername(name))[1] = auth.uid()::text);
-- ============ PROFILES & ROLES ============
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text not null default '',
  role_label text not null default 'Portfolio admin',
  account_type text not null default 'facility' check (account_type in ('facility','contractor')),
  company text not null default '',
  phone text not null default '',
  created_at timestamptz not null default now()
);

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role text not null check (role in ('admin','manager','member','contractor')),
  unique (user_id, role)
);

create or replace function public.has_role(_user_id uuid, _role text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = _user_id and role = _role
  )
$$;

grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create policy "users read own roles" on public.user_roles for select to authenticated using (user_id = auth.uid());

grant select, update on public.profiles to authenticated;
grant all on public.profiles to service_role;
alter table public.profiles enable row level security;
create policy "read own profile" on public.profiles for select to authenticated using (id = auth.uid());
create policy "update own profile" on public.profiles for update to authenticated using (id = auth.uid());

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, account_type)
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data->>'full_name', split_part(coalesce(new.email,'x@x.x'),'@',1)),
    coalesce(new.raw_user_meta_data->>'account_type','facility')
  );
  insert into public.user_roles (user_id, role) values (new.id, 'admin');
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- ============ SITES ============
create table public.sites (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null,
  name text not null,
  city text not null default '',
  address text not null default '',
  compliance_score int not null default 100,
  ppm_outstanding int not null default 0,
  open_repairs int not null default 0,
  created_at timestamptz not null default now()
);

-- ============ EQUIPMENT ============
create table public.equipment (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null,
  site_id uuid references public.sites(id) on delete set null,
  name text not null,
  serial text not null default '',
  category text not null default 'Diagnostics',
  maintenance_schedule text not null default 'Annually',
  next_due date,
  incidents int not null default 0,
  status text not null default 'Active' check (status in ('Active','Under Maintenance','Decommissioned')),
  created_at timestamptz not null default now()
);

-- ============ REPAIR TICKETS ============
create table public.repair_tickets (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null,
  site_id uuid references public.sites(id) on delete set null,
  title text not null,
  description text not null default '',
  priority text not null default 'Normal' check (priority in ('Low','Normal','High','Critical')),
  status text not null default 'Open' check (status in ('Open','In Progress','Awaiting Quote','In Review','Completed')),
  assignee text not null default '',
  created_at timestamptz not null default now(),
  completed_at timestamptz
);

-- ============ TASKS ============
create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null,
  site_id uuid references public.sites(id) on delete set null,
  title text not null,
  category text not null default 'Compliance Audit',
  status text not null default 'Open' check (status in ('Open','In Progress','In Review','Completed')),
  due_date date,
  assignee text not null default '',
  created_at timestamptz not null default now(),
  completed_at timestamptz
);

-- ============ DOCUMENTS ============
create table public.documents (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null,
  site_id uuid references public.sites(id) on delete set null,
  name text not null,
  category text not null default 'Compliance',
  status text not null default 'Draft' check (status in ('Draft','In Review','Filed','Approved','Archived')),
  file_path text not null default '',
  file_size int not null default 0,
  uploaded_at timestamptz not null default now()
);

-- ============ TEAM MEMBERS ============
create table public.team_members (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null,
  name text not null,
  email text not null default '',
  role text not null default 'Technician',
  member_type text not null default 'internal' check (member_type in ('internal','contractor')),
  company text not null default '',
  status text not null default 'Active' check (status in ('Active','On Leave / Suspended','Off-Duty / Inactive')),
  avatar_tone text not null default 'blue',
  created_at timestamptz not null default now()
);

-- ============ CERTIFICATES ============
create table public.certificates (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null,
  member_id uuid references public.team_members(id) on delete cascade,
  name text not null,
  file_path text not null default '',
  uploaded_at timestamptz not null default now(),
  expires_on date
);

-- ============ REPORTS ============
create table public.reports (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null,
  site_id uuid references public.sites(id) on delete set null,
  title text not null,
  category text not null default 'Compliance Audit',
  status text not null default 'Draft' check (status in ('Draft','In Review','Filed','Approved','Archived')),
  staff_member text not null default '',
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- ============ AUDIT LOG ============
create table public.audit_log (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null,
  occurred_at timestamptz not null default now(),
  actor text not null default 'System',
  action text not null,
  details text not null default '',
  entity text not null default '',
  review_status text not null default 'Pending Review' check (review_status in ('Pending Review','Reviewed','Flagged for Follow-up')),
  priority text not null default 'Normal',
  notes text not null default '',
  ip text not null default '',
  session_id text not null default ''
);

-- ============ STAFF RECORDS & TRAINING ============
create table public.staff_records (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null,
  name text not null,
  job_title text not null default '',
  department text not null default '',
  start_date date,
  status text not null default 'Active',
  created_at timestamptz not null default now()
);

create table public.training_records (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null,
  staff_id uuid references public.staff_records(id) on delete cascade,
  course text not null,
  completed_on date,
  expires_on date,
  status text not null default 'Current' check (status in ('Current','Expiring Soon','Expired')),
  created_at timestamptz not null default now()
);

-- ============ TICKET QUOTES ============
create table public.ticket_quotes (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null,
  ticket_id uuid references public.repair_tickets(id) on delete cascade,
  contractor_id uuid references public.team_members(id) on delete set null,
  amount numeric not null default 0,
  note text not null default '',
  status text not null default 'Submitted' check (status in ('Submitted','Accepted','Rejected')),
  created_at timestamptz not null default now()
);

-- ============ NOTIFICATIONS ============
create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null,
  title text not null,
  body text not null default '',
  kind text not null default 'info',
  read boolean not null default false,
  created_at timestamptz not null default now()
);

-- ============ SETTINGS ============
create table public.app_settings (
  owner_id uuid primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- ============ GRANTS ============
grant select, insert, update, delete on public.sites to authenticated;
grant select, insert, update, delete on public.equipment to authenticated;
grant select, insert, update, delete on public.repair_tickets to authenticated;
grant select, insert, update, delete on public.tasks to authenticated;
grant select, insert, update, delete on public.documents to authenticated;
grant select, insert, update, delete on public.team_members to authenticated;
grant select, insert, update, delete on public.certificates to authenticated;
grant select, insert, update, delete on public.reports to authenticated;
grant select, insert, update, delete on public.audit_log to authenticated;
grant select, insert, update, delete on public.staff_records to authenticated;
grant select, insert, update, delete on public.training_records to authenticated;
grant select, insert, update, delete on public.ticket_quotes to authenticated;
grant select, insert, update, delete on public.notifications to authenticated;
grant select, insert, update on public.app_settings to authenticated;
grant all on public.sites to service_role;
grant all on public.equipment to service_role;
grant all on public.repair_tickets to service_role;
grant all on public.tasks to service_role;
grant all on public.documents to service_role;
grant all on public.team_members to service_role;
grant all on public.certificates to service_role;
grant all on public.reports to service_role;
grant all on public.audit_log to service_role;
grant all on public.staff_records to service_role;
grant all on public.training_records to service_role;
grant all on public.ticket_quotes to service_role;
grant all on public.notifications to service_role;
grant all on public.app_settings to service_role;

-- ============ RLS ============
alter table public.sites enable row level security;
alter table public.equipment enable row level security;
alter table public.repair_tickets enable row level security;
alter table public.tasks enable row level security;
alter table public.documents enable row level security;
alter table public.team_members enable row level security;
alter table public.certificates enable row level security;
alter table public.reports enable row level security;
alter table public.audit_log enable row level security;
alter table public.staff_records enable row level security;
alter table public.training_records enable row level security;
alter table public.ticket_quotes enable row level security;
alter table public.notifications enable row level security;
alter table public.app_settings enable row level security;

do $$
declare t text;
begin
  foreach t in array array['sites','equipment','repair_tickets','tasks','documents','team_members','certificates','reports','audit_log','staff_records','training_records','ticket_quotes','notifications']
  loop
    execute format('create policy "owner full access" on public.%I for all to authenticated using (owner_id = auth.uid()) with check (owner_id = auth.uid());', t);
  end loop;
end $$;

create policy "owner settings" on public.app_settings for all to authenticated using (owner_id = auth.uid()) with check (owner_id = auth.uid());
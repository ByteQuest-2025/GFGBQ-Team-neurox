const base = 'http://localhost:4000';

async function req(path, opts={}){
  const res = await fetch(base+path, {
    headers: {'content-type':'application/json'},
    ...opts
  });
  const text = await res.text();
  let json=null; try{ json=JSON.parse(text);}catch(e){json=text}
  return { status: res.status, body: json };
}

async function run(){
  console.log('Starting smoke tests against', base);

  // Register user
  const userCred = { email: 'user+test@local', password: 'Password123' };
  console.log('\n1) Registering user...');
  let r = await req('/auth/register', { method: 'POST', body: JSON.stringify(userCred) });
  console.log('register user ->', r.status, r.body);
  if (r.status !== 200) return process.exit(1);
  const userToken = r.body.token;

  // Login user
  console.log('\n2) Logging in user...');
  r = await req('/auth/login', { method: 'POST', body: JSON.stringify(userCred) });
  console.log('login user ->', r.status, r.body);
  if (r.status !== 200) return process.exit(1);

  // Submit grievance
  console.log('\n3) Submitting grievance as user...');
  const grievance = { title: 'Test grievance', description: 'This is a smoke-test grievance', category: 'General' };
  r = await fetch(base+'/api/grievances', { method: 'POST', headers: { 'content-type':'application/json', 'authorization':'Bearer '+userToken }, body: JSON.stringify(grievance) });
  let body = await r.text(); try{ body = JSON.parse(body);}catch(e){}
  console.log('submit grievance ->', r.status, body);
  if (r.status !== 200) return process.exit(1);
  const grievanceId = body.grievance && body.grievance.id;

  // List user grievances
  console.log('\n4) Listing user grievances...');
  r = await fetch(base+'/api/grievances', { headers: { 'authorization':'Bearer '+userToken }});
  body = await r.text(); try{ body = JSON.parse(body);}catch(e){}
  console.log('list user grievances ->', r.status, body);

  // Register admin
  console.log('\n5) Registering admin...');
  const adminCred = { email: 'admin+test@local', password: 'AdminPass123', role: 'admin' };
  r = await req('/auth/register', { method: 'POST', body: JSON.stringify(adminCred) });
  console.log('register admin ->', r.status, r.body);
  if (r.status !== 200) return process.exit(1);
  const adminToken = r.body.token;

  // Admin list all grievances
  console.log('\n6) Admin listing all grievances...');
  r = await fetch(base+'/api/grievances', { headers: { 'authorization':'Bearer '+adminToken }});
  body = await r.text(); try{ body = JSON.parse(body);}catch(e){}
  console.log('admin list ->', r.status, body);

  // Update grievance status
  console.log('\n7) Admin updating grievance status to In Review...');
  r = await fetch(base+'/api/grievances/'+grievanceId, { method: 'PATCH', headers: { 'content-type':'application/json', 'authorization':'Bearer '+adminToken }, body: JSON.stringify({ status: 'In Review' }) });
  body = await r.text(); try{ body = JSON.parse(body);}catch(e){}
  console.log('patch ->', r.status, body);

  console.log('\nSmoke tests completed.');
}

run().catch(e=>{ console.error('error', e); process.exit(1); });

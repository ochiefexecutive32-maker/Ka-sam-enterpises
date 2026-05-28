import { getDb } from '../db/index.js';

export async function getAllServices() {
  const db = await getDb();
  return db.all(`SELECT * FROM services WHERE is_active = 1 ORDER BY "order" ASC, title ASC`);
}

export async function getServiceById(id) {
  const db = await getDb();
  return db.get(`SELECT * FROM services WHERE id = ? AND is_active = 1`, [id]);
}

export async function createService(data) {
  const db = await getDb();
  const { title, description, icon, image, order = 0 } = data;
  const result = await db.run(
    `INSERT INTO services (title, description, icon, image, "order") VALUES (?, ?, ?, ?, ?)`,
    [title, description, icon, image, order]
  );
  return result.lastID;
}

export async function updateService(id, data) {
  const db = await getDb();
  const { title, description, icon, image, order, is_active } = data;
  await db.run(
    `UPDATE services SET title = ?, description = ?, icon = ?, image = ?, "order" = ?, is_active = ? WHERE id = ?`,
    [title, description, icon, image, order, is_active, id]
  );
}

export async function deleteService(id) {
  const db = await getDb();
  await db.run(`DELETE FROM services WHERE id = ?`, [id]);
}

export async function getAllProjects() {
  const db = await getDb();
  return db.all(`SELECT * FROM projects ORDER BY "order" ASC, created_at DESC`);
}

export async function getProjectsByStatus(status) {
  const db = await getDb();
  return db.all(`SELECT * FROM projects WHERE status = ? ORDER BY "order" ASC`, [status]);
}

export async function getFeaturedProjects() {
  const db = await getDb();
  return db.all(`SELECT * FROM projects WHERE is_featured = 1 LIMIT 6`);
}

export async function createProject(data) {
  const db = await getDb();
  const { title, description, image, status = 'completed', location, year, is_featured = 0, order = 0 } = data;
  const result = await db.run(
    `INSERT INTO projects (title, description, image, status, location, year, is_featured, "order") 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [title, description, image, status, location, year, is_featured, order]
  );
  return result.lastID;
}

export async function updateProject(id, data) {
  const db = await getDb();
  const { title, description, image, status, location, year, is_featured, order } = data;
  await db.run(
    `UPDATE projects SET title = ?, description = ?, image = ?, status = ?, location = ?, year = ?, is_featured = ?, "order" = ? WHERE id = ?`,
    [title, description, image, status, location, year, is_featured, order, id]
  );
}

export async function deleteProject(id) {
  const db = await getDb();
  await db.run(`DELETE FROM projects WHERE id = ?`, [id]);
}

export async function getAllTeamMembers() {
  const db = await getDb();
  return db.all(`SELECT * FROM team_members WHERE is_active = 1 ORDER BY "order" ASC, name ASC`);
}

export async function getTeamMemberById(id) {
  const db = await getDb();
  return db.get(`SELECT * FROM team_members WHERE id = ? AND is_active = 1`, [id]);
}

export async function createTeamMember(data) {
  const db = await getDb();
  const { name, role, bio, photo, email, phone, linkedin, order = 0 } = data;
  const result = await db.run(
    `INSERT INTO team_members (name, role, bio, photo, email, phone, linkedin, "order") 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [name, role, bio, photo, email, phone, linkedin, order]
  );
  return result.lastID;
}

export async function updateTeamMember(id, data) {
  const db = await getDb();
  const { name, role, bio, photo, email, phone, linkedin, order, is_active } = data;
  await db.run(
    `UPDATE team_members SET name = ?, role = ?, bio = ?, photo = ?, email = ?, phone = ?, linkedin = ?, "order" = ?, is_active = ? WHERE id = ?`,
    [name, role, bio, photo, email, phone, linkedin, order, is_active, id]
  );
}

export async function deleteTeamMember(id) {
  const db = await getDb();
  await db.run(`DELETE FROM team_members WHERE id = ?`, [id]);
}

export async function getAllTestimonials() {
  const db = await getDb();
  return db.all(`SELECT * FROM testimonials WHERE is_active = 1 ORDER BY created_at DESC LIMIT 6`);
}

export async function createTestimonial(data) {
  const db = await getDb();
  const { client_name, client_role, client_company, photo, message, rating = 5 } = data;
  const result = await db.run(
    `INSERT INTO testimonials (client_name, client_role, client_company, photo, message, rating) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    [client_name, client_role, client_company, photo, message, rating]
  );
  return result.lastID;
}

export async function deleteTestimonial(id) {
  const db = await getDb();
  await db.run(`DELETE FROM testimonials WHERE id = ?`, [id]);
}

export async function getAllMachines() {
  const db = await getDb();
  return db.all(`SELECT * FROM machine_hires WHERE is_available = 1 ORDER BY "order" ASC, name ASC`);
}

export async function getMachineById(id) {
  const db = await getDb();
  return db.get(`SELECT * FROM machine_hires WHERE id = ? AND is_available = 1`, [id]);
}

export async function createMachine(data) {
  const db = await getDb();
  const { name, description, image, rate, order = 0 } = data;
  const result = await db.run(
    `INSERT INTO machine_hires (name, description, image, rate, "order") 
     VALUES (?, ?, ?, ?, ?)`,
    [name, description, image, rate, order]
  );
  return result.lastID;
}

export async function updateMachine(id, data) {
  const db = await getDb();
  const { name, description, image, rate, is_available, order } = data;
  await db.run(
    `UPDATE machine_hires SET name = ?, description = ?, image = ?, rate = ?, is_available = ?, "order" = ? WHERE id = ?`,
    [name, description, image, rate, is_available, order, id]
  );
}

export async function deleteMachine(id) {
  const db = await getDb();
  await db.run(`DELETE FROM machine_hires WHERE id = ?`, [id]);
}

export async function createContactMessage(data) {
  const db = await getDb();
  const { name, email, phone, message } = data;
  const result = await db.run(
    `INSERT INTO contact_messages (name, email, phone, message) VALUES (?, ?, ?, ?)`,
    [name, email, phone, message]
  );
  return result.lastID;
}

export async function getAllContactMessages() {
  const db = await getDb();
  return db.all(`SELECT * FROM contact_messages ORDER BY created_at DESC`);
}

export async function getUnreadMessages() {
  const db = await getDb();
  return db.all(`SELECT * FROM contact_messages WHERE is_read = 0 ORDER BY created_at DESC`);
}

export async function markMessageAsRead(id) {
  const db = await getDb();
  await db.run(`UPDATE contact_messages SET is_read = 1 WHERE id = ?`, [id]);
}

export async function deleteContactMessage(id) {
  const db = await getDb();
  await db.run(`DELETE FROM contact_messages WHERE id = ?`, [id]);
}

export async function createConsultationBooking(data) {
  const db = await getDb();
  const { name, email, phone, service_interest, preferred_date, preferred_time, message } = data;
  const result = await db.run(
    `INSERT INTO consultation_bookings (name, email, phone, service_interest, preferred_date, preferred_time, message) 
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [name, email, phone, service_interest, preferred_date, preferred_time, message]
  );
  return result.lastID;
}

export async function getAllBookings() {
  const db = await getDb();
  return db.all(`SELECT * FROM consultation_bookings ORDER BY created_at DESC`);
}

export async function getBookingsByStatus(status) {
  const db = await getDb();
  return db.all(`SELECT * FROM consultation_bookings WHERE status = ? ORDER BY created_at DESC`, [status]);
}

export async function updateBookingStatus(id, status) {
  const db = await getDb();
  await db.run(`UPDATE consultation_bookings SET status = ? WHERE id = ?`, [status, id]);
}

export async function deleteBooking(id) {
  const db = await getDb();
  await db.run(`DELETE FROM consultation_bookings WHERE id = ?`, [id]);
}

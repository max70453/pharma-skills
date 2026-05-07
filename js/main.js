const STORAGE_KEYS = {
  PHARMACISTS: 'pharmacists',
  COURSES: 'courses',
  TESTS: 'tests',
  RESULTS: 'results',
  CURRENT_USER: 'currentUser',
  ENROLLMENTS: 'enrollments',
  SETTINGS: 'settings'
};

const DEFAULT_DATA = {
  pharmacists: [
    { id: 1, name: 'Иванов Иван Иванович', position: 'Старший фармацевт', phone: '+7 999 123-45-67', email: 'ivanov@pharmacy.ru', hireDate: '2020-03-15', department: 'Аптека №1', status: 'active' },
    { id: 2, name: 'Петрова Анна Сергеевна', position: 'Фармацевт', phone: '+7 999 234-56-78', email: 'petrova@pharmacy.ru', hireDate: '2021-06-20', department: 'Аптека №2', status: 'active' },
    { id: 3, name: 'Сидоров Алексей Петрович', position: 'Младший фармацевт', phone: '+7 999 345-67-89', email: 'sidorov@pharmacy.ru', hireDate: '2022-01-10', department: 'Аптека №1', status: 'active' },
    { id: 4, name: 'Козлова Мария Дмитриевна', position: 'Фармацевт', phone: '+7 999 456-78-90', email: 'kozlova@pharmacy.ru', hireDate: '2021-09-05', department: 'Аптека №3', status: 'active' },
    { id: 5, name: 'Смирнов Дмитрий Олегович', position: 'Заведующий аптекой', phone: '+7 999 567-89-01', email: 'smirnov@pharmacy.ru', hireDate: '2019-02-28', department: 'Аптека №1', status: 'active' }
  ],
  courses: [
    { id: 1, title: 'Основы фармакологии', description: 'Базовый курс по фармакологии для фармацевтов', duration: 40, category: 'Медицина', status: 'active' },
    { id: 2, title: 'Правила отпуска лекарственных препаратов', description: 'Нормативные требования и правила отпуска ЛП', duration: 24, category: 'Законодательство', status: 'active' },
    { id: 3, title: 'Взаимодействие лекарственных препаратов', description: 'Знания о лекарственных взаимодействиях', duration: 32, category: 'Медицина', status: 'active' },
    { id: 4, title: 'Хранение и учет лекарственных средств', description: 'Правила хранения и инвентаризации', duration: 16, category: 'Логистика', status: 'active' },
    { id: 5, title: 'Фармацевтическое консультирование', description: 'Навыки консультирования пациентов', duration: 20, category: 'Коммуникации', status: 'active' }
  ],
  tests: [
    { id: 1, title: 'Тест по фармакологии', courseId: 1, questions: 20, duration: 30, passingScore: 70, status: 'active' },
    { id: 2, title: 'Тест по правилам отпуска', courseId: 2, questions: 15, duration: 20, passingScore: 75, status: 'active' },
    { id: 3, title: 'Тест на знание взаимодействий', courseId: 3, questions: 25, duration: 35, passingScore: 80, status: 'active' },
    { id: 4, title: 'Тест по хранению ЛС', courseId: 4, questions: 10, duration: 15, passingScore: 70, status: 'active' },
    { id: 5, title: 'Тест по консультированию', courseId: 5, questions: 18, duration: 25, passingScore: 75, status: 'active' }
  ],
  results: [
    { id: 1, pharmacistId: 1, testId: 1, score: 85, date: '2024-01-15', status: 'passed' },
    { id: 2, pharmacistId: 1, testId: 2, score: 90, date: '2024-01-16', status: 'passed' },
    { id: 3, pharmacistId: 2, testId: 1, score: 78, date: '2024-01-14', status: 'passed' },
    { id: 4, pharmacistId: 3, testId: 1, score: 65, date: '2024-01-17', status: 'failed' },
    { id: 5, pharmacistId: 2, testId: 3, score: 88, date: '2024-01-18', status: 'passed' }
  ],
  currentUser: { id: 1, name: 'Администратор', role: 'admin', email: 'admin@pharmacy.ru' }
};

function initStorage() {
  if (!localStorage.getItem(STORAGE_KEYS.PHARMACISTS)) {
    localStorage.setItem(STORAGE_KEYS.PHARMACISTS, JSON.stringify(DEFAULT_DATA.pharmacists));
  }
  if (!localStorage.getItem(STORAGE_KEYS.COURSES)) {
    localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(DEFAULT_DATA.courses));
  }
  if (!localStorage.getItem(STORAGE_KEYS.TESTS)) {
    localStorage.setItem(STORAGE_KEYS.TESTS, JSON.stringify(DEFAULT_DATA.tests));
  }
  if (!localStorage.getItem(STORAGE_KEYS.RESULTS)) {
    localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(DEFAULT_DATA.results));
  }
  if (!localStorage.getItem(STORAGE_KEYS.CURRENT_USER)) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(DEFAULT_DATA.currentUser));
  }
}

function isAdmin() {
  const user = getData(STORAGE_KEYS.CURRENT_USER);
  return user && user.role === 'admin';
}

function updateMenuForRole() {
  if (!isAdmin()) {
    document.querySelectorAll('.admin-only').forEach(el => el.style.display = 'none');
  }
}

function hideAdminElements() {
  const adminLinks = document.querySelectorAll('a[href="pharmacists.html"], a[href="courses.html"], a[href="tests.html"]');
  adminLinks.forEach(link => {
    const li = link.closest('li');
    if (li) li.style.display = 'none';
  });
  
  const resultsLinks = document.querySelectorAll('a[href="results.html"]');
  resultsLinks.forEach(link => {
    const li = link.closest('li');
    if (li) li.style.display = 'none';
  });
  
  const addButtons = document.querySelectorAll('button[onclick="openAddModal()"], button[onclick="openAddCourseModal()"], button[onclick="openAddTestModal()"]');
  addButtons.forEach(btn => btn.style.display = 'none');
}

function hideMyCoursesForAdmin() {
  const myCoursesLinks = document.querySelectorAll('a[href="my-courses.html"]');
  myCoursesLinks.forEach(link => {
    const li = link.closest('li');
    if (li) li.style.display = 'none';
  });
  
  const resultsLinks = document.querySelectorAll('a[href="results.html"]');
  resultsLinks.forEach(link => {
    const li = link.closest('li');
    if (li) li.style.display = 'none';
  });
}

function resetData() {
  if (confirm('Вы уверены? Все данные будут сброшены к начальным значениям.')) {
    localStorage.clear();
    initStorage();
    location.reload();
  }
}

window.resetData = resetData;

function getData(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

function setData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function generateId(key) {
  const data = getData(key);
  if (!data || data.length === 0) return 1;
  return Math.max(...data.map(item => item.id)) + 1;
}

function loadDashboard() {
  const pharmacists = getData(STORAGE_KEYS.PHARMACISTS) || [];
  const courses = getData(STORAGE_KEYS.COURSES) || [];
  const tests = getData(STORAGE_KEYS.TESTS) || [];
  const results = getData(STORAGE_KEYS.RESULTS) || [];
  const currentUser = getData(STORAGE_KEYS.CURRENT_USER);
  
  const isPharmacist = currentUser && currentUser.role === 'pharmacist';
  const userId = currentUser ? currentUser.id : null;
  
  const titleEl = document.querySelector('#dashboardTitle');
  if (titleEl) {
    titleEl.textContent = isPharmacist ? 'Мой дашборд' : 'Дашборд';
  }
  
  const labelEl = document.getElementById('pharmacistsLabel');
  if (labelEl) {
    labelEl.textContent = isPharmacist ? 'Мои курсы' : 'Фармацевтов';
  }
  
  if (isPharmacist) {
    const myResults = results.filter(r => r.pharmacistId === userId);
    const myPassedTests = myResults.filter(r => r.status === 'passed');
    
    document.getElementById('totalPharmacists').textContent = '1';
    document.getElementById('totalCourses').textContent = courses.length;
    document.getElementById('totalTests').textContent = tests.length;
    document.getElementById('completedTests').textContent = myPassedTests.length;
    
    const myRecentResults = myResults.slice(-5).reverse();
    const recentResultsEl = document.getElementById('recentResults');
    
    if (myRecentResults.length > 0) {
      recentResultsEl.innerHTML = myRecentResults.map(result => {
        const pharmacist = pharmacists.find(p => p.id === result.pharmacistId);
        const test = tests.find(t => t.id === result.testId);
        const scoreClass = result.status === 'passed' ? 'pass' : 'fail';
        return `
          <div class="list-item">
            <div class="info">
              <h4>${test ? test.title : 'Неизвестно'}</h4>
              <p>${result.date}</p>
            </div>
            <div class="score ${scoreClass}">${result.score}%</div>
          </div>
        `;
      }).join('');
    } else {
      recentResultsEl.innerHTML = '<div class="empty-state"><p>Нет результатов</p></div>';
    }
  } else {
    document.getElementById('totalPharmacists').textContent = pharmacists.length;
    document.getElementById('totalCourses').textContent = courses.length;
    document.getElementById('totalTests').textContent = tests.length;
    document.getElementById('completedTests').textContent = results.filter(r => r.status === 'passed').length;
    
    const recentResults = results.slice(-5).reverse();
    const recentResultsEl = document.getElementById('recentResults');
    
    if (recentResults.length > 0) {
      recentResultsEl.innerHTML = recentResults.map(result => {
        const pharmacist = pharmacists.find(p => p.id === result.pharmacistId);
        const test = tests.find(t => t.id === result.testId);
        const scoreClass = result.status === 'passed' ? 'pass' : 'fail';
        return `
          <div class="list-item">
            <div class="info">
              <h4>${pharmacist ? pharmacist.name : 'Неизвестно'}</h4>
              <p>${test ? test.title : 'Неизвестно'}</p>
            </div>
            <div class="score ${scoreClass}">${result.score}%</div>
          </div>
        `;
      }).join('');
    } else {
      recentResultsEl.innerHTML = '<div class="empty-state"><p>Нет результатов</p></div>';
    }
  }
  
  const popularCourses = courses.slice(0, 5);
  const popularCoursesEl = document.getElementById('popularCourses');
  
  if (popularCourses.length > 0) {
    popularCoursesEl.innerHTML = popularCourses.map(course => {
      const testCount = tests.filter(t => t.courseId === course.id).length;
      return `
        <div class="list-item">
          <div class="info">
            <h4>${course.title}</h4>
            <p>${course.category} • ${course.duration} ч.</p>
          </div>
          <div class="score">${testCount} тест.</div>
        </div>
      `;
    }).join('');
  } else {
    popularCoursesEl.innerHTML = '<div class="empty-state"><p>Нет курсов</p></div>';
  }
}

function loadPharmacists() {
  const pharmacists = getData(STORAGE_KEYS.PHARMACISTS) || [];
  const tbody = document.getElementById('pharmacistsTableBody');
  
  if (pharmacists.length > 0) {
    tbody.innerHTML = pharmacists.map(p => `
      <tr>
        <td>${p.name}</td>
        <td>${p.position}</td>
        <td>${p.department}</td>
        <td>${p.phone}</td>
        <td>${p.email}</td>
        <td class="status-col"><span class="badge ${p.status === 'active' ? 'badge-success' : 'badge-danger'}">${p.status === 'active' ? 'Активен' : 'Неактивен'}</span></td>
        <td class="actions-col">
          <button class="btn btn-sm btn-primary" onclick="editPharmacist(${p.id})"><i class="fa fa-edit"></i></button>
          <button class="btn btn-sm btn-danger" onclick="deletePharmacist(${p.id})"><i class="fa fa-trash"></i></button>
        </td>
      </tr>
    `).join('');
  } else {
    tbody.innerHTML = '<tr><td colspan="7" class="text-center">Нет данных</td></tr>';
  }
}

function loadCourses() {
  const courses = getData(STORAGE_KEYS.COURSES) || [];
  const tbody = document.getElementById('coursesTableBody');
  
  if (courses.length > 0) {
    tbody.innerHTML = courses.map(c => `
      <tr>
        <td>${c.title}</td>
        <td>${c.category}</td>
        <td>${c.duration} ч.</td>
        <td>${c.description.substring(0, 50)}...</td>
        <td class="status-col"><span class="badge ${c.status === 'active' ? 'badge-success' : 'badge-danger'}">${c.status === 'active' ? 'Активен' : 'Неактивен'}</span></td>
        <td class="actions-col">
          <button class="btn btn-sm btn-primary" onclick="editCourse(${c.id})"><i class="fa fa-edit"></i></button>
          <button class="btn btn-sm btn-danger" onclick="deleteCourse(${c.id})"><i class="fa fa-trash"></i></button>
        </td>
      </tr>
    `).join('');
  } else {
    tbody.innerHTML = '<tr><td colspan="6" class="text-center">Нет данных</td></tr>';
  }
}

function loadTests() {
  const tests = getData(STORAGE_KEYS.TESTS) || [];
  const courses = getData(STORAGE_KEYS.COURSES) || [];
  const tbody = document.getElementById('testsTableBody');
  
  if (tests.length > 0) {
    tbody.innerHTML = tests.map(t => {
      const course = courses.find(c => c.id === t.courseId);
      return `
        <tr>
          <td>${t.title}</td>
          <td>${course ? course.title : 'Нет'}</td>
          <td>${t.questions}</td>
          <td>${t.duration} мин.</td>
          <td>${t.passingScore}%</td>
          <td class="status-col"><span class="badge ${t.status === 'active' ? 'badge-success' : 'badge-danger'}">${t.status === 'active' ? 'Активен' : 'Неактивен'}</span></td>
          <td class="actions-col">
            <button class="btn btn-sm btn-primary" onclick="editTest(${t.id})"><i class="fa fa-edit"></i></button>
            <button class="btn btn-sm btn-danger" onclick="deleteTest(${t.id})"><i class="fa fa-trash"></i></button>
          </td>
        </tr>
      `;
    }).join('');
  } else {
    tbody.innerHTML = '<tr><td colspan="7" class="text-center">Нет данных</td></tr>';
  }
}

function loadResults() {
  const results = getData(STORAGE_KEYS.RESULTS) || [];
  const pharmacists = getData(STORAGE_KEYS.PHARMACISTS) || [];
  const tests = getData(STORAGE_KEYS.TESTS) || [];
  const tbody = document.getElementById('resultsTableBody');
  
  if (results.length > 0) {
    tbody.innerHTML = results.map(r => {
      const pharmacist = pharmacists.find(p => p.id === r.pharmacistId);
      const test = tests.find(t => t.id === r.testId);
      const statusClass = r.status === 'passed' ? 'badge-success' : 'badge-danger';
      return `
        <tr>
          <td>${pharmacist ? pharmacist.name : 'Неизвестно'}</td>
          <td>${test ? test.title : 'Неизвестно'}</td>
          <td>${r.score}%</td>
          <td>${r.date}</td>
          <td class="status-col"><span class="badge ${statusClass}">${r.status === 'passed' ? 'Сдан' : 'Не сдан'}</span></td>
        </tr>
      `;
    }).join('');
  } else {
    tbody.innerHTML = '<tr><td colspan="5" class="text-center">Нет данных</td></tr>';
  }
}

function addPharmacist(data) {
  const pharmacists = getData(STORAGE_KEYS.PHARMACISTS) || [];
  data.id = generateId(STORAGE_KEYS.PHARMACISTS);
  data.status = 'active';
  pharmacists.push(data);
  setData(STORAGE_KEYS.PHARMACISTS, pharmacists);
  loadPharmacists();
}

function addCourse(data) {
  const courses = getData(STORAGE_KEYS.COURSES) || [];
  data.id = generateId(STORAGE_KEYS.COURSES);
  data.status = 'active';
  courses.push(data);
  setData(STORAGE_KEYS.COURSES, courses);
  loadCourses();
}

function addTest(data) {
  const tests = getData(STORAGE_KEYS.TESTS) || [];
  data.id = generateId(STORAGE_KEYS.TESTS);
  data.status = 'active';
  tests.push(data);
  setData(STORAGE_KEYS.TESTS, tests);
  loadTests();
}

function deletePharmacist(id) {
  if (confirm('Вы уверены, что хотите удалить этого фармацевта?')) {
    let pharmacists = getData(STORAGE_KEYS.PHARMACISTS) || [];
    pharmacists = pharmacists.filter(p => p.id !== id);
    setData(STORAGE_KEYS.PHARMACISTS, pharmacists);
    loadPharmacists();
  }
}

function deleteCourse(id) {
  if (confirm('Вы уверены, что хотите удалить этот курс?')) {
    let courses = getData(STORAGE_KEYS.COURSES) || [];
    courses = courses.filter(c => c.id !== id);
    setData(STORAGE_KEYS.COURSES, courses);
    loadCourses();
  }
}

function deleteTest(id) {
  if (confirm('Вы уверены, что хотите удалить этот тест?')) {
    let tests = getData(STORAGE_KEYS.TESTS) || [];
    tests = tests.filter(t => t.id !== id);
    setData(STORAGE_KEYS.TESTS, tests);
    loadTests();
  }
}

function openAddModal() {
  document.getElementById('editId').value = '';
  document.getElementById('editName').value = '';
  document.getElementById('editPosition').value = '';
  document.getElementById('editDepartment').value = '';
  document.getElementById('editPhone').value = '';
  document.getElementById('editEmail').value = '';
  document.getElementById('editModal').classList.add('active');
}

function openAddCourseModal() {
  document.getElementById('editCourseId').value = '';
  document.getElementById('editTitle').value = '';
  document.getElementById('editCategory').value = '';
  document.getElementById('editDuration').value = '';
  document.getElementById('editDescription').value = '';
  document.getElementById('editCourseModal').classList.add('active');
}

function openAddTestModal() {
  const courses = getData(STORAGE_KEYS.COURSES) || [];
  const courseSelect = document.getElementById('editTestCourse');
  courseSelect.innerHTML = courses.map(c => `<option value="${c.id}">${c.title}</option>`).join('');
  
  document.getElementById('editTestId').value = '';
  document.getElementById('editTestTitle').value = '';
  document.getElementById('editTestCourse').value = '';
  document.getElementById('editQuestions').value = '';
  document.getElementById('editDuration').value = '';
  document.getElementById('editPassingScore').value = '';
  document.getElementById('editTestModal').classList.add('active');
}

function editPharmacist(id) {
  const pharmacists = getData(STORAGE_KEYS.PHARMACISTS) || [];
  const pharmacist = pharmacists.find(p => p.id === id);
  if (pharmacist) {
    document.getElementById('editName').value = pharmacist.name;
    document.getElementById('editPosition').value = pharmacist.position;
    document.getElementById('editDepartment').value = pharmacist.department;
    document.getElementById('editPhone').value = pharmacist.phone;
    document.getElementById('editEmail').value = pharmacist.email;
    document.getElementById('editId').value = pharmacist.id;
    document.getElementById('editModal').classList.add('active');
  }
}

function editCourse(id) {
  const courses = getData(STORAGE_KEYS.COURSES) || [];
  const course = courses.find(c => c.id === id);
  if (course) {
    document.getElementById('editTitle').value = course.title;
    document.getElementById('editCategory').value = course.category;
    document.getElementById('editDuration').value = course.duration;
    document.getElementById('editDescription').value = course.description;
    document.getElementById('editCourseId').value = course.id;
    document.getElementById('editCourseModal').classList.add('active');
  }
}

function editTest(id) {
  const tests = getData(STORAGE_KEYS.TESTS) || [];
  const test = tests.find(t => t.id === id);
  if (test) {
    document.getElementById('editTestTitle').value = test.title;
    document.getElementById('editTestCourse').value = test.courseId;
    document.getElementById('editQuestions').value = test.questions;
    document.getElementById('editDuration').value = test.duration;
    document.getElementById('editPassingScore').value = test.passingScore;
    document.getElementById('editTestId').value = test.id;
    document.getElementById('editTestModal').classList.add('active');
  }
}

function updatePharmacist() {
  const id = parseInt(document.getElementById('editId').value);
  
  if (id) {
    let pharmacists = getData(STORAGE_KEYS.PHARMACISTS) || [];
    const index = pharmacists.findIndex(p => p.id === id);
    if (index !== -1) {
      pharmacists[index] = {
        ...pharmacists[index],
        name: document.getElementById('editName').value,
        position: document.getElementById('editPosition').value,
        department: document.getElementById('editDepartment').value,
        phone: document.getElementById('editPhone').value,
        email: document.getElementById('editEmail').value
      };
      setData(STORAGE_KEYS.PHARMACISTS, pharmacists);
      loadPharmacists();
    }
  } else {
    addPharmacist({
      name: document.getElementById('editName').value,
      position: document.getElementById('editPosition').value,
      department: document.getElementById('editDepartment').value,
      phone: document.getElementById('editPhone').value,
      email: document.getElementById('editEmail').value
    });
  }
  closeModal('editModal');
}

function updateCourse() {
  const id = parseInt(document.getElementById('editCourseId').value);
  
  if (id) {
    let courses = getData(STORAGE_KEYS.COURSES) || [];
    const index = courses.findIndex(c => c.id === id);
    if (index !== -1) {
      courses[index] = {
        ...courses[index],
        title: document.getElementById('editTitle').value,
        category: document.getElementById('editCategory').value,
        duration: parseInt(document.getElementById('editDuration').value),
        description: document.getElementById('editDescription').value
      };
      setData(STORAGE_KEYS.COURSES, courses);
      loadCourses();
    }
  } else {
    addCourse({
      title: document.getElementById('editTitle').value,
      category: document.getElementById('editCategory').value,
      duration: parseInt(document.getElementById('editDuration').value),
      description: document.getElementById('editDescription').value
    });
  }
  closeModal('editCourseModal');
}

function updateTest() {
  const id = parseInt(document.getElementById('editTestId').value);
  
  if (id) {
    let tests = getData(STORAGE_KEYS.TESTS) || [];
    const index = tests.findIndex(t => t.id === id);
    if (index !== -1) {
      tests[index] = {
        ...tests[index],
        title: document.getElementById('editTestTitle').value,
        courseId: parseInt(document.getElementById('editTestCourse').value),
        questions: parseInt(document.getElementById('editQuestions').value),
        duration: parseInt(document.getElementById('editDuration').value),
        passingScore: parseInt(document.getElementById('editPassingScore').value)
      };
      setData(STORAGE_KEYS.TESTS, tests);
      loadTests();
    }
  } else {
    addTest({
      title: document.getElementById('editTestTitle').value,
      courseId: parseInt(document.getElementById('editTestCourse').value),
      questions: parseInt(document.getElementById('editQuestions').value),
      duration: parseInt(document.getElementById('editDuration').value),
      passingScore: parseInt(document.getElementById('editPassingScore').value)
    });
  }
  closeModal('editTestModal');
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove('active');
}

window.closeModal = closeModal;
window.resetData = resetData;
window.editPharmacist = editPharmacist;
window.editCourse = editCourse;
window.editTest = editTest;
window.deletePharmacist = deletePharmacist;
window.deleteCourse = deleteCourse;
window.deleteTest = deleteTest;
window.openAddModal = openAddModal;
window.openAddCourseModal = openAddCourseModal;
window.openAddTestModal = openAddTestModal;

function logout() {
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  window.location.href = 'login.html';
}

window.switchRole = function(role) {
  const user = getData(STORAGE_KEYS.CURRENT_USER);
  if (user) {
    user.role = role;
    user.name = role === 'admin' ? 'Администратор' : 'Фармацевт';
    setData(STORAGE_KEYS.CURRENT_USER, user);
    location.reload();
  }
};

window.isAdmin = isAdmin;
window.hideAdminElements = hideAdminElements;
window.hideMyCoursesForAdmin = hideMyCoursesForAdmin;

document.addEventListener('DOMContentLoaded', function() {
  initStorage();
  
  const currentUser = getData(STORAGE_KEYS.CURRENT_USER);
  if (!currentUser && !window.location.href.includes('login.html')) {
    window.location.href = 'login.html';
  }
  
  if (isAdmin()) {
    hideMyCoursesForAdmin();
  } else {
    hideAdminElements();
  }
  
  const userDisplay = document.getElementById('currentUser');
  if (userDisplay) {
    const user = getData(STORAGE_KEYS.CURRENT_USER);
    userDisplay.textContent = user ? user.name : 'Пользователь';
  }
  
  if (document.getElementById('totalPharmacists')) {
    loadDashboard();
  }
  
  if (document.getElementById('pharmacistsTableBody')) {
    loadPharmacists();
  }
  
  if (document.getElementById('coursesTableBody')) {
    loadCourses();
  }
  
  if (document.getElementById('testsTableBody')) {
    loadTests();
  }
  
  if (document.getElementById('resultsTableBody')) {
    loadResults();
  }
  
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', logout);
  }
  
  const menuToggle = document.querySelector('.menu-toggle');
  const sidebar = document.querySelector('.sidebar');
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      sidebar.classList.toggle('active');
    });
  }
});
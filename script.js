/* ============================================
   गणपती बाप्पा निमंत्रण - स्क्रिप्ट
   ============================================
   
   🔧 कस्टमायझेशन कॉन्फिग
   खालील मूल्ये बदलून निमंत्रण वैयक्तिक करा.
   वेबसाइटचे सर्व विभाग आपोआप अपडेट होतील.
*/

const invitationData = {
  // १. गणपती / शीर्षक नाव
  ganpatiName: "गणपती बाप्पा",

  // २. कुटुंबाचे नाव ("प्रेमाने आयोजित" मध्ये दिसते)
  familyName: "पाटील परिवार",

  // ३. निमंत्रण कार्डवर दिसणारी तारीख
  date: "१४ सप्टेंबर २०२६",

  // ४. निमंत्रण कार्डवर दिसणारी वेळ
  time: "सकाळी ९:००",

  // ५. पत्ता / स्थळ
  address: "साई विभूती",

  // ६. "दिशानिर्देश मिळवा" बटणासाठी गूगल मॅप्स लिंक
  googleMapsLink: "https://maps.app.goo.gl/SnGYwF4fKDk3yenQ7",

  // ७. काउंटडाउनची तारीख व वेळ (ISO फॉरमॅट: YYYY-MM-DDTHH:mm:ss)
  countdownDate: "2026-09-14T09:00:00",

  // ८. भगवान गणेशाच्या प्रतिमेचा पथ
  ganpatiImage: "assets/ganpati.png",

  // ९. पार्श्वसंगीताचा पथ (भक्तिगीत / आरती)
  backgroundMusic: "assets/music.mp3"
};

/* ============================================
   खालील कोड फक्त गरज असल्यासच बदला
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // कॉन्फिग मूल्ये पेजवर लागू करा
  applyInvitationData();

  // काउंटडाउन सुरू करा
  startCountdown();

  // संगीत प्लेयर
  initMusicPlayer();

  // स्क्रोल अॅनिमेशन्स
  initScrollAnimations();

  // फुलांची पाकळ्या आणि स्पार्कल्स
  createPetals();
  createSparkles();

  // CTA बटणासाठी स्मूथ स्क्रोल
  document.getElementById('viewInviteBtn')?.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('invitation')?.scrollIntoView({ behavior: 'smooth' });
  });
});

/**
 * invitationData मधून सर्व डायनॅमिक मजकूर व लिंक भरा
 */
function applyInvitationData() {
  const d = invitationData;

  // कुटुंबाचे नाव
  const familyEl = document.getElementById('familyName');
  if (familyEl) familyEl.textContent = d.familyName;

  // दिनांक, वेळ, स्थळ
  const dateEl = document.getElementById('inviteDate');
  const timeEl = document.getElementById('inviteTime');
  const addrEl = document.getElementById('inviteAddress');
  if (dateEl) dateEl.textContent = d.date;
  if (timeEl) timeEl.textContent = d.time;
  if (addrEl) addrEl.textContent = d.address;

  // गूगल मॅप्स लिंक
  const dirBtn = document.getElementById('directionsBtn');
  if (dirBtn && d.googleMapsLink) {
    dirBtn.href = d.googleMapsLink;
  }

  // गणपती प्रतिमा
  const img = document.getElementById('ganpatiImg');
  if (img && d.ganpatiImage) {
    img.src = d.ganpatiImage;
  }

  // संगीत स्रोत
  const audio = document.getElementById('bgMusic');
  if (audio && d.backgroundMusic) {
    const source = audio.querySelector('source');
    if (source) source.src = d.backgroundMusic;
    audio.load();
  }
}

/**
 * लाइव्ह काउंटडाउन टाइमर
 */
function startCountdown() {
  const target = new Date(invitationData.countdownDate).getTime();

  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minsEl = document.getElementById('minutes');
  const secsEl = document.getElementById('seconds');

  function update() {
    const now = Date.now();
    let diff = target - now;

    if (diff < 0) {
      // कार्यक्रम सुरू झाला / संपला
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minsEl.textContent = '00';
      secsEl.textContent = '00';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff %= 1000 * 60 * 60 * 24;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff %= 1000 * 60 * 60;
    const minutes = Math.floor(diff / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minsEl.textContent = String(minutes).padStart(2, '0');
    secsEl.textContent = String(seconds).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

/**
 * पार्श्वसंगीत प्ले / पॉज
 * (युजर इंटरॅक्शन आवश्यक — ऑटोप्ले नाही)
 */
function initMusicPlayer() {
  const btn = document.getElementById('musicBtn');
  const audio = document.getElementById('bgMusic');

  if (!btn || !audio) return;

  btn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play().then(() => {
        btn.classList.add('playing');
        btn.setAttribute('aria-label', 'संगीत थांबवा');
      }).catch((err) => {
        console.warn('संगीत चालू होऊ शकले नाही (फाइल गहाळ असू शकते):', err);
        btn.classList.add('playing');
      });
    } else {
      audio.pause();
      btn.classList.remove('playing');
      btn.setAttribute('aria-label', 'संगीत चालू करा');
    }
  });
}

/**
 * स्क्रोलवर fade-up अॅनिमेशनसाठी Intersection Observer
 */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-up');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach((el) => observer.observe(el));
}

/**
 * हळू हळू पडणाऱ्या फुलांच्या पाकळ्या तयार करा
 */
function createPetals() {
  const container = document.getElementById('petals');
  if (!container) return;

  const petalEmojis = ['🌸', '🌺', '💮', '🏵️', '🌼'];
  const count = window.innerWidth < 600 ? 8 : 14;

  for (let i = 0; i < count; i++) {
    const petal = document.createElement('span');
    petal.className = 'petal';
    petal.textContent = petalEmojis[Math.floor(Math.random() * petalEmojis.length)];
    petal.style.left = Math.random() * 100 + 'vw';
    petal.style.fontSize = (14 + Math.random() * 14) + 'px';
    petal.style.animationDuration = (8 + Math.random() * 12) + 's';
    petal.style.animationDelay = (Math.random() * 10) + 's';
    container.appendChild(petal);
  }
}

/**
 * सूक्ष्म सोन्याचे स्पार्कल पार्टिकल्स तयार करा
 */
function createSparkles() {
  const container = document.getElementById('sparkles');
  if (!container) return;

  const count = window.innerWidth < 600 ? 12 : 20;

  for (let i = 0; i < count; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = Math.random() * 100 + 'vw';
    sparkle.style.top = Math.random() * 100 + 'vh';
    sparkle.style.animationDelay = (Math.random() * 3) + 's';
    sparkle.style.animationDuration = (2 + Math.random() * 2) + 's';
    container.appendChild(sparkle);
  }
}

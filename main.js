document.addEventListener('DOMContentLoaded', function() {
    // ==================== Бегущая строка ====================
    const typedTextElement = document.querySelector('.typed-text');
    const textArray = ["Лучший ванильный майнкрафт сервер!"];
    let currentIndex = 0;
    let currentCharIndex = 0;
    let typing = true;

    function typeText() {
        if (typing) {
            if (currentCharIndex < textArray[currentIndex].length) {
                typedTextElement.textContent += textArray[currentIndex][currentCharIndex];
                currentCharIndex++;
                setTimeout(typeText, 100);
            } else {
                typing = false;
                setTimeout(deleteText, 1000);
            }
        }
    }

    function deleteText() {
        if (currentCharIndex > 0) {
            typedTextElement.textContent = typedTextElement.textContent.slice(0, -1);
            currentCharIndex--;
            setTimeout(deleteText, 50);
        } else {
            typing = true;
            currentIndex = (currentIndex + 1) % textArray.length;
            setTimeout(typeText, 200);
        }
    }

    typeText();

    // ==================== Копирование айпи ====================
    const copyIpButton = document.querySelector('.copy-ip-btn');
    copyIpButton.addEventListener('click', function() {
        const ip = "play.izzziland.ru";
        navigator.clipboard.writeText(ip).then(function() {
            copyIpButton.classList.add('copied');
            copyIpButton.querySelector('span').textContent = "Скопировано";
            copyIpButton.querySelector('img').src = 'images/complete-icon.png';
            setTimeout(function() {
                copyIpButton.classList.remove('copied');
                copyIpButton.querySelector('span').textContent = "Скопировать айпи";
                copyIpButton.querySelector('img').src = 'images/copy-icon.png';
            }, 1500);
        });
    });

    // ==================== Discord кнопка ====================
    const discordButton = document.querySelector('.discord-btn');
    discordButton.addEventListener('click', function() {
        window.location.href = "https://discord.gg/d5fYv8JjGu";
    });

function updateOnline() {
    const serverIP = "play.izzziland.ru";
    const onlineElement = document.querySelector('.online-text');
    const onlineBox = document.querySelector('.online-box');
    const dot = document.querySelector('.online-dot');

    onlineBox.className = "online-box loading";
    onlineElement.textContent = "Загрузка...";

    fetch(`https://api.mcsrvstat.us/2/${serverIP}`)
        .then(res => res.json())
        .then(data => {

            if (data && data.online && data.players) {

                onlineBox.className = "online-box online";
                onlineElement.textContent =
                    `${data.players.online} из ${data.players.max}`;

            } else {

                onlineBox.className = "online-box offline";
                onlineElement.textContent = "Оффлайн";
            }

        })
        .catch(() => {

            onlineBox.className = "online-box error";
            onlineElement.textContent = "Ошибка";
        });
}

updateOnline();
setInterval(updateOnline, 60000);

// ===== АНИМАЦИЯ ПРИ ПОЯВЛЕНИИ СЕКЦИИ =====
const featureItems = document.querySelectorAll('.feature-item');
const featuresSection = document.querySelector('.features-section');

if (featuresSection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        featureItems.forEach(item => item.classList.add('show'));
      } else {
        // Когда секция уходит из вида — убираем show, чтобы анимация могла повториться
        featureItems.forEach(item => item.classList.remove('show'));
      }
    });
  }, {
    threshold: 0.3 // чем меньше — тем раньше срабатывает
  });

  observer.observe(featuresSection);
}
// ====== FAQ Аккордеон ======
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  question.addEventListener('click', () => {
    item.classList.toggle('active');

});
});


});


const easterGif = document.querySelector('.easter-gif');
const notification = document.querySelector('.easter-notification');
const counter = document.querySelector('#easter-count');

// ключ в памяти браузера
const STORAGE_KEY = "izzziland_easter_1";

  let collected = JSON.parse(
    localStorage.getItem(STORAGE_KEY)
  ) || {
    easter1: false,
    easter2: false,
    easter3: false,
    easter4: false,
    easter5: false
  };

// обновить счётчик
function updateCounter() {
  const total = Object.values(collected).filter(Boolean).length;
  counter.textContent = `${total}/5`;
}

// стартовое обновление
updateCounter();

// если уже собрали — убрать гифку
if (collected.easter1 && easterGif) {
  easterGif.style.display = "none";
}

if (easterGif && notification) {

  easterGif.addEventListener('click', () => {

    // уже собрана
    if (collected.easter1) return;

    // отмечаем как собранную
    collected.easter1 = true;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(collected));

    updateCounter();

    // прячем гифку навсегда
    easterGif.classList.add('explode');

    setTimeout(() => {
      easterGif.style.display = "none";
    }, 900);

    // плашка
    notification.classList.remove('hide');
    notification.classList.add('show');

    setTimeout(() => {
      notification.classList.remove('show');
      notification.classList.add('hide');
    }, 2500);

  });

}
// ===== АНИМАЦИЯ FAQ =====

const faqSection = document.querySelector('.faq-section');
const faqAnimatedItems = document.querySelectorAll('.faq-item');

if (faqSection) {

  const faqObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        faqAnimatedItems.forEach((item, index) => {

          setTimeout(() => {
            item.classList.add('show');
          }, index * 120);

        });

      } else {

        faqAnimatedItems.forEach(item => {
          item.classList.remove('show');
        });

      }

    });

  }, {
    threshold: 0.2
  });

  faqObserver.observe(faqSection);

}

const parallax = document.querySelector('.hero-parallax');

document.addEventListener('mousemove', (e) => {

    const x = (e.clientX / window.innerWidth - 0.5);
    const y = (e.clientY / window.innerHeight - 0.5);

    const moveX = x * 20;
    const moveY = y * 20;

    parallax.style.transform =
        `translate(${moveX}px, ${moveY}px) scale(1.1)`;
});
    document.addEventListener('DOMContentLoaded', () => {

      // easing function (ease-in-out)
      function easeInOut(t) {
        return t < 0.5
          ? 2 * t * t
          : 1 - Math.pow(-2 * t + 2, 2) / 2;
      }

      function smoothScrollTo(targetY, duration = 1200) {
        const startY = window.pageYOffset;
        const distance = targetY - startY;
        let startTime = null;

        function animation(currentTime) {
          if (!startTime) startTime = currentTime;
          const timeElapsed = currentTime - startTime;
          const progress = Math.min(timeElapsed / duration, 1);
          const easedProgress = easeInOut(progress);

          window.scrollTo(0, startY + distance * easedProgress);

          if (timeElapsed < duration) {
            requestAnimationFrame(animation);
          }
        }

        requestAnimationFrame(animation);
      }

      document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
          e.preventDefault();

          const targetId = this.getAttribute('href');
          const target = document.querySelector(targetId);
          if (!target) return;

          const navbar = document.querySelector('.navbar');
          const navbarHeight = navbar ? navbar.offsetHeight : 0;

          const targetPosition =
            target.getBoundingClientRect().top +
            window.pageYOffset -
            navbarHeight;

          // ⬇️ เรียก scroll แบบ custom
          smoothScrollTo(targetPosition, 1000); // ปรับเวลาได้ (ms)
        });
      });

    });
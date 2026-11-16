/* ==========================================================================
   PP TOMSK — Interactive Client Logic
   ========================================================================== */

(function () {
  'use strict';

  const TARIFFS = {
    '1000': { name: 'LIGHT · 1 000 ккал', kcal: 1000, meals: 3, price: 1000 },
    '1300': { name: 'SLIM · 1 300 ккал', kcal: 1300, meals: 4, price: 1150 },
    '1500': { name: 'BALANCE · 1 500 ккал', kcal: 1500, meals: 5, price: 1350 },
    '2000': { name: 'FIT · 2 000 ккал', kcal: 2000, meals: 5, price: 1550 },
    '2500': { name: 'POWER · 2 500 ккал', kcal: 2500, meals: 6, price: 1750 }
  };

  // Authentic PP_TOMSK weekly menu data (from 8-week rotation)
  const BASE_DAYS = {
    mon: {
      m1: 'Каша пшённая на молоке со спелой вишней',
      m2: 'Яичный рулет с натуральным тунцом и зеленью',
      m3: 'Сочный бифштекс из говядины с печёными овощами',
      m4: 'Свежий овощной салат с хрустящими ПП-сухариками',
      m5: 'Филе дальневосточной кеты с домашним лечо',
      m6: 'Творожный мусс с семенами чиа и ягодами'
    },
    tue: {
      m1: 'Овсяноблин со сливочным сыром и малосольной красной рыбкой',
      m2: 'Нежный запечённый творожник с изюмом без сахара',
      m3: 'Филе курочки со стручковой фасолью и рассыпчатой гречкой',
      m4: 'Фирменный шоколадный ПП-кекс без белого сахара',
      m5: 'Куриные тефтели в томатном соусе со спагетти твёрдых сортов',
      m6: 'Зелёный салат с индейкой, огурцом и микрозеленью'
    },
    wed: {
      m1: 'Французский киш со сладкой паприкой и сыром',
      m2: 'Домашний ароматный рассольник на нежирном бульоне',
      m3: 'Плов из цельнозернового булгура с нежной курочкой',
      m4: 'Воздушный омлет со свежими овощами и сыром',
      m5: 'Шницель куриный с пастой пенне и лёгким соусом тар-тар',
      m6: 'Запечённое яблоко с творогом, корицей и грецким орехом'
    },
    thu: {
      m1: 'Солнечная кукурузная каша с кусочками ананаса',
      m2: 'Салат с тихоокеанским кальмаром и дробленым орехом',
      m3: 'Томлёный гуляш из отборной говядины с гарниром',
      m4: 'Воздушное черничное ПП-суфле без сахара',
      m5: 'Сочная куриная отбивная со свежими и печёными овощами',
      m6: 'Белковый ролл с куриной грудкой и листом салата'
    },
    fri: {
      m1: 'Творожные венские ПП-вафли со свежей клубникой',
      m2: 'Пышный омлет со спелыми томатами и шампиньонами',
      m3: 'Куриные тефтели с гречкой и травами',
      m4: 'Густой витаминный смузи со спелым персиком',
      m5: 'Кета, запечённая под сырной корочкой, с рисом и овощами',
      m6: 'Салат с тунцом, перепелиным яйцом и оливковым маслом'
    },
    sat: {
      m1: 'Овсяная каша долгой варки с таёжной клюквой',
      m2: 'Сытный салат с отварной говядиной и красной фасолью',
      m3: 'Курочка в нежном сливочном соусе со спагетти',
      m4: 'Цельнозерновой ПП-сэндвич с тунцом и свежим огурцом',
      m5: 'Шашлычок из курочки с запечённой цветной капустой',
      m6: 'Нежная ряженка с отрубями и печёной грушей'
    },
    sun: {
      m1: 'Домашняя творожная запеканка с ванилью',
      m2: 'Тонкие ПП-блинчики с творожным кремом и свежим огурчиком',
      m3: 'Кета под сыром с макаронами из твёрдых сортов пшеницы',
      m4: 'Классический салат «Греческий» с фетой и маслинами',
      m5: 'Куриное филе, тушённое с сезонными овощами',
      m6: 'Фирменный десерт «Красный бархат» без сахара'
    }
  };

  function getMealsForProgram(kcalKey, dayKey) {
    const d = BASE_DAYS[dayKey] || BASE_DAYS.mon;
    if (kcalKey === '1000') {
      return [
        { step: '1 приём · Завтрак', name: d.m1 },
        { step: '2 приём · Обед', name: d.m3 },
        { step: '3 приём · Ужин', name: d.m5 }
      ];
    }
    if (kcalKey === '1300') {
      return [
        { step: '1 приём · Завтрак', name: d.m1 },
        { step: '2 приём · Второй завтрак', name: d.m2 },
        { step: '3 приём · Обед', name: d.m3 },
        { step: '4 приём · Ужин', name: d.m5 }
      ];
    }
    if (kcalKey === '1500') {
      return [
        { step: '1 приём · Завтрак', name: d.m1 },
        { step: '2 приём · Второй завтрак', name: d.m2 },
        { step: '3 приём · Обед', name: d.m3 },
        { step: '4 приём · Полдник', name: d.m4 },
        { step: '5 приём · Ужин', name: d.m5 }
      ];
    }
    if (kcalKey === '2000') {
      return [
        { step: '1 приём · Завтрак (увел. порция)', name: d.m1 },
        { step: '2 приём · Второй завтрак', name: d.m2 },
        { step: '3 приём · Сытный обед', name: d.m3 },
        { step: '4 приём · Полдник', name: d.m4 },
        { step: '5 приём · Белковый ужин', name: d.m5 }
      ];
    }
    // 2500 kcal - 6 meals
    return [
      { step: '1 приём · Завтрак', name: d.m1 },
      { step: '2 приём · Второй завтрак', name: d.m2 },
      { step: '3 приём · Обед', name: d.m3 },
      { step: '4 приём · Полдник', name: d.m4 },
      { step: '5 приём · Ужин', name: d.m5 },
      { step: '6 приём · Вечерний белковый перекус', name: d.m6 }
    ];
  }

  function formatRub(n) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ₽';
  }

  // State
  let billingMode = 'standard'; // 'standard' | 'twoweeks'
  let activeMenuKcal = '1500';
  let activeMenuDay = 'mon';
  let selectedCertNominal = '5 000 ₽';
  let currentOrderText = 'Здравствуйте! Хочу заказать доставку правильного питания PP TOMSK.';

  // Toast helper
  const toastEl = document.getElementById('toast');
  let toastTimer = null;
  function showToast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.classList.remove('is-visible');
    }, 2800);
  }

  function copyTextToClipboard(text, successMsg) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(
        () => showToast(successMsg),
        () => fallbackCopy(text, successMsg)
      );
    } else {
      fallbackCopy(text, successMsg);
    }
  }

  function fallbackCopy(text, successMsg) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      showToast(successMsg);
    } catch (e) {
      showToast('Номер: +7 (923) 433-11-83');
    }
    document.body.removeChild(ta);
  }

  // Sticky Header Shadow
  const headerEl = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    if (!headerEl) return;
    if (window.scrollY > 20) {
      headerEl.classList.add('site-header--scrolled');
    } else {
      headerEl.classList.remove('site-header--scrolled');
    }
  }, { passive: true });

  // Mobile Menu Drawer
  const burgerBtn = document.getElementById('burgerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  if (burgerBtn && mobileDrawer) {
    burgerBtn.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('is-open');
      burgerBtn.setAttribute('aria-expanded', String(isOpen));
    });
    mobileDrawer.querySelectorAll('a, button').forEach((el) => {
      el.addEventListener('click', () => {
        mobileDrawer.classList.remove('is-open');
        burgerBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Billing Period Toggle (-10% on 2 weeks)
  const billingBtns = document.querySelectorAll('[data-billing]');
  const billingNote = document.getElementById('billingNote');

  function renderTariffPrices() {
    document.querySelectorAll('.tariff-card[data-kcal]').forEach((card) => {
      const key = card.getAttribute('data-kcal');
      const t = TARIFFS[key];
      if (!t) return;

      const priceEl = card.querySelector('[data-role="price"]');
      const oldPriceEl = card.querySelector('[data-role="old-price"]');
      const subnoteEl = card.querySelector('[data-role="subnote"]');

      const discPrice = Math.round(t.price * 0.9);
      const totalTwoWeeks = discPrice * 14;
      const savedTwoWeeks = (t.price - discPrice) * 14;

      if (billingMode === 'twoweeks') {
        priceEl.textContent = formatRub(discPrice);
        oldPriceEl.textContent = formatRub(t.price);
        oldPriceEl.style.display = 'inline';
        subnoteEl.textContent = `Выгода ${formatRub(savedTwoWeeks)} за 14 дней · Итого ${formatRub(totalTwoWeeks)}`;
      } else {
        priceEl.textContent = formatRub(t.price);
        oldPriceEl.style.display = 'none';
        subnoteEl.textContent = `От 2 недель (−10%): ${formatRub(discPrice)} / день`;
      }
    });

    if (billingNote) {
      billingNote.textContent =
        billingMode === 'twoweeks'
          ? 'Активна скидка 10% при единовременной оплате рациона на 14 дней · Доставка включена'
          : 'Цены актуальны с 10.10.2026 · Бесплатная доставка по Томску и Северску включена в тариф';
    }
  }

  billingBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      billingMode = btn.getAttribute('data-billing');
      billingBtns.forEach((b) => b.classList.toggle('is-active', b === btn));
      renderTariffPrices();
    });
  });

  renderTariffPrices();

  // Interactive Weekly Menu
  const mealsListEl = document.getElementById('mealsList');
  const menuOrderBtn = document.getElementById('menuOrderBtn');
  const kcalTabs = document.querySelectorAll('[data-menu-kcal]');
  const dayTabs = document.querySelectorAll('[data-menu-day]');

  function renderWeeklyMenu() {
    if (!mealsListEl) return;
    const items = getMealsForProgram(activeMenuKcal, activeMenuDay);
    mealsListEl.innerHTML = items
      .map(
        (item) => `
        <div class="meal-item-card">
          <span class="meal-item-card__step">${item.step}</span>
          <div class="meal-item-card__name">${item.name}</div>
        </div>
      `
      )
      .join('');

    if (menuOrderBtn && TARIFFS[activeMenuKcal]) {
      const t = TARIFFS[activeMenuKcal];
      menuOrderBtn.textContent = `Заказать рацион ${t.kcal} ккал (${t.meals} блюд)`;
      menuOrderBtn.setAttribute('data-order-tariff', activeMenuKcal);
    }
  }

  kcalTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      activeMenuKcal = tab.getAttribute('data-menu-kcal');
      kcalTabs.forEach((t) => t.classList.toggle('is-active', t === tab));
      renderWeeklyMenu();
    });
  });

  dayTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      activeMenuDay = tab.getAttribute('data-menu-day');
      dayTabs.forEach((t) => t.classList.toggle('is-active', t === tab));
      renderWeeklyMenu();
    });
  });

  renderWeeklyMenu();

  // Gift Certificate Nominal Selector
  const nominalPills = document.querySelectorAll('[data-nominal]');
  const certAmountDisplay = document.getElementById('certAmountDisplay');
  nominalPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      selectedCertNominal = pill.getAttribute('data-nominal');
      nominalPills.forEach((p) => p.classList.toggle('is-active', p === pill));
      if (certAmountDisplay) {
        certAmountDisplay.textContent = selectedCertNominal;
      }
    });
  });

  // Order Modal Logic
  const orderModal = document.getElementById('orderModal');
  const modalSelectedLabel = document.getElementById('modalSelectedLabel');
  const modalSelectedMeta = document.getElementById('modalSelectedMeta');
  const copyOrderBtn = document.getElementById('copyOrderBtn');

  function openOrderModal(contextType, tariffKey) {
    if (!orderModal) return;

    if (contextType === 'tariff' && TARIFFS[tariffKey]) {
      const t = TARIFFS[tariffKey];
      const activePrice = billingMode === 'twoweeks' ? Math.round(t.price * 0.9) : t.price;
      const periodLabel = billingMode === 'twoweeks' ? 'на 2 недели со скидкой 10%' : 'стандартный тариф';
      modalSelectedLabel.textContent = `${t.name} (${t.meals} блюд в день)`;
      modalSelectedMeta.textContent = `${formatRub(activePrice)} / день · ${periodLabel} · Доставка 0 ₽`;
      currentOrderText = `Здравствуйте! Хочу заказать рацион PP TOMSK: ${t.kcal} ккал (${t.meals} блюд в день), ${periodLabel} (${formatRub(activePrice)}/день).`;
    } else if (contextType === 'cert') {
      modalSelectedLabel.textContent = `Электронный подарочный сертификат`;
      modalSelectedMeta.textContent = `Выбранный номинал: ${selectedCertNominal}`;
      currentOrderText = `Здравствуйте! Хочу оформить электронный подарочный сертификат PP TOMSK (${selectedCertNominal}).`;
    } else {
      modalSelectedLabel.textContent = 'Подбор и заказ рациона PP TOMSK';
      modalSelectedMeta.textContent = 'Томск и Северск · Бесплатная доставка 18:00–22:00';
      currentOrderText = 'Здравствуйте! Хочу заказать доставку правильного питания PP TOMSK. Подскажите, пожалуйста, по ближайшей доставке!';
    }

    orderModal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeOrderModal() {
    if (!orderModal) return;
    orderModal.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-open-order]');
    if (trigger) {
      e.preventDefault();
      const tariffKey = trigger.getAttribute('data-order-tariff');
      const certFlag = trigger.getAttribute('data-order-cert');
      if (tariffKey) {
        openOrderModal('tariff', tariffKey);
      } else if (certFlag) {
        openOrderModal('cert');
      } else {
        openOrderModal('general');
      }
      return;
    }

    if (e.target.closest('[data-close-modal]') || e.target === orderModal) {
      closeOrderModal();
    }
  });

  if (copyOrderBtn) {
    copyOrderBtn.addEventListener('click', () => {
      copyTextToClipboard(currentOrderText, 'Текст заказа скопирован — вставьте его в чат!');
    });
  }

  // Copy Phone Button
  document.querySelectorAll('[data-copy-phone]').forEach((btn) => {
    btn.addEventListener('click', () => {
      copyTextToClipboard('+79234331183', 'Номер +7 (923) 433-11-83 скопирован!');
    });
  });

  // Photo Lightbox
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');

  document.querySelectorAll('.dish-photo-card').forEach((card) => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img');
      const cap = card.querySelector('.dish-photo-card__caption');
      if (!lightbox || !img) return;
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightboxCaption.textContent = cap ? cap.textContent : '';
      lightbox.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    });
  });

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.closest('[data-close-lightbox]')) {
        lightbox.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeOrderModal();
      if (lightbox && lightbox.classList.contains('is-open')) {
        lightbox.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    }
  });
})();

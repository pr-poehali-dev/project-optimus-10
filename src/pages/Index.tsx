import { useEffect, useState } from "react";
import { ArrowRight, X } from "lucide-react";
import Icon from "@/components/ui/icon";

const LOGO_URL = "https://cdn.poehali.dev/projects/15f03407-65f8-43be-95eb-387318cb1287/files/022a0d7a-57e3-46dd-b202-77fe8fe4d76d.jpg";

const ContactModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setName("");
      setEmail("");
      setMessage("");
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md bg-card border border-accent/20 rounded-3xl p-8 shadow-2xl shadow-accent/10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
        >
          <X className="w-4 h-4 text-white/60" />
        </button>

        {sent ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Check" size={32} className="text-accent" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Отправлено!</h3>
            <p className="text-muted-foreground">Мы свяжемся с вами в ближайшее время.</p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h3 className="text-2xl font-display font-black mb-2">Начать с OpenClaw</h3>
              <p className="text-muted-foreground text-sm">Оставьте контакты — мы покажем агента в действии</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5 text-white/80">Имя</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Иван Иванов"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-accent/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5 text-white/80">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ivan@company.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-accent/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5 text-white/80">Что хотите автоматизировать?</label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Например: поддержка клиентов в Telegram, публикации в соцсетях..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-accent/50 transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-accent to-accent/80 text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-accent/30 transition-all"
              >
                Отправить заявку
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

const CASES = [
  {
    icon: "Calendar",
    tag: "Автоматизация",
    prompt: "Каждое утро в 8:00 забирай метрики из Stripe и Analytics, проверяй Sentry на ошибки и публикуй сводку в #general в Slack",
    result: "Команда видит состояние бизнеса с утра — без ручного сбора данных",
  },
  {
    icon: "FileText",
    tag: "Контент и SEO",
    prompt: "Проанализируй наши 20 лучших статей по трафику, найди пробелы vs конкуренты, напиши 5 новых статей и опубликуй в WordPress",
    result: "Полный контент-цикл без редактора — от анализа до публикации",
  },
  {
    icon: "MessageSquare",
    tag: "Поддержка клиентов",
    prompt: "Создай WhatsApp-бота на основе наших доков. Обрабатывай заказы из Shopify, авто-возвраты до $50, остальное — в Zendesk",
    result: "80% обращений закрывается автоматически, люди занимаются сложными кейсами",
  },
  {
    icon: "Share2",
    tag: "Социальные сети",
    prompt: "Создай 30-дневный контент-план для LinkedIn и X. Напиши все посты, запланируй публикации и присылай еженедельный отчёт",
    result: "Присутствие в соцсетях на автопилоте — без SMM-менеджера",
  },
];

const Index = () => {
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const observers: Record<string, IntersectionObserver> = {};
    const sectionIds = ["hero", "features", "cases", "how", "pricing", "cta"];

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;

      observers[id] = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({ ...prev, [id]: true }));
            observers[id].unobserve(element);
          }
        },
        { threshold: 0.1 }
      );
      observers[id].observe(element);
    });

    return () => Object.values(observers).forEach((o) => o.disconnect());
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} />

      {/* Header */}
      <header className="fixed top-0 w-full bg-background/80 backdrop-blur-2xl border-b border-accent/20 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src={LOGO_URL} alt="OpenClaw" className="w-9 h-9 rounded-xl object-cover" />
            <div className="font-display font-bold text-xl tracking-tighter bg-gradient-to-r from-white via-accent to-accent/80 bg-clip-text text-transparent">
              OpenClaw
            </div>
          </div>
          <nav className="hidden md:flex gap-10 text-sm font-medium">
            <a href="#features" className="text-muted-foreground hover:text-white transition-colors">Возможности</a>
            <a href="#cases" className="text-muted-foreground hover:text-white transition-colors">Кейсы</a>
            <a href="#pricing" className="text-muted-foreground hover:text-white transition-colors">Тарифы</a>
          </nav>
          <div className="flex gap-3">
            <button
              onClick={() => setModalOpen(true)}
              className="px-5 py-2.5 text-sm font-medium border border-accent/40 rounded-full hover:border-accent/70 hover:bg-accent/10 transition-all"
            >
              Войти
            </button>
            <button
              onClick={() => setModalOpen(true)}
              className="px-5 py-2.5 text-sm font-medium bg-gradient-to-r from-accent via-accent to-accent/80 text-black rounded-full hover:shadow-lg hover:shadow-accent/40 transition-all font-semibold"
            >
              Попробовать
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="hero" className="relative pt-32 pb-32 px-6 min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden">
          <img src="/images/black-hole-gif.gif" alt="" className="w-auto h-3/4 object-contain" />
        </div>
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className={`transition-all duration-1000 ${visibleSections["hero"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/10">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-xs font-medium tracking-widest text-accent/90 uppercase">AI-сотрудник нового поколения</span>
              </div>
              <h1 className="text-6xl lg:text-7xl font-display font-black leading-tight mb-8 tracking-tighter">
                <span className="bg-gradient-to-br from-white via-white to-accent/40 bg-clip-text text-transparent">
                  Твой AI-агент.
                </span>
                <br />
                <span className="text-accent">Работает 24/7.</span>
              </h1>
              <p className="text-xl text-white/80 leading-relaxed mb-10 max-w-xl font-light">
                OpenClaw — AI-сотрудник с собственным сервером, постоянной памятью и 130+ интеграциями. Строит приложения, автоматизирует процессы и реально доводит задачи до конца.
              </p>
              <div className="flex gap-4 mb-12 flex-col sm:flex-row">
                <button
                  onClick={() => setModalOpen(true)}
                  className="group px-8 py-4 bg-gradient-to-r from-accent to-accent/90 text-black rounded-full hover:shadow-2xl hover:shadow-accent/50 transition-all font-semibold text-lg flex items-center gap-3 justify-center"
                >
                  Запустить сейчас
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                </button>
                <button
                  onClick={() => setModalOpen(true)}
                  className="px-8 py-4 border border-accent/40 rounded-full hover:border-accent/70 hover:bg-accent/10 transition-all font-medium text-lg text-white"
                >
                  Смотреть демо
                </button>
              </div>
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10">
                <div>
                  <div className="text-2xl font-bold text-accent mb-1">130+</div>
                  <p className="text-sm text-white/60">Интеграций</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white mb-1">24/7</div>
                  <p className="text-sm text-white/60">Без остановок</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-accent mb-1">15+</div>
                  <p className="text-sm text-white/60">Языков</p>
                </div>
              </div>
            </div>

            <div className={`relative h-96 lg:h-[550px] transition-all duration-1000 flex items-center justify-center ${visibleSections["hero"] ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
              <div className="absolute inset-0 bg-gradient-to-br from-accent/30 via-transparent to-transparent rounded-3xl blur-3xl animate-pulse" />
              <img
                src={LOGO_URL}
                alt="OpenClaw AI Agent"
                className="w-64 h-64 lg:w-80 lg:h-80 object-cover rounded-3xl drop-shadow-2xl animate-float relative z-10 border border-accent/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-32 px-6 bg-accent/5">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-20 transition-all duration-1000 ${visibleSections["features"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">Возможности</span>
            <h2 className="text-5xl lg:text-6xl font-display font-black tracking-tighter mt-4 mb-4">
              <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
                Что умеет OpenClaw
              </span>
            </h2>
            <p className="text-lg text-white/50 max-w-2xl mx-auto font-light">
              Один агент закрывает задачи целого отдела — от контента до поддержки клиентов
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { iconName: "Calendar", title: "Расписание и автоматизация", desc: "Настраивает cron-задачи, ночные билды, синхронизацию данных. Уведомляет только при сбоях." },
              { iconName: "FileText", title: "Контент и SEO", desc: "Анализирует конкурентов, находит контентные пробелы, пишет SEO-статьи и публикует в вашем голосе." },
              { iconName: "Share2", title: "Социальные сети", desc: "Создаёт контент-планы, пишет посты, публикует по расписанию и отслеживает вовлечённость." },
              { iconName: "Mail", title: "Email-маркетинг", desc: "Строит email-цепочки, сегментирует аудиторию, A/B тестирует темы и отслеживает открытия." },
              { iconName: "MessageSquare", title: "Поддержка клиентов", desc: "AI-агент для WhatsApp, Telegram и сайта. Обрабатывает запросы на 15+ языках круглосуточно." },
              { iconName: "Package", title: "Заказы и доставка", desc: "Авто-создание счетов, отслеживание отправлений, обработка возвратов и уведомления покупателям." },
            ].map((item, i) => {
              const isVisible = visibleSections["features"];
              return (
                <div
                  key={i}
                  className={`group p-8 border border-accent/10 hover:border-accent/40 rounded-2xl bg-card/50 hover:bg-card/80 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="w-12 h-12 bg-accent/10 group-hover:bg-accent/20 rounded-xl flex items-center justify-center mb-6 transition-colors">
                    <Icon name={item.iconName} size={22} className="text-accent" />
                  </div>
                  <h3 className="font-display font-bold text-lg mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cases */}
      <section id="cases" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-20 transition-all duration-1000 ${visibleSections["cases"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">Примеры</span>
            <h2 className="text-5xl lg:text-6xl font-display font-black tracking-tighter mt-4 mb-4">
              <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
                Реальные задачи
              </span>
            </h2>
            <p className="text-lg text-white/50 max-w-xl mx-auto font-light">
              Напишите агенту задачу — он выполнит её сам, от начала до конца
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {CASES.map((c, i) => {
              const isVisible = visibleSections["cases"];
              return (
                <div
                  key={i}
                  className={`group p-8 border border-accent/10 hover:border-accent/30 rounded-2xl bg-card/30 hover:bg-card/60 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                  style={{ transitionDelay: `${i * 120}ms` }}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-9 h-9 bg-accent/15 rounded-lg flex items-center justify-center">
                      <Icon name={c.icon} size={18} className="text-accent" />
                    </div>
                    <span className="text-xs font-semibold text-accent/80 uppercase tracking-wider">{c.tag}</span>
                  </div>
                  <div className="bg-black/40 border border-white/5 rounded-xl p-4 mb-5">
                    <p className="text-xs text-white/40 mb-2 uppercase tracking-wider font-medium">Промпт</p>
                    <p className="text-sm text-white/80 leading-relaxed italic">"{c.prompt}"</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon name="Check" size={12} className="text-accent" />
                    </div>
                    <p className="text-sm text-white/60 leading-relaxed">{c.result}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="py-32 px-6 bg-accent/5">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-20 transition-all duration-1000 ${visibleSections["how"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">Процесс</span>
            <h2 className="text-5xl lg:text-6xl font-display font-black tracking-tighter mt-4">
              <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
                Запуск за 4 шага
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { num: "01", title: "Подключи", desc: "Подключите свои сервисы — Slack, Shopify, Zendesk и 130+ других инструментов" },
              { num: "02", title: "Настрой", desc: "Опишите задачи агенту на обычном языке — никакого кода не нужно" },
              { num: "03", title: "Запусти", desc: "Агент начинает работать самостоятельно и уведомляет только при необходимости" },
              { num: "04", title: "Масштабируй", desc: "Добавляйте новые сценарии и интеграции по мере роста бизнеса" },
            ].map((step, i) => {
              const isVisible = visibleSections["how"];
              return (
                <div
                  key={i}
                  className={`relative transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  <div className="group bg-accent/10 hover:bg-accent/20 border border-accent/20 hover:border-accent/40 rounded-2xl p-8 h-full flex flex-col justify-between transition-all backdrop-blur-sm">
                    <div>
                      <div className="text-5xl font-display font-black text-accent mb-4 group-hover:scale-110 transition-transform">{step.num}</div>
                      <h3 className="font-display font-bold text-xl mb-2">{step.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                  {i < 3 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-accent/40 to-transparent" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className={`text-center mb-20 transition-all duration-1000 ${visibleSections["pricing"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">Тарифы</span>
            <h2 className="text-5xl lg:text-6xl font-display font-black tracking-tighter mt-4">
              <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
                Простые цены
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: "Старт",
                price: "По запросу",
                features: ["AI-агент с постоянной памятью", "До 30 интеграций", "Автоматизация задач и расписаний", "Поддержка клиентов на 15+ языках", "Email и чат-поддержка"],
                highlight: false,
                cta: "Попробовать бесплатно",
              },
              {
                name: "Бизнес",
                price: "По запросу",
                features: ["130+ интеграций без ограничений", "Неограниченные сценарии автоматизации", "Индивидуальная настройка агента", "Выделенный сервер и память", "Приоритетная поддержка 24/7"],
                highlight: true,
                cta: "Связаться с нами",
              },
            ].map((plan, i) => {
              const isVisible = visibleSections["pricing"];
              return (
                <div
                  key={i}
                  className={`group relative transition-all duration-700 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"} ${plan.highlight ? "md:scale-105" : ""}`}
                  style={{ transitionDelay: `${i * 200}ms` }}
                >
                  {plan.highlight && (
                    <div className="absolute -inset-1 bg-gradient-to-r from-accent via-accent to-accent/60 rounded-3xl opacity-20 blur-xl group-hover:opacity-30 transition" />
                  )}
                  <div className={`relative p-10 border rounded-2xl h-full flex flex-col justify-between backdrop-blur-sm transition-all ${plan.highlight ? "border-accent/40 bg-accent/10" : "border-accent/10 bg-card/50 hover:bg-card/80"}`}>
                    <div>
                      <h3 className="font-display font-bold text-2xl mb-2">{plan.name}</h3>
                      <p className="text-4xl font-black text-accent mb-8">{plan.price}</p>
                      <ul className="space-y-4 mb-10">
                        {plan.features.map((f, j) => (
                          <li key={j} className="flex gap-3 text-sm items-start">
                            <ArrowRight className="w-4 h-4 text-accent flex-shrink-0 mt-1" />
                            <span className="text-foreground/80">{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button
                      onClick={() => setModalOpen(true)}
                      className={`w-full px-6 py-4 rounded-xl font-semibold transition-all ${plan.highlight ? "bg-gradient-to-r from-accent to-accent/80 text-black hover:shadow-xl hover:shadow-accent/40" : "border border-accent/20 hover:border-accent/40 hover:bg-accent/5 text-white"}`}
                    >
                      {plan.cta}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="py-32 px-6 bg-accent/5">
        <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${visibleSections["cta"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-5xl lg:text-6xl font-display font-black tracking-tighter mb-6">
            <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
              Готовы нанять AI-сотрудника?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground mb-12 font-light max-w-2xl mx-auto">
            OpenClaw работает 24/7, не устаёт и масштабируется вместе с вашим бизнесом. Начните автоматизацию уже сегодня.
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="group px-10 py-5 bg-gradient-to-r from-accent to-accent/90 text-black rounded-full hover:shadow-2xl hover:shadow-accent/40 transition-all font-bold text-lg flex items-center gap-3 mx-auto"
          >
            Начать бесплатно
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-accent/10 py-12 px-6 bg-background/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-3">
            <img src={LOGO_URL} alt="OpenClaw" className="w-7 h-7 rounded-lg object-cover" />
            <p>© 2026 OpenClaw Systems — AI-агент с 130+ интеграциями</p>
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Конфиденциальность</a>
            <a href="#" className="hover:text-white transition-colors">Условия</a>
            <a href="#" className="hover:text-white transition-colors">Документация</a>
            <a href="#" className="hover:text-white transition-colors">Контакты</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

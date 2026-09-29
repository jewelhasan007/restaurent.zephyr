import { useState, useEffect } from 'react';
import {
  Menu as MenuIcon,
  X,
  MapPin,
  Phone,
  Clock,
  Instagram,
  Facebook,
  ChevronDown,
  Star,
  UtensilsCrossed,
  Wine,
  Sparkles,
  ArrowRight,
  Quote,
  Users,
  Calendar,
  Check,
  Mail,
} from 'lucide-react';

const HERO_IMAGE = 'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=1920';
const SKYLINE_IMAGE = 'https://images.pexels.com/photos/434188/pexels-photo-434188.jpeg?auto=compress&cs=tinysrgb&w=1920';
const INTERIOR_IMAGE = 'https://images.pexels.com/photos/32568165/pexels-photo-32568165.jpeg?auto=compress&cs=tinysrgb&w=1920';
const TABLE_IMAGE = 'https://images.pexels.com/photos/8856555/pexels-photo-8856555.jpeg?auto=compress&cs=tinysrgb&w=1920';
const CANDLE_IMAGE = 'https://images.pexels.com/photos/37968303/pexels-photo-37968303.jpeg?auto=compress&cs=tinysrgb&w=1920';
const BAR_IMAGE = 'https://images.pexels.com/photos/26626726/pexels-photo-26626726.jpeg?auto=compress&cs=tinysrgb&w=1920';

const GALLERY_IMAGES = [
  { url: '/1.png', label: 'Table Setting' },
  { url: '/2.png', label: 'Festive Dining' },
  { url: '/3.png', label: 'Wine Selection' },
  { url: '/4.png', label: 'The Experience' },
  { url: '/5.png', label: 'Lounge Bar' },
  { url: '/6.png', label: 'Signature Cocktails' },
  { url: '/7.png', label: 'Fine Dining' },
  { url: '/8.png', label: 'Chef Special' },
  { url: '/9.png', label: 'Restaurant Interior' },
  { url: '/10.png', label: 'Elegant Atmosphere' },
  { url: '/11.png', label: 'Private Dining' },
  { url: '/12.png', label: 'Dessert Selection' },
  { url: '/13.png', label: 'Dining Experience' },
];

type MenuCategory = 'starters' | 'mains' | 'desserts' | 'drinks';

interface MenuItem {
  name: string;
  description: string;
  price: string;
  tag?: string;
}

const MENU: Record<MenuCategory, MenuItem[]> = {
  starters: [
    { name: 'Seared Scallops', description: 'Pan-seared scallops with cauliflower purée, pancetta crumble, and brown butter emulsion', price: '৳ 980', tag: 'Signature' },
    { name: 'Truffle Burrata', description: 'Creamy burrata with heirloom tomatoes, basil oil, aged balsamic, and shaved truffle', price: '৳ 760' },
    { name: 'Smoked Salmon Tartare', description: 'Hand-cut salmon with capers, shallots, crème fraîche, and dill on rye crisp', price: '৳ 690' },
    { name: 'Beef Carpaccio', description: 'Thinly sliced beef tenderloin, arugula, parmesan shavings, truffle oil, and lemon', price: '৳ 820' },
    { name: 'Grilled Camembert', description: 'Warm camembert with pine nuts, honey, toasted bread, and fresh figs', price: '৳ 640', tag: 'Vegetarian' },
  ],
  mains: [
    { name: 'Wagyu Ribeye', description: '200g Australian wagyu with pommes purée, charred asparagus, and red wine jus', price: '৳ 2,400', tag: 'Signature' },
    { name: 'Herb-Crusted Lamb Rack', description: 'New Zealand lamb with rosemary jus, mint pea purée, and dauphinoise potatoes', price: '৳ 1,850' },
    { name: 'Atlantic Salmon', description: 'Crispy-skin salmon with saffron risotto, fennel confit, and citrus beurre blanc', price: '৳ 1,650' },
    { name: 'Duck à l\'Orange', description: 'Confit duck leg with orange glaze, parsnip purée, and caramelized endive', price: '৳ 1,720' },
    { name: 'Wild Mushroom Risotto', description: 'Arborio rice with porcini, shiitake, parmesan, white wine, and truffle oil', price: '৳ 1,150', tag: 'Vegetarian' },
    { name: 'Grilled Tiger Prawns', description: 'Jumbo prawns with garlic herb butter, grilled lemon, and saffron couscous', price: '৳ 1,980' },
  ],
  desserts: [
    { name: 'Molten Chocolate Cake', description: 'Warm dark chocolate fondant with vanilla bean ice cream and raspberry coulis', price: '৳ 480', tag: 'Signature' },
    { name: 'Crème Brûlée', description: 'Classic vanilla custard with caramelized sugar crust and fresh berries', price: '৳ 420' },
    { name: 'Tiramisu', description: 'Espresso-soaked ladyfingers, mascarpone cream, and dark cocoa dusting', price: '৳ 460' },
    { name: 'Pistachio Soufflé', description: 'Light pistachio soufflé with crème anglaise and crushed pistachio', price: '৳ 520', tag: 'Chef\'s Special' },
  ],
  drinks: [
    { name: 'Zephyr Signature', description: 'Gin, elderflower, cucumber, fresh lime, and a hint of mint', price: '৳ 580', tag: 'Signature' },
    { name: 'Old Fashioned', description: 'Bourbon, demerara sugar, aromatic bitters, and orange peel', price: '৳ 620' },
    { name: 'Pomegranate Spritz', description: 'Prosecco, pomegranate liqueur, soda, and fresh pomegranate seeds', price: '৳ 540' },
    { name: 'Smoked Negroni', description: 'Gin, Campari, sweet vermouth, and orange bitters, smoked under glass', price: '৳ 660', tag: 'Premium' },
    { name: 'Virgin Mojito', description: 'Fresh mint, lime, soda, and a touch of cane syrup', price: '৳ 320', tag: 'Non-Alcoholic' },
  ],
};

const MENU_TABS: { key: MenuCategory; label: string }[] = [
  { key: 'starters', label: 'Starters' },
  { key: 'mains', label: 'Main Courses' },
  { key: 'desserts', label: 'Desserts' },
  { key: 'drinks', label: 'Cocktails & Drinks' },
];

const TESTIMONIALS = [
  { name: 'Tahseen Karina', role: 'Food Blogger', text: 'The most breathtaking dining experience in Dhaka. The panoramic view paired with exquisite continental cuisine makes Zephyr truly unforgettable.', rating: 5 },
  { name: 'Jannatul Akther', role: 'Regular Guest', text: 'Every visit feels special. The ambiance, the service, the food — everything is crafted with such attention to detail. My go-to for celebrations.', rating: 5 },
  { name: 'Rahim Chowdhury', role: 'Food Critic', text: 'Zephyr has redefined fine dining in Dhaka. The wagyu ribeye is the best I have had in Bangladesh, and the cocktail program is exceptional.', rating: 5 },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Menu', href: '#menu' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-charcoal/95 backdrop-blur-md py-3 shadow-lg shadow-black/30' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
<a href="#home" className="flex items-center group">
  <img
    src="/logo.png"
    alt="Zephyr Logo"
    className="w-14 h-14 object-contain transition-transform duration-300 group-hover:scale-105"
  />
</a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link text-sm font-medium tracking-wide text-cream/80 uppercase"
            >
              {link.label}
            </a>
          ))}
          <a href="#contact" className="btn-gold px-6 py-2.5 text-sm font-semibold uppercase tracking-wide rounded-sm">
            Reserve
          </a>
        </div>

        <button
          className="md:hidden text-cream"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-charcoal/98 backdrop-blur-md mt-3 mx-4 rounded-lg border border-gold/20 overflow-hidden animate-fade-in">
          <div className="flex flex-col py-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-6 py-3 text-cream/80 hover:text-gold hover:bg-cream/5 transition-colors text-sm uppercase tracking-wide"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="mx-4 mt-2 btn-gold px-6 py-3 text-center text-sm font-semibold uppercase tracking-wide rounded-sm"
            >
              Reserve
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section id="home" className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src={HERO_IMAGE} alt="Zephyr Restaurant Interior" className="w-full h-full object-cover" />
        <div className="absolute inset-0 hero-overlay" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <div className="flex items-center justify-center gap-2 mb-6 animate-fade-in">
          <div className="h-px w-12 bg-gold/60" />
          <Sparkles className="w-5 h-5 text-gold" />
          <div className="h-px w-12 bg-gold/60" />
        </div>
        <p className="text-gold text-sm md:text-base uppercase tracking-[0.3em] mb-4 animate-fade-in-up delay-100">
          Continental Restaurant & Lounge
        </p>
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-cream leading-tight mb-6 animate-fade-in-up delay-200">
          Zephyr
        </h1>
        <p className="text-cream/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10 animate-fade-in-up delay-300">
          Admire exquisite continental dishes with a panoramic view of the
          beautiful side of Dhaka City
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-400">
          <a href="#contact" className="btn-gold px-8 py-4 text-sm font-semibold uppercase tracking-widest rounded-sm flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Book a Table
          </a>
          <a href="#menu" className="btn-outline-gold px-8 py-4 text-sm font-semibold uppercase tracking-widest rounded-sm flex items-center gap-2">
            Explore Menu
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      <a href="#about" className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-gold/60 hover:text-gold transition-colors animate-float">
        <ChevronDown className="w-8 h-8" />
      </a>
    </section>
  );
}

function Stats() {
  const stats = [
    { icon: Users, value: '14K+', label: 'Followers' },
    { icon: UtensilsCrossed, value: '214', label: 'Curated Posts' },
    { icon: Star, value: '4.9', label: 'Guest Rating' },
    { icon: Wine, value: '50+', label: 'Cocktail Selections' },
  ];
  return (
    <section className="bg-charcoal py-16 border-y border-gold/10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <div key={stat.label} className="text-center animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s`, opacity: 0 }}>
            <stat.icon className="w-8 h-8 text-gold mx-auto mb-3" />
            <div className="font-serif text-3xl md:text-4xl text-cream mb-1">{stat.value}</div>
            <div className="text-cream/50 text-xs uppercase tracking-widest">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section-gradient py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative">
            <div className="relative z-10 overflow-hidden rounded-sm">
              <img src={INTERIOR_IMAGE} alt="Zephyr Dining Interior" className="w-full h-[500px] object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-6 z-20 w-40 h-40 border-2 border-gold/40 rounded-sm hidden md:block" />
            <div className="absolute -top-6 -left-6 z-0 w-32 h-32 bg-gold/5 rounded-sm hidden md:block" />
            <div className="absolute bottom-8 left-8 z-30 bg-charcoal/90 backdrop-blur-sm px-6 py-4 border border-gold/20 rounded-sm hidden md:block">
              <p className="font-serif text-2xl text-gold">Est. 2021</p>
              <p className="text-cream/50 text-xs uppercase tracking-widest">Banani, Dhaka</p>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-gold" />
              <p className="text-gold text-sm uppercase tracking-[0.25em]">Our Story</p>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-cream mb-6 leading-tight">
              Where Every Meal <br />
              <span className="text-gradient-gold">Becomes a Memory</span>
            </h2>
            <p className="text-cream/70 leading-relaxed mb-6">
              Perched in the iconic Catharsis Tower in Banani, Zephyr Restaurant
              and Lounge is Dhaka's premier destination for continental fine
              dining. Our chefs blend European culinary traditions with the
              freshest local and imported ingredients to create dishes that
              delight the senses.
            </p>
            <p className="text-cream/70 leading-relaxed mb-8">
              With a panoramic view of the Dhaka skyline, an intimate lounge
              atmosphere, and a curated cocktail program, Zephyr is where
              celebration meets sophistication — whether it's an intimate dinner
              for two or a grand evening with friends.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: UtensilsCrossed, title: 'Continental Cuisine', desc: 'European-inspired dishes crafted with precision' },
                { icon: Wine, title: 'Curated Bar', desc: 'Signature cocktails and fine wines' },
                { icon: Sparkles, title: 'Panoramic Views', desc: 'Breathtaking Dhaka City skyline' },
                { icon: Star, title: 'Fine Dining', desc: 'An elevated, intimate atmosphere' },
              ].map((feature) => (
                <div key={feature.title} className="flex items-start gap-3 p-4 rounded-sm border border-gold/10 hover:border-gold/30 transition-colors">
                  <feature.icon className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-cream text-sm font-semibold mb-1">{feature.title}</h4>
                    <p className="text-cream/50 text-xs leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Menu() {
  const [active, setActive] = useState<MenuCategory>('mains');

  return (
    <section id="menu" className="bg-charcoal py-24 md:py-32 relative">
      <div className="absolute inset-0 opacity-5">
        <img src={TABLE_IMAGE} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="relative max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-gold" />
            <p className="text-gold text-sm uppercase tracking-[0.25em]">Our Menu</p>
            <div className="h-px w-10 bg-gold" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-cream mb-4">
            Curated <span className="text-gradient-gold">Continental</span> Selection
          </h2>
          <p className="text-cream/60 max-w-xl mx-auto">
            Each dish is thoughtfully crafted by our chefs using the finest
            seasonal ingredients.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 md:gap-8 mb-12 border-b border-gold/10 pb-2">
          {MENU_TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActive(tab.key)}
              className={`menu-tab px-4 py-3 text-sm uppercase tracking-widest font-medium ${
                active === tab.key ? 'active' : 'text-cream/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 animate-fade-in" key={active}>
          {MENU[active].map((item, i) => (
            <div key={item.name} className="group flex items-start gap-4 animate-fade-in-up" style={{ animationDelay: `${i * 0.08}s`, opacity: 0 }}>
              <div className="flex-1">
                <div className="flex items-baseline justify-between gap-4 mb-2">
                  <h4 className="font-serif text-xl text-cream group-hover:text-gold transition-colors flex items-center gap-2">
                    {item.name}
                    {item.tag && (
                      <span className="text-[10px] uppercase tracking-widest text-gold-dark border border-gold/30 px-2 py-0.5 rounded-sm">
                        {item.tag}
                      </span>
                    )}
                  </h4>
                  <span className="text-gold font-sans text-sm font-semibold whitespace-nowrap">{item.price}</span>
                </div>
                <div className="h-px bg-gold/10 mb-2" />
                <p className="text-cream/50 text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-cream/40 text-xs uppercase tracking-widest mb-4">
            Menu items are subject to seasonal availability
          </p>
          <a href="#contact" className="btn-outline-gold inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold uppercase tracking-widest rounded-sm">
            <Calendar className="w-4 h-4" />
            Reserve Your Table
          </a>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  const features = [
    { image: BAR_IMAGE, icon: Wine, title: 'The Lounge Bar', description: 'Handcrafted cocktails, premium spirits, and a curated wine list in an intimate, warmly lit setting.' },
    { image: SKYLINE_IMAGE, icon: Sparkles, title: 'Panoramic Skyline', description: 'Sweeping views of Dhaka City from the upper floors of the iconic Catharsis Tower in Banani.' },
    { image: CANDLE_IMAGE, icon: UtensilsCrossed, title: 'Fine Dining', description: 'An elevated culinary experience where every plate is a work of art and every evening is unforgettable.' },
  ];

  return (
    <section id="experience" className="section-gradient py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-gold" />
            <p className="text-gold text-sm uppercase tracking-[0.25em]">The Experience</p>
            <div className="h-px w-10 bg-gold" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-cream">
            More Than a <span className="text-gradient-gold">Restaurant</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div key={feature.title} className="card-hover bg-charcoal border border-gold/10 rounded-sm overflow-hidden animate-fade-in-up" style={{ animationDelay: `${i * 0.15}s`, opacity: 0 }}>
              <div className="relative h-64 overflow-hidden">
                <img src={feature.image} alt={feature.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 to-transparent" />
                <div className="absolute bottom-4 left-4 w-12 h-12 bg-gold/90 rounded-sm flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-charcoal" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-serif text-2xl text-cream mb-3">{feature.title}</h3>
                <p className="text-cream/60 text-sm leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section id="gallery" className="bg-charcoal py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-gold" />
            <p className="text-gold text-sm uppercase tracking-[0.25em]">Gallery</p>
            <div className="h-px w-10 bg-gold" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-cream">
            A Glimpse of <span className="text-gradient-gold">Zephyr</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {GALLERY_IMAGES.map((img, i) => (
            <div key={i} className={`gallery-item relative rounded-sm overflow-hidden cursor-pointer ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
              <img src={img.url} alt={img.label} className={`w-full object-cover ${i === 0 ? 'h-full min-h-[400px]' : 'h-48 md:h-64'}`} />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-cream text-sm uppercase tracking-widest font-medium">{img.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="section-gradient py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-gold" />
            <p className="text-gold text-sm uppercase tracking-[0.25em]">Testimonials</p>
            <div className="h-px w-10 bg-gold" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-cream">
            What Our <span className="text-gradient-gold">Guests Say</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div key={t.name} className="bg-charcoal border border-gold/10 rounded-sm p-8 card-hover animate-fade-in-up" style={{ animationDelay: `${i * 0.15}s`, opacity: 0 }}>
              <Quote className="w-8 h-8 text-gold/40 mb-4" />
              <p className="text-cream/70 leading-relaxed mb-6 text-sm italic">"{t.text}"</p>
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 text-gold fill-gold" />
                ))}
              </div>
              <div>
                <p className="text-cream font-semibold text-sm">{t.name}</p>
                <p className="text-gold text-xs uppercase tracking-widest mt-1">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', date: '', time: '', guests: '2', notes: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setForm({ name: '', phone: '', date: '', time: '', guests: '2', notes: '' });
  };

  const contactInfo = [
    { icon: MapPin, label: 'Location', value: 'Catharsis Tower, House-133, Road-12, Block-E, Banani Model Town, Dhaka, Bangladesh 1213' },
    { icon: Phone, label: 'Reservations', value: '+880 1321-197337' },
    { icon: Clock, label: 'Hours', value: 'Mon–Sun: 12:00 PM – 11:30 PM' },
  ];

  return (
    <section id="contact" className="bg-charcoal py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-gold" />
            <p className="text-gold text-sm uppercase tracking-[0.25em]">Reservations</p>
            <div className="h-px w-10 bg-gold" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-cream mb-4">
            Book Your <span className="text-gradient-gold">Experience</span>
          </h2>
          <p className="text-cream/60 max-w-xl mx-auto">
            Reserve your table and let us craft an unforgettable evening for you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <div className="space-y-6 mb-8">
              {contactInfo.map((info) => (
                <div key={info.label} className="flex items-start gap-4 p-6 border border-gold/10 rounded-sm hover:border-gold/30 transition-colors">
                  <div className="w-12 h-12 bg-gold/10 rounded-sm flex items-center justify-center flex-shrink-0">
                    <info.icon className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-gold text-xs uppercase tracking-widest mb-1">{info.label}</p>
                    <p className="text-cream/80 text-sm leading-relaxed">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative h-64 rounded-sm overflow-hidden border border-gold/20">
              <img src={SKYLINE_IMAGE} alt="Dhaka Skyline" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <p className="font-serif text-2xl text-cream">Banani, Dhaka</p>
                <p className="text-gold text-sm uppercase tracking-widest">Catharsis Tower</p>
              </div>
            </div>
          </div>

          <div className="bg-charcoal border border-gold/20 rounded-sm p-8">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-16 animate-scale-in">
                <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mb-6">
                  <Check className="w-8 h-8 text-charcoal" />
                </div>
                <h3 className="font-serif text-3xl text-cream mb-3">Reservation Received</h3>
                <p className="text-cream/60 text-sm max-w-sm">
                  Thank you! Our team will confirm your reservation shortly. We
                  look forward to welcoming you to Zephyr.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-gold text-xs uppercase tracking-widest mb-2">Full Name</label>
                  <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field w-full px-4 py-3 rounded-sm text-sm" placeholder="Your name" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gold text-xs uppercase tracking-widest mb-2">Phone</label>
                    <input type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input-field w-full px-4 py-3 rounded-sm text-sm" placeholder="+880 1XXX-XXXXXX" />
                  </div>
                  <div>
                    <label className="block text-gold text-xs uppercase tracking-widest mb-2">Guests</label>
                    <select value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })} className="input-field w-full px-4 py-3 rounded-sm text-sm">
                      {['1', '2', '3', '4', '5', '6', '7', '8+'].map((n) => (
                        <option key={n} value={n} className="bg-charcoal">{n} {n === '1' ? 'Guest' : 'Guests'}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gold text-xs uppercase tracking-widest mb-2">Date</label>
                    <input type="date" required value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="input-field w-full px-4 py-3 rounded-sm text-sm" />
                  </div>
                  <div>
                    <label className="block text-gold text-xs uppercase tracking-widest mb-2">Time</label>
                    <input type="time" required value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className="input-field w-full px-4 py-3 rounded-sm text-sm" />
                  </div>
                </div>
                <div>
                  <label className="block text-gold text-xs uppercase tracking-widest mb-2">Special Requests</label>
                  <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={3} className="input-field w-full px-4 py-3 rounded-sm text-sm resize-none" placeholder="Any dietary preferences or special occasions?" />
                </div>
                <button type="submit" className="btn-gold w-full py-4 text-sm font-semibold uppercase tracking-widest rounded-sm flex items-center justify-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Confirm Reservation
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-charcoal border-t border-gold/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <a href="#home" className="flex items-center group">
  <img
    src="/logo.png"
    alt="Zephyr Logo"
    className="w-14 h-14 object-contain transition-transform duration-300 group-hover:scale-105"
  />
</a>
            </div>
            <p className="text-cream/50 text-sm leading-relaxed max-w-md mb-6">
              A beautiful place to admire exquisite continental dishes with a
              panoramic view of the beautiful side of Dhaka City.
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/zephyr_dhaka/" target="_blank" className="w-10 h-10 border border-gold/20 rounded-sm flex items-center justify-center text-gold/60 hover:text-gold hover:border-gold transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://web.facebook.com/zephyr.restaurant.lounge" target="_blank" className="w-10 h-10 border border-gold/20 rounded-sm flex items-center justify-center text-gold/60 hover:text-gold hover:border-gold transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
             <a
  href="mailto:zephyrlounge12@gmail.com"
  className="w-10 h-10 border border-gold/20 rounded-sm flex items-center justify-center text-gold/60 hover:text-gold hover:border-gold transition-colors"
  aria-label="Email"
>
  <Mail className="w-5 h-5" />
</a>
            </div>
          </div>

          <div>
            <h4 className="text-gold text-xs uppercase tracking-widest mb-4">Explore</h4>
            <ul className="space-y-2">
              {['About', 'Menu', 'Gallery', 'Experience', 'Contact'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-cream/50 hover:text-gold text-sm transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-gold text-xs uppercase tracking-widest mb-4">Visit Us</h4>
            <p className="text-cream/50 text-sm leading-relaxed mb-2">
              Catharsis Tower, House-133,<br />
              Road-12, Block-E, Banani<br />
              Model Town, Dhaka 1213
            </p>
            <p className="text-cream/50 text-sm">+880 1321-197337</p>
            <p className="text-gold text-sm mt-2">Mon–Sun: 12 PM – 11:30 PM</p>
          </div>
        </div>

        <div className="border-t border-gold/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-cream/40 text-xs">© 2026 Zephyr Restaurant and Lounge. All rights reserved.</p>
          <p className="text-cream/40 text-xs">Crafted with care in Dhaka, Bangladesh</p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="bg-charcoal min-h-screen">
      <Navbar />
      <Hero />
      <Stats />
      <About />
      <Menu />
      <Experience />
      <Gallery />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
